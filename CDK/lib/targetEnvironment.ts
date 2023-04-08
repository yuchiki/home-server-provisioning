export const TargetEnvironment = {
    Production: "production", // 本番
    Staging: "staging", // 予約
    Development: "development" // 開発者が手元で叩いて動作確認をするときなどに使う想定
} as const;

export type TargetEnvironment = (typeof TargetEnvironment)[keyof typeof TargetEnvironment];
