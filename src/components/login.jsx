
import React, { Component } from 'react';
import './login.css';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';

class LoginForm extends Component {

    handelLoginClick = e => {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;
        this.props.onAuth(username, password);
    }

    render() {
        return (
                <div className="d-flex h-100">
                    <form className="login-form" onSubmit={ e => this.handelLoginClick(e) }>
                        <div className="form-group row">
                            <label htmlFor="username" className="col-sm-3 col-form-label">姓名</label>
                            <div className="col-sm-9">
                                <input name="username" type="text" className="form-control login-input" id="username" tabIndex="1"></input>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="password" className="col-sm-3 col-form-label">密码</label>
                            <div className="col-sm-9">
                                <input name="password" className="form-control login-input" id="password" placeholder="学生身份证号后四位" type='password' tabIndex="2"></input>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-3"></div>
                            <div className="col-sm-9">
                                <p>{ this.props.msg }</p>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-sm-3"></div>
                            <div className="col-sm-9">
                                <button className="btn btn-dark" tabIndex="3" type='submit'>登陆</button>
                            </div>
                        </div>
                    </form>
                </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.loading, 
        msg: state.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (usr, pwd) => dispatch(actions.authLogin(usr, pwd)), 
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
