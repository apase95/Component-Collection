import { FaFacebook, FaGithub, FaTwitter } from "react-icons/fa";
import { Button } from "../base/Button";
import { Input } from "../base/Input";
import { Footer, FooterBottom, FooterColumn, FooterContainer, FooterGrid, FooterLink, FooterTitle } from "../navigation/Footer";

export const FooterForm = () => {
    return (
        <Footer>
            <FooterContainer>
                <FooterGrid>
                    <FooterColumn className="col-span-2 lg:col-span-2">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold">#</span>
                            </div>
                            <span className="text-xl font-bold text-white">GlassUI</span>
                        </div>
                        <p className="text-sm leading-relaxed max-w-xs text-slate-400">
                            Build modern web interfaces with elegant frosted-glass effects, optimized for user experience
                            across all platforms.
                        </p>
                    </FooterColumn>

                    <FooterColumn>
                        <FooterTitle>Product</FooterTitle>
                        <FooterLink href="#">Features</FooterLink>
                        <FooterLink href="#">Integrations</FooterLink>
                        <FooterLink href="#">Pricing</FooterLink>
                        <FooterLink href="#">Changelog</FooterLink>
                    </FooterColumn>

                    <FooterColumn>
                        <FooterTitle>Company</FooterTitle>
                        <FooterLink href="#">About Us</FooterLink>
                        <FooterLink href="#">Blog</FooterLink>
                        <FooterLink href="#">Careers</FooterLink>
                        <FooterLink href="#">Contact</FooterLink>
                    </FooterColumn>

                    <FooterColumn className="col-span-2 lg:col-span-1">
                        <FooterTitle>Newsletter</FooterTitle>
                        <div className="flex flex-col gap-2">
                            <Input placeholder="Email của bạn..." className="bg-slate-950/50 border-slate-800" />
                            <Button size="sm" variant="secondary">
                                Subscribe
                            </Button>
                        </div>
                    </FooterColumn>
                </FooterGrid>

                <FooterBottom>
                    <p className="text-sm">&copy; 2024 GlassUI Inc. All rights reserved.</p>

                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" className="rounded-full">
                            <FaGithub className="text-lg" />
                        </Button>
                        <Button variant="ghost" size="icon" className="rounded-full">
                            <FaTwitter className="text-lg" />
                        </Button>
                        <Button variant="ghost" size="icon" className="rounded-full">
                            <FaFacebook className="text-lg" />
                        </Button>
                    </div>
                </FooterBottom>
            </FooterContainer>
        </Footer>
    );
};
