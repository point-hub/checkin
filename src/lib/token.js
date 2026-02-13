function decodeTokenPayload(token) {
  if (!token || typeof token !== "string") {
    return null;
  }

  const parts = token.split(".");
  if (parts.length !== 3) {
    return null;
  }

  try {
    const payload = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const paddedPayload = payload.padEnd(
      payload.length + ((4 - (payload.length % 4)) % 4),
      "="
    );
    const decodedPayload = atob(paddedPayload);
    return JSON.parse(decodedPayload);
  } catch (error) {
    return null;
  }
}

export function getTokenExpiryTimestamp(token) {
  const payload = decodeTokenPayload(token);

  if (!payload || typeof payload.exp !== "number") {
    return null;
  }

  return payload.exp * 1000;
}

export function isTokenExpired(token) {
  const tokenExpiry = getTokenExpiryTimestamp(token);

  if (!tokenExpiry) {
    return false;
  }

  return Date.now() >= tokenExpiry;
}
