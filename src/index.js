#!/usr/bin/env node
/* global require */
require('dotenv').config();
const {
  version,
  missingParams,
  unknownArg,
  badIgnore,
} = require('./displayMessage.js');
const { validProtocol, validComment } = require('./validate');
const { requestUrl } = require('./makeRequest');
const fs = require('fs'); //used for file reading
const chalk = require('chalk'); //module used for output colors
const args = process.argv.slice(2); //using slice function to get rid of the 2 default args
const urlRegex = new RegExp(
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,10}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/g
); //RegEx to extract urls

/* global process */
if (process.env.CLICOLOR == 0) {
  //disable chalk if CLICOLOR env variable is 0
  chalk.level = 0;
}

if (args.length == 0) {
  //displaying parameter options if no parameter is used
  missingParams();
}

var filter = '--all'; //default filter

if (args[0].startsWith('--') || args[0].startsWith('/')) {
  if (
    args[0] === '--v' ||
    args[0] === '--version' ||
    args[0] === '/v' ||
    args[0] === '/version'
  ) {
    version();
  } else if (
    args[0] === '--good' ||
    args[0] === '--bad' ||
    args[0] === '--all' ||
    args[0] === '/good' ||
    args[0] === '/bad' ||
    args[0] === '/all'
  ) {
    //if first argument is not a tool parameter(ie. starts with -- or /), assume it's a file name
    filter = args[0];
    args.shift();
    args.map((arg) => {
      displayUrl(arg, filter);
    });
  } else if (
    args[0] === '--ignore' ||
    args[0] === '--i' ||
    args[0] === '/ignore' ||
    args[0] === '/i'
  ) {
    args.shift();
    getIgnore(args, filter);
  } else {
    unknownArg();
  }
} else {
  args.map((arg) => {
    displayUrl(arg, filter);
  });
}

function displayUrl(file, filterKey, ignore = []) {
  var pass = true;
  fs.readFile(file, (err, data) => {
    if (err) {
      //file error condition
      console.log(err.message);
    } else {
      //read file
      var content = data.toString(); //convert the content of file to string
      var links = content.match(urlRegex); //extract url using RegEX
      links = [...new Set(links)]; //Avoid duplicate values
      console.log('Found ' + links.length + ' Total URLs in the file.');
      for (let i = 0; i < links.length; i++) {
        //display status for each url
        ignore.forEach((element) => {
          if (links[i].startsWith(element)) {
            pass = false;
          }
        });
        if (pass) {
          requestUrl(links[i])
            .then((statusCode) => {
              if (filterKey === '--all' || filterKey === '/all') {
                //filter by all
                if (statusCode == 200) {
                  console.log(
                    chalk.green(
                      links[i] +
                        ' [status code: ' +
                        statusCode +
                        '], server is online.'
                    )
                  );
                } else if (statusCode == 400 || statusCode == 404) {
                  console.log(
                    chalk.red(
                      links[i] +
                        ' [status code: ' +
                        statusCode +
                        '], this is a broken link.'
                    )
                  );
                } else {
                  console.log(
                    chalk.gray(
                      links[i] +
                        ' [status code: ' +
                        statusCode +
                        '], status is unknown.'
                    )
                  );
                }
              } else if (filterKey === '--good' || filterKey === '/good') {
                //filter by good links
                if (statusCode == 200) {
                  console.log(
                    chalk.green(
                      links[i] +
                        ' [status code: ' +
                        statusCode +
                        '], server is online.'
                    )
                  );
                }
              } else if (filterKey === '--bad' || filterKey === '/bad') {
                //filter by bad links
                if (statusCode == 400 || statusCode == 404) {
                  console.log(
                    chalk.red(
                      links[i] +
                        ' [status code: ' +
                        statusCode +
                        '], this is a broken link.'
                    )
                  );
                }
              }
            })
            .catch((error) => {
              console.log(chalk.blue(links[i] + ' ' + error));
            });
        } else {
          pass = true;
        }
      }
    }
  });
}

function getIgnore(args, filterKey) {
  let promise = new Promise(function (resolve, reject) {
    fs.readFile(args[0], (err, data) => {
      if (err) {
        //file error condition
        reject(err.message);
      } else {
        var ignoreList = (data + '').split('\n');
        var ignore = [];
        var i = 0;
        ignoreList.forEach((e) => {
          if (validProtocol(e)) {
            ignore[i] = e.replace(/(\r\n|\n|\r)/gm, '');
            i++;
          } else if (!validComment) {
            badIgnore();
          }
        });
        resolve(ignore);
      }
    });
  });

  promise.then((ignoreList) => {
    args.shift();
    args.map((arg) => {
      displayUrl(arg, filterKey, ignoreList);
    });
  });
}
