import { Button } from "../components/base/Button";
import { Input } from "../components/base/Input";
import { Typography } from "../components/base/Typography";
import { IconWrapper } from "../components/base/IconWrapper";
import { GlassImage } from "../components/base/IconWrapper";
import { FiHeart, FiSettings, FiSearch } from "react-icons/fi";
import LoginForm from "../components/forms/LoginForm";
import { AppBarForm } from "../components/forms/AppBarForm";
import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "../components/data-display/Avatar";
import { CgProfile } from "react-icons/cg";
import { FooterForm } from "../components/forms/FooterForm";
import { DialogForm } from "../components/forms/DialogForm";
import { ComponentShowcase, ShowcaseCode, ShowcaseDescription, ShowcaseHeader, ShowcasePreview, ShowcaseTitle, ShowcaseToolbar } from "../components/showcase/ComponentShowCase";
import { Alert } from "../components/feedback/AlertStatus";
import { CarouselForm } from "../components/forms/CarouselForm";
import { MarkDownForm } from "../components/forms/MarkDownForm";


export const HomePage = () => {

  const buttonCode = `<Button variant="primary">Click me</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="glass">Glass Effect</Button>
<Button variant="danger">Destructive</Button>`;

  return (
    <div className="min-h-screen bg-slate-900">

      <AppBarForm />
      
      <main className="container-app section">
        <div className="text-center space-y-2">
          <Typography variant="h1">UI Kit</Typography>
          <Typography variant="body">
            Component collection for developers
          </Typography>
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

          <Input
            label="Email"
            placeholder="you@example.com"
            icon={<FiSearch />}
          />

          <Input
            label="Password"
            type="password"
            error="Password is required"
          />
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

          <GlassImage
            src="https://images.unsplash.com/photo-1518770660439-4636190af475"
            alt="Demo"
          />
        </section>

        <div className="flex gap-4 p-4 mt-4 border-glass-border">
          <Avatar size="md">
            <AvatarFallback className="bg-secondary/20 text-secondary">
              JD
            </AvatarFallback>
          </Avatar>
  
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-white">John Doe</span>
              <span className="text-xs text-slate-500">2 Hours</span>
            </div>
            <p className="text-slate-300 text-sm">
              Lorem ipsum dolor!
            </p>
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

        <CarouselForm />

        <MarkDownForm />

        <DialogForm />

        <LoginForm />

        <FooterForm />
      </main>
    </div>
  );
};
