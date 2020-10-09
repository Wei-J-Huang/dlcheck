#!/usr/bin/env node
require('dotenv').config();
const fs = require('fs');                   //used for file reading
const request = require('request');         //module used for making GET reqeusts for status code response
const chalk = require('chalk');             //module used for output colors
const args = process.argv.slice(2);         //using slice function to get rid of the 2 default args
const urlRegex = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,10}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g); //RegEx to extract urls

if(process.env.CLICOLOR == 0){              //disable chalk if CLICOLOR env variable is 0
    chalk.level = 0;
}

if(args.length == 0){                       //displaying parameter options if no parameter is used
    missingParams();
    return process.exit(0);
}

var filter = "--all";                       //default filter

if(args[0].startsWith("--") || args[0].startsWith("/")){
    if(args[0] === "--v" || args[0] === "--version" || args[0] === "/v" || args[0] === "/version"){
        version();
    }else if(args[0] === "--good" || args[0] === "--bad" || args[0] === "--all" || args[0] === "/good" || args[0] === "/bad" || args[0] === "/all"){                                                      //if first argument is not a tool parameter(ie. starts with -- or /), assume it's a file name
        filter = args[0];
        args.shift();
        args.map(arg =>{
            displayUrl(arg, filter);
        })
    }
    else{
        unknownArg();
    }
}else{
    args.map(arg=>{
        displayUrl(arg, filter);
    })
}

function displayUrl(file, filterKey){
    fs.readFile(file, (err, data) => {
        if (err) {                                          //file error condition
            console.log(err.message);
        } else {                                              //read file
            var content = data.toString();                  //convert the content of file to string
            var links = content.match(urlRegex);               //extract url using RegEX
            links = [...new Set(links)];                    //Avoid duplicate values
            console.log("Found " + links.length + "Total URLs in the file.");
            for(let i = 0; i < links.length; i++){                          //display status for each url
                request.get({ uri: links[i], agent: false, pool: { maxSockets: 300 }, timeout: 10000 }, function (error, response, body) { //making get request
                    if(filterKey === "--all" || filterKey === "/all"){                                      //filter by all
                        if (error) {
                            console.log(chalk.blue(links[i] + " " + error.message))
                        } else if (response.statusCode == 200) {
                            console.log(chalk.green(links[i]+ " [status code: " + response.statusCode + "], server is online."))
                        } else if (response.statusCode == 400 || response.statusCode == 404) {
                            console.log(chalk.red(links[i]+ " [status code: " + response.statusCode + "], this is a broken link."))
                        } else {
                            console.log(chalk.gray(links[i]+ " [status code: " + response.statusCode + "], status is unknown."))
                        }
                    }else if(filterKey === "--good" || filterKey === "/good"){                               //filter by good links
                        if (!error && response.statusCode == 200) {
                            console.log(chalk.green(links[i]+ " [status code: " + response.statusCode + "], server is online."))
                        }
                    }else if(filterKey === "--bad" || filterKey === "/bad"){                                //filter by bad links
                        if (!error && (response.statusCode == 400 || response.statusCode == 404)) {
                            console.log(chalk.red(links[i]+ " [status code: " + response.statusCode + "], this is a broken link."))
                        }
                    }
                })
            }
        }
    }
)}



function version(){
    console.log("App: Dead Link Checker");
    console.log("Ver: 1.0.0");
}

function missingParams(){
    console.log("Missing parameters:");
    console.log("(-v, -version, /v, /version to check current version).");
    console.log("(check FILENAME to test links in file.)");
}

function unknownArg(){
    console.log("Invalid Command");
    console.log("Use --v to check for the current version of app")
    console.log("Use --all, --good, --bad followed by file name(s) to filter the URLs")
}