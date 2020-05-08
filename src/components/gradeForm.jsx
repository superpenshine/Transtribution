import React, { Component } from 'react';
import Rows from './rows'
import StatusBar from './statusBar'
import * as actions from '../store/actions/grades';
import { connect } from 'react-redux';

class GradeForm extends Component {
    state = {
        selected: [], 
        rowsPerPage: 10, 
    };

    componentDidMount() {
        this.props.autoFetchGrades();
    };

    // Single row checkbox handler
    handleSelectClick = id => {
        console.log(id)
        let selected = [...this.state.selected];
        if (!selected.includes(id)) {
            selected.push(id);
        } else {
            selected = selected.filter(_id => _id !== id);
        }
        this.setState({ selected });
    };

    // Select all checkbox handler
    handleSelectAll = ids => {
        console.log('selected all');
        let selected = [...this.state.selected];
        ids.forEach((id) => {
            if (!selected.includes(id)) {
                selected.push(id);
            }
        });
        this.setState({ selected });
    };

    // Select all checkbox handler (remove all)
    handleDeselectAll = ids => {
        console.log('deselected all');
        let selected = this.state.selected;
        ids.forEach((id) => {
            if (selected.includes(id)) {
                selected = selected.filter(_id => _id !== id);
            }
        });
        this.setState({ selected });
    };

    render() {
        // Spinner
        if (this.props.loading) {
            return (
                    <div className="h-100 d-flex">
                        <div className="spinner-border text-dark" role="status" style={{'width': '3rem', 'height': '3rem', margin: 'auto'}}>
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
            );
        }
        
        return (
            <React.Fragment>
                <StatusBar totalGradeNum={this.state.selected.length}/>
                <Rows onSelectClick={ this.handleSelectClick }
                      onSelectAll={ this.handleSelectAll }
                      onDeSelectAll={ this.handleDeselectAll }
                      selected={ this.state.selected } 
                      rowsPerPage={ this.state.rowsPerPage }
                />
            </React.Fragment>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        loading: state.loading, 
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        autoFetchGrades: () => dispatch(actions.fetchGrades()), 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GradeForm);
