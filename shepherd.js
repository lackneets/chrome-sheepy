chrome.runtime.onMessage.addListener(function(requestMessage, sender, sendResponse) {
  if(requestMessage == 'captureDocument'){
    //sendResponse(document.body.innerHTML);
    var sheepy = new Sheepy();
    sheepy.saveSingle();
  }
})