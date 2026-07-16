import crypto from "crypto";

export function profileHash(profile: any): string {
  return crypto
    .createHash("md5")
    .update(JSON.stringify(profile))
    .digest("hex");
}