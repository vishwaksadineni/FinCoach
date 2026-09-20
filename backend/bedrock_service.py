import json

import boto3


# Amazon Nova 2 Lite EU inference profile
MODEL_ID = "eu.amazon.nova-2-lite-v1:0"
AWS_REGION = "eu-north-1"


bedrock_runtime = boto3.client(
    "bedrock-runtime",
    region_name=AWS_REGION,
)


def generate_financial_explanation(
    income,
    expenses,
    savings,
    emi,
    monthly_surplus,
    emergency_months,
    debt_burden_percent,
    financial_health,
):
    """
    Ask Amazon Bedrock to explain already-calculated
    FinCoach financial results in simple language.

    Bedrock does NOT calculate or modify the financial metrics.
    """

    prompt = f"""
You are a financial education assistant for FinCoach.

Explain these already-calculated financial simulation results
in simple language for a beginner.

Monthly income: ₹{income}
Monthly expenses: ₹{expenses}
Monthly EMI: ₹{emi}
Savings: ₹{savings}
Monthly surplus: ₹{monthly_surplus}
Emergency coverage: {emergency_months} months
Debt burden: {debt_burden_percent}%
Financial health: {financial_health}

Write exactly 3 short paragraphs:

Paragraph 1:
Explain what the monthly surplus, emergency coverage, and debt burden numbers mean.

Paragraph 2:
Explain why the financial health is {financial_health}, using only
the financial health value and the numbers provided.

Paragraph 3:
Give exactly one simple practical suggestion related to the numbers.

IMPORTANT:
- The financial calculations have already been completed by FinCoach.
- Do not recalculate or modify any numbers.
- Do not introduce new financial thresholds.
- Do not claim the user saves consistently.
- Do not say an EMI is manageable, affordable, safe, or unaffordable unless that is directly represented by the financial health value.
- Do not introduce investments, taxes, interest rates, returns, or other financial concepts not provided.
- Do not reinterpret emergency coverage.
- Do not use headings, tables, or bullet points.
- Keep the entire response under 100 words.
"""

    request_body = {
        "messages": [
            {
                "role": "user",
                "content": [
                    {
                        "text": prompt
                    }
                ]
            }
        ],
        "inferenceConfig": {
            "maxTokens": 250,
            "temperature": 0.2
        }
    }

    response = bedrock_runtime.invoke_model(
        modelId=MODEL_ID,
        body=json.dumps(request_body),
        contentType="application/json",
        accept="application/json",
    )

    response_body = json.loads(response["body"].read())

    explanation = response_body["output"]["message"]["content"][0]["text"]

    return explanation