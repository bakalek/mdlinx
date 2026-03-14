import { createHash, timingSafeEqual } from "crypto";

export const ADMIN_AUTH_COOKIE = "mdlinx_admin_session";

function hashValue(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

export function isAdminPasswordSet() {
  return Boolean(process.env.ADMIN_PASSWORD);
}

export function getAdminSessionValue() {
  if (!process.env.ADMIN_PASSWORD) {
    return "";
  }

  return hashValue(process.env.ADMIN_PASSWORD);
}

export function isValidAdminPassword(password: string) {
  const configuredPassword = process.env.ADMIN_PASSWORD;

  if (!configuredPassword) {
    return false;
  }

  const providedHash = Buffer.from(hashValue(password));
  const configuredHash = Buffer.from(hashValue(configuredPassword));

  if (providedHash.length !== configuredHash.length) {
    return false;
  }

  return timingSafeEqual(providedHash, configuredHash);
}

export function isValidAdminSession(sessionValue?: string) {
  if (!sessionValue || !process.env.ADMIN_PASSWORD) {
    return false;
  }

  const providedValue = Buffer.from(sessionValue);
  const expectedValue = Buffer.from(getAdminSessionValue());

  if (providedValue.length !== expectedValue.length) {
    return false;
  }

  return timingSafeEqual(providedValue, expectedValue);
}
