read_default_options = {
    // Reading speed in words per minute.
    wordsPerMinute: 500,

    // Words are separated by spaces or em-dashes. (This rule might need some
    // tweaking when reading e.g. French text, where it's common to insert
    // space before punctuation.)
    wordSeparator: /\s+|—/,
  
    // Sentences are words which end with a period, question mark, or
    // exclamation point, optionally followed by a closing quotation mark
    // or parenthesis.
    sentenceEnd: /[.?!]['"’”)]?$/,

    // This is the background div that covers the entire screen. It exists to
    // dim the original page a little.
    containerStyle: {
      position: 'fixed', left: 0, right: 0, top: 0, bottom: 0, zIndex: 1000},
      backgroundStyle: { 
      background: 'black', opacity: 0.5,
      position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, zIndex: -1},

    // This is the box that holds the current word. It is opaque to ensure
    // sufficient contrast with the current word, but has 15% margins so the
    // original page is still visible around it.
    wordBoxStyle: {
      background: 'white', display: 'table', width: '70%', height: '70%',
      position: 'absolute', left: '15%', right: '15%', top: '15%', bottom: '15%'},

    // This is the word itself. It uses a large font for ease of recognition.
    wordStyle: {
      font: '64pt sans-serif', color: '#444',
      display: 'table-cell', textAlign: 'center', verticalAlign: 'middle'},

    // Div that holds the progress bar. Mostly useful to style the background.
    progressHolderStyle: {
      position: 'absolute', left: '0px', right: '0px', bottom: '0px',
      background: '#eef', height: '8pt'},

    // Div that represents the progress bar itself. Its background color should
    // contrast with the background of the holder div.
    progressStyle: {
      position: 'absolute', left: '0px', top: '0px', bottom: '0px',
      background: '#44f', width: '0%'},

    // Displays the WPM counter.
    speedStyle: {
      position: 'absolute', top: '1em', right: '1em',
      font: '12pt sans-serif', color: '#888'},
};