
import React, { Component } from 'react';
import * as actions from '../store/actions/sort';
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
const cols_width_admin = ['25%', '25%', '25%', '7%'];

class Rows extends Component {
    state = {
             currentPage: 1, 
             selectedAll: false, 
             vectorIconCol: 'rgb(52, 58, 64)'
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

    // Deselect all rows handler
    handleClearSelect = () => {
        this.props.onGlobalDeselect();
        this.setState({ selectedAll: false});
    }

    // Select all rows in current page handler
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

    handleIconHoverStart = () => {
        this.setState({vectorIconCol: '#656b71'})
    };

    handleIconHoverEnd = () => {
        this.setState({vectorIconCol: 'rgb(52, 58, 64)'})
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
                                <th><div className="d-flex flex-wrap colIconDiv">
                                        <div className="pr-2">
                                            <CheckLabel
                                                handleChange={ this.toggleSelectAll }
                                                checked={ this.state.selectedAll }
                                                tabIndex={ -1 }/>
                                        </div>
                                        <div className="iconWrap pr-2" 
                                            style={{"cursor": "pointer"}}
                                            onMouseEnter={ this.handleIconHoverStart }
                                            onMouseLeave={ this.handleIconHoverEnd }>
                                            <Icon 
                                                name='mail'
                                                font='MaterialIcons'
                                                color={ this.state.vectorIconCol }
                                                size={33}/>
                                        </div>
                                        <div>
                                            <CrossLabel 
                                                onClick={ this.handleClearSelect }
                                                handleChange={ this.globalDeselect }
                                                checked={ true }/>
                                        </div>
                                    </div></th>
                            </tr>
                        </thead>
                        <tbody>
                            { this.getCurrentDisplayRows().map(grade => 
                                <Row key={ grade.id }
                                     onSelectClick={ this.props.onSelectClick }
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
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        sortGrade: (sort_key) => dispatch(actions.sortGrade(sort_key)), 
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Rows);


