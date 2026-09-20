import { useState } from "react";
import "./App.css";

function App() {
  const [income, setIncome] = useState("");
  const [expenses, setExpenses] = useState("");
  const [savings, setSavings] = useState("");
  const [emi, setEmi] = useState(3000);

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const simulateFinances = async () => {
    setError("");

    const incomeValue = Number(income);
    const expensesValue = Number(expenses);
    const savingsValue = Number(savings);
    const emiValue = Number(emi);

    // Frontend validation
    if (!income || incomeValue <= 0) {
      setError("Monthly income must be greater than ₹0.");
      return;
    }

    if (expenses === "" || expensesValue < 0) {
      setError("Monthly expenses cannot be negative.");
      return;
    }

    if (expensesValue === 0) {
      setError("Monthly expenses must be greater than ₹0.");
      return;
    }

    if (savings === "" || savingsValue < 0) {
      setError("Savings cannot be negative.");
      return;
    }

    if (emiValue < 0) {
      setError("EMI cannot be negative.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/simulate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          income: incomeValue,
          expenses: expensesValue,
          savings: savingsValue,
          emi: emiValue,
        }),
      });

      if (!response.ok) {
        throw new Error("Unable to calculate your financial simulation.");
      }

      const data = await response.json();

      setResult(data);
    } catch (err) {
      setError(
        err.message ||
          "Something went wrong. Please make sure the backend is running."
      );
    }
  };

  return (
    <div className="app">
      <div className="container">
        <header className="hero">
          <h1>FinCoach</h1>
          <p>Understand your finances before making a financial decision.</p>
        </header>

        <section className="form-card">
          <div className="form-grid">
            <div className="input-group">
              <label>Monthly Income (₹)</label>
              <input
                type="number"
                min="1"
                placeholder="25000"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label>Monthly Expenses (₹)</label>
              <input
                type="number"
                min="1"
                placeholder="13000"
                value={expenses}
                onChange={(e) => setExpenses(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label>Savings (₹)</label>
              <input
                type="number"
                min="0"
                placeholder="40000"
                value={savings}
                onChange={(e) => setSavings(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label>Potential EMI (₹)</label>

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
                <strong>₹{emi.toLocaleString("en-IN")}</strong>
                <span>₹15,000</span>
              </div>
            </div>
          </div>

          <button className="simulate-button" onClick={simulateFinances}>
            Simulate This EMI
          </button>
        </section>

        {error && (
          <div className="error-card">
            <strong>Something needs attention</strong>
            <p>{error}</p>
          </div>
        )}

        {result && !error && (
          <section className="results">
            <h2>Simulation Results</h2>

            <div className="results-grid">
              <div className="result-card">
                <h3>Monthly Surplus</h3>
                <p>₹{result.monthly_surplus.toLocaleString("en-IN")}</p>
              </div>

              <div className="result-card">
                <h3>Emergency Coverage</h3>
                <p>{result.emergency_months} months</p>
              </div>

              <div className="result-card">
                <h3>Debt Burden</h3>
                <p>{result.debt_burden_percent}%</p>
              </div>

              <div className="result-card">
                <h3>Financial Health</h3>
                <p>{result.financial_health}</p>
              </div>
            </div>

            <div className="explanation-card">
              <h3>Why this result?</h3>
              <p>{result.explanation}</p>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default App;