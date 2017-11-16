const CSS = "* { background: rgba(41, 0, 4, 0.79)!important; color: rgba(255,255,255, 0.6)!important;}";
const TOOLTIP_ENABLE = "Enable night mode";
const TOOLTIP_DISABLE = "Disable night mode";
const URL = "quora.com";

function enableNightMode(tab, title) {
    browser.pageAction.setTitle({tabId: tab.id, title: TOOLTIP_DISABLE});
    browser.tabs.insertCSS({code: CSS});
}

function disableNightMode(tab, title) {
    browser.pageAction.setTitle({tabId: tab.id, title: TOOLTIP_ENABLE});
    browser.tabs.removeCSS({code: CSS});
}

function toggleNightMode(tab) {
  function gotTitle(title) {
      if (title === TOOLTIP_ENABLE) {
        enableNightMode(tab, title);
        browser.storage.local.set({nightModeEnabled:true})
    } else {
        disableNightMode(tab, title);
        browser.storage.local.set({nightModeEnabled:false})
    }
  }

  var gettingTitle = browser.pageAction.getTitle({tabId: tab.id});
  gettingTitle.then(gotTitle);
}

function initializePageAction(tab) {
    var thisTab = tab;
    if(tab.url.indexOf(URL) > -1) {
        browser.pageAction.setTitle({tabId: tab.id, title: TOOLTIP_ENABLE});
        browser.pageAction.show(tab.id);

        function onGot(item) {
            if(item["nightModeEnabled"]) {
                enableNightMode(thisTab);
            }
        }

        function onError(error) {
            console.log(`Error: ${error}`);
        }

        var nightModeEnabled = browser.storage.local.get("nightModeEnabled");
        nightModeEnabled.then(onGot, onError);
    }
}

var gettingAllTabs = browser.tabs.query({});
gettingAllTabs.then((tabs) => {
  for (let tab of tabs) {
    initializePageAction(tab);
  }
});

browser.tabs.onUpdated.addListener((id, changeInfo, tab) => {
  initializePageAction(tab);
});

browser.pageAction.onClicked.addListener(toggleNightMode);
