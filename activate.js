function read_activate(options) {
  'use strict';

  var words = parseWords(getSelection().toString());
  var position = -1;  // index in words
  var speed = 0;  // in words per minute (WPM)
  var intervalId = null;  // currently scheduled interval timer
  var gui = buildGui();
  var key_map = buildKeyMap();

  if (words.length === 0) {
    alert("No text selected!");
  } else {
    setSpeed(options.wordsPerMinute);
    start();
  }
  return;

  function parseWords(text) {
    return text.split(options.wordSeparator).filter(function(s) { return !!s; });
  }

  function buildGui() {
    var containerDiv = newDiv(options.containerStyle);
    var backgroundDiv = newDiv(options.backgroundStyle);
    var wordBoxDiv = newDiv(options.wordBoxStyle);
    var wordDiv = newDiv(options.wordStyle);
    var progressHolderDiv = newDiv(options.progressHolderStyle);
    var progressDiv = newDiv(options.progressStyle);
    var speedDiv = newDiv(options.speedStyle);
    wordBoxDiv.appendChild(wordDiv);
    wordBoxDiv.appendChild(progressHolderDiv);
    wordBoxDiv.appendChild(speedDiv);
    progressHolderDiv.appendChild(progressDiv);
    containerDiv.appendChild(backgroundDiv);
    containerDiv.appendChild(wordBoxDiv);
    backgroundDiv.addEventListener('click', stop);
    return {
      containerDiv: containerDiv,
      progressDiv: progressDiv,
      wordDiv: wordDiv,
      speedDiv: speedDiv}
  }

  function newDiv(style) {
    var div = document.createElement('div');
    if (style) {
      for (var key in style) {
        div.style[key] = style[key];
      }
    }
    return div;
  }

  function clearElem(elem) {
    while (elem.lastChild) elem.removeChild(elem.lastChild);
  }

  function appendText(elem, text) {
    elem.appendChild(document.createTextNode(text));
  }

  function start() {
    document.body.appendChild(gui.containerDiv);
    document.addEventListener("keydown", onKeyDown);
    play();
  }

  function stop() {
    pause();
    document.removeEventListener("keydown", onKeyDown);
    document.body.removeChild(gui.containerDiv);
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
    clearElem(gui.wordDiv);
    if (i >= 0 && i < words.length) {
      appendText(gui.wordDiv, words[i]);
      gui.progressDiv.style.width = (i == 0 ? 0 : 100 * i / (words.length - 1)) + '%';
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
    clearElem(gui.speedDiv);
    appendText(gui.speedDiv, speed + ' WPM');
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
      while (i > 0 && !words[i - 1].match(options.sentenceEnd)) --i;
      setPosition(i);
    }
  }

  function nextSentence() {
    if (position + 1 < words.length) {
      var i = position + 1;
      while (i + 1 < words.length && !words[i - 1].match(options.sentenceEnd)) ++i;
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

};