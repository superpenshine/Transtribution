import React, { Component } from 'react';
import * as sendMailActions from '../store/actions/sendMail';
import './mailSender.css';
import { connect } from 'react-redux';

class MailSender extends Component {

	handleSendClick = e => {
		e.preventDefault();
		this.props.handelEmailSendConfirm(e.target.mailAddresses.value);
	}

    displayMsg = () => {
        if (this.props.sendSuccess) {
            return <div className='d-flex pl-2'><div><font color="#12d03d" style={{fontWeight: 800}}>发送成功</font></div></div>;
        }
        else if (this.props.msg) {
            return <div className='d-flex pl-2'><div><font color='#d6094a' style={{fontWeight: 800}}>{ this.props.msg }</font></div></div>;
        }
        return null;
    }

	render(){
		return (
			<form onSubmit={ e => this.handleSendClick(e) }>
                <div className="p-2"> 
                    <input name="mailAddresses" 
                           type="text" 
                           className="inputemail pl-3" 
                           tabIndex="4"
						   placeholder={ this.props.fileName ? this.props.fileName : 'aaa@qq.com bbb@163.com' }
						   spellCheck="false">
                    </input>
                </div>
                { this.displayMsg() }
                <div className='d-flex p-2 flex-wrap'>
                    <div>
                        
                    <button className='btn btn-light' tabIndex="5" type="submit">发送</button>
                    </div>
                    <div className="ml-auto">
                        <button className='btn btn-light' onClick={ this.props.onCancel }  tabIndex="6" type="button">取消</button>
                    </div>
                </div>
            </form>
		)
	}
}

const mapStateToProps = (state) => {
    return {
        msg: state.msg, 
        sendSuccess: state.sendMailSuccess, 
        loading: state.loading, 
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handelEmailSendConfirm: (addr) => dispatch(sendMailActions.sendMail(addr)), 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MailSender);
