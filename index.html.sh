#!/bin/sh
cat <<EOF
<!DOCTYPE html>
<html lang="en">
<head>
  <meta http-equiv="content-type" content="text/html; charset=utf-8">
  <title>Read! – A speed reading bookmarklet using rapid serial visual presentation.</title>
  <link rel="stylesheet" type="text/css" href="index.css">
</head>
<body>
<h1>Read!</h1>
<h4>A speed reading <a href="https://en.wikipedia.org/wiki/Bookmarklet">bookmarklet</a> using rapid serial visual presentation</h4>

<ul>
<li>To install, drag this link to your bookmarks toolbar: <a href="javascript:$(cat minified.js \
  | sed -e 's/%/%25/g; s/&/\&amp;/g; s/</\&lt;/g; s/"/\&quot;/g'
)">Read!</a>
<li>To use, select the text you want to read, then click the <em>Read!</em> link.</li>
</ul>

(Can't find the bookmarks toolbar? See the documentation for <a href="https://support.google.com/chrome/answer/95745?hl=en">Chrome</a>
or <a href="https://support.mozilla.org/en-US/kb/bookmarks-toolbar-display-favorite-websites">Firefox</a>.)

<h2>Background information</h2>
<p><a href="https://en.wikipedia.org/wiki/Rapid_serial_visual_presentation">Rapid
serial visual presentation</a> (RSVP) is a way to display text that allows much
higher than usual reading speeds, at little or no reduction in reading
comprehension. With RSVP, words are displayed one by one, at a fixed pace, and
at a fixed screen location. This eliminates the need to track the position of
words on a page, prevents subvocalization, and minimizes distraction while
reading.</p>

<p>Although the reading speed (measured in words per minute, or WPM), can be
chosen arbitrarily, higher frequencies tend to result in lower reading
comprehension.
This makes RSVP most suitable for quickly scanning uncomplicated articles, and
less useful for texts with high information density, overly long or unusual
words, or overly complex sentence structure.</p>

<p>Fortunately, many texts worth reading are neither overly complex nor
particularly dense. The <em>Read!</em> bookmarklet enables you to read more
of them in less time!</p>

<h2>Keyboard shortcuts</h2>
<table>
<tr><th>Escape</th><td>Quit.</td>
    <th>1</th><td>Set speed to 100 WPM.</td></tr>
<tr><th>Space</th><td>Toggle pause/play.</td>
    <th>2</th><td>Set speed to 200 WPM.</td></tr>
<tr><th>Left arrow ←</th><td>Back to previous sentence start.</td>
    <th>3</th><td>Set speed to 300 WPM.</td></tr>
<tr><th>Right arrow →</th><td>Forward to next sentence start.</td>
    <th>4</th><td>Set speed to 400 WPM.</td></tr>
<tr><th>Period .</th><td>Manual step: pause, and skip to next word.</td>
    <th>5</th><td>Set speed to 500 WPM.</td></tr>
<tr><th>Plus sign +</th><td>Increase reading speed.</td>
    <th>6</th><td>Set speed to 600 WPM.</td></tr>
<tr><th>Minus sign -</th><td>Decrease reading speed.</td>
    <th>7</th><td>Set speed to 700 WPM.</td></tr>
<tr><th></th><td></td>
    <th>8</th><td>Set speed to 800 WPM.</td></tr>
<tr><th></th><td></td>
    <th>9</th><td>Set speed to 900 WPM.</td></tr>
<tr><th></th><td></td>
    <th>0</th><td>Set speed to 1,000 WPM.</td></tr>
</table>

<h2>Source code</h2>

<p>On GitHub: <a href="https://github.com/maksverver/read/">https://github.com/maksverver/read/</a>.<br>
Written by <a href="mailto:maksverver@geocities.com">Maks Verver</a>.</p>

</body>
</html>
EOF
