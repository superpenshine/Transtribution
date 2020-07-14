import React, { Component } from 'react';
import './overlay.css';

import FileUploader from './fileUploader';

class Overlay extends Component {

	componentDidMount() {
		document.getElementById('overlay').focus();
	}

    render() {
        return (
            <div id="overlay" tabIndex="-1">
                <div className="overlay-content"> 
                	{this.props.children}
                </div>
            </div>
    )}
}

export default Overlay;



