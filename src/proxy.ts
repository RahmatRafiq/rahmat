import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
    const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;

    if (cookieLocale && (routing.locales as readonly string[]).includes(cookieLocale)) {
        return intlMiddleware(request);
    }

    const country = request.headers.get('x-vercel-ip-country');

    if (country === 'ID') {
        const { pathname } = request.nextUrl;
        if (pathname === '/') {
            const url = request.nextUrl.clone();
            url.pathname = '/id';
            return NextResponse.redirect(url);
        }
    }

    return intlMiddleware(request);
}

export const config = {
    matcher: ['/((?!api|_next|.*\\..*).*)']
};
