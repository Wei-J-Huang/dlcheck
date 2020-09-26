#!/usr/bin/env node
const fs = require('fs');                   //used for file reading
const request = require('request');         //module used for making GET reqeusts for status code response
const chalk = require('chalk');             //module used for output colors
const args = process.argv.slice(2);         //using slice function to get rid of the 2 default args
const urlRegex = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,10}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g); //RegEx to extract urls

if(args.length == 0){                       //displaying parameter options if no parameter is used
    missingParams();
    return process.exit(0);
}

if(args[0].startsWith("--") || args[0].startsWith("/")){    //checking if first argument
    if(args[0] === "--v" || args[0] === "--version" || args[0] === "/v" || args[0] === "/version"){
        version();
    }else{
        unknownArg();
    }
    return process.exit(0);
}else{                                                      //if first argument is not a tool parameter(ie. starts with -- or /), assume it's a file name
    fs.readFile(args[0], (err, data) =>{
        if (err) {                                          //file error condition
            console.log(err.message);
        }else{                                              //read file
            var content = data.toString();                  //convert the content of file to string
            var links = content.match(urlRegex);               //extract url using RegEX
            links = [...new Set(links)];                    //Avoid duplicate values
            console.log("Found " + links.length + "URLs in total.");
            links.forEach(url =>{                           //display status for each url
                request.get({uri:url, agent:false, pool:{maxSockets: 300}, timeout:10000}, (error, response, body)=>{ //making get request
                    if(error){
                        console.log(chalk.blue(url + " " + error.message))
                    }else if(response.statusCode == 200){
                        console.log(chalk.green(url + " status code: [200], server is online."))
                    }else if(response.statusCode == 400 || response.statusCode == 404){
                        console.log(chalk.red(url + " status code: [400/404], this is a broken link."))
                    }else{
                        console.log(chalk.gray(url + " status is unkown."))
                    }
                })
            })
        }
    })
}

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
}
