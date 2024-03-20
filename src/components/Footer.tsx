'use client';
import { Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs";
import Link from "next/link";

const tabsConfig = [
	{ value: "general", label: "地圖探索", href: "/map/general" },
	{ value: "map", label: "美食社群", href: "/community/overview" },
	{ value: "restaurant", label: "我的地圖", href: "/map/restaurants/overview" },
	{ value: "archive", label: "帳戶", href: "/profile/overview" },
  ];

  const Footer = () => {
	return (
	
		<Tabs defaultValue={tabsConfig[0]?.value} className="w-full">
		<TabsList className="w-full rounded-none bg-transparent p-0 border-b-none">
		  {tabsConfig.map((tab) => (
			<TabsTrigger key={tab.value} value={tab.value} className="data-[state=active]:border-b-none border-b-none border-t-2 data-[state=active]:border-t-black flex-1 relative rounded-none border-b-2 border-b-transparent bg-transparent pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none focus-visible:ring-0">
			  <Link href={tab.href}>{tab.label}</Link>
			</TabsTrigger>
		  ))}
		</TabsList>
	  </Tabs>
	
	);
  };
  
  export default Footer;
  