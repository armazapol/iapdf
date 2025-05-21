"use server"
import { cache } from 'react';

import { LoginResponse } from "@/types";

import { createSession, deleteSession, verifySession } from "../auth/state-sesion";
import { decodeJwt } from 'jose';
const API_URL_BASE = process.env.NEXT_PUBLIC_API_URL;


export const handleLogin = async (token: LoginResponse) => {
  await createSession(token)  
}

export const handleLogout = async () => {
  await deleteSession()
}

export const getUser = cache(async () => {
  const dataVerify = await verifySession()
  const {access_token} = dataVerify
  const payload = decodeJwt(access_token.toString())
  const {idUser} = payload
  const response = await fetch(`${API_URL_BASE}/users/${idUser}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Bearer ${access_token}`,
    },
  })
  const result = await response.json()
  return result

})