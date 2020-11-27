const version = function () {
  console.log('App: Dead Link Checker');
  console.log('Ver: 1.0.0');
};

const missingParams = function () {
  console.log('Missing parameters:');
  console.log('(-v, -version, /v, /version to check current version).');
  console.log('(check FILENAME to test links in file.)');
  console.log(
    'Use --all, --good, --bad followed by file name(s) to filter the URLs'
  );
  console.log('Use --ignore or --i to take in Urls to ignore');
  return process.exit(0); /* global process */
};

const unknownArg = function () {
  console.log('Invalid Command');
  console.log('Use --v to check for the current version of app');
  console.log(
    'Use --all, --good, --bad followed by file name(s) to filter the URLs'
  );
  console.log('Use --ignore or --i to take in Urls to ignore');
};

const badIgnore = function () {
  console.log(
    'Ignore file contains Invalid lines, make sure each line starts with https/http or #'
  );
  process.exit(1);
};

/* global module */
module.exports.version = version;
module.exports.missingParams = missingParams;
module.exports.unknownArg = unknownArg;
module.exports.badIgnore = badIgnore;
