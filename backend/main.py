from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from financial_engine import calculate_financials
from bedrock_service import generate_financial_explanation


app = FastAPI(title="FinCoach API")


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class FinancialProfile(BaseModel):
    income: float = Field(gt=0)
    expenses: float = Field(gt=0)
    savings: float = Field(ge=0)
    emi: float = Field(ge=0)


@app.get("/")
def home():
    return {
        "message": "FinCoach API is running!"
    }


@app.post("/simulate")
def simulate(profile: FinancialProfile):

    # --------------------------------
    # Deterministic financial engine
    # --------------------------------

    result = calculate_financials(
        profile.income,
        profile.expenses,
        profile.savings,
        profile.emi
    )

    # --------------------------------
    # AI explanation
    # --------------------------------

    try:
        ai_explanation = generate_financial_explanation(
            profile.income,
            profile.expenses,
            profile.savings,
            profile.emi,
            result["monthly_surplus"],
            result["emergency_months"],
            result["debt_burden_percent"],
            result["financial_health"],
        )

        result["explanation"] = ai_explanation

    except Exception as error:
        # Keep the deterministic explanation if Bedrock
        # is temporarily unavailable.
        print(f"Bedrock explanation failed: {error}")

    return result