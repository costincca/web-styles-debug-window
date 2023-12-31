Installation

Right before closing <BODY> tag of the HTML page, call the JS script from cdn.jsdelivr.net, using the hashed version ebe361e:
    <script src="https://cdn.jsdelivr.net/gh/costincca/web-styles-debug-window@ebe361e/web-styles-debug-window.js"></script>
    
This is because Github's hotlinked version:
>    <script src="[https://raw.githubusercontent.com/costincca/web-styles-debug-window/master/web-styles-debug-window.js]"></script>
is restricted for running in the browsers, as Github implemented a nosniff directive to prevent executing files directly.
For more information, please see: [https://stackoverflow.com/questions/17341122/link-and-execute-external-javascript-file-hosted-on-github]

If hashed version changes, the new version should be replaced in the URL:
![image](https://github.com/costincca/web-styles-debug-window/assets/60868050/9880b784-1947-409f-8da3-14a0c3abb21e)

Configuration

By default, even if it is installed in page, the script does not show anything.
To bring up the debug pane, URL parameters need to be specified:
    dbg=1 - brings up the debugging pane
    dbgcol=4 - shows the information on the specified number of columns (default: 2)

Example: 
> ..../index.htm?dbg=1&dbgcol=4
