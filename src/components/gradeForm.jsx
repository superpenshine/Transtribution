import React, { Component } from 'react';
import Rows from './rows'
import StatusBar from './statusBar'
import * as actions from '../store/actions/grades';
import { connect } from 'react-redux';

class GradeForm extends Component {
    state = {
        rowsPerPage: 10, 
    };

    componentDidMount() {
        this.props.autoFetchGrades();
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
                <StatusBar/>
                <Rows selected={ this.state.selected } 
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
