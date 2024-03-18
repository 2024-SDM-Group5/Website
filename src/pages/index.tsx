import * as Tabs from '@radix-ui/react-tabs';

import '@/app/globals.css';

import Map from './map';

const Page = () => {
	return (
		<Tabs.Root
			className="TabsRoot"
			defaultValue="地圖探索"
			style={{ position: 'absolute', bottom: 0, left: 0, width: '100vw' }}
		>
			<Tabs.Content className="TabsContent MainPage" value="地圖探索">
				<Map />
			</Tabs.Content>
			<Tabs.Content className="TabsContent MainPage" value="美食社群"></Tabs.Content>
			<Tabs.Content className="TabsContent MainPage" value="我的地圖"></Tabs.Content>
			<Tabs.Content className="TabsContent MainPage" value="帳戶"></Tabs.Content>
			<Tabs.List className="TabsList">
				<Tabs.Trigger className="TabsTrigger TabsTriggerTop" value="地圖探索">
					地圖探索
				</Tabs.Trigger>
				<Tabs.Trigger className="TabsTrigger TabsTriggerTop" value="美食社群">
					美食社群
				</Tabs.Trigger>
				<Tabs.Trigger className="TabsTrigger TabsTriggerTop" value="我的地圖">
					我的地圖
				</Tabs.Trigger>
				<Tabs.Trigger className="TabsTrigger TabsTriggerTop" value="帳戶">
					帳戶
				</Tabs.Trigger>
			</Tabs.List>
		</Tabs.Root>
	);
};
export default Page;
