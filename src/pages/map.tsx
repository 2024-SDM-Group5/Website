import * as Tabs from '@radix-ui/react-tabs';

import GeneralMap from './generalMap';

const Map = () => {
	return (
		<Tabs.Root
			className="TabsRoot"
			defaultValue="總地圖"
			style={{ position: 'absolute', top: 0, left: 0, width: '100vw' }}
		>
			<Tabs.List className="TabsList">
				<Tabs.Trigger className="TabsTrigger" value="總地圖">
					總地圖
				</Tabs.Trigger>
				<Tabs.Trigger className="TabsTrigger" value="地圖總覽">
					地圖總覽
				</Tabs.Trigger>
				<Tabs.Trigger className="TabsTrigger" value="餐廳總覽">
					餐廳總覽
				</Tabs.Trigger>
				<Tabs.Trigger className="TabsTrigger" value="我的收藏">
					我的收藏
				</Tabs.Trigger>
			</Tabs.List>
			<Tabs.Content className="TabsContent SecondPage" value="總地圖">
				<GeneralMap />
			</Tabs.Content>
			<Tabs.Content className="TabsContent SecondPage" value="地圖總覽"></Tabs.Content>
			<Tabs.Content className="TabsContent SecondPage" value="餐廳總覽"></Tabs.Content>
			<Tabs.Content className="TabsContent SecondPage" value="我的收藏"></Tabs.Content>
		</Tabs.Root>
	);
};
export default Map;
