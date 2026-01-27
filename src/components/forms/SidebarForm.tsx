import { 
    SidebarProvider, Sidebar, SidebarHeader, SidebarContent, 
    SidebarItem, SidebarFooter, SidebarTrigger 
} from '../navigation/Sidebar';
import { CgHome, CgFileDocument, CgComponents, CgUser } from "react-icons/cg";
import { Avatar, AvatarFallback, AvatarImage } from '../data-display/Avatar';

export const SidebarForm = () => {
    return (
        <SidebarProvider>
            
            <Sidebar>
                <SidebarHeader>
                    <div className="flex items-center gap-2 font-bold text-white text-xl overflow-hidden">
                        <div className="w-8 h-8 bg-accent rounded-lg flex-center shrink-0">
                            UI
                        </div>
                        <span className="whitespace-nowrap">Dark UI</span>
                    </div>
                </SidebarHeader>

                <SidebarContent>
                    <SidebarItem icon={<CgHome />} active>Home</SidebarItem>
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
                <header className="h-16 border-b border-glass-border flex items-center px-4 bg-glass-surface sticky top-0 z-20">
                    <SidebarTrigger />
                    <h1 className="ml-4 text-lg font-semibold text-white">Dashboard</h1>
                </header>

                <div className="p-8">
                    <div className="h-[500px] border-2 border-dashed border-slate-800 rounded-lg flex items-center justify-center text-slate-500">
                        Content Area
                    </div>
                </div>
            </main>

        </SidebarProvider>
    );
}
