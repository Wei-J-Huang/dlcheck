function validProtocol(link) {
  if (link.startsWith('https://') || link.startsWith('http://')) {
    return true;
  }
  return false;
}

function validComment(fileLine) {
  if (fileLine.startsWith('#') && fileLine != '') {
    return true;
  }
  return false;
}

/* global module */
module.exports.validProtocol = validProtocol;
module.exports.validComment = validComment;
