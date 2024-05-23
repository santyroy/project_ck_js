// const expenses = {
//   A: { income: 0, expense: 10 },
//   B: { income: 0, expense: 6 },
//   C: { income: 0, expense: 13 },
//   D: { income: 0, expense: 7 },
// };

function splitBill(expenses) {
  const totalExpenses = Object.values(expenses).reduce(
    (acc, cur) => acc + cur.expense,
    0
  );
  const averageExpense = totalExpenses / Object.keys(expenses).length;

  const individualBalances = {};
  for (let person in expenses) {
    individualBalances[person] = expenses[person].expense - averageExpense;
  }

  return individualBalances;
}

function calculatePayments(individualBalances) {
  const positiveBalances = {};
  const negativeBalances = {};

  for (let person in individualBalances) {
    if (individualBalances[person] > 0) {
      positiveBalances[person] = individualBalances[person];
    } else if (individualBalances[person] < 0) {
      negativeBalances[person] = individualBalances[person];
    }
  }

  const payments = [];
  for (let debtor in negativeBalances) {
    for (let creditor in positiveBalances) {
      const paymentAmount = Math.min(
        -negativeBalances[debtor],
        positiveBalances[creditor]
      );

      if (paymentAmount > 0) {
        payments.push({ from: debtor, to: creditor, amount: paymentAmount });
        negativeBalances[debtor] += paymentAmount;
        positiveBalances[creditor] -= paymentAmount;
      }
    }
  }

  return payments;
}

export function splitWise(expenses) {
  let result = [];
  if (expenses !== undefined) {
    const individualBalances = splitBill(expenses);
    const payments = calculatePayments(individualBalances);

    // console.log("Payments:");
    let result = payments.map((payment) => {
      //   return `${payment.from} pays ${payment.to} ₹${payment.amount.toFixed(2)}`;
      return {
        from: payment.from,
        to: payment.to,
        amount: payment.amount.toFixed(2),
      };
    });

    return result;
  }

  return result;
}
