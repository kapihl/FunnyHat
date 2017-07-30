chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('window.html', {
    'outerBounds': {
      'width': 1600,
      'height': 1200
    }
  });
});

function Run(){
  var global = {
    "base" : null,        // base document
    "history": {},        // track visited pages
    "insert": null,       // DOM elem
    "page": null,         // iframe for external page
  };

  var prep = prepare();
  global.base =   window.location.href
  global.page =   prep.page
  global.insert = prep.insert

  function prepare(){
   // hide GUI for showing visited links
      var iframe = document.createElement('iframe');
      iframe.width  = 1200;
      iframe.height = 800;
      iframe.sandbox ="allow-scripts allow-popups allow-forms allow-same-origin";
      iframe.style.visibility = "hidden";

      // insert at div tag
      var myDiv = document.getElementById("loadLocalFrame");
      myDiv.style.visibility = "hidden";
      myDiv.appendChild(iframe);
      var tuple = {"insert": myDiv, "page": iframe};
      return tuple;
  }
}//end Run

function load(){
  var urlid = document.getElementByTagName("getPageUrl");
  var url = urlid.value;
  console.log("url is " + url);
  loadurl(url);
}

// from gui.js
function loadurl(url){
    console.log("in load. URL is " + url);
    global.insert.style.visibility = "visible";
    // CMD-line call: localhost:3000/external?url=http://www.dr.dk
    var urlStr = "http://127.0.0.1:3000/external?url=" + url;
    global.page.src = urlStr;
    global.page.style.visibility = "visible";
  }



// execute
var main = new Run()
