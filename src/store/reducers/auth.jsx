import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';


// sortOder: 1: asceding, -1: desceding
const initialState = {
    token: null, 
    user: null, 
    grades: [], 
    className: null, 
    studentId: null, 
    isStaff: false, 
    error: '请登陆后查看成绩', 
    errorArr: null, 
    loading: false, 
    uploading: false, 
    uploadSuccess: false, 
    selectedFile: null, 
    selectedFileName: null, 
    sortKey: null, 
    sortOrder: -1, 
}

const authStart = (state, action) => {
    return updateObject(state, {
        error: null, 
        loading: true
    });
}

const authSuccess = (state, action) => {
    return updateObject(state, {
        user: action.user, 
        token: action.token, 
        error: null, 
        // loading: false
    });
}

const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error, 
        loading: false
    });
}

// Reset most states to initial
const authLogout = (state, action) => {
    return updateObject(state, initialState);
}

const fetchGradeStart = (state, action) => {
    return updateObject(state, {
        loading: true
    });
}

const fetchGradeSuccess = (state, action) => {
    return updateObject(state, {
        loading: false, 
        ...action
    });
}


const updateGradeStart = (state, action) => {
    return updateObject(state, {
        uploading: true, 
        errorArr: null, 
    });
}
const updateGradeSuccess = (state, action) => {
    return updateObject(state, {
        uploading: false, 
        uploadSuccess: true, 
    });
}
const updateGradeFail = (state, action) => {
    return updateObject(state, {
        errorArr: action.error, 
        uploading: false, 
        uploadSuccess: false,
    });
}


const fileSelected = (state, action) => {
    return updateObject(state, {
        selectedFileName: action.fileName, 
        selectedFile: action.file, 
        error: null, 
        uploadSuccess: false, 
    });
}
const fileDeSelected = (state, action) => {
    return updateObject(state, {
        selectedFileName: null, 
        selectedFile: null, 
        uploadSuccess: false, 
    });
}
const fileSelectError = (state, action) => {
    return updateObject(state, {
        error: action.error, 
    })
}

const sortGrade = (state, action) => {
    let sortKey = action.sort_key;
    // pass_num/count: ['pass_num', 'count'] not supported now
    let sortOrder = state.sortKey == sortKey ? -state.sortOrder : -1;
    return updateObject(state, {
        grades: [...state.grades.sort((a, b) => { 
                    if( a[sortKey] < b[sortKey] ) return sortOrder === 1 ? -1 : 1;
                    if( a[sortKey] > b[sortKey] ) return sortOrder === 1 ? 1: -1;
                    return 0;
                })], 
        sortOrder, 
        sortKey
    });
}

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.GRADES_FETCH_START: return fetchGradeStart(state, action);
        case actionTypes.GRADES_FETCH_SUCCESS: return fetchGradeSuccess(state, action);
        case actionTypes.GRADES_UPLOAD_START: return updateGradeStart(state, action);
        case actionTypes.GRADES_UPLOAD_SUCCESS: return updateGradeSuccess(state, action);
        case actionTypes.GRADES_UPLOAD_FAIL: return updateGradeFail(state, action);
        case actionTypes.FILESELECTED: return fileSelected(state, action);
        case actionTypes.FILEDESELECTED: return fileDeSelected(state, action);
        case actionTypes.FILESELECTERROR: return fileSelectError(state, action);
        case actionTypes.SORTGRADE: return sortGrade(state, action);
        default:
            return state;
    }
}

export default reducer;
