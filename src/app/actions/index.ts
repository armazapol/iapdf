"use server";
import { cache } from "react";

import { dataEmail, GetRolesResponse, LoginResponse } from "@/types";

import {
  createSession,
  deleteSession,
  verifySession,
} from "../auth/state-sesion";
import { newUserFormInputs } from "@/schemas/newUserSchema";

import { verifyCaptchaToken } from "@/utils/captcha";
import { rolInputs } from "@/schemas/rolSchema";
import { parseFormatToPayload } from "@/utils/parseFormat";
const API_URL_BASE = process.env.NEXT_PUBLIC_API_URL;

export const handleLogin = async (token: LoginResponse) => {
  await createSession(token);
};

export const handleLogout = async () => {
  await deleteSession();
};

export const getPermissions = cache(async () => {
  const dataVerify = await verifySession();
  const { access_token, idUser } = dataVerify;
  const response = await fetch(`${API_URL_BASE}/users/${idUser}/permissions`, {
    method: "GET",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${access_token}`,
    },
  });
  const result = await response.json();
  return result;
});

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

export const uploadFiles = async (formData: FormData) => {
  const dataVerify = await verifySession();
  const { access_token } = dataVerify;

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

export const getHistory = async (dateParams:{
  startDate?: string;
  endDate?: string;
  idNewUser?: number;
} ={}) => {
  const dataVerify = await verifySession();
  const { access_token, idUser } = dataVerify;
  
  const urlIdUser = dateParams.idNewUser || idUser;
  try {

    const url = new URL(`${API_URL_BASE}/history/${urlIdUser}`);
    if (dateParams.startDate) url.searchParams.append("start_date", parseFormatToPayload(dateParams.startDate));
    if (dateParams.endDate) url.searchParams.append("end_date", parseFormatToPayload(dateParams.endDate));

    const response = await fetch(url, {
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
  const dataVerify = await verifySession();
  const { access_token } = dataVerify;
 
  const response = await fetch(`${API_URL_BASE}/users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${access_token}`,
    },
  });
  const result = await response.json();
  return result;
};

export const getUser2 = async (idUser: number) => {
  const dataVerify = await verifySession();
  const { access_token } = dataVerify;

  const response = await fetch(`${API_URL_BASE}/users/${idUser}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${access_token}`,
    },
  });
  const result = await response.json();
  return result;
};

export const loginCaptchaAction = async (token: string | null) => {
  if (!token) {
    return {
      success: false,
      messager: "Token not found",
    };
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
    success: true,
    message: "Message ssent successfully",
  };
};

export const createUser = async (data: newUserFormInputs) => {
  const dataVerify = await verifySession();
  const { access_token } = dataVerify;

  const response = await fetch(`${API_URL_BASE}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
     body: JSON.stringify(data)
  })
  const result = await response.json()
  // if (!response.ok) throw new Error(result.detail);
  return result
}

export const updateUser = async (idUser: number, data: newUserFormInputs) => {
  const dataVerify = await verifySession();
  const { access_token } = dataVerify;

  const response = await fetch(`${API_URL_BASE}/users/${idUser}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.detail);
  return result;
};

export const getRoles = async ( dateParam?: {only_active:string} ): Promise<GetRolesResponse> => {
  
  const dataVerify = await verifySession();
  const { access_token } = dataVerify;

  const url = new URL(`${API_URL_BASE}/roles`);
  // url.searchParams.append("only_active", "true")

  if(dateParam){
     url.searchParams.append("only_active", dateParam.only_active)
  }
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  });

  const result = await response.json();
  if (!response.ok) throw new Error(result.detail);
  return result;
};

export const createRol = async (data: rolInputs) => {
  const dataVerify = await verifySession();
  const { access_token } = dataVerify;

  const response = await fetch(`${API_URL_BASE}/roles`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.detail);
  return result;
};

export const editRol = async (id:number, data:rolInputs) => {
  const dataVerify = await verifySession()
  const {access_token} = dataVerify

  const response = await fetch(`${API_URL_BASE}/roles/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${access_token}`,
    },
    body: JSON.stringify(data)
  })
  const result = await response.json()
  if (!response.ok) throw new Error(result.detail);
  return result
}

export const assignUserRole = async(idUser: number, role: string) => {
   const dataVerify = await verifySession()
  const {access_token} = dataVerify
  const response = await fetch(`${API_URL_BASE}/users/${idUser}/assign-role`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${access_token}`,
    },
    body: JSON.stringify({ role })
  })
  const result = await response.json()
  if (!response.ok) throw new Error(result.detail);
  // console.log("Result: ", result)
  return result
}

export const getIncidents = async () => {
  const dataVerify = await verifySession();
  const { access_token, idUser } = dataVerify;

  try {
    const response = await fetch(`${API_URL_BASE}/incidents/${idUser}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
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

export const getDownloadZIP = async (idPDF: number) => {
  const dataVerify = await verifySession();
  const { access_token } = dataVerify;
  try {
    const response = await fetch(
      `${API_URL_BASE}/bucket/download-zip/${idPDF}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/octet-stream",
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    if (!response.ok) throw new Error("Error en la respuesta del servidor");
    const nameFile = response.headers.get("content-disposition")?.split("filename=")[1] || "download.zip";
    const blob = await response.blob();
    return {blob, nameFile};
  } catch (error) {
    console.error("Error get history:", error);
    throw error;
  }
};

export const getFiles = async (idProcess: number) => {
  const dataVerify = await verifySession();
  const { access_token } = dataVerify;

  try {
    const response = await fetch(
      `${API_URL_BASE}/history/process/files/${idProcess}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        cache: "no-store",
      }
    );
    if (!response.ok) throw new Error("Error en la respuesta del servidor");

    return await response.json();
  } catch (error) {
    console.error("Error get history:", error);
    throw error;
  }
};

export const getDownloadFile = async (namefile: string) => {
  const dataVerify = await verifySession();
  const { access_token } = dataVerify;
  try {
    const response = await fetch(
      `${API_URL_BASE}/bucket/download-response/${namefile}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/octet-stream",
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    if (!response.ok) throw new Error("Error en la respuesta del servidor");

    const blob = await response.blob();
    return blob;
  } catch (error) {
    console.error("Error get history:", error);
    throw error;
  }
};




export const sendEmail = async (data: dataEmail) => {
  const dataVerify = await verifySession();
  const { access_token } = dataVerify;

  const response = await fetch(`${API_URL_BASE}/send-email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
     body: JSON.stringify(data)
  })
  const result = await response.json()
  // if (!response.ok) throw new Error(result.detail);
  return result
}