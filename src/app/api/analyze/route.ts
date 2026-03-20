import Antropic from "@anthropic-ai/sdk";
import { NextResponse, NextRequest } from "next/server";
import { AnalyzeRequest, AnalyzeResult } from "@/types";

const client = new Antropic(
    { apiKey: process.env.ANTHROPIC_API_KEY }
)

const SYSTEM_PROMPT = `You are an expert CV coach and ATS (Applicant Tracking System) specialist.
Analyze the provided CV against the job posting and return ONLY a valid JSON object with no extra text, markdown, or explanation.
 
The JSON must follow this exact schema:
{
  "score": <integer 0-100 representing overall match>,
  "matched_keywords": <array of strings — keywords/skills found in both CV and job posting>,
  "missing_keywords": <array of strings — important keywords from the job posting missing from the CV>,
  "suggestions": <array of objects with "original", "rewritten", "reason" — 2-4 CV bullet rewrites that add missing keywords and metrics>,
  "summary": <string — 2-3 sentence plain-language feedback on the match>
}`;

export async function POST(request: NextRequest) {
    try {
        const { cvText, jobPosting }: AnalyzeRequest = await request.json();
        if (!cvText.trim() || !jobPosting.trim()) {
            return NextResponse.json({ error: "CV text and job posting are required." }, { status: 400 });
        }

        const message = await client.messages.create({
            model: "claude-sonnet-4-6",
            max_tokens: 1500,
            system: SYSTEM_PROMPT,
            messages: [{
                role: "user",
                content: `JOB POSTING:\n${jobPosting}\n\n---\n\nCV:\n${cvText}`,
            }]
        });

        const rawText = message.content[0].type === "text" ? message.content[0].text : "";
        const jsonText = rawText.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "").trim();
        const result: AnalyzeResult = JSON.parse(jsonText);

        return NextResponse.json(result);
    } catch (error) {
        console.error("Error analyzing CV:", error);
        return NextResponse.json({ error: "Failed to analyze CV. Please try again." }, { status: 500 });
    }
}