import PageLayout from "../layouts/PageLayout";

import HeroImage1 from "../assets/hero1.svg";
import HeroImage2 from "../assets/hero2.svg";
import HeroImage3 from "../assets/hero3.svg";

import Hero from "../components/shared/Hero";

const Home = () => {
  return (
    <PageLayout>
      <section className="container mx-auto px-5 mt-5 grow">
        <Hero
          title={["Get Started With", "Category Based Budgeting"]}
          description="A method of managing your finances by organizing your expenses into
            specific category"
          image={HeroImage1}
          imagePosition="right"
        />
        <Hero
          title={["Keep Updating Your Income", "With Coin Keeper"]}
          description="You can make the most of your financial resources and achieve your
        financial goals more effectively"
          image={HeroImage2}
          imagePosition="left"
        />
        <Hero
          title={["Keep Updating Your Expense", "With Coin Keeper"]}
          description="You can ensure that you are making the most of your financial
        resources and staying on track with your lifestyle"
          image={HeroImage3}
          imagePosition="right"
        />
      </section>
    </PageLayout>
  );
};

export default Home;
