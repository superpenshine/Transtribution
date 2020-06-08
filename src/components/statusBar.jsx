
import React from 'react';

const StatusBar = ({ totalGradeNum }) => {

		// Conditional render
		const text = totalGradeNum !== 0 ? `已选中 ${ totalGradeNum } 条` : `未选中`;

        return (
        	<div style={{"paddingLeft": "0.75rem", 
        				"paddingTop": "0.25rem", 
        				"paddingBottom": "0.25rem", }}>{ text }</div>
        );
}

export default StatusBar;
