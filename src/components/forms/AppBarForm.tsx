import { Button } from "../base/Button";
import { Input } from "../base/Input";
import { AppBar, AppBarContainer, AppBarBrand, AppBarNav, AppBarLink, AppBarActions } from "../navigation/AppBar";
import { CgProfile, CgSearch } from "react-icons/cg";

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

                    <Button variant="glass" size="icon" aria-label="Profile">
                        <CgProfile className="text-lg" />
                    </Button>
                </AppBarActions>
            </AppBarContainer>
        </AppBar>
    );
};
