
import React, { Component } from 'react';
import Row from './row';
import Pagination from './pagination';
import { connect } from 'react-redux';

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
	}

	// Get database entries ids
	getRowIds () {
		return this.getCurrentDisplayRows().map(row => row.id);
	}

	// [...Array(ids.length).keys()]

	// Select all checkbox handler
	toggleSelectAll = (id) => {
		const selectedAll = !this.state.selectedAll;
		const ids = this.getRowIds();
		selectedAll ? this.props.onSelectAll(ids) : this.props.onDeSelectAll(ids);
		this.setState({ selectedAll });
	}

	// Change Page
	paginate = currentPage => {
		this.setState({ currentPage, selectedAll: false });
	}

	getCols = () => {
		const cols = ['学科', '考试', '分数', '平均分', '最高分', '最低分', '及格人数/考试人数', '排名/考试人数'];
		const cols_admin = ['姓名', '学科', '考试', '分数', <input type='checkbox' 
													  onChange={ this.toggleSelectAll }	
													  checked={ this.state.selectedAll }
													  tabIndex={ -1 }></input>];
		return this.props.isAdmin ? cols_admin : cols;
	}

	render() {

	    return (
	    		<div>
					<table className="table table-striped" style={{'fontWeight':600}}>
						<thead>
							<tr>
								{ this.getCols().map(colum => <th scope='col' key={ colum }>{ colum }</th>) }
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
								</Row>
								)
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
}

export default connect(mapStateToProps)(Rows);


