import * as actionTypes from './actionTypes';
import axios from 'axios';

export const sendMailStart = () => {
	return {
		type: actionTypes.SENDMAIL_START, 
	}
}

export const sendMailSuccess = () => {
	return {
		type: actionTypes.SENDMAIL_SUCCESS, 
	}
}

export const sendMailFail = (err) => {
	return {
		type: actionTypes.SENDMAIL_FAIL, 
		error: err, 
	}
}

const emailRE = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

const checkAddress = (addrStr) => {
	var addresses = addrStr.split(/[\s,，;；|]+/);
	var validAddr = [];
	addresses.forEach((addr) => {
		if (emailRE.test(addr)) {
			validAddr.push(addr);
		}
	});
	if (addresses.length != validAddr.length) {
		return false;
	}
	return validAddr;
}

export const sendMail = (addr) => {
	return (dispatch, getState) => {
		const validAddr = checkAddress(addr);
		const ids = getState().selected;
		if (!validAddr) {
			dispatch(sendMailFail("邮箱格式错误"));
			return;
		}
		else if (ids.length == 0) {
			dispatch(sendMailFail("请至少勾选一条成绩"));
			return;
		}
		dispatch(sendMailStart())
		const token = localStorage.getItem('token');
        axios.post(
            '/api/sendReport/', 
            {'addresses': validAddr, 'ids': ids}, 
            {headers: { Authorization: `Token ${ token }`, 
        				'Content-Type': 'application/json'}})
        .then(
            res => {
                dispatch(sendMailSuccess());
            }
        )
        .catch(
            err =>{
                console.log(err.response.data.errMsg);
                dispatch(sendMailFail(err.response.data.errMsg));
            }
        )
	}
}