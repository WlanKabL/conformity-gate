export interface ChatMessage {
    id: string;
    username: string;
    content: string;
    timestamp: number;
    deleted?: boolean;
}

export interface UserBanStatus {
    warnings: number;
    bannedUntil: number | null;
    permanentBan: boolean;
}

export const BAD_WORDS = [
    // Common profanity
    "fuck",
    "shit",
    "ass",
    "bitch",
    "damn",
    "hell",
    "crap",
    "piss",
    "dick",
    "cock",
    "pussy",
    "cunt",
    "whore",
    "slut",
    "bastard",
    "motherfucker",
    "asshole",
    "goddamn",
    // Slurs and hate speech
    "nigger",
    "nigga",
    "faggot",
    "fag",
    "retard",
    "tranny",
    "chink",
    "spic",
    "kike",
    // Sexual/inappropriate
    "porn",
    "xxx",
    "sex",
    "nude",
    "naked",
    "penis",
    "vagina",
    "anal",
    "blowjob",
    // German profanity
    "scheiße",
    "scheisse",
    "fick",
    "hurensohn",
    "arschloch",
    "fotze",
    "wichser",
];
