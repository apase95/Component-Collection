import { Input } from "../base/Input";
import { Avatar, AvatarFallback, AvatarImage } from "../data-display/Avatar";
import { AppBar, AppBarContainer, AppBarBrand, AppBarNav, AppBarLink, AppBarActions } from "../navigation/AppBar";
import { CgSearch } from "react-icons/cg";

export const AppBarForm = () => {
    return (
        <AppBar>
            <AppBarContainer>
                <AppBarBrand>
                    <div className="w-8 h-8 bg-accent rounded-lg flex-center">
                        <span className="text-white text-xl">#</span>
                    </div>
                    <span>GlassUI</span>
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
                    <div className="hidden sm:block w-64">
                        <Input
                            placeholder="Search..."
                            icon={<CgSearch />}
                            className="h-9 bg-slate-800/50 border-slate-700/50"
                        />
                    </div>

                    <div className="relative">
                        <Avatar size="md">
                            <AvatarImage src="https://github.com/shadcn.png" alt="@user" />
                            <AvatarFallback>NV</AvatarFallback>
                        </Avatar>
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-slate-900 rounded-full"></span>
                    </div>
                </AppBarActions>
            </AppBarContainer>
        </AppBar>
    );
};
