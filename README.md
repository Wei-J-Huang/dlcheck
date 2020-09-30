# dlcheck
Dead Link Checker CLI Tool

# Purpose:

The dlcheck is used to find the good(200 response status code), dead(404 and 400 response status code) and unknown(others status codes) links contained in a text file and report issues with bad links briefly.

# Install:

NodeJs is required for installation, in the CLI, run the command `npm install dlcheck -g` in order to install the npm package for this tool, the `-g` commandline argument must be used to install this tool globally on the system.

# How to Use This Tool:

In the CLI, use the dlcheck command along with a parameter that is the file name to test the links contained in that file. IE. dlcheck FILENAME.txt or dlcheck FILENAME.html.
Using command dlcheck without an argument will display the parameter options in CLI.

# Additional Features:

After checking the status of links, the urls are displayed back to the user in the commandline in different colours, the good ones in green, bad ones in red, timeouts in blue and unkown ones in grey.

Users may use the dlcheck command with paramers of `--v, --version, /v or /version` to check the current installed version of the tool.