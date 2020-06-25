browser.runtime.onMessage.addListener((req, sender) => {
  const senderTabId = sender.tab.id;

  if (req.message === "set-favicon-src") {
    console.log(`[Background] set-favicon-src; origin: ${req.payload.origin}; faviconSrc: ${(req.payload.faviconSrc || "").length}`);

    browser.storage.local.set({
      [`favicon:${req.payload.origin}`]: req.payload.faviconSrc,
    }).then(() => {
      browser.tabs.sendMessage(senderTabId, {
        requestId: req.requestId,
        message: "ok"
      });
    });
  } else {
    console.log("[Background] Unknown message:", req);
  }
});
