import PageLayout from "../../layouts/PageLayout";
import LoggedInHeader from "../../components/shared/LoggedInHeader";
import BudgetHero from "./BudgetHero";
import BudgetList from "./BudgetList";

const Budgets = () => {
  return (
    <PageLayout>
      <LoggedInHeader />
      <BudgetHero />
      <BudgetList />
    </PageLayout>
  );
};

export default Budgets;
