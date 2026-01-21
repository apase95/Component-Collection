import { AppBar, AppBarContainer, AppBarBrand, AppBarNav, AppBarLink, AppBarActions } from "../navigation/AppBar";
import { Tooltip, TooltipTrigger, TooltipContent } from '../overlay/Tooltip';
import { DropdownMenuForm } from "./DropdownMenuForm";

export const AppBarForm = () => {
    return (
        <AppBar>
            <AppBarContainer>
                <AppBarBrand>
                    <Tooltip delayDuration={200}>
                        <TooltipTrigger>
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-accent rounded-lg flex-center">
                                    <span className="text-white text-xl">#</span>
                                </div>
                                <span>GlassUI</span>
                            </div>
                        </TooltipTrigger>
                        
                        <TooltipContent side="bottom">
                            Home
                        </TooltipContent>
                    </Tooltip>
                    
                </AppBarBrand>

                <AppBarNav>
                    <AppBarLink href="#" active>
                        Overview
                    </AppBarLink>
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
