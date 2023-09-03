import EditUsername from "./EditUsername";
import Providers from "./Providers";
import WelcomeHeader from "./WelcomeHeader";

export default function Welcome() {
  return (
    <>
      <WelcomeHeader />
      <EditUsername />
      <Providers />
    </>
  );
}
