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
        if (xhr.status != 200 && xhr2.status != 200) { // analyze HTTP status of the response
          console.log(`Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found
        } else { // show the result
          var parser = new DOMParser();
          var xmlDoc = parser.parseFromString(xhr.responseText, "text/html"); 
          //console.log(xhr.responseText);
          var rarity = xmlDoc.evaluate("(//strong[text()='PixTape']/../em)",xmlDoc,null,XPathResult.STRING_TYPE,null);
          console.log(`${rarity.stringValue}`);
          document.getElementsByClassName("tw-m-0 item-title tw-text-xl")[0].innerHTML =document.getElementsByClassName("tw-m-0 item-title tw-text-xl")[0].innerHTML + "<br>" + rarity.stringValue;
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
    console.log("Fin de la partie pixtapes");
    // 4. This will be called after the response is received    
}

function pixcase() {
    console.log("plug-in pixcases"); 
    var title = document.getElementsByTagName("title")[0].innerHTML;
    console.log(title);
    var tapeNum = title.split(" |")[0].split("#")[1];
    console.log(tapeNum);

    if (title.split(" |")[0].split("#")[0]=="PixTape ") {

    const xhr = new XMLHttpRequest();

    xhr.open("GET", "https://pixtapes.com/case/"+tapeNum, true);
    xhr.setRequestHeader('Content-type', 'text/html');
    xhr.send();
    
    // 4. This will be called after the response is received
    xhr.onload = function() {
        if (xhr.status != 200) { // analyze HTTP status of the response
          console.log(`Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found
        } else { // show the result
          var parser = new DOMParser();
          var xmlDoc = parser.parseFromString(xhr.responseText, "text/html"); 
          //console.log(xhr.responseText);
          var caseUrl = xmlDoc.evaluate("(//a[text()='Magic Eden']/@href)",xmlDoc,null,XPathResult.STRING_TYPE,null);
          console.log(caseUrl.stringValue);
          document.getElementsByClassName("tw-m-0 item-title tw-text-xl")[0].innerHTML  =document.getElementsByClassName("tw-m-0 item-title tw-text-xl")[0].innerHTML + "<br><a href='"+caseUrl.stringValue+"'>>>Go to associated PixCase<<</a>";
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
    console.log("Fin de la partie pixcases");
    // 4. This will be called after the response is received    
}








window.onload = function() {
    console.log("On load");
    titleModified();
    pixcase();  
};
