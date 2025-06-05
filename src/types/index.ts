export interface TypeLoginFormInputs {
    username: string;
    password: string;
}

export interface ErrorResponse{
     detail:string,
     message:string
}

export interface LoginResponse {
    access_token: string;
    token_type: string;
    expires_in: number;
    refresh_token: string;
    scope: string;
}

export interface userProfile{
  idUser: number;
  email: string;
  username: string;
  role: string;
  isActive: boolean;
  last_name: string;
  name:string;
  creattionDate: string;
  modificationDate: string;
};

export interface responseHistory{
    _id: string,
    idPeticion: number,
    idUser: number,
    estado: string,
    archivos: number[],
    intentos: number,
    fecha:string,
    timestamp: string,
}

export interface responseFiles{
    namefile: string,
}

export interface dataEmail{
    to: {
        email: string;
        name: string;
    }[],
    subject: string;
    body: string;
    file_links: any ;
}