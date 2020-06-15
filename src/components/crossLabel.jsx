import React, { Component } from 'react';
import './crossLabel.css';

class CrossLabel extends Component {
    render() {
        return (
            <label className="crossLabel-container" onClick={ () => this.props.onClick() }>
                <input type="checkbox" defaultChecked={ true } disabled="disabled" />
                <span className="checkmarkCross"/>
            </label>
        );
    }
}

export default CrossLabel;