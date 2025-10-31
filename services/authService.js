function randomString(len = 40) {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return Array(len).fill().map(() => chars[Math.floor(Math.random()*chars.length)]).join("");
}

function fakeJWT(payloadObj = {}, expiresInSeconds = 300) {
  const header = { alg: "HS256", typ: "JWT" };
  const payload = { ...payloadObj, exp: Math.floor(Date.now() / 1000) + expiresInSeconds };

  const encode = (obj) => Buffer.from(JSON.stringify(obj)).toString("base64").replace(/=/g, "");

  return `${encode(header)}.${encode(payload)}.${randomString(16)}`;
}

function wait(ms = 500) {
  return new Promise((res) => setTimeout(res, ms));
}

const usersDB = {};

export async function registerApi({ name, email, password }) {
  await wait(400);
  if (usersDB[email]) throw new Error("User already exists");

  usersDB[email] = { name, password };
  return true;
}

export async function loginApi({ email, password }) {
  await wait(400);
  const user = usersDB[email];
  if (!user || user.password !== password) throw new Error("Invalid credentials");

  return {
    user: { name: user.name, email },
    accessToken: fakeJWT({ email }, 300),
    refreshToken: randomString(40),
    expiresAt: Date.now() + 300 * 1000,
  };
}

export async function refreshTokenApi({ refreshToken }) {
  await wait(400);
  if (!refreshToken) throw new Error("Invalid refresh");

  return {
    accessToken: fakeJWT({ refreshed: true }, 300),
    refreshToken: randomString(40),
    expiresAt: Date.now() + 300 * 1000,
  };
}
