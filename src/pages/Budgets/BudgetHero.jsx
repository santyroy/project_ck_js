import { useState } from "react";
import { ButtonSolid } from "../../components/shared/Button";
import Hero from "../../components/shared/Hero";
import BudgetsImage from "../../assets/budgets.svg";
import BudgetModal from "./BudgetModal";

const BudgetHero = () => {
  const [showModal, setShowModal] = useState(false);

  const heroTitle = [
    "A Budget Tells Your Money Where To Go",
    "Instead Of Wondering Where It Went",
  ];

  return (
    <>
      <Hero imagePosition="right" image={BudgetsImage} title={heroTitle}>
        <ButtonSolid
          content="Create Budget"
          onClick={() => setShowModal(true)}
        />
      </Hero>

      {showModal && <BudgetModal setShowModal={setShowModal} />}
    </>
  );
};

export default BudgetHero;
