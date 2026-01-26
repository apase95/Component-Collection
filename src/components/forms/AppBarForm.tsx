import { AppBar, AppBarContainer, AppBarBrand, AppBarNav, AppBarLink, AppBarActions } from "../navigation/AppBar";
import { Tooltip, TooltipTrigger, TooltipContent } from '../overlay/Tooltip';
import { DropdownMenuForm } from "./DropdownMenuForm";

export const AppBarForm = () => {
    return (
        <AppBar>
            <AppBarContainer className="flex-between px-12">
                <AppBarBrand>
                    <Tooltip delayDuration={200}>
                        <TooltipTrigger>
                            <div className="flex items-center gap-1">
                                <div className="w-8 h-8 bg-accent rounded-lg flex-center">
                                    <span className="text-white text-xl">UI</span>
                                </div>
                                <span>Kit</span>
                            </div>
                        </TooltipTrigger>
                        
                        <TooltipContent side="bottom">
                            Home
                        </TooltipContent>
                    </Tooltip>
                    
                </AppBarBrand>

                <AppBarNav className="space-x-4">
                    <AppBarLink href="#" active>Overview</AppBarLink>
                    <AppBarLink href="#">Projects</AppBarLink>
                    <AppBarLink href="#">Members</AppBarLink>
                    <AppBarLink href="#">Setting</AppBarLink>
                </AppBarNav>

                <AppBarActions>
                    <DropdownMenuForm />
                </AppBarActions>
            </AppBarContainer>
        </AppBar>
    );
};
