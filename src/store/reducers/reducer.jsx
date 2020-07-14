import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    token: null, 
    user: null, 
    grades: [], 
    className: null, 
    studentId: null, 
    isStaff: false, 
    msg: '请登陆后查看成绩',
    errorArr: null, // errorArr: multiple err msg
    loading: false, 
    uploadSuccess: false, 
    selectedFile: null, 
    selectedFileName: null, 
    sortKey: null, 
    sortOrder: -1, // sortOder: 1: asceding, -1: desceding
    sendMailSuccess: false, 
    selected: [], // selected grade record ids
}

const authStart = (state, action) => {
    return updateObject(state, {
        msg: null, 
        loading: true
    });
}

const authSuccess = (state, action) => {
    return updateObject(state, {
        user: action.user, 
        token: action.token, 
        msg: null, 
        loading: false, 
    });
}

const authFail = (state, action) => {
    return updateObject(state, {
        msg: action.error, 
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
        loading: true, 
        errorArr: null, 
    });
}

const updateGradeSuccess = (state, action) => {
    return updateObject(state, {
        loading: false, 
        uploadSuccess: true, 
    });
}

const updateGradeFail = (state, action) => {
    return updateObject(state, {
        errorArr: action.error, 
        loading: false, 
        uploadSuccess: false,
    });
}

const fileSelected = (state, action) => {
    return updateObject(state, {
        selectedFileName: action.fileName, 
        selectedFile: action.file, 
        msg: null, 
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
        msg: action.error, 
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

const sendMailStart = (state, action) => {
    return updateObject(state, {
        msg: null, 
        sendMailSuccess: false, 
    });
}

const sendMailSuccess = (state, action) => {
    return updateObject(state, {
        sendMailSuccess: true, 
    });
}

const sendMailFail = (state, action) => {
    return updateObject(state, {
        msg: action.error, 
        sendMailSuccess: false, 
    });
}

const rowsSelected = (state, action) => {
    let selected = [...state.selected, ...action.selected];
    return updateObject(state, {
        selected, 
    });
}

const rowsDeselected = (state, action) => {
    let selected = state.selected;
    action.deselected.forEach((id) => {
        if (selected.includes(id)) {
            selected = selected.filter(_id => _id !== id);
        }
    });
    return updateObject(state, {
        selected, 
    });
}

const globalDeselected = (state, action) => {
    return updateObject(state, {
        selected: [], 
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
        case actionTypes.SENDMAIL_START: return sendMailStart(state, action);
        case actionTypes.SENDMAIL_SUCCESS: return sendMailSuccess(state, action);
        case actionTypes.SENDMAIL_FAIL: return sendMailFail(state, action);
        case actionTypes.ROWS_SELECTED: return rowsSelected(state, action);
        case actionTypes.ROWS_DESELECTED: return rowsDeselected(state, action);
        case actionTypes.GLOBAL_DESELECTED: return globalDeselected(state, action);
        default:
            return state;
    }
}

export default reducer;
