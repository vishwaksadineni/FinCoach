import { useState } from "react";
import "./App.css";

function App() {
  const [income, setIncome] = useState("");
  const [expenses, setExpenses] = useState("");
  const [savings, setSavings] = useState("");
  const [emi, setEmi] = useState("");
  const [result, setResult] = useState(null);

  const simulateFinances = async () => {
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
  };

  return (
    <div className="app">
      <div className="container">

        <div className="hero">
          <h1>FinCoach</h1>
          <p>
            Learn how your financial decisions affect your future.
          </p>
        </div>

        <div className="form-card">

          <div className="form-grid">

            <div className="input-group">
              <label>Monthly Income</label>
              <input
                type="number"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                placeholder="25000"
              />
            </div>

            <div className="input-group">
              <label>Monthly Expenses</label>
              <input
                type="number"
                value={expenses}
                onChange={(e) => setExpenses(e.target.value)}
                placeholder="13000"
              />
            </div>

            <div className="input-group">
              <label>Savings</label>
              <input
                type="number"
                value={savings}
                onChange={(e) => setSavings(e.target.value)}
                placeholder="40000"
              />
            </div>

            <div className="input-group">
              <label>Monthly EMI</label>
              <input
                type="number"
                value={emi}
                onChange={(e) => setEmi(e.target.value)}
                placeholder="3000"
              />
            </div>

          </div>

          <button
            className="simulate-button"
            onClick={simulateFinances}
          >
            Simulate My Finances
          </button>

        </div>

        {result && (
          <div className="results">

            <h2>Your Financial Results</h2>

            <div className="results-grid">

              <div className="result-card">
                <h3>Monthly Surplus</h3>
                <p>₹{result.monthly_surplus}</p>
              </div>

              <div className="result-card">
                <h3>Emergency Coverage</h3>
                <p>{result.emergency_months} months</p>
              </div>

              <div className="result-card">
                <h3>Debt Burden</h3>
                <p>{result.debt_burden_percent}%</p>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}

export default App;