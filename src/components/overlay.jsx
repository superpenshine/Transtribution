import React, { Component } from 'react';
import './overlay.css';

import FileUploader from './fileUploader';

class Overlay extends Component {

    render() {
        return (
            <div id="overlay">
                <div className="overlay-content"> 
                    <FileUploader onCancel={ this.props.onExpandOverlay }/>
                </div>
            </div>
    )}
}

export default Overlay;



