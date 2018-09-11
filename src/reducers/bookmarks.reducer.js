import { handleActions } from "redux-actions";

import {
  PARSE_BOOKMARKS_TREE
} from '/src/actions/bookmarks.action';

import parseBookmarksTree from './bookmarks/parse-bookmarks-tree';

const initialState = {};

export default handleActions({
  [PARSE_BOOKMARKS_TREE]: parseBookmarksTree
}, initialState);
