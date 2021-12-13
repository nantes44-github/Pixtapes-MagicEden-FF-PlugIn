console.log("Activation du plug-in");   

function titleModified() {
    console.log("plug-in pixtapes"); 
    var title = document.getElementsByTagName("title")[0].innerHTML;
    console.log(title);
    var tapeNum = title.split(" |")[0].split("#")[1];
    console.log(tapeNum);

    if (title.split(" |")[0].split("#")[0]=="PixTape ") {

    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://pixtapes.com/tape/"+tapeNum, true);
    xhr.setRequestHeader('Content-type', 'text/html');
    xhr.send();
    
    // 4. This will be called after the response is received
    xhr.onload = function() {
        if (xhr.status != 200) { // analyze HTTP status of the response
          console.log(`Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found
        } else { // show the result
          var parser = new DOMParser();
          var xmlDoc = parser.parseFromString(xhr.responseText, "text/html"); 
          var rarity = xmlDoc.evaluate("(//strong[text()='PixTape']/../em)",xmlDoc,null,XPathResult.STRING_TYPE,null);
          console.log(`${rarity.stringValue}`);
          document.getElementsByClassName("m-0 item-title")[0].textContent =document.getElementsByClassName("m-0 item-title")[0].textContent + " " + rarity.stringValue;
        }
      };
      
      xhr.onprogress = function(event) {
        if (event.lengthComputable) {
          console.log(`Received ${event.loaded} of ${event.total} bytes`);
        } else {
          console.log(`Received ${event.loaded} bytes`); // no Content-Length
        }
      
      };
      
      xhr.onerror = function() {
        console.log(`Request failed ${xhr.status} ${xhr.response}`);
      };
    }
}


window.onchange = function() {
    var titleEl = document.getElementsByTagName("title")[0];
    var docEl = document.documentElement;

    if (docEl && docEl.addEventListener) {
        docEl.addEventListener("DOMSubtreeModified", function(evt) {
            var t = evt.target;
            if (t === titleEl || (t.parentNode && t.parentNode === titleEl)) {
                titleModified();
                var title = document.getElementsByTagName("title")[0].innerHTML;
                console.log(title);
            }
        }, false);
    } else {
        document.onpropertychange = function() {
            if (window.event.propertyName == "title") {
                titleModified();
            }
        };
    }
};


window.onload = function() {
    var titleEl = document.getElementsByTagName("title")[0];
    var docEl = document.documentElement;

    if (docEl && docEl.addEventListener) {
        docEl.addEventListener("DOMSubtreeModified", function(evt) {
            var t = evt.target;
            if (t === titleEl || (t.parentNode && t.parentNode === titleEl)) {
                titleModified();
                var title = document.getElementsByTagName("title")[0].innerHTML;
                console.log(title);
            }
        }, false);
    } else {
        document.onpropertychange = function() {
            if (window.event.propertyName == "title") {
                titleModified();
            }
        };
    }
};