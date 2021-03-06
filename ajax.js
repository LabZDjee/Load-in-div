function getHttpResource(uri) {
  function statusNum2Str(num) {
    switch (num) {
      case 100:
        return "Continue";
      case 101:
        return "Switching Protocols";
      case 103:
        return "Checkpoint";
      case 200:
        return "OK";
      case 201:
        return "Created";
      case 202:
        return "Accepted";
      case 203:
        return "Non-Authoritative Information";
      case 204:
        return "No Content";
      case 205:
        return "Reset Content";
      case 206:
        return "Partial Content";
      case 300:
        return "Multiple Choices";
      case 301:
        return "Moved Permanently";
      case 302:
        return "Found";
      case 303:
        return "See Other";
      case 304:
        return "Not Modified";
      case 306:
        return "Switch Proxy";
      case 307:
        return "Temporary Redirect";
      case 308:
        return "Resume Incomplete";
      case 400:
        return "Bad Request";
      case 401:
        return "Unauthorized";
      case 402:
        return "Payment Required";
      case 403:
        return "Forbidden";
      case 404:
        return "Not Found";
      case 405:
        return "Method Not Allowed";
      case 406:
        return "Not Acceptable";
      case 407:
        return "Proxy Authentication Required";
      case 408:
        return "Request Timeout";
      case 409:
        return "Conflict";
      case 410:
        return "Gone";
      case 411:
        return "Length Required";
      case 412:
        return "Precondition Failed";
      case 413:
        return "Request Entity Too Large";
      case 414:
        return "Request-URI Too Long";
      case 415:
        return "Unsupported Media Type";
      case 416:
        return "Requested Range Not Satisfiable";
      case 417:
        return "Expectation Failed";
      case 500:
        return "Internal Server Error";
      case 501:
        return "Not Implemented";
      case 502:
        return "Bad Gateway";
      case 503:
        return "Service Unavailable";
      case 504:
        return "Gateway Timeout";
      case 505:
        return "HTTP Version Not Supported";
      case 511:
        return "Network Authentication Required";
      default:
        return "Undocumented Error";
    }
  }
  function statusNum2Type(num) {
    switch (Math.floor(num / 100)) {
      case 1:
        return "Information";
      case 2:
        return "Successful";
      case 3:
        return "Redirection";
      case 4:
        return "Client Error";
      case 5:
        return "Server Error";
      default:
        return "Unknown Type";
    }
  }
  return new Promise(function(resolve, reject) {
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
      if (xmlHttp.readyState == 4) {
        if (xmlHttp.status == 200) {
          resolve(xmlHttp.responseText);
        } else {
          reject({
            status: {
              num: xmlHttp.status,
              str: statusNum2Str(xmlHttp.status),
              type: statusNum2Type(xmlHttp.status)
            },
            uri
          });
        }
      }
    };
    xmlHttp.open("GET", uri, true); // true for asynchronous
    xmlHttp.send();
  });
}
