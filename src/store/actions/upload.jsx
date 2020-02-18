import * as actionTypes from './actionTypes';
import { selectFileFail } from './selectFile';
import axios from 'axios';

export const uploadGradesStart = () => {
    return {
        type: actionTypes.GRADES_UPLOAD_START
    }
}

// Similar to fetchGradesSuccess
export const uploadGradesSuccess = () => {
    return {
        type: actionTypes.GRADES_UPLOAD_SUCCESS
    }
}

export const uploadGradesFail = (err) => {
    return {
        type: actionTypes.GRADES_UPLOAD_FAIL, 
        error: err
    }
}

export const uploadGrades = (data) => {
    return dispatch => {
        if (data === null) {
            dispatch(selectFileFail('请先选择文件'));
            return 
        }
        dispatch(uploadGradesStart());
        const token = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('file', data);
        axios.post(
            '/api/createOrUpdate/', 
            formData, 
            {headers: { Authorization: `Token ${ token }` , 
                        'content-type': 'multipart/form-data'}}, 
            )
        .then(
            res => {
                let data = res.data; 
                dispatch(uploadGradesSuccess());
            }
        )
        .catch(
            err =>{
                console.log(err.response.data.errMsg);
                dispatch(uploadGradesFail(err.response.data.errMsg));
            }
        )
    }
}
