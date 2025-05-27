"use server"
import { cache } from 'react';

import { LoginResponse } from "@/types";

import { createSession, deleteSession, verifySession } from "../auth/state-sesion";
import { decodeJwt } from 'jose';
import { newUserFormInputs } from '@/schemas/newUserSchema';

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
  console.log(access_token)
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

// export const getUsers = async () => {
  
//   const dataVerify = await verifySession()
//   const {access_token} = dataVerify
//   console.log(access_token)
//   const response = await fetch(`${API_URL_BASE}/users`, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded',
//       'Authorization': `Bearer ${access_token}`,
//     },
//   })
//   const result = await response.json()
//   return result
// }

export const getUserEdit = async (idUser: number) => {
  const dataVerify = await verifySession()
  const {access_token} = dataVerify

  const response = await fetch(`${API_URL_BASE}/users/${idUser}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Bearer ${access_token}`,
    },
  })
  const result = await response.json()
  return result
}

export const createUser = async (data: newUserFormInputs) => {
  const dataVerify = await verifySession()
  const {access_token} = dataVerify

  const response = await fetch(`${API_URL_BASE}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Bearer ${access_token}`,
    },
     body: JSON.stringify(data)
  })
  const result = await response.json()
  return result
}

export const updateUser = async ( idUser: number, data: newUserFormInputs) => {
  const dataVerify = await verifySession()
  const {access_token} = dataVerify
  console.log("idUser: ", idUser)
  console.log("data: ", data)

 
  const response = await fetch(`${API_URL_BASE}/users/${idUser}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${access_token}`,
    },
     body: data,
  })
  console.log("Response: ", response)
  const result = await response.json()
  console.log("result: ", result)
  return result
}