import { PureComponent } from "react";
import PropTypes from "prop-types";
import FlowTip from "flowtip-react-dom";

import CONTENT_COMPONENTS from "/src/extension/enums/tooltip-content-components";

class Tooltip extends PureComponent {
  constructor(...args) {
    super(...args);

    this.state = {
      targetRekt: null
    };
  }

  componentDidMount() {
    const { targetHtmlId } = this.props;

    const target = document.querySelector(`#${targetHtmlId}`);

    if (target) {
      this.setState({
        targetRekt: target.getBoundingClientRect()
      });
    }
  }

  render() {
    const { tooltipProps, contentComponent, contentComponentProps } = this.props;
    const { targetRekt } = this.state;

    const ContentComponent = CONTENT_COMPONENTS[contentComponent];

    if (targetRekt && ContentComponent) {
      return (
        <FlowTip
          target={targetRekt}
          {...tooltipProps}
        >
          <ContentComponent {...contentComponentProps} />
        </FlowTip>
      );
    } else {
      return null;
    }
  }
}

Tooltip.propTypes = {
  targetHtmlId: PropTypes.string,
  tooltipProps: PropTypes.object,
  contentComponent: PropTypes.string,
  contentComponentProps: PropTypes.object
};

Tooltip.defaultProps = {
  targetHtmlId: "",
  tooltipProps: {},
  contentComponent: "",
  contentComponentProps: {}
};

export default Tooltip;
