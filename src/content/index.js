const base64ArrayBuffer = (buffer) => window.btoa(
  [].slice.call(new Uint8Array(buffer))
    .map((b) => String.fromCharCode(b))
    .join("")
);

const pageUrl = new URL(window.location.href);

browser.runtime.onMessage.addListener((req, sender) => {
  console.log("[Content] Got message!", req, sender);
});

fetch(`${pageUrl.origin}/favicon.ico`).then((res) => {
  if (res.status != 200) {
    console.log("[Content] try search for link");
  } else {
    res.arrayBuffer().then((buffer) => {
      browser.runtime.sendMessage({
        msg: "set-favicon-src",
        payload: {
          origin: pageUrl.origin,
          faviconSrc: `data:image/x-icon;base64,${base64ArrayBuffer(buffer)}`
        }
      });
    });
  }
}).catch(() => {
  console.log("[Content] try search for link");
});

browser.runtime.sendMessage({
  ping: true
}).then((...args) => {
  console.log("[Content] sent", args)
});
