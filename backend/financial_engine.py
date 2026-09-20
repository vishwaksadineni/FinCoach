def calculate_financials(income, expenses, savings, emi):
    """
    Calculate basic financial metrics.
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

    return {
        "monthly_surplus": round(monthly_surplus, 2),
        "emergency_months": round(emergency_months, 2),
        "debt_burden_percent": round(debt_burden_percent, 2)
    }