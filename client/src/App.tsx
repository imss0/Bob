import "./App.css";
import Nav from "./components/Nav";
import Redirect from "./components/Redirect";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
} from "@clerk/clerk-react";

const clerk_pub_key = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY as string;

function App() {
  return (
    <ClerkProvider publishableKey={clerk_pub_key}>
      <div className="App">
        <SignedIn>
          <Nav />
          <Redirect />
        </SignedIn>
        <SignedOut>
          <RedirectToSignIn redirectUrl={"/"} />
        </SignedOut>
      </div>
    </ClerkProvider>
  );
}

export default App;
