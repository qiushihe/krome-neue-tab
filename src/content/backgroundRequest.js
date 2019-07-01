import getOr from "lodash/fp/getOr";
import delay from "lodash/fp/delay";
import flow from "lodash/fp/flow";

import uuidv4 from "./uuidv4";

const getTimeout = getOr(3000, "timeout");

export default (paylaod, options) => new Promise((resolve, reject) => {
  const requestId = uuidv4();

  const withTimeout = flow([
    getTimeout,
    delay
  ])(options);

  let handlerTimeout = null;

  const handleResponse = (res) => {
    if (res.requestId !== requestId) {
      return;
    }

    if (!handlerTimeout) {
      clearTimeout(handlerTimeout);
    }

    browser.runtime.onMessage.removeListener(handleResponse);
    resolve(res);
  };

  browser.runtime.onMessage.addListener(handleResponse);

  browser.runtime.sendMessage({ ...paylaod, requestId: requestId }).then(() => {
    handlerTimeout = withTimeout(() => {
      browser.runtime.onMessage.removeListener(handleResponse);
      reject(new Error("request timed out"));
    });
  }).catch((err) => {
    browser.runtime.onMessage.removeListener(handleResponse);
    reject(err);
  });
});
