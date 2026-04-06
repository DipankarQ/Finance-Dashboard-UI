// Mock financial data — Jan to Apr 2026
export const CATEGORIES = [
  "Salary",
  "Freelance",
  "Food & Dining",
  "Transport",
  "Utilities",
  "Entertainment",
  "Healthcare",
  "Shopping",
];

export const MOCK_TRANSACTIONS = [
  // January
  { id: "t001", date: "2026-01-01", description: "Monthly Salary",        amount: 5200, category: "Salary",         type: "income"  },
  { id: "t002", date: "2026-01-03", description: "Grocery Store",         amount: 142,  category: "Food & Dining",  type: "expense" },
  { id: "t003", date: "2026-01-05", description: "Uber Ride",             amount: 18,   category: "Transport",      type: "expense" },
  { id: "t004", date: "2026-01-07", description: "Netflix Subscription",  amount: 15,   category: "Entertainment",  type: "expense" },
  { id: "t005", date: "2026-01-08", description: "Freelance Web Project", amount: 800,  category: "Freelance",      type: "income"  },
  { id: "t006", date: "2026-01-10", description: "Electric Bill",         amount: 95,   category: "Utilities",      type: "expense" },
  { id: "t007", date: "2026-01-12", description: "Restaurant Dinner",     amount: 68,   category: "Food & Dining",  type: "expense" },
  { id: "t008", date: "2026-01-15", description: "Doctor Visit",          amount: 120,  category: "Healthcare",     type: "expense" },
  { id: "t009", date: "2026-01-18", description: "Amazon Purchase",       amount: 89,   category: "Shopping",       type: "expense" },
  { id: "t010", date: "2026-01-20", description: "Internet Bill",         amount: 50,   category: "Utilities",      type: "expense" },
  { id: "t011", date: "2026-01-22", description: "Coffee Shop",           amount: 28,   category: "Food & Dining",  type: "expense" },
  { id: "t012", date: "2026-01-25", description: "Bus Pass",              amount: 40,   category: "Transport",      type: "expense" },
  { id: "t013", date: "2026-01-28", description: "Pharmacy",              amount: 35,   category: "Healthcare",     type: "expense" },

  // February
  { id: "t014", date: "2026-02-01", description: "Monthly Salary",        amount: 5200, category: "Salary",         type: "income"  },
  { id: "t015", date: "2026-02-03", description: "Grocery Store",         amount: 155,  category: "Food & Dining",  type: "expense" },
  { id: "t016", date: "2026-02-05", description: "Freelance Logo Design", amount: 450,  category: "Freelance",      type: "income"  },
  { id: "t017", date: "2026-02-07", description: "Spotify Premium",       amount: 10,   category: "Entertainment",  type: "expense" },
  { id: "t018", date: "2026-02-10", description: "Gas Bill",              amount: 110,  category: "Utilities",      type: "expense" },
  { id: "t019", date: "2026-02-12", description: "Movie Tickets",         amount: 45,   category: "Entertainment",  type: "expense" },
  { id: "t020", date: "2026-02-14", description: "Valentine Dinner",      amount: 120,  category: "Food & Dining",  type: "expense" },
  { id: "t021", date: "2026-02-18", description: "Clothing Store",        amount: 210,  category: "Shopping",       type: "expense" },
  { id: "t022", date: "2026-02-20", description: "Taxi",                  amount: 25,   category: "Transport",      type: "expense" },
  { id: "t023", date: "2026-02-22", description: "Gym Membership",        amount: 45,   category: "Healthcare",     type: "expense" },
  { id: "t024", date: "2026-02-26", description: "Internet Bill",         amount: 50,   category: "Utilities",      type: "expense" },

  // March
  { id: "t025", date: "2026-03-01", description: "Monthly Salary",        amount: 5200, category: "Salary",         type: "income"  },
  { id: "t026", date: "2026-03-02", description: "Freelance App Dev",     amount: 1200, category: "Freelance",      type: "income"  },
  { id: "t027", date: "2026-03-04", description: "Grocery Store",         amount: 130,  category: "Food & Dining",  type: "expense" },
  { id: "t028", date: "2026-03-06", description: "Fuel",                  amount: 55,   category: "Transport",      type: "expense" },
  { id: "t029", date: "2026-03-09", description: "Electric Bill",         amount: 88,   category: "Utilities",      type: "expense" },
  { id: "t030", date: "2026-03-11", description: "Online Course",         amount: 79,   category: "Entertainment",  type: "expense" },
  { id: "t031", date: "2026-03-14", description: "Lunch Meeting",         amount: 52,   category: "Food & Dining",  type: "expense" },
  { id: "t032", date: "2026-03-17", description: "Prescription Meds",     amount: 42,   category: "Healthcare",     type: "expense" },
  { id: "t033", date: "2026-03-20", description: "Electronics Shop",      amount: 340,  category: "Shopping",       type: "expense" },
  { id: "t034", date: "2026-03-24", description: "Internet Bill",         amount: 50,   category: "Utilities",      type: "expense" },
  { id: "t035", date: "2026-03-28", description: "Weekend Brunch",        amount: 38,   category: "Food & Dining",  type: "expense" },

  // April
  { id: "t036", date: "2026-04-01", description: "Monthly Salary",        amount: 5200, category: "Salary",         type: "income"  },
  { id: "t037", date: "2026-04-02", description: "Grocery Store",         amount: 118,  category: "Food & Dining",  type: "expense" },
  { id: "t038", date: "2026-04-03", description: "Uber Ride",             amount: 22,   category: "Transport",      type: "expense" },
  { id: "t039", date: "2026-04-03", description: "Freelance Consulting",  amount: 600,  category: "Freelance",      type: "income"  },
  { id: "t040", date: "2026-04-04", description: "Electric Bill",         amount: 92,   category: "Utilities",      type: "expense" },
  { id: "t041", date: "2026-04-05", description: "Coffee Shop",           amount: 14,   category: "Food & Dining",  type: "expense" },
  { id: "t042", date: "2026-04-05", description: "New Sneakers",          amount: 155,  category: "Shopping",       type: "expense" },
];

// Helper: compute monthly summaries
export function getMonthlyData(transactions) {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const map = {};
  transactions.forEach((t) => {
    const m = new Date(t.date).getMonth();
    if (!map[m]) map[m] = { month: months[m], income: 0, expense: 0 };
    if (t.type === "income") map[m].income += t.amount;
    else map[m].expense += t.amount;
  });
  return Object.values(map).map((d) => ({ ...d, balance: d.income - d.expense }));
}

// Helper: spending by category
export function getCategoryTotals(transactions) {
  const map = {};
  transactions
    .filter((t) => t.type === "expense")
    .forEach((t) => {
      map[t.category] = (map[t.category] || 0) + t.amount;
    });
  return Object.entries(map)
    .map(([category, amount]) => ({ category, amount }))
    .sort((a, b) => b.amount - a.amount);
}
