import { useState } from "react";

function App() {
  const [income, setIncome] = useState("");
  const [expenses, setExpenses] = useState("");
  const [savings, setSavings] = useState("");
  const [emi, setEmi] = useState("");
  const [result, setResult] = useState(null);

  return (
    <div>
      <h1>FinCoach</h1>

      <p>Learn how your financial decisions affect your future.</p>

      <div>
        <label>Monthly Income</label>
        <input
          type="number"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
          placeholder="25000"
        />
      </div>

      <div>
        <label>Monthly Expenses</label>
        <input
          type="number"
          value={expenses}
          onChange={(e) => setExpenses(e.target.value)}
          placeholder="13000"
        />
      </div>

      <div>
        <label>Savings</label>
        <input
          type="number"
          value={savings}
          onChange={(e) => setSavings(e.target.value)}
          placeholder="40000"
        />
      </div>

      <div>
        <label>Monthly EMI</label>
        <input
          type="number"
          value={emi}
          onChange={(e) => setEmi(e.target.value)}
          placeholder="3000"
        />
      </div>

      <button
        onClick={async () => {
    const response = await fetch("http://127.0.0.1:8000/simulate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        income: Number(income),
        expenses: Number(expenses),
        savings: Number(savings),
        emi: Number(emi),
      }),
    });

    const data = await response.json();

    setResult(data);
  }}
>
  Simulate My Finances
</button>
{result && (
  <div>
    <h2>Your Financial Results</h2>

    <p>
      Monthly Surplus: ₹{result.monthly_surplus}
    </p>

    <p>
      Emergency Coverage: {result.emergency_months} months
    </p>

    <p>
      Debt Burden: {result.debt_burden_percent}%
    </p>
  </div>
)}
    </div>
  );
}

export default App;