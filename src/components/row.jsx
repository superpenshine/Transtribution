
import React, { Component } from 'react';

class Row extends Component {

	render() {
    	const {subject, test, score, name, avg, max, min, pass_num, rank, count} = this.props.grade;
	    return (
			<tr>
				{ this.props.isAdmin ? <td>{ name.name }</td> : null }
				<td>{ subject }</td>
				<td>{ test }</td>
				<td>{ score }</td>
				{ this.props.isAdmin ? null : <td>{ avg }</td>}
				{ this.props.isAdmin ? null : <td>{ max }</td>}
				{ this.props.isAdmin ? null : <td>{ min }</td>}
				{ this.props.isAdmin ? null : <td>{ pass_num }/{ count }</td>}
				{ this.props.isAdmin ? null : <td>{ rank }/{ count }</td>}
				<td><input type="checkbox" 
						   onChange={ () => this.props.onSelectClick(this.props.id) } 
						   checked={ this.props.checked }
						   tabIndex={ -1 }></input></td>
			</tr>
	    );

    };

}

export default Row;

