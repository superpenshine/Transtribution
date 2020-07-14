
import React, { Component } from 'react';
import * as sortActions from '../store/actions/sort';
import * as selectRowActions from '../store/actions/selectRow';
import Row from './row';
import CheckLabel from './checkLabel';
import CrossLabel from './crossLabel';
import Pagination from './pagination';
import { connect } from 'react-redux';
import './rows.css';
import Icon from 'react-web-vector-icons';

const cols = {'学科':'subject', ' 考试':'test', '分数':'score'};
const cols_width = ['25%', '25%', '30%'];

const attr_hidden = {'平均分':'avg', '最高分':'max', '最低分':'min', 
            '及格人数/考试人数':['pass_num', 'count'], 
            '排名/考试人数':['rank', 'count']};

const cols_admin = {'姓名':'student_name', '学科':'subject', '考试':'test', 
                    '分数':'score'};
const cols_width_admin = ['22.5%', '22.5%', '22.5%', '22.5%'];

class Rows extends Component {
    state = {
             currentPage: 1, 
             selectedAll: false
             };

    // Deselect all rows
    handleClearSelect = () => {
        this.props.globalDeselect();
        this.setState({ selectedAll: false});
    };

    toggleRowSelect = (id) => {
        this.props.selected.includes(id) ? this.props.deselectRows([id]) : this.props.selectRows([id]);
    };

    // Get database entries ids
    getRowIds () {
        return this.getCurrentDisplayRows().map(row => row.id);
    };

    // Get current grade page
    getCurrentDisplayRows = () => {
        const indexOfLastRow = this.state.currentPage * this.props.rowsPerPage;
        const indexOfFirstRow = indexOfLastRow - this.props.rowsPerPage;
        return this.props.data.slice(indexOfFirstRow, indexOfLastRow);
    };

    // Select all rows in current page
    toggleSelectAll = () => {
        const selectedAll = !this.state.selectedAll;
        const ids = this.getRowIds();
        selectedAll ? this.props.selectRows(ids) : this.props.deselectRows(ids);
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
        let isAdmin = this.props.isAdmin;

        return (
                <div>
                    <table className="table table-striped">
                        <thead style={{'fontWeight':600}}>
                            <tr>
                                { Object.entries(isAdmin ? cols_admin : cols).map(([key, val], i) => 
                                    <th className="fadeInOnHover" 
                                        style={{"width": isAdmin ? cols_width_admin[i] : cols_width[i]}}
                                        onClick = { () => this.handleSortClick(val)} 
                                        scope='col' 
                                        key={ i }>
                                        { key }
                                    </th>)
                                }
                                <th>
                                    <div className="d-flex flex-wrap colIconDiv">
                                        <div className="pr-2">
                                            <CheckLabel handleChange={ this.toggleSelectAll }
                                                        checked={ this.state.selectedAll }
                                                        tabIndex={ -1 }/>
                                        </div>
                                        <div>
                                            <CrossLabel onClick={ this.handleClearSelect }
                                                        checked={ true }/>
                                        </div>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            { this.getCurrentDisplayRows().map(grade => 
                                <Row key={ grade.id }
                                     onRowSelect={ this.toggleRowSelect }
                                     id={ grade.id }
                                     checked={ this.props.selected.includes(grade.id) }
                                     grade={ grade }
                                     attr_show={ isAdmin ? cols_admin : cols }
                                     attr_hidden={ isAdmin ? null : attr_hidden }>
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
        selected: state.selected, 
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        sortGrade: (sort_key) => dispatch(sortActions.sortGrade(sort_key)), 
        selectRows: (ids) => dispatch(selectRowActions.selectRows(ids)), 
        deselectRows: (ids) => dispatch(selectRowActions.deselectRows(ids)), 
        globalDeselect: () => dispatch(selectRowActions.deselectGlobal()), 
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Rows);


