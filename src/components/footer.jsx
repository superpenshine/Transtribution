import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';
import './footer.css';

import Overlay from './overlay';

class Footer extends Component {

    toggleUploadOverlay = () => {
        let overlay = document.getElementById("overlay");
        overlay.style.display = overlay.style.display === '' ? 'block' : '';
    }

	render() {
		return (
			<React.Fragment>
		        <footer className="footer">
		        	<div className="container-footer">
		        		<div className="d-flex flex-wrap">

		        			{ this.props.isAuthenticated ? 
		        				<React.Fragment>
			            			<div className="p-2">
			            				<font className='text-light'>{`${ this.props.isAdmin ? '管理员' : '学生' } ${ this.props.user }已登录`}</font>
			            			</div>
			            			<div className="p-2">
				            			<button className="btn btn-light btn-sm" onClick={ this.props.onLogout } tabIndex='1'>退出</button>
				            		</div> 
				            		{ this.props.isAdmin ? 
					            		<div className="p-2">
					            			<button className="btn btn-light btn-sm" onClick={ this.toggleUploadOverlay } tabIndex='2'>上传</button>
					            		</div> : null
				            		}
			            		</React.Fragment> : null
			            	}
		            		
		            		<div className="ml-auto p-2">
			            		<font className='text-light'>Copyright © 2020 Haotian Shen. All rights reserved.</font>
		            		</div>
		            	</div>
		        	</div>
		        </footer>
		        <Overlay onExpandOverlay={ this.toggleUploadOverlay } />
			</React.Fragment>
		)
	}
}

function mapStateToProps(state) {
	return {
		isAuthenticated: state.token !== null, 
		user: state.user, 
		isAdmin: state.isStaff, 
	}
}

function mapDispatchToProps(dispatch) {
	return {
		onLogout: () => dispatch(actions.logout())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
