import * as actionTypes from './actionTypes';

export const rowsSelected = (ids) => {
	return {
		type: actionTypes.ROWS_SELECTED, 
		selected: ids, 
	}
}

export const rowsDeselected = (ids) => {
	return {
		type: actionTypes.ROWS_DESELECTED, 
		deselected: ids, 
	}
}

export const globalDeselected = () => {
	return {
		type: actionTypes.GLOBAL_DESELECTED
	}
}

export const selectRows = (ids) => {
	return dispatch => {
		console.log("selectRows", ids);
		dispatch(rowsSelected(ids));
	}
}

export const deselectRows = (ids) => {
	return dispatch => {
		console.log("deselectRows", ids);
		dispatch(rowsDeselected(ids));
	}
}

export const deselectGlobal = () => {
	return dispatch => {
		console.log("deselectGlobal");
		dispatch(globalDeselected());
	}
}
