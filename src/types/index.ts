export interface AnalyzeResult {
    score: number;
    matched_keywords: string[];
    missing_keywords: string[];
    suggestions: {
        original: string;
        rewritten: string;
        reason: string;
    }[];
    summary: string;
}

export interface AnalyzeRequest {
    cvText: string;
    jobPosting: string;
}