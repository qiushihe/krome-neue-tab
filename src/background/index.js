browser.runtime.onMessage.addListener((req, sender) => {
  if (req.ping) {
    console.log("[Background] Got ping!", sender);
    browser.tabs.sendMessage(sender.tab.id, { pong: true });
  } else if (req.msg === "set-favicon-src") {
    console.log("[Background] Got set-favicon-src!");

    browser.storage.local.set({
      test: "42"
    }).then(() => {
      return browser.storage.local.get("test");
    }).then((data) => {
      console.log("got from storage:", data);
    });
  }
});
