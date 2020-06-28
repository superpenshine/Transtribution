import React, { Component } from 'react';
import './checkLabel.css';

class Checklabel extends Component {
    render() {
        return (
            <label className="checkLabel-container">
                <input tabIndex="-1" type="checkbox" checked={ this.props.checked } onChange={ () => this.props.handleChange() }/>
                <span className="checkmark"/>
            </label>
        );
    }
}

export default Checklabel;