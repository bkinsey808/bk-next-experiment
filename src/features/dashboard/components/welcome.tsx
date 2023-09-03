import EditUsername from "./edit-username";
import Providers from "./providers";
import WelcomeHeader from "./welcome-header";

export default function Welcome() {
  return (
    <>
      <WelcomeHeader />
      <EditUsername />
      <Providers />
    </>
  );
}
