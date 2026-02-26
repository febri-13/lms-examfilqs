import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  // Cek user dari cookie/local storage (implementasi sederhana)
  const userStr = request.cookies.get('examfilqs_user')?.value
  
  const path = request.nextUrl.pathname
  
  // Proteksi halaman guru
  if (path.startsWith('/guru')) {
    if (!userStr) {
      return NextResponse.redirect(new URL('/', request.url))
    }
    const user = JSON.parse(userStr)
    if (user.role !== 'teacher') {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }
  
  // Proteksi halaman siswa
  if (path.startsWith('/siswa')) {
    if (!userStr) {
      return NextResponse.redirect(new URL('/', request.url))
    }
    const user = JSON.parse(userStr)
    if (user.role !== 'student') {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/guru/:path*', '/siswa/:path*']
}