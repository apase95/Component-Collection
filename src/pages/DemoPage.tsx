import { CgComponents, CgFileDocument, CgHome, CgUser } from "react-icons/cg";
import { Avatar, AvatarFallback, AvatarImage } from "../components/data-display/Avatar";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarItem,
    SidebarProvider,
    SidebarTrigger,
} from "../components/navigation/Sidebar";
import { Typography } from "../components/base/Typography";
import { SkeletonForm } from "../components/forms/SkeletonForm";
import { Spinner } from "../components/feedback/Spinner";
import DemoSwitch from "./DemoSwitch";
import { Slider } from "../components/base/Slider";
import { ScrollAreaForm } from "../components/forms/ScrollAreaForm";
import SmartImageForm from "../components/forms/SmartImageForm";
import { MenuBarForm } from "../components/forms/MenuBarForm";
import { NavigationBarForm } from "../components/forms/NavigationBarForm";
import { PasswordForm } from "../components/forms/PasswordForm";
import { TabsForm } from "../components/forms/TabsForm";
import { Progress } from "../components/base/Progress";
import { SelectForm } from "../components/forms/SelectForm";
import { PaginationForm } from "../components/forms/PaginationForm";
import { Button } from "../components/base/Button";


export const DemoPage = () => {

    

    return (
        <SidebarProvider>
            <Sidebar>
                <SidebarHeader>
                    <div className="flex items-center gap-2 font-bold text-white text-xl overflow-hidden">
                        <Button className="w-8 h-8 bg-accent text-white text-md font-semibold rounded-lg flex-center shrink-0">UI</Button>
                        <div className="w-8 h-8 px-2 flex-center">Kit</div>
                    </div>
                </SidebarHeader>

                <SidebarContent>
                    <SidebarItem icon={<CgHome />} active>
                        Home
                    </SidebarItem>
                    <SidebarItem icon={<CgFileDocument />}>Documents</SidebarItem>
                    <SidebarItem icon={<CgComponents />}>Components</SidebarItem>
                    <SidebarItem icon={<CgUser />}>Users</SidebarItem>
                </SidebarContent>

                <SidebarFooter>
                    <div className="flex items-center gap-3 overflow-hidden">
                        <Avatar size="sm">
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>AD</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                            <span className="text-sm text-white font-medium whitespace-nowrap">Admin User</span>
                            <span className="text-xs text-slate-400 whitespace-nowrap">admin@glass.ui</span>
                        </div>
                    </div>
                </SidebarFooter>
            </Sidebar>

            <main className="flex-1 min-w-0 bg-slate-950">
                <header className="h-16 border-b border-secondary-theme flex items-center px-4 bg-primary-theme sticky top-0 z-20">
                    <SidebarTrigger />
                    <h1 className="ml-4 text-lg font-semibold text-white">Dashboard</h1>
                </header>

                <div className="container-app section">
                    <div className="text-center space-y-2">
                        <Typography variant="h1">Glass UI Kit</Typography>
                        <Typography variant="body">Component collection for developers</Typography>
                    </div>

                    <SkeletonForm />

                    <div className="flex-center py-6 space-x-4">
                        <Spinner size="xs" />
                        <Spinner size="sm" />
                        <Spinner size="md" />
                        <Spinner size="lg" />
                    </div>

                    <DemoSwitch />

                    <Slider
                        min={0}
                        max={100}
                        defaultValue={30}
                        size="lg"
                        showValue
                    />

                    <ScrollAreaForm />

                    <SmartImageForm />

                    <MenuBarForm />

                    <NavigationBarForm />

                    <PasswordForm />

                    <TabsForm />

                    
                    <div className="w-xl mt-12 space-y-2">
                        <div className="text-white text-sm">Downloading (75%)</div>
                        <Progress 
                            value={75} 
                            size="lg" 
                            indicatorClassName="bg-white" 
                        />
                        <div className="text-white text-sm">Complete</div>
                        <Progress 
                            value={100} 
                            size="md" 
                            indicatorClassName="bg-green-400" 
                        />
                    </div>

                    <SelectForm />

                    <PaginationForm />
                
                    {/* <PageLoader message="Loading..." /> */}
                
                </div>
            </main>
        </SidebarProvider>
    );
};
