import { useClerk } from "@clerk/clerk-react";

const SignOutButton = () => {
  const { signOut } = useClerk();
  return (
    <button onClick={() => signOut()} style={{ padding: "15px", fontSize:"1.2rem", border:"none", cursor:"pointer"}}>
      Sign out
    </button>
  );
};

export default SignOutButton