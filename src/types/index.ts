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
    idUser:number,
    email:string,
    username:string,
    role:string,
}

export interface responseHistory{
    idRecord: number,
    idUser: number,
    namefile: string,
    state: string
}