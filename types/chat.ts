export interface ChatMessage {
    id: string;
    username: string;
    content: string;
    timestamp: number;
    deleted?: boolean;
    ip?: string;
    userAgent?: string;
}

export interface UserBanStatus {
    warnings: number;
    bannedUntil: number | null;
    permanentBan: boolean;
}

export const BAD_WORDS = [
    // Insults
    "bitch",
    "cunt",
    "whore",
    "slut",
    "bastard",
    "motherfucker",
    "asshole",
    "dumbass",
    "shithead",
    "cocksucker",
    "wanker",
    "twat",
    "prick",
    // Slurs and hate speech
    "nigger",
    "nigga",
    "negro",
    "coon",
    "faggot",
    "fag",
    "dyke",
    "retard",
    "retarded",
    "tranny",
    "trannie",
    "shemale",
    "chink",
    "gook",
    "spic",
    "wetback",
    "beaner",
    "kike",
    "towelhead",
    "sandnigger",
    "raghead",
    "pajeet",
    "curry",
    // Off-topic sexual content
    "porn",
    "sex",
    "nude",
    "naked",
    "penis",
    "vagina",
    "anal",
    "blowjob",
    "horny",
    "masturbate",
    "jerk off",
    "jerkoff",
    "cum",
    "orgasm",
    "erection",
    "handjob",
    "titties",
    "boobs",
    "tits",
    "breasts",
    // Sexual violence
    "rape",
    "raping",
    "rapist",
    "molest",
    "pedophile",
    "pedo",
    "child porn",
    "cp",
    // Violence/Threats
    "kys",
    "kill yourself",
    "shoot yourself",
    "hang yourself",
    "stfu",
    "shut the fuck up",
    // Nazi/Holocaust/Political extremism
    "hitler",
    "nazi",
    "heil",
    "holocaust",
    "jew",
    "swastika",
    "gas chamber",
    "kkk",
    // German insults and slurs
    "hurensohn",
    "arschloch",
    "fotze",
    "wichser",
    "nutte",
    "schlampe",
    "mongo",
    "spast",
    "missgeburt",
    "kanacke",
    "zigeuner",
    "schwuchtel",
];
