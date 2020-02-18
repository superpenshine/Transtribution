
import React from 'react';

const StatusBar = ({ totalGradeNum }) => {

		// Conditional render
		const text = totalGradeNum !== 0 ? `已选中 ${ totalGradeNum } 条` : `未选中`;

        return (
        	<div>{ text }</div>
        );
}

export default StatusBar;
