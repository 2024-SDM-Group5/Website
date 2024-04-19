import type { MouseEventHandler } from 'react';

import Image from 'next/image';

import lottery from './fluent_lottery-20-filled.png';

function LotteryFloatButton(onClick: Function) {
	return (
		<div
			onClick={onClick as MouseEventHandler}
			style={{
				width: '70px',
				height: '70px',
				position: 'absolute',
				right: 25,
				bottom: 76,
				backgroundColor: '#ffcc84',
				paddingTop: '11px',
				paddingLeft: '11px',
				borderRadius: '35px',
			}}
		>
			<Image src={lottery} alt="lottery" />
		</div>
	);
}
export default LotteryFloatButton;
