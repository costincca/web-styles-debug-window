This README.md uses the markdown syntax available at [https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet]

# Installation

Right before closing <BODY> tag of the HTML page, call the JS script from cdn.jsdelivr.net, using the hashed version ebe361e:
    <script src="https://cdn.jsdelivr.net/gh/costincca/web-styles-debug-window@ebe361e/web-styles-debug-window.js"></script>
    
This is because Github's hotlinked version:
>    <script src="https://raw.githubusercontent.com/costincca/web-styles-debug-window/master/web-styles-debug-window.js"></script>
is restricted for running in the browsers, as Github implemented a **X-Content-Type-Options: nosniff** header to prevent executing files directly.
For more information, please see: [https://stackoverflow.com/questions/17341122/link-and-execute-external-javascript-file-hosted-on-github].

If hashed version changes, the new version should be replaced in the URL:
![image](https://github.com/costincca/web-styles-debug-window/assets/60868050/9880b784-1947-409f-8da3-14a0c3abb21e)

# Configuration

By default, even if it is installed in page, the script does not show anything.
To bring up the debug pane, URL parameters need to be specified:  
**dbg**  
  
> Values:  
> **1** - brings up the full draggable debugging pane  
> **2** - brings up the fixed semitransparent non-draggable debug panel on top of the content   
> **3** - brings up the sticky opaque debug panel, sticky at the top of the page, on top of the content  
> **4** - brings up the small opaque debug panel, not sticky, on top of the content, which shows only DPR, width and height values  
  
**dbgcol**

> Values:  
> **number** - shows the information on the specified number of columns (default: **2**)  
  
Example:  
> ..../index.htm?**dbg=1&dbgcol=4**

Currently, only the following styles are displayed: **'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'P', 'A'**.
But the JS file can be downloaded from Github, edited the first line with the desired tags, then linked to this locally modified file.
