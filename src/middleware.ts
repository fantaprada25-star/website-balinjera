import { type NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const lang = request.nextUrl.searchParams.get('lang') === 'en' ? 'en' : 'he'
  const response = NextResponse.next()
  response.headers.set('x-lang', lang)
  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|balinjera/|manifest\\.webmanifest|llms\\.txt|favicon\\.ico).*)'],
}
