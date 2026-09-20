import json

from financial_engine import calculate_financials


def load_profile():
    with open("profile.json", "r") as file:
        return json.load(file)


def main():
    profile = load_profile()

    result = calculate_financials(
        profile["income"],
        profile["expenses"],
        profile["savings"],
        profile["emi"]
    )

    print("FinCoach Financial Results")
    print("--------------------------")

    print(
        f"Monthly surplus: ₹{result['monthly_surplus']}"
    )

    print(
        f"Emergency coverage: "
        f"{result['emergency_months']} months"
    )

    print(
        f"Debt burden: "
        f"{result['debt_burden_percent']}%"
    )


if __name__ == "__main__":
    main()