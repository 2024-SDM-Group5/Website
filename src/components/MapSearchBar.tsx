import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';

const MapSearchBar = () => {
	return (
		<div className="absolute left-1/2 top-[104px] z-10 mt-8 h-12 w-full max-w-xl -translate-x-1/2 transform px-5">
			<Input
				prefix={<SearchOutlined style={{ fontSize: '24px' }} />}
				className="h-full w-full"
			/>
		</div>
	);
};
export default MapSearchBar;
