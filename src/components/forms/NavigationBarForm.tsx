import React from "react";
import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuTrigger,
    NavigationMenuContent,
    NavigationMenuLink,
} from "../overlay/NavigationBar";
import { cn } from "../../libs/utils";

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a"> & { title: string }
>(({ 
    className, 
    title, 
    children, 
    ...props 
}, ref) => {
    return (
        <li>
            <a
                ref={ref}
                className={cn(
                    "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors",
                    "hover:bg-white/5 hover:text-white focus:bg-white/5 focus:text-white",
                    "text-slate-400",
                    className
                )}
                {...props}
            >
                <div className="text-sm font-medium leading-none text-white">{title}</div>
                <p className="line-clamp-2 text-sm leading-snug text-slate-500">
                    {children}
                </p>
            </a>
        </li>
    );
});
ListItem.displayName = "ListItem";


export const NavigationBarForm = () => {
    return (
        <div className="flex-start py-10">
            
            <NavigationMenu>
                <NavigationMenuList>
                    
                    <NavigationMenuItem value="learn">
                        <NavigationMenuTrigger>Learn</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid gap-3 p-2 w-100 md:w-125 md:grid-cols-2">
                                <ListItem href="#" title="Introduction">
                                    Re-usable components built using Radix UI and Tailwind CSS.
                                </ListItem>
                                <ListItem href="#" title="Installation">
                                    How to install dependencies and structure your app.
                                </ListItem>
                                <ListItem href="#" title="Typography">
                                    Styles for headings, paragraphs, lists...
                                </ListItem>
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>

                    <NavigationMenuItem value="overview">
                        <NavigationMenuTrigger>Overview</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid gap-3 p-4 w-100 md:w-125 lg:w-150 lg:grid-cols-[.75fr_1fr]">
                                <li className="row-span-3">
                                    <a
                                        className={cn(
                                            "h-full w-full p-6 flex flex-col justify-end rounded-md",
                                            "bg-linear-to-b from-accent to-purple-950",
                                            "select-none no-underline outline-none focus:shadow-md"
                                        )}
                                        href="/"
                                    >
                                        <div className="mb-2 mt-4 text-lg font-medium text-white">
                                            Glass UI
                                        </div>
                                        <p className="text-sm leading-tight text-slate-400">
                                            Beautifully designed components built with Radix UI and Tailwind CSS.
                                        </p>
                                    </a>
                                </li>
                                
                                <ListItem href="/docs" title="Introduction">
                                    Build high-quality, accessible design systems and web apps.
                                </ListItem>
                                <ListItem href="/docs/installation" title="Getting Started">
                                    A quick tutorial to get you up and running with Glass UI.
                                </ListItem>
                                <ListItem href="/docs/primitives/typography" title="Styling">
                                    Unstyled and compatible with any styling solution.
                                </ListItem>
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        <NavigationMenuLink href="https://github.com/apase95">
                            Github
                        </NavigationMenuLink>
                    </NavigationMenuItem>

                </NavigationMenuList>
            </NavigationMenu>
            
        </div>
    );
};