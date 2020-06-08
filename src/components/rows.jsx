
import React, { Component } from 'react';
import * as actions from '../store/actions/sort';
import Row from './row';
import Pagination from './pagination';
import { connect } from 'react-redux';
import './rows.css';

const cols = {'学科':'subject', '考试':'test', '分数':'score', 
			'平均分':'avg', '最高分':'max', '最低分':'min', 
			'及格人数/考试人数':['pass_num', 'count'], 
			'排名/考试人数':['rank', 'count']}

const cols_admin = {'姓名':'name', '学科':'subject', '考试':'test', 
					'分数':'score'}

class Rows extends Component {
	state = {
			 currentPage: 1, 
			 selectedAll: false
			 };

	// Get current grade page
	getCurrentDisplayRows = () => {
		const indexOfLastRow = this.state.currentPage * this.props.rowsPerPage;
		const indexOfFirstRow = indexOfLastRow - this.props.rowsPerPage;
		return this.props.data.slice(indexOfFirstRow, indexOfLastRow);
	};

	// Get database entries ids
	getRowIds () {
		return this.getCurrentDisplayRows().map(row => row.id);
	};


	// Select all checkbox handler
	toggleSelectAll = (id) => {
		const selectedAll = !this.state.selectedAll;
		const ids = this.getRowIds();
		selectedAll ? this.props.onSelectAll(ids) : this.props.onDeSelectAll(ids);
		this.setState({ selectedAll });
	};

	// Change Page
	paginate = currentPage => {
		this.setState({ currentPage, selectedAll: false });
	};

	// Handle Table sort click
	handleSortClick = key => {
		this.props.sortGrade(key);
	};

	render() {

	    return (
	    		<div>
					<table className="table table-striped">
						<thead style={{'fontWeight':600}}>
							<tr>
								{ Object.entries(this.props.isAdmin ? cols_admin : cols).map(([key, val], i) => 
									<th className="fadeInOnHover" 
										onClick = { () => this.handleSortClick(val)} 
										scope='col' 
										key={ i }>{ key }
									</th>)
								}
								<th><input type='checkbox' 
										onChange={ this.toggleSelectAll }	
										checked={ this.state.selectedAll } 
										tabIndex={ -1 }></input>
								</th>
							</tr>
						</thead>
						<tbody>
							{ this.getCurrentDisplayRows().map(grade => 
								<Row key={ grade.id }
									 grade={ grade }
									 onSelectClick={ this.props.onSelectClick }
									 id={ grade.id }
									 isAdmin={ this.props.isAdmin }
									 checked={ this.props.selected.includes(grade.id) }>
								</Row>)
							}
						</tbody>
					</table>
	                <Pagination numPages={ Math.ceil(this.props.data.length / this.props.rowsPerPage) }
	                			paginate={ this.paginate }
	                			currentPage={ this.state.currentPage }>
	                </Pagination>
	            </div>
	    );

    };
}

const mapStateToProps = (state) => {
	return {
		isAdmin: state.isStaff, 
		token: state.token, 
		data: state.grades, 
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		sortGrade: (sort_key) => dispatch(actions.sortGrade(sort_key)), 
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(Rows);


