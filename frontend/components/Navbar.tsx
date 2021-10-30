import { useAuth } from "@hooks/useAuth";
import Link from "next/link";
import AuthStatus from "./AuthStatus";
export default function Navbar() {
  return (
    <header className="flex justify-between mx-4">
      <nav>
        <Link href="/">Home</Link>
      </nav>
      <AuthStatus />
    </header>
  );
}
