browser.runtime.onMessage.addListener((req, sender) => {
  const senderTabId = sender.tab.id;

  if (req.message === "ping") {
    console.log("[Background] Got ping");

    browser.tabs.sendMessage(senderTabId, {
      requestId: req.requestId,
      message: "pong"
    });
  } else if (req.message === "set-favicon-src") {
    console.log("[Background] Got set-favicon-src", req.payload);

    browser.tabs.sendMessage(senderTabId, {
      requestId: req.requestId,
      message: "ok"
    });

    browser.storage.local.set({
      [`favicon:${req.payload.origin}`]: req.payload.faviconSrc,
    }).then(() => {
      return browser.storage.local.get(`favicon:${req.payload.origin}`);
    }).then((data) => {
      console.log("got from storage:", data);
    });
  } else if (req.message === "check-origin") {
    console.log("[Background] Got check-origin");

    browser.bookmarks.getSubTree("toolbar_____").then(console.log);
  } else {
    console.log("[Background] Unknown message:", req);
  }
});
