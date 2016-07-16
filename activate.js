(function () {
  'use strict';

  //
  // Configurable options start here! Tune these to your preference.
  //

  // Default reading speed in words per minute.
  var wordsPerMinute = 500;

  // Sentences are words which end with a period, question mark, or exclamation
  // point, optionally followed by a closing quotation mark or parenthesis.
  var sentenceEnd = /[.?!]['"’”)]?$/;

  // Words are separated by spaces or em-dashes. (This rule might need some
  // tweaking when reading e.g. French text, where it's common to insert
  // space before punctuation.)
  var wordSeparator = /\s+|—/;

  // Style for the container div that covers the entire screen.
  var containerStyle = {
    position: 'fixed', left: 0, right: 0, top: 0, bottom: 0, zIndex: 1000};

  // Style for the background div. It exists to dim the screen a little.
  var backgroundStyle = {
    background: 'black', opacity: 0.5,
    position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, zIndex: -1};

  // Style for the box that holds the current word. It is opaque to ensure
  // sufficient contrast with the current word, but has 15% margins so the
  // original page is still visible around it.
  var wordBoxStyle = {
    background: 'white', display: 'table', width: '70%', height: '70%',
    position: 'absolute', left: '15%', right: '15%', top: '15%', bottom: '15%'};

  // Style for the word itself. It uses a large font for ease of recognition.
  var wordStyle = {
    font: '64pt sans-serif', color: '#444',
    display: 'table-cell', textAlign: 'center', verticalAlign: 'middle'};

  // Style for the progress bar container. Mostly useful to style the background.
  var progressHolderStyle = {
    position: 'absolute', left: '0px', right: '0px', bottom: '0px',
    background: '#eef', height: '8pt'};

  // Style for the progress bar itself. Its background color should contrast
  // with the background of the holder div. Its width will vary over time.
  var progressStyle = {
    position: 'absolute', left: '0px', top: '0px', bottom: '0px',
    background: '#44f', width: '0%'};

  // Style for the WPM counter display.
  var speedStyle = {
    position: 'absolute', top: '1em', right: '1em',
    font: '12pt sans-serif', color: '#888'};

  //
  // Implementation starts here!
  //
  var words = parseWords(getSelection().toString());
  var position = -1;  // index in words
  var speed = 0;  // in words per minute (WPM)
  var intervalId = null;  // currently scheduled interval timer
  var key_map = buildKeyMap();

  if (words.length === 0) {
    alert("No text selected!");
    return;
  }

  // Build the GUI.
  var containerDiv = newDiv(containerStyle);
  var backgroundDiv = newDiv(backgroundStyle, containerDiv);
  var wordBoxDiv = newDiv(wordBoxStyle, containerDiv);
  var wordDiv = newDiv(wordStyle, wordBoxDiv);
  var progressHolderDiv = newDiv(progressHolderStyle, wordBoxDiv);
  var progressDiv = newDiv(progressStyle, progressHolderDiv);
  var speedDiv = newDiv(speedStyle, wordBoxDiv);
  var wordCountDiv = newDiv(wordCountStyle, wordBoxDiv);
  var timeRemainingDiv = newDiv(timeRemainingStyle, wordBoxDiv);
  setText(wordCountDiv, words.length + ' words');

  // Start reading!
  setSpeed(wordsPerMinute);
  start();
  return;

  function parseWords(text) {
    return text.split(wordSeparator).filter(function(s) { return !!s; });
  }

  function buildGui() {
    return {
      containerDiv: containerDiv,
      progressDiv: progressDiv,
      wordDiv: wordDiv,
      speedDiv: speedDiv}
  }

  function newDiv(style, parent) {
    var div = document.createElement('div');
    if (style) {
      for (var key in style) {
        div.style[key] = style[key];
      }
    }
    if (parent) {
      parent.appendChild(div);
    }
    return div;
  }

  function setText(elem, text) {
    while (elem.lastChild) elem.removeChild(elem.lastChild);
    elem.appendChild(document.createTextNode(text));
  }

  function start() {
    backgroundDiv.addEventListener('click', stop);
    wordBoxDiv.addEventListener('click', togglePausePlay);
    document.body.appendChild(containerDiv);
    document.addEventListener("keydown", onKeyDown);
    play();
  }

  function stop() {
    pause();
    document.removeEventListener("keydown", onKeyDown);
    document.body.removeChild(containerDiv);
  }

  function buildKeyMap() {
    var key_map = {
      // Escape
      27: stop,
      // Space
      32: togglePausePlay,
      // Left arrow
      37: previousSentence,
      // Right arrow
      39: nextSentence,
      // Period
      190: manualStep,
      // Plus sign
      187: increaseSpeed,
      // Minus sign
      189: decreaseSpeed,
    };
    for (var digit = 0; digit < 10; ++digit) {
      // Digits: change speed. 1=100 WPM, 2=200 WPM, .. 9=900 WPM, 0=1000 WPM.
      key_map[48 + digit] = setSpeed.bind(null, digit > 0 ? 100*digit : 1000);
    }
    return key_map;
  }

  function onKeyDown(keyEvent) {
    var handler = key_map[keyEvent.keyCode];
    if (!handler) return;
    keyEvent.stopPropagation();
    keyEvent.preventDefault();
    handler();
  }
  function setPosition(i) {
    if (i >= 0 && i < words.length) {
      setText(wordDiv, words[i]);
      progressDiv.style.width = (i == 0 ? 0 : 100 * i / (words.length - 1)) + '%';
    }
    position = i;
  }

  function advance() {
    if (position + 1 < words.length) {
      setPosition(position + 1);
    } else {
      pause();
    }
  }

  function setSpeed(newWpm) {
    speed = newWpm;
    setText(speedDiv, speed + ' WPM');
    if (!isPaused()) {
      pause();
      play();
    }
  }

  function play() {
    if (intervalId === null) {
      intervalId = setInterval(advance, 60000 / speed);
    }
  }

  function isPaused() {
    return intervalId === null;
  }

  function pause() {
    if (intervalId !== null) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }

  function togglePausePlay() {
    if (isPaused()) play(); else pause();
  }

  function manualStep() {
    if (isPaused()) advance(); else pause();
  }

  function previousSentence() {
    if (position > 0) {
      var i = position - 1;
      while (i > 0 && !words[i - 1].match(sentenceEnd)) --i;
      setPosition(i);
    }
  }

  function nextSentence() {
    if (position + 1 < words.length) {
      var i = position + 1;
      while (i + 1 < words.length && !words[i - 1].match(sentenceEnd)) ++i;
      setPosition(i);
    }
  }

  function increaseSpeed() {
    // Most browsers support timer intervals up to 15 ms, or about 4000 WPM.
    if (speed < 4000) {
      var inc = 25;
      while (20*inc <= speed) inc *= 2;
      setSpeed(speed + inc);
    }
  }

  function decreaseSpeed() {
    if (speed > 25) {
      var dec = 25;
      while (20*dec < speed) dec *= 2;
      setSpeed(speed - dec);
    }
  }

})();