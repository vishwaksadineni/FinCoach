import { useState } from "react";
import "./App.css";

function App() {
  const [income, setIncome] = useState("");
  const [expenses, setExpenses] = useState("");
  const [savings, setSavings] = useState("");
  const [emi, setEmi] = useState(3000);
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

            {/* Monthly Income */}
            <div className="input-group">
              <label>Monthly Income</label>

              <input
                type="number"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                placeholder="25000"
              />
            </div>

            {/* Monthly Expenses */}
            <div className="input-group">
              <label>Monthly Expenses</label>

              <input
                type="number"
                value={expenses}
                onChange={(e) => setExpenses(e.target.value)}
                placeholder="13000"
              />
            </div>

            {/* Savings */}
            <div className="input-group">
              <label>Savings</label>

              <input
                type="number"
                value={savings}
                onChange={(e) => setSavings(e.target.value)}
                placeholder="40000"
              />
            </div>

            {/* EMI Slider */}
            <div className="input-group">
              <label>Monthly EMI: ₹{emi}</label>

              <input
                type="range"
                min="1000"
                max="15000"
                step="500"
                value={emi}
                onChange={(e) => setEmi(Number(e.target.value))}
              />

              <div className="slider-labels">
                <span>₹1,000</span>
                <span>₹15,000</span>
              </div>
            </div>

          </div>

          <button
            className="simulate-button"
            onClick={simulateFinances}
          >
            Simulate My Finances
          </button>

        </div>

        {/* Results */}
        {result && (
          <div className="results">

            <h2>Your Financial Results</h2>

            <div className="results-grid">

              {/* Monthly Surplus */}
              <div className="result-card">
                <h3>Monthly Surplus</h3>
                <p>₹{result.monthly_surplus}</p>
              </div>

              {/* Emergency Coverage */}
              <div className="result-card">
                <h3>Emergency Coverage</h3>
                <p>{result.emergency_months} months</p>
              </div>

              {/* Debt Burden */}
              <div className="result-card">
                <h3>Debt Burden</h3>
                <p>{result.debt_burden_percent}%</p>
              </div>

              {/* Financial Health */}
              <div className="result-card">
                <h3>Financial Health</h3>
                <p>{result.financial_health}</p>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}

export default App;