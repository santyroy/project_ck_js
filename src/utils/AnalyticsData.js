export function extractUniqueDates(arr) {
  const uniqueDates = new Set();

  // Iterate over each expense object and extract the date
  arr.forEach((val) => {
    const date = new Date(val.date).toDateString();
    uniqueDates.add(date);
  });

  // Convert set to array, sort in ascending order, and return
  return Array.from(uniqueDates);
}

export function extractUniqueLabels(arr, labelName) {
  const uniqueLabels = new Set();

  // Iterate over each expense object and extract the date
  arr.forEach((val) => {
    const label = val[labelName];
    uniqueLabels.add(label);
  });

  // Convert set to array, sort in ascending order, and return
  return Array.from(uniqueLabels);
}

export function consolidateExpenses(expenses) {
  const consolidated = {};

  // Iterate over each expense object
  expenses.forEach((expense) => {
    const category = expense.category.toUpperCase();

    // If category already exists in consolidated object, add amount to it
    if (category in consolidated) {
      consolidated[category] += expense.amount;
    } else {
      // If category doesn't exist, create it and set amount
      consolidated[category] = expense.amount;
    }
  });

  // Convert consolidated object to array of objects
  //   const consolidatedArray = Object.keys(consolidated).map((category) => {
  //     return { category, amount: consolidated[category] };
  //   });

  //   return consolidatedArray;

  return consolidated;
}

export function consolidateTransactionsByDate(transactions) {
  const consolidated = {};

  // Iterate over each expense object
  transactions.forEach((transaction) => {
    const date = new Date(transaction.date).toDateString();

    // If date already exists in consolidated object, add amount to it
    if (date in consolidated) {
      consolidated[date] += transaction.amount;
    } else {
      // If date doesn't exist, create it and set amount
      consolidated[date] = transaction.amount;
    }
  });

  // Convert consolidated object to array of objects
  // const consolidatedArray = Object.keys(consolidated).map(date => {
  //     return { date, amount: consolidated[date] };
  // });

  // return consolidatedArray;

  return consolidated;
}
