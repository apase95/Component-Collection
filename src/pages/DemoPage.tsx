import { CgComponents, CgFileDocument, CgHome, CgProfile, CgUser } from "react-icons/cg";
import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "../components/data-display/Avatar";
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
import {
    ComponentShowcase,
    ShowcaseCode,
    ShowcaseDescription,
    ShowcaseHeader,
    ShowcasePreview,
    ShowcaseTitle,
    ShowcaseToolbar,
} from "../components/showcase/ComponentShowCase";
import { Button } from "../components/base/Button";
import { Input } from "../components/base/Input";
import { FiHeart, FiSearch, FiSettings } from "react-icons/fi";
import { IconWrapper } from "../components/base/IconWrapper";
import { GlassImage } from "../components/base/IconWrapper";
import { Alert } from "../components/feedback/AlertStatus";
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


export const DemoPage = () => {
    const buttonCode = `<Button variant="primary">Click me</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="glass">Glass Effect</Button>
<Button variant="danger">Destructive</Button>`;

    return (
        <SidebarProvider>
            <Sidebar>
                <SidebarHeader>
                    <div className="flex items-center gap-2 font-bold text-white text-xl overflow-hidden">
                        <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center shrink-0">UI</div>
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
                <header className="h-16 border-b border-glass-border flex items-center px-4 bg-glass-surface sticky top-0 z-20">
                    <SidebarTrigger />
                    <h1 className="ml-4 text-lg font-semibold text-white">Dashboard</h1>
                </header>

                <div className="container-app section">
                    <div className="text-center space-y-2">
                        <Typography variant="h1">Glass UI Kit</Typography>
                        <Typography variant="body">Component collection for developers</Typography>
                    </div>

                    <div className="container-app section space-y-8">
                        <ComponentShowcase code={buttonCode}>
                            <ShowcaseHeader>
                                <div className="flex flex-col">
                                    <ShowcaseTitle>Button Component</ShowcaseTitle>
                                    <ShowcaseDescription>Basic button variants</ShowcaseDescription>
                                </div>
                                <ShowcaseToolbar />
                            </ShowcaseHeader>

                            <ShowcasePreview className="flex flex-wrap gap-4">
                                <Button variant="primary">Primary</Button>
                                <Button variant="secondary">Secondary</Button>
                                <Button variant="glass">Glass</Button>
                                <Button variant="ghost">Ghost</Button>
                                <Button variant="danger">Danger</Button>
                            </ShowcasePreview>

                            <ShowcaseCode />
                        </ComponentShowcase>
                    </div>

                    <section className="space-y-4 max-w-md">
                        <Typography variant="h2">Inputs</Typography>

                        <Input label="Email" placeholder="you@example.com" icon={<FiSearch />} />

                        <Input label="Password" type="password" error="Password is required" />
                    </section>

                    <section className="space-y-4">
                        <Typography variant="h2">Icon Wrapper</Typography>

                        <div className="flex gap-4">
                            <IconWrapper>
                                <FiHeart size={20} />
                            </IconWrapper>

                            <IconWrapper>
                                <FiSettings size={20} />
                            </IconWrapper>

                            <IconWrapper disabled>
                                <FiSettings size={20} />
                            </IconWrapper>
                        </div>
                    </section>

                    <section className="space-y-4 max-w-sm">
                        <Typography variant="h2">Glass Image</Typography>

                        <GlassImage src="https://images.unsplash.com/photo-1518770660439-4636190af475" alt="Demo" />
                    </section>

                    <div className="flex gap-4 p-4 mt-4 border-glass-border">
                        <Avatar size="md">
                            <AvatarFallback className="bg-secondary/20 text-secondary">JD</AvatarFallback>
                        </Avatar>

                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <span className="font-semibold text-white">John Doe</span>
                                <span className="text-xs text-slate-500">2 Hours</span>
                            </div>
                            <p className="text-slate-300 text-sm">Lorem ipsum dolor!</p>
                        </div>
                    </div>

                    <div className="flex items-end gap-6 py-2">
                        <div className="relative">
                            <Avatar size="xl" shape="square" className="shadow-2xl shadow-accent/20">
                                <AvatarImage src="https://invalid-url.com/image.png" alt="Profile" />
                                <AvatarFallback className="bg-linear-to-br from-primary to-purple-500">
                                    <CgProfile className="text-5xl text-white/50" />
                                </AvatarFallback>
                                <AvatarBadge status="online" />
                            </Avatar>
                        </div>

                        <div className="mb-2">
                            <h1 className="text-3xl text-white font-bold">Design Team</h1>
                            <p className="text-slate-400">Manage your team settings</p>
                        </div>
                    </div>

                    <Alert variant="success" className="w-fit">
                        <span className="font-medium">Welcome to Glass UI Kit</span>
                    </Alert>

                    <SkeletonForm />

                    <div className="flex items-center justify-center py-6 space-x-4">
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
                
                    {/* <PageLoader message="Loading..." /> */}
                
                </div>
            </main>
        </SidebarProvider>
    );
};
