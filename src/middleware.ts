import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/app/auth/state-sesion";
import { cookies } from "next/headers";
import { decodeJwt } from "jose";

// 1. Specify protected and public routes
const protectedRoutes = [
  "/home",
  "/home/usermanagement",
  "/home/history",
  "/home/incidents",
];
const publicRoutes = ["/login"];
const protectedRoutesWithPermissions = [
  {
    path: "/home",
    id: "pdf_to_excel",
  },
  {
    path: "/home/history",
    id: "history",
  },
  {
    path: "/home/incidents",
    id: "incidents",
  },
  {
    path: "/home/user_management",
    id: "user_management",
  },
];

export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  // 3. Decrypt the session from the cookie
  const cookieStore = await cookies();
  const cookie = cookieStore.get("session")?.value;
  const session = await decrypt(cookie);

  // 4. Redirect
  if (isProtectedRoute && !session?.access_token) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (
    isPublicRoute &&
    session?.access_token &&
    !req.nextUrl.pathname.startsWith("/home")
  ) {
    return NextResponse.redirect(new URL("/home", req.nextUrl));
  }

  //verificar si tiene permisos para ingresar a la vista
  if (session?.access_token) {
    const { permissions } = decodeJwt(session.access_token.toString());
    const routesWithPermission = protectedRoutesWithPermissions.map((route) => {
      return {
        ...route,
        isVisible:
          (permissions && permissions[route.id as keyof typeof permissions]) ||
          false,
      };
    });
    const filterRoutesIfIsVisible = routesWithPermission
      .filter((route) => !route.isVisible)
      .map((route) => {
        return route.path;
      });

    const isPermissionProtected = filterRoutesIfIsVisible.includes(path);

    if (isPermissionProtected) {
      return NextResponse.redirect(new URL("/home", req.nextUrl));
    }

    //verificar si entró a la url de mantenimiento de usuarios y roles, ya que que tiene urls dinamicas
    const isProtectedUserManagement = filterRoutesIfIsVisible.includes(
      "/home/user_management"
    );
    if (
      isProtectedUserManagement &&
      (req.nextUrl.pathname.startsWith("/home/usermanagement") ||
        req.nextUrl.pathname.startsWith("/home/rolesmanagement"))
    ) {
      return NextResponse.redirect(new URL("/home", req.nextUrl));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/home/:path*"],
};
