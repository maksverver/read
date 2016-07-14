#!/bin/sh
cat <<EOF
<html>
<head>
  <meta http-equiv="content-type" content="text/html;charset=utf-8">
  <title>Read! – A speed reading bookmarklet using rapid serial visual presentation.</title>
  <link rel="stylesheet" type="text/css" href="index.css">
</head>
<body>
<h1>Read!<h1>
<h4>A speed reading <a href="https://en.wikipedia.org/wiki/Bookmarklet">bookmarklet</a> using rapid serial visual presentation</h4>

<ul>
<li>To install, drag this link to your bookmarks toolbar: <a href="javascript:$(cat minified.js \
  | sed -e 's/%/%25/g; s/&/\&amp;/g; s/</\&lt;/g; s/"/\&quot;/g'
)">Read!</a></i>
<li>To use, select the text you want to read, then click the <em>Read!</em> link.</li>
</ul>

Can't find the bookmarks toolbar? See the documentation for <a href="https://support.google.com/chrome/answer/95745?hl=en">Chrome</a>
or <a href="https://support.mozilla.org/en-US/kb/bookmarks-toolbar-display-favorite-websites">Firefox</a>.

<h2>Keyboard shortcuts</h2>
<p><i>TODO:</i> Table of shortcuts.</p>

<h2>Background information</h2>
<p><i>TODO:</i> Some info about RSVP.</p>

<p>Written by <a href="mailto:maksverver@geocities.com">Maks Verver</a>.
Source code: <a href="https://github.com/maksverver/read/">https://github.com/maksverver/read/</a>.</p>

</body>
</html>
EOF
