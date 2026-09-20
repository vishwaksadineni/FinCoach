from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from financial_engine import calculate_financials


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

    result = calculate_financials(
        profile.income,
        profile.expenses,
        profile.savings,
        profile.emi
    )

    return result