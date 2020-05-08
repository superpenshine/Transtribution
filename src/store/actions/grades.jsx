import * as actionTypes from './actionTypes';
import axios from 'axios';

export const fetchGradeStart = () => {
    return {
        type: actionTypes.GRADES_FETCH_START
    }
}

export const fetchGradeSuccess = (data) => {
    return {
        type: actionTypes.GRADES_FETCH_SUCCESS, 
        ...data
    }
}

export const fetchGrades = () => {
    
    return dispatch => {
        dispatch(fetchGradeStart());
        const token = localStorage.getItem('token')
        axios.get(
            '/api/?', 
            {headers: 
                { Authorization: `Token ${ token }` }})
        .then(
            res => {
                dispatch(fetchGradeSuccess(res.data));
            }
        )
        .catch(
            err => {
                console.log(err);
            }
        );
    }
}
