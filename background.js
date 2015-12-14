chrome.contextMenus.onClicked.addListener(function(info, currentTab) {

  chrome.tabs.sendMessage(currentTab.id, 'captureDocument', function(response){
    // console.log(response);
  });

});

chrome.contextMenus.create({
  id: 'open',
  title: "Clone this!",
  contexts: ['page', 'link'],
});
