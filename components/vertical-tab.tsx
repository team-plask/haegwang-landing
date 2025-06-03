import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

interface TabProps {
  value: string;
  label: string;
}

interface VerticalTabsProps {
  tabs: TabProps[];
  contents: Record<string, React.ReactNode>;
  defaultValue?: string;
}

export default function VerticalTabs({ tabs, contents, defaultValue }: VerticalTabsProps) {
  return (
    <Tabs
      defaultValue={defaultValue || (tabs.length > 0 ? tabs[0].value : undefined)}
      orientation="vertical"
      className="w-full flex flex-row py-3 md:py-6"
    >
      <TabsList className="flex-col justify-start h-fit rounded-none border-l bg-transparent p-0 w-60 flex-shrink-0">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="text-sm md:text-lg data-[state=active]:after:bg-primary relative w-full justify-start rounded-none after:absolute after:inset-y-0 after:start-0 after:w-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      <div className="grow text-start bg-gray-100 p-4 pt-3 md:pt-5 pl-6 md:pl-12 rounded-lg">
        {tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value}>
            {contents[tab.value]}
          </TabsContent>
        ))}
      </div>
    </Tabs>
  )
}
