const CSS = "* { background: rgba(0,0,0, 0.8)!important; color: rgba(255,255,255, 0.6)!important;}";
const TOOLTIP_ENABLE = "Enable night mode";
const TOOLTIP_DISABLE = "Disable night mode";
const URL = "quora.com";

function enableNightMode(tab, title) {
    chrome.pageAction.setTitle({tabId: tab.id, title: TOOLTIP_DISABLE});
    chrome.tabs.insertCSS({code: CSS});
}

function disableNightMode(tab, title) {
    chrome.pageAction.setTitle({tabId: tab.id, title: TOOLTIP_ENABLE});
    chrome.tabs.reload(tab.id);
}

function toggleNightMode(tab) {
  function gotTitle(title) {
      if (title === TOOLTIP_ENABLE) {
        enableNightMode(tab, title);
        chrome.storage.local.set({nightModeEnabled:true})
    } else {
        disableNightMode(tab, title);
        chrome.storage.local.set({nightModeEnabled:false})
    }
  }

  var gettingTitle = chrome.pageAction.getTitle({tabId: tab.id}, function(title) {
    gotTitle(title);
  });
}

function initializePageAction(tab) {
    var thisTab = tab;
    if(tab.url.indexOf(URL) > -1) {
      console.log(tab.id);
        chrome.pageAction.setTitle({tabId: tab.id, title: TOOLTIP_ENABLE});
        chrome.pageAction.show(tab.id);

        function onGot(item) {
            if(item["nightModeEnabled"]) {
                enableNightMode(thisTab);
            }
        }

        function onError(error) {
            console.log(`Error: ${error}`);
        }

        var nightModeEnabled = chrome.storage.local.get("nightModeEnabled", function(item) {

            if(chrome.runtime.lastError) {
              onError(chrome.runtime.lastError);
              return;
            }

            onGot(item);
        });
    }
}

var gettingAllTabs = chrome.tabs.query({ active: true }, function(tabs) {
  for (let tab of tabs) {
    initializePageAction(tab);
  }
});

chrome.tabs.onUpdated.addListener((id, changeInfo, tab) => {
  initializePageAction(tab);
});

chrome.pageAction.onClicked.addListener(toggleNightMode);
