def calculate_financials(income, expenses, savings, emi):
    """
    Calculate financial metrics, health status, and a simple explanation.
    """

    # Monthly money left after expenses and EMI
    monthly_surplus = income - expenses - emi

    # How many months savings can cover expenses
    if expenses > 0:
        emergency_months = savings / expenses
    else:
        emergency_months = 0

    # Percentage of income going toward EMI
    if income > 0:
        debt_burden_percent = (emi / income) * 100
    else:
        debt_burden_percent = 0

    # Determine financial health
    if monthly_surplus < 0:
        financial_health = "High Risk"
    elif debt_burden_percent > 40 or emergency_months < 3:
        financial_health = "Needs Attention"
    else:
        financial_health = "Healthy"

    # Generate explanation
    if monthly_surplus < 0:
        explanation = (
            f"Your monthly expenses and EMI are higher than your income. "
            f"You have a monthly deficit of ₹{abs(round(monthly_surplus, 2))}. "
            f"Consider reducing expenses or choosing a lower EMI."
        )

    elif debt_burden_percent > 40:
        explanation = (
            f"Your EMI uses {round(debt_burden_percent, 2)}% of your monthly income. "
            f"This is a relatively high share of income going toward debt."
        )

    elif emergency_months < 3:
        explanation = (
            f"Your savings currently cover about {round(emergency_months, 2)} months "
            f"of expenses. Building more emergency savings could improve your financial cushion."
        )

    else:
        explanation = (
            f"Your monthly surplus is ₹{round(monthly_surplus, 2)}, "
            f"your savings cover about {round(emergency_months, 2)} months of expenses, "
            f"and your EMI uses {round(debt_burden_percent, 2)}% of your income."
        )

    return {
        "monthly_surplus": round(monthly_surplus, 2),
        "emergency_months": round(emergency_months, 2),
        "debt_burden_percent": round(debt_burden_percent, 2),
        "financial_health": financial_health,
        "explanation": explanation
    }