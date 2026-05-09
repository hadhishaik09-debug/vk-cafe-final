import "./styles.css";

import { Hero } from "./components/hero";
import { FeaturesRow } from "./components/features-row";
import { Signature } from "./components/signature";
import { Menu } from "./components/menu";
import { Combos } from "./components/combos";
import { Order } from "./components/order";
import { Location } from "./components/location";
import { Footer } from "./components/footer";
import { MobileBar } from "./components/mobile-bar";

/* IMPORT THE LOCK TRIGGER */
import { LockTrigger } from "@/components/lock-trigger";

function App() {
  return (
    <>
      {/* Hidden Admin Lock */}
      <LockTrigger />

      {/* Website Sections */}
      <Hero />
      <FeaturesRow />
      <Signature />
      <Menu />
      <Combos />
      <Order />
      <Location />
      <Footer />
      <MobileBar />
    </>
  );
}

export default App;