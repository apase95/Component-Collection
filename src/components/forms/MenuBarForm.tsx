import React from "react";
import {
    MenuBar,
    MenuBarMenu,
    MenuBarTrigger,
    MenuBarContent,
    MenuBarItem,
    MenuBarCheckboxItem,
    MenuBarSeparator,
    MenuBarLabel,
    MenuBarShortcut,
} from "../overlay/MenuBar";


export const MenuBarForm = () => {
    const [showGrid, setShowGrid] = React.useState(false);
    const [showStatus, setShowStatus] = React.useState(true);

    return (
        <div className="w-full p-10">
            <MenuBar>                
                <MenuBarMenu value="file">
                    <MenuBarTrigger>File</MenuBarTrigger>
                    <MenuBarContent>
                        <MenuBarItem>
                            New Tab 
                            <MenuBarShortcut>⌘T</MenuBarShortcut>
                        </MenuBarItem>
                        <MenuBarItem>
                            New Window 
                            <MenuBarShortcut>⌘N</MenuBarShortcut>
                        </MenuBarItem>
                        <MenuBarItem disabled className="opacity-50">
                            Open Recent... (Disabled)
                        </MenuBarItem>
                        <MenuBarSeparator />
                        <MenuBarItem>
                            Share 
                            <MenuBarShortcut>⇧⌘S</MenuBarShortcut>
                        </MenuBarItem>
                        <MenuBarSeparator />
                        <MenuBarItem>
                            Print... 
                            <MenuBarShortcut>⌘P</MenuBarShortcut>
                        </MenuBarItem>
                    </MenuBarContent>
                </MenuBarMenu>

                <MenuBarMenu value="edit">
                    <MenuBarTrigger>Edit</MenuBarTrigger>
                    <MenuBarContent>
                        <MenuBarItem>
                            Undo
                            <MenuBarShortcut>⌘Z</MenuBarShortcut>
                        </MenuBarItem>
                        <MenuBarItem>
                            Redo 
                            <MenuBarShortcut>⇧⌘Z</MenuBarShortcut>
                        </MenuBarItem>
                        <MenuBarSeparator />
                        <MenuBarItem>Cut</MenuBarItem>
                        <MenuBarItem>Copy</MenuBarItem>
                        <MenuBarItem>Paste</MenuBarItem>
                    </MenuBarContent>
                </MenuBarMenu>

                <MenuBarMenu value="view">
                    <MenuBarTrigger>View</MenuBarTrigger>
                    <MenuBarContent>
                        <MenuBarLabel inset>Appearance</MenuBarLabel>
                        <MenuBarCheckboxItem 
                            checked={showGrid} 
                            onCheckedChange={setShowGrid}
                        >
                            Show Grid
                        </MenuBarCheckboxItem>
                        <MenuBarCheckboxItem 
                            checked={showStatus} 
                            onCheckedChange={setShowStatus}
                        >
                            Show Status Bar
                        </MenuBarCheckboxItem>
                        <MenuBarSeparator />
                        <MenuBarItem inset>Reload</MenuBarItem>
                        <MenuBarItem inset>
                            Force Reload 
                            <MenuBarShortcut>⇧⌘R</MenuBarShortcut>
                        </MenuBarItem>
                    </MenuBarContent>
                </MenuBarMenu>

                <MenuBarMenu value="help">
                    <MenuBarTrigger>Help</MenuBarTrigger>
                    <MenuBarContent>
                        <MenuBarItem>About</MenuBarItem>
                    </MenuBarContent>
                </MenuBarMenu>

            </MenuBar>
        </div>
    );
};