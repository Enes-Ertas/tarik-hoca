import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"

export async function middleware(request: NextRequest) {
    console.log("✅ Middleware çalışıyor mu?")
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req: request, res })

  const { data: { user } } = await supabase.auth.getUser()

  // Eğer login değilse => login sayfasına yönlendir
  if (!user) {
    return NextResponse.redirect(new URL("/accounts", request.url))
  }

  // referral_codes tablosunda mail eşleşiyor mu?
  const { data: referral } = await supabase
    .from("referral_codes")
    .select("*")
    .eq("email", user.email)
    .eq("used", true)
    .maybeSingle()

  // Eğer referral kodu eşleşmemişse => pricing sayfasına yönlendir
  if (!referral) {
    return NextResponse.redirect(new URL("/pricing", request.url))
  }

  return res
}

// 👇 sadece bu iki route korumalı
export const config = {
  matcher: ["/admin/:path*", "/questionbank/:path*"],
}
