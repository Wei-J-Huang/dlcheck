let version = function() {
    console.log("App: Dead Link Checker");
    console.log("Ver: 1.0.0");
}

let missingParams = function() {
    console.log("Missing parameters:");
    console.log("(-v, -version, /v, /version to check current version).");
    console.log("(check FILENAME to test links in file.)");
    console.log("Use --all, --good, --bad followed by file name(s) to filter the URLs")
    console.log("Use --ignore or --i to take in Urls to ignore")
}

let unknownArg = function() {
    console.log("Invalid Command");
    console.log("Use --v to check for the current version of app")
    console.log("Use --all, --good, --bad followed by file name(s) to filter the URLs")
    console.log("Use --ignore or --i to take in Urls to ignore")
}

let badIgnore = function(){
    console.log("Ignore file contains Invalid lines, make sure each line starts with https/http or #");
    process.exit(1);
}

module.exports = {
    version : version,
    missingParams : missingParams,
    unknownArg : unknownArg,
    badIgnore : badIgnore
}