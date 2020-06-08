import React, { Component } from 'react';
import * as uploadActions from '../store/actions/upload';
import * as selectFileActions from '../store/actions/selectFile';
import './fileUploader.css';
import { connect } from 'react-redux';

class FileUploader extends Component {

    //         const err = <font color='#d6094a' style={{fontWeight: 800}}>请先选择文件</font>;

    labelColor = () => {
        let style = null;
        if (this.props.fileName) {
            style = this.props.uploadSuccess ? {background: 'green'} : {background: 'red'};
        }
        return style;
    }

    listErrors = () => {
        console.log(this.props.err_msgs)
        console.log(typeof(this.props.err_msgs))
        return this.props.err_msgs.map((err, index) => (
            <div key={ index }>{ index + 1 }. { err.name }</div>
        ));
    }

    render(){
        return(
            <React.Fragment>
                <div className="p-2"> 
                    <input name="file" 
                           type="file" 
                           accept=".xlsx, .xls, .csv, .txt" 
                           className="inputfile" 
                           id='customFile'
                           onChange={ (e) => this.props.handelFileSelect(e) }
                           tabIndex="-1"></input>
                    <label htmlFor="customFile" className="pl-3" style={ this.labelColor() }>
                        { this.props.fileName ? this.props.fileName : '选择文件' }
                    </label>
                </div>
                { this.props.err_msgs ? 
                    <div className='d-flex pl-2'>
                        <div>
                        <font color='#d6094a' style={{fontWeight: 800}}>
                            <div>上传失败</div>
                            <div>错误日志：</div>
                            { this.listErrors() }
                        </font>
                        </div>
                    </div> : null
                }
                <div className='d-flex p-2 flex-wrap'>
                    <div>
                        
                    <button className='btn btn-light' tabIndex="2" onClick={ () => this.props.handelFileSubmit(this.props.file) }>上传</button>
                    </div>
                    <div className="ml-auto">
                        <button className='btn btn-light' onClick={ this.props.onCancel }  tabIndex="3">取消</button>
                    </div>
                </div>
            </React.Fragment>
        )
    }   
}

const mapStateToProps = (state) => {
    return {
        file: state.selectedFile, 
        fileName: state.selectedFileName, 
        uploading: state.uploading, 
        err_msgs: state.errorArr, 
        uploadSuccess: state.uploadSuccess, 
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handelFileSubmit: (data) => dispatch(uploadActions.uploadGrades(data)), 
        handelFileSelect: (e) => dispatch(selectFileActions.selectFile(e)), 
        handelFileDeSelect: (e) => dispatch(selectFileActions.deselectFile(e)), 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FileUploader);


