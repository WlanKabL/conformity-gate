export interface Evidence {
    id: string;
    title: string;
    category: "visual" | "script" | "character" | "timeline" | "symbols" | "cast-hints";
    description: string;
    details: string;
    evidence: string[];
    imageUrl?: string;
    season?: number;
    episode?: number;
    submittedBy: string;
    submittedDate: string;
    credibility: 1 | 2 | 3 | 4 | 5;
    tags: string[];
}
