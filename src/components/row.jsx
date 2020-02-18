
import React, { Component } from 'react';

class Row extends Component {

	render() {
    	const {subject, test, score} = this.props.grade;
	    return (
			<tr>
				<td>{ subject }</td>
				<td>{ test }</td>
				<td>{ score }</td>
				<td><input type="checkbox" 
						   onChange={ () => this.props.onSelectClick(this.props.id) } 
						   checked={ this.props.checked }
						   tabIndex={ -1 }></input></td>
			</tr>
	    );

    };

}

export default Row;

