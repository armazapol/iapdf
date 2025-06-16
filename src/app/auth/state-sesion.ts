import "server-only";

import type { SessionPayload } from "@/schemas/loginSchema";
import { SignJWT, decodeJwt, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const secretKey = process.env.NEXT_PUBLIC_SECRET;
const key = new TextEncoder().encode(secretKey);

// const cookieStore = await cookies();

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24hr")
    .sign(key);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, key, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function createSession(token: SessionPayload) {
  const expiresAtDefault = new Date(Date.now() + 60 * 60 * 1000 * 24); // 24 hours
  // const {exp} = decodeJwt(token.access_token.toString());
  // const expDate = new Date(exp|| 0 ); // Convert seconds to milliseconds
  // console.log(exp, "expiresAt")
  const encryptedSession = await encrypt(token);
  const cookieStore = await cookies();
  cookieStore.set("session", encryptedSession, {
    httpOnly: true,
    secure: true,
    expires: expiresAtDefault,
    sameSite: "lax",
    path: "/",
  });

  redirect("/home");
}

export async function verifySession() {
  const cookieStore = await cookies();
  const cookie = cookieStore.get("session")?.value;
  const session = await decrypt(cookie);

  if (!session?.access_token) {
    redirect("/login");
  }
  const payload = decodeJwt(session.access_token.toString());
  const { idUser } = payload;
  return { isAuth: true, access_token: session.access_token, idUser };
}

export async function updateSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;
  const payload = await decrypt(session);

  if (!session || !payload) {
    return null;
  }

  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  cookieStore.set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expires,
    sameSite: "lax",
    path: "/",
  });
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
  redirect("/login");
}
