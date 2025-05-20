"use server"

import { LoginResponse } from "@/types";

import { createSession, deleteSession } from "../auth/state-sesion";


export const handleLogin = async (token: LoginResponse) => {
  await createSession(token)  
}

export const handleLogout = async () => {
  await deleteSession()
}

export async function getUser() {
  // const res = await fetch('https://external-service.com/data', {
  //   headers: {
  //     authorization: process.env.API_KEY,
  //   },
  // })
 
  // return res.json()
}