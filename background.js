var enable = true;
function loadNightly() {
  browser.tabs.executeScript({
    file: "/nightly.js"
  })
}
function loadLight() {
  browser.tabs.executeScript({
    file: "/light.js"
  })
}

browser.browserAction.onClicked.addListener(() => {
  if(enable) {
    loadNightly();
    enable = false;
  } else {
    loadLight();
    enable = true;
  }
});
