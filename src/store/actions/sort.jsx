import * as actionTypes from './actionTypes';

export const sortGradeWithKey = sort_key => {
	return {
		type: actionTypes.SORTGRADE, 
		sort_key: sort_key
	}
}

export const sortGrade = (sort_key) => {
	return dispatch => {
		dispatch(sortGradeWithKey(sort_key))
	}

	// dispatch({type: actionTypes.SORTGRADE, sort_key: sort_key})
}
