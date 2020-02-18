import * as actionTypes from './actionTypes';
import axios from 'axios';

export const fetchGradeStart = () => {
    return {
        type: actionTypes.GRADES_FETCH_SUCCESS
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
                let data = res.data;    
                const grades = [{id: 1, 
                                subject: '数学', 
                                test: '第一单元测验',
                                score: 94}, 
                                {id: 2, 
                                subject: '数学', 
                                test: '第二单元测验',
                                score: 89}, 
                                {id: 3, 
                                subject: '语文', 
                                test: '第一单元测验',
                                score: 98}, 
                                {id: 4, 
                                subject: '语文', 
                                test: '第二单元测验',
                                score: 94}, 
                                {id: 5, 
                                subject: '语文', 
                                test: '第三单元测验',
                                score: 89}, 
                                {id: 6, 
                                subject: '语文', 
                                test: '第四单元测验',
                                score: 98}, 
                                {id: 7, 
                                subject: '语文', 
                                test: '期末考试',
                                score: 98}, 
                                {id: 8, 
                                subject: '数学', 
                                test: '第一单元测验',
                                score: 94}, 
                                {id: 9, 
                                subject: '数学', 
                                test: '第二单元测验',
                                score: 89}, 
                                {id: 10, 
                                subject: '语文', 
                                test: '第一单元测验',
                                score: 98}, 
                                {id: 11, 
                                subject: '语文', 
                                test: '第二单元测验',
                                score: 94}, 
                                {id: 12, 
                                subject: '语文', 
                                test: '第三单元测验',
                                score: 89}, 
                                {id: 13, 
                                subject: '语文', 
                                test: '第四单元测验',
                                score: 98}, 
                                {id: 14, 
                                subject: '语文', 
                                test: '期末考试',
                                score: 98}];
                // Use dummy data to test pagination
                // data.grades = grades;
                // data.grades = [];
                dispatch(fetchGradeSuccess(data));
            }
        )
        .catch(
            err => {
                console.log(err);
            }
        );
    }
}
