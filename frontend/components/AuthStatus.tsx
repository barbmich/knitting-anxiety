import { useAuth } from "@hooks/useAuth";
import Link from "next/link";
export default function AuthStatus() {
  const { user, signout } = useAuth();
  return (
    <div>
      {user ? (
        <>
          logged in as {user.email} | <button onClick={signout}>Logout</button>
        </>
      ) : (
        <Link href="/login">
          <a>Login</a>
        </Link>
      )}
    </div>
  );
}
