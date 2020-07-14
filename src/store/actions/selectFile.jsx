import * as actionTypes from './actionTypes';

export const fileSelected = (file, fileName) => {
	return {
		type: actionTypes.FILESELECTED, 
		fileName: fileName, 
		file: file, 
	}
}

export const fileDeselected = () => {
	return {
		type: actionTypes.FILEDESELECTED, 
	}
}

export const selectFileFail = (err) => {
	return {
		type: actionTypes.FILESELECTERROR, 
		error: err, 
	}
}


// Print text file content in console
// printFile = (file) => {
//     let fileReader = new FileReader();
//     fileReader.onloadend = (e) => {
//         console.log(fileReader.result);
//     }
//     fileReader.readAsText(file);
// }

export const selectFile = (e) => {
	return dispatch => {
		console.log(e.target.files.length);
		if (e.target.files.length > 0) {
			const file = e.target.files[0];
			const fileName = file.name.split("\\").pop();
	        const ext = fileName.split('.').pop();

			if (['xlsx'].includes(ext)) {
				dispatch(fileSelected(file, fileName));
			} else {
				dispatch(selectFileFail("文件需以.xlsx结尾"));
				dispatch(fileDeselected());
			}
		}
	}
}

export const deselectFile = (e) => {
	return dispatch => {
		dispatch(fileDeselected);
	}
}
 
