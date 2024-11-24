import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Button asChild>
        <Link href="/generate-text">Generate Text</Link>
      </Button>
    </div>
  );
}
