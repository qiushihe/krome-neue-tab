import { connect } from "react-redux";

import { showTooltip } from "/src/actions/tooltips.action";

import Item from "./item";

export default connect(
  () => ([]),
  {
    onClick: (evt) => (dispatch) => {
      return dispatch(showTooltip({
        targetHtmlId: evt.currentTarget.id,
        contentComponent: "BookmarksTooltip",
        contentComponentProps: {}
      }));
    }
  }
)(Item);
