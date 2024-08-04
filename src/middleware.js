import { NextRequest, NextResponse } from "next/server"


export const middleware = async(request) => {
    const token = request.cookies.get('next-auth.session-token');
    const path = request.nextUrl.pathname;
    // console.log(path)
    // console.log('my token = ', token.value)
    if(path.includes('api')) return NextResponse.next();
    if(!token) {
        return NextResponse.redirect(new URL(`/login?redirect=${path}`, request.url))
    }
    // return NextRequest.redirect(new URL(''), request.url)
    return NextResponse.next();
}

export const config = {
    matcher : [
        '/checkout/:path*', '/userDetails/:path*'
    ]
}