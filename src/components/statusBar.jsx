import React from 'react';
import { connect } from 'react-redux';

const StatusBar = (props) => {
		let n_sel = props.selected.length;
		const text = n_sel !== 0 ? `已选中 ${ n_sel } 条` : `未选中`;

        return (
        	<div style={{"paddingLeft": "0.75rem", 
        				"paddingTop": "0.25rem", 
        				"paddingBottom": "0.25rem", }}>
				{ text }
			</div>
        );
}

const mapStateToProps = (state) => {
    return {
        selected: state.selected, 
    }
};

export default connect(mapStateToProps, null)(StatusBar);
