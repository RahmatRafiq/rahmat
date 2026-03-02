import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
    // Step 1: Cek apakah user sudah punya cookie MINTA bahasa tertentu (misal dia ngerubah bahasa manual)
    const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;

    if (cookieLocale && routing.locales.includes(cookieLocale as any)) {
        // Biarkan next-intl ngurus redirect berdasarkan cookie pilihan user
        return intlMiddleware(request);
    }

    // Step 2: Deteksi lokasi dari Vercel Header
    const country = request.headers.get('x-vercel-ip-country');

    // Jika Vercel detect IP dari Indonesia, kita set 'id' sebagai default untuk request ini (jika user baru pertama masuk)
    if (country === 'ID') {
        // Kita cek path-nya. Kalau dia minta root '/' tanpa locale, redirect ke '/id'
        const { pathname } = request.nextUrl;
        if (pathname === '/') {
            const url = request.nextUrl.clone();
            url.pathname = '/id';
            return NextResponse.redirect(url);
        }
    }

    // Step 3: Default fallback next-intl (akan pakai Accept-Language browser)
    return intlMiddleware(request);
}

export const config = {
    // Skip all paths that should not be internationalized
    matcher: ['/((?!api|_next|.*\\..*).*)']
};
