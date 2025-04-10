import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const user = request.cookies.get('user')?.value

  if (!user) {
    return Response.redirect(new URL('/auth', request.url))
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$|manifest\\.json|auth(?:/.*)?).*)'],
}

// import type { NextRequest } from 'next/server'

// export async function middleware(request: NextRequest) {
//   const user = request.cookies.get('user')?.value

//   if (!user && !request.nextUrl.pathname.startsWith('/auth')) {
//     return Response.redirect(new URL('/auth', request.url))
//   }

//   if (user && request.nextUrl.pathname.startsWith('/auth')) {
//     return Response.redirect(new URL('/', request.url))
//   }
// }

// export const config = {
//   matcher: ['/((?!api|_next/static|_next/image|.\\.png$).)'],
// }
