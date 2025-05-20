import { NextRequest, NextResponse } from 'next/server';
import { decrypt } from '@/app/auth/state-sesion';
import { cookies } from 'next/headers';

// 1. Specify protected and public routes
const protectedRoutes = ['/home', '/home/usermanagement', '/home/history', '/home/incidents', ];
const publicRoutes = ['/login'];



export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  // 3. Decrypt the session from the cookie
  const cookieStore = await cookies();
  const cookie = cookieStore.get('session')?.value;
  const session = await decrypt(cookie);
  // console.log('Session:', session);
  // 4. Redirect
  if (isProtectedRoute && !session?.access_token) {
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }

  if (
    isPublicRoute &&
    session?.access_token &&
    !req.nextUrl.pathname.startsWith('/home')
  ) {
    return NextResponse.redirect(new URL('/home', req.nextUrl));
  }

  return NextResponse.next();
}
