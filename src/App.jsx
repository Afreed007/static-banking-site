import React, { useState } from "react";
import styles from "./style";
import { Navbar, Hero, Business, Stats, Billing, CardDeal, Testimonials, Clients, CTA, Footer } from "./components";

const App = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <div className="bg-primary w-full overflow-hidden">
      {/* Navbar Section */}
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />
        </div>
      </div>

      {/* Hero Section */}
      <div className={`bg-primary ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <Hero />
        </div>
      </div>

      {/* Main Content Section */}
      <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter} ml-10`}>
        <div className={`${styles.boxWidth}`}>
          <Stats />
          <Business />
          <Billing />
          <CardDeal />
          <Testimonials />
          <Clients />

          {/* Pass modal state to CTA */}
          <CTA isLoginOpen={isLoginOpen} setIsLoginOpen={setIsLoginOpen} />

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default App;
