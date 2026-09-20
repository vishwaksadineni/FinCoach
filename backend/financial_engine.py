def calculate_financials(income, expenses, savings, emi):
    """
    Calculate financial metrics, financial health,
    and an easy-to-understand explanation.
    """

    # --------------------------------
    # Input validation
    # --------------------------------

    if income <= 0:
        raise ValueError("Monthly income must be greater than ₹0.")

    if expenses < 0:
        raise ValueError("Monthly expenses cannot be negative.")

    if savings < 0:
        raise ValueError("Savings cannot be negative.")

    if emi < 0:
        raise ValueError("EMI cannot be negative.")

    if expenses == 0:
        raise ValueError("Monthly expenses must be greater than ₹0.")

    # --------------------------------
    # Financial calculations
    # --------------------------------

    # Money remaining after expenses and EMI
    monthly_surplus = income - expenses - emi

    # Number of months savings can cover expenses
    emergency_months = savings / expenses

    # Percentage of income used for EMI
    debt_burden_percent = (emi / income) * 100

    # --------------------------------
    # Financial health
    # --------------------------------

    if monthly_surplus < 0:
        financial_health = "High Risk"

    elif debt_burden_percent > 40 or emergency_months < 3:
        financial_health = "Needs Attention"

    else:
        financial_health = "Healthy"

    # --------------------------------
    # Explanation
    # --------------------------------

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
            f"Your savings currently cover about "
            f"{round(emergency_months, 2)} months of expenses. "
            f"Building more emergency savings could improve your financial cushion."
        )

    else:

        explanation = (
            f"Your monthly surplus is ₹{round(monthly_surplus, 2)}, "
            f"your savings cover about {round(emergency_months, 2)} months "
            f"of expenses, and your EMI uses "
            f"{round(debt_burden_percent, 2)}% of your income."
        )

    # --------------------------------
    # Return results
    # --------------------------------

    return {
        "monthly_surplus": round(monthly_surplus, 2),
        "emergency_months": round(emergency_months, 2),
        "debt_burden_percent": round(debt_burden_percent, 2),
        "financial_health": financial_health,
        "explanation": explanation
    }