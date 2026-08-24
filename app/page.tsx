import { Button } from "@/components/ui/button";
import UserButton from "@/modules/auth/components/user-button"

export default function Home() {
  return (
    <div>
      <Button>
        Get Started
      </Button>
      <UserButton/>
    </div>
  );
}
