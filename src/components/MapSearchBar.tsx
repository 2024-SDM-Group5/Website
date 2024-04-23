import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';

function MapSearchBar() {
	return <Input prefix={<SearchOutlined style={{ fontSize: '24px' }} />} />;
}
export default MapSearchBar;
