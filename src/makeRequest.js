/* global require */
const request = require('request'); //module used for making GET reqeusts for status code response

function requestUrl(url) {
  return new Promise((resolve, reject) => {
    request.get(
      {
        uri: url,
        agent: false,
        pool: { maxSockets: 300 },
        timeout: 10000,
      },
      (error, response) => {
        if (error) reject(error.message);
        else resolve(response.statusCode);
      }
    );
  });
}

/* global module */
module.exports.requestUrl = requestUrl;
