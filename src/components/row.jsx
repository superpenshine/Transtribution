
import React, { Component } from 'react';
import CheckLabel from './checkLabel';
import './row.css';
import classNames from 'classnames';

class Row extends Component {
                // <td><input type="checkbox" 
                //            onChange={ () => this.props.onSelectClick(this.props.id) } 
                //            checked={ this.props.checked }
                //            tabIndex={ -1 }></input></td>
    state = {
             show_panel: false, 
            };

    // Hide/show hidden panel
    togglePanel = () => {
        this.setState(prevState => ({
            show_panel: !prevState.show_panel
        }));
    };

    // Take value(s) out of grade data as text 
    getDataString = val => {
        if (typeof(val) == 'string') {
            return this.props.grade[val];
        };
        let values = [];
        val.forEach(v => 
            values.push(this.props.grade[v])
        )
        return values.join('/');
    };

    render() {
        let panelClass = classNames({
            'panelCommon': true, 
            'panel_show': this.state.show_panel, 
            'panel': !this.state.show_panel, 
        });

        return (
            <React.Fragment>
                <tr onClick={ this.togglePanel }>
                    { Object.entries(this.props.attr_show).map(([key, val], i) => 
                        <td key={ i }>{ this.props.grade[val] }</td>
                    )}
                    <td><CheckLabel handleChange={ () => this.props.onSelectClick(this.props.id) }
                                    checked={ this.props.checked }/>
                    </td>
                </tr>
                    { !this.props.attr_hidden ? null :
                        <tr className={ panelClass }>
                            <td colSpan="100%">
                                <div className="panelInner">
                                    <div className="chartDiv"></div>
                                    <div className="attrDiv">
                                        { Object.entries(this.props.attr_hidden).map(([key, val], i) => 
                                            <div className="attrItemDiv"
                                                 key={ i }>
                                                { key } { this.getDataString(val) }
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </td>
                        </tr>
                    }
            </React.Fragment>
        );

    };

}

export default Row;

