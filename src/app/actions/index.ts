"use server";
import { cache } from "react";

import { LoginResponse } from "@/types";

import {
  createSession,
  deleteSession,
  verifySession,
} from "../auth/state-sesion";
const API_URL_BASE = process.env.NEXT_PUBLIC_API_URL;

export const handleLogin = async (token: LoginResponse) => {
  await createSession(token);
};

export const handleLogout = async () => {
  await deleteSession();
};

export const getUser = cache(async () => {
  const dataVerify = await verifySession();
  const { access_token, idUser } = dataVerify;
  const response = await fetch(`${API_URL_BASE}/users/${idUser}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${access_token}`,
    },
  });
  const result = await response.json();
  return result;
});

export const uploadFiles = async (files: File[]) => {
  const dataVerify = await verifySession();
  const { access_token } = dataVerify;
  const formData = new FormData();

  files.forEach((file) => {
    formData.append("files", file); // Usa 'files[]' si tu backend espera array
  });

  try {
    const response = await fetch(`${API_URL_BASE}/pdf/upload-pdf-template`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      body: formData,
    });
    console.log(response);
    if (!response.ok) throw new Error("Error en la respuesta del servidor");

    return await response.json();
  } catch (error) {
    console.error("Error uploading files:", error);
    throw error;
  }

  // const response = await fetch(`${API_URL_BASE}/pdf/upload-pdf-template`, {
  //   method: "POST",
  //   headers: {
  //     Authorization: `Bearer ${access_token}`,
  //   },
  //   body: formData
  // });
  // const result = await response.json();
  // return result;
};

export const getHistory = async () => {
  const dataVerify = await verifySession();
  const { access_token, idUser } = dataVerify;

  try {
    const response = await fetch(`${API_URL_BASE}/records/${idUser}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${access_token}`,
      },
    });
    // console.log(response);
    if (!response.ok) throw new Error("Error en la respuesta del servidor");

    return await response.json();
  } catch (error) {
    console.error("Error get history:", error);
    throw error;
  }
};

export const getUsers = async () => {
  
  const dataVerify = await verifySession()
  const {access_token} = dataVerify
  
  const response = await fetch(`${API_URL_BASE}/users`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Bearer ${access_token}`,
    },
  })
  const result = await response.json()
  return result
}