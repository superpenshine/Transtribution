import React, { Component } from 'react';
import './panelIndicator.css'

class PanelIndicator extends Component {

	getSpanClass = () => {
		return this.props.hide ? "panelIndicatorSpan" : "panelIndicatorSpan show"
	}

	render() {
		return (
			<span className={this.getSpanClass()}></span>
		)
	}
}

export default PanelIndicator;
