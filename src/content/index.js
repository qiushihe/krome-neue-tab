import base64ArrayBuffer from "./base64ArrayBuffer";
import backgroundRequest from "./backgroundRequest";

backgroundRequest({ message: "ping" }).then((res) => {
  console.log("[Content] Ping Response:", res);
}).catch((err) => {
  console.log("[Content] Ping Error:", err);
});

const pageUrl = new URL(window.location.href);

backgroundRequest({
  message: "check-origin",
  payload: { origin: pageUrl.origin }
}).then((res) => {
  console.log("[Content] Check Origin Response:", res);
}).catch((err) => {
  console.log("[Content] Check Origin Error:", err);
});

fetch(`${pageUrl.origin}/favicon.ico`).then((res) => {
  if (res.status != 200) {
    console.log("[Content] try search for link");
  } else {
    res.arrayBuffer().then((buffer) => {
      backgroundRequest({
        message: "set-favicon-src",
        payload: {
          origin: pageUrl.origin,
          faviconSrc: `data:image/x-icon;base64,${base64ArrayBuffer(buffer)}`
        }
      }).then((res) => {
        console.log("[Content] Set Favicon Response:", res);
      }).catch((err) => {
        console.log("[Content] Set Favicon Error:", err);
      });
    });
  }
}).catch(() => {
  console.log("[Content] try search for link");
});
