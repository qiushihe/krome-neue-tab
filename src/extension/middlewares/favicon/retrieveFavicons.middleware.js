import flow from "lodash/fp/flow";
import map from "lodash/fp/map";
import get from "lodash/fp/get";
import filter from "lodash/fp/filter";
import negate from "lodash/fp/negate";
import isEmpty from "lodash/fp/isEmpty";
import compact from "lodash/fp/compact";
import uniq from "lodash/fp/uniq";
import concat from "lodash/fp/concat";
import join from "lodash/fp/join";
import keys from "lodash/fp/keys";
import first from "lodash/fp/first";

import {getUrlOrigin, getKeyOrigin} from "/src/helpers/urls.helper";
import {PARSE_BOOKMARKS_TREE} from "/src/extension/actions/bookmarks.action";
import {setBookmarkFaviconSrc} from "/src/extension/actions/favicons.action";
import {allBookmarks} from "/src/extension/selectors/bookmarks.selector";

export default ({dispatch, getState}) => (next) => (action) => {
  const {type: actionType} = action;

  return Promise.resolve(next(action)).then(() => {
    const newState = getState();

    // The `PARSE_BOOKMARKS_TREE` action is dispatched every time a new tab is opened ...
    if (actionType === PARSE_BOOKMARKS_TREE) {
      // ... so we should try to read cached favicon data here.

      const retrieveFaviconsPromise = flow([
        allBookmarks,
        map(get("url")),
        filter(negate(isEmpty)),
        map(getUrlOrigin),
        compact,
        uniq,
        map(flow([
          concat("favicon"),
          join(":")
        ])),
        map(storageKey => browser.storage.local.get(storageKey)),
        promises => Promise.all(promises)
      ])(newState);

      return retrieveFaviconsPromise.then((result) => {
        flow([
          map((item) => {
            const key = flow([keys, first])(item);
            return {origin: getKeyOrigin(key), faviconSrc: item[key]};
          }),
          filter(flow([
            get("origin"),
            negate(isEmpty)
          ])),
          filter(flow([
            get("faviconSrc"),
            negate(isEmpty)
          ])),
          map(({ origin, faviconSrc }) => dispatch(setBookmarkFaviconSrc({ origin, faviconSrc })))
        ])(result);
      });
    }
  });
};
