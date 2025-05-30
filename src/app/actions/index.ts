"use server";
import { cache } from "react";

import { LoginResponse } from "@/types";

import { createSession, deleteSession, verifySession } from "../auth/state-sesion";
import { newUserFormInputs } from '@/schemas/newUserSchema';

import { verifyCaptchaToken } from "@/utils/captcha";
import { rolInputs } from "@/schemas/rolSchema";
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
  console.log(access_token)
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

export const getUser2 = async (idUser: number) => {
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

export const loginCaptchaAction = async(token: string | null) => {
  if (!token) {
    return {
      success: false,
      messager: "Token not found"
    }
  }

  // Verify the token
  const captchaData = await verifyCaptchaToken(token);

  if (!captchaData) {
    return {
      success: false,
      message: "Captcha Failed",
    };
  }

  if (!captchaData.success || captchaData.score < 0.5) {
    return {
      success: false,
      message: "Captcha Failed",
      errors: !captchaData.success ? captchaData["error-codes"] : undefined,
    };
  }

  return {
    success:true,
    message: "Message ssent successfully",
  }
}

export const createUser = async (data: newUserFormInputs) => {
  const dataVerify = await verifySession()
  const {access_token} = dataVerify

  const response = await fetch(`${API_URL_BASE}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${access_token}`,
    },
     body: JSON.stringify(data)
  })
  const result = await response.json()
  // if (!response.ok) throw new Error(result.detail);
  return result
}

export const updateUser = async ( idUser: number, data: newUserFormInputs) => {
  const dataVerify = await verifySession()
  const {access_token} = dataVerify

  const response = await fetch(`${API_URL_BASE}/users/${idUser}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${access_token}`,
    },
     body: JSON.stringify(data)
  })
  const result = await response.json()
  return result
}


export const getRoles = async () => {
  const dataVerify = await verifySession()
  const {access_token} = dataVerify

  const response = await fetch(`${API_URL_BASE}/roles`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${access_token}`,
    }
  })
  const result = await response.json()
  return result
}

export const createRol = async (rol:string) =>{
  const dataVerify = await verifySession()
  const {access_token} = dataVerify

  const response = await fetch(`${API_URL_BASE}/roles`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${access_token}`,
    },
    body: JSON.stringify({rol})
  })
  const result = await response.json()
  if (!response.ok) throw new Error(result.detail);

  return result
}

export const editRol = async (id:number, data:rolInputs) => {
  const dataVerify = await verifySession()
  const {access_token} = dataVerify

  const response = await fetch(`${API_URL_BASE}/roles${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${access_token}`,
    },
    body: JSON.stringify(data)
  })
  const result = await response.json()
  return result
}