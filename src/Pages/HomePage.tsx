import { Button } from "../components/base/Button";
import { Input } from "../components/base/Input";
import { Typography } from "../components/base/Typography";
import { IconWrapper } from "../components/base/IconWrapper";
import { GlassImage } from "../components/base/IconWrapper";
import { FiHeart, FiSettings, FiSearch } from "react-icons/fi";
import LoginForm from "../components/forms/LoginForm";

export const HomePage = () => {
  return (
    <div className="min-h-screen p-8 space-y-12 container-app">

      <div className="text-center space-y-2">
        <Typography variant="h1">Glass UI Kit</Typography>
        <Typography variant="body">
          Component collection for developers
        </Typography>
      </div>

      <section className="space-y-4">
        <Typography variant="h2">Buttons</Typography>

        <div className="flex flex-wrap gap-3">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="glass">Glass</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
          <Button isLoading>Loading</Button>
          <Button size="icon" leftIcon={<FiHeart />} />
        </div>
      </section>

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

      <LoginForm />
    </div>
  );
};
