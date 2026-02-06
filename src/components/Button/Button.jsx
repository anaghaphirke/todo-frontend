import React from 'react';

const StartButton = ({ btnClass, btnValue, btnOnClick,btnType}) => {
	return (
		<>
			<button className={btnClass} onClick={btnOnClick} type={btnType}>
				{btnValue}
			</button>
		</>
	);
};

export default StartButton;
