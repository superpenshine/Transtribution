import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';
import './footer.css';

import Overlay from './overlay';
import FileUploader from './fileUploader';
import MailSender from './mailSender'

import Icon from 'react-web-vector-icons';

class Footer extends Component {

	state = {
		'displayUploader': false, 
		'displaySendMail': false, 
	};

    toggleUploadOverlay = () => {
        this.setState(prevState => ({
        	'displayUploader': !prevState.displayUploader
        }));
    };

    toggleSendMailOverlay = () => {
        this.setState(prevState => ({
        	'displaySendMail': !prevState.displaySendMail
        }));
    };

	render() {
		let isAdmin = this.props.isAdmin;
		let isAuthenticated = this.props.isAuthenticated;
		return (
			<React.Fragment>
		        <footer className="footer">
		        	<div className="container-footer">
		        		<div className="d-flex flex-wrap">
		        			{ this.props.isAuthenticated ? 
		        				<React.Fragment>
			            			<div className="p-2">
			            				<span style={{ "verticalAlign":"middle" }}>
				            				<font className='text-light'>{`${ isAdmin ? '管理员' : '学生' } ${ this.props.user }已登录`}</font>
			            				</span>
			            			</div>
			            			<div className="d-flex">
				            			<div className="p-2">
					            			<button className="btn btn-light btn-sm" onClick={ this.props.onLogout } tabIndex='1'>退出</button>
					            		</div> 
					            		{ isAdmin ? 
						            		<div className="p-2">
						            			<button className="btn btn-light btn-sm" onClick={ this.toggleUploadOverlay } tabIndex='2'>上传</button>
						            		</div> : null
					            		}
					            		<div className="p-2">
					            			<button className="btn btn-light btn-sm" onClick={ this.toggleSendMailOverlay } tabIndex='3'>发送</button>
					            		</div>
				            		</div>
			            		</React.Fragment> : null
			            	}
		            		
		            		<div className="ml-auto p-2">
			            		<span style={{"verticalAlign":"middle"}} className="pr-2 text-light">
				            		Copyright © 2020 Haotian Shen. All rights reserved.
	                                <div className="iconWrap pl-2" style={{display: "inline-block"}}>
				            			<Icon name='wechat'
			                                  font='AntDesign'
			                                  color="#f8f9fa"
			                                  size={25}/>
	                                </div>
				            	</span>
		            		</div>
		            	</div>
		        	</div>
		        </footer>
	        	{isAdmin && this.state.displayUploader ? 
					<Overlay><FileUploader onCancel={ this.toggleUploadOverlay }/></Overlay> : null
	        	}
	        	{isAuthenticated && this.state.displaySendMail ? 
        			<Overlay><MailSender onCancel={ this.toggleSendMailOverlay }/></Overlay> : null
		        }
			</React.Fragment>
		)
	}
}

function mapStateToProps(state) {
	return {
		isAuthenticated: state.token !== null, 
		user: state.user, 
		isAdmin: state.isStaff, 
		loading: state.loading,
	}
}

function mapDispatchToProps(dispatch) {
	return {
		onLogout: () => dispatch(actions.logout())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
