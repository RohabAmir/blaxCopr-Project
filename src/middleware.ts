import { NextResponse, NextRequest } from "next/server";
const protectedRoute = [
  "/",
  "/dispute",
  "/contract-processing-form",
  "/contract-form",
  "/account-details-form",
];
const publicRoute = ["/auth"];
export default function middleware(req: NextRequest) {
  let cookie = req.cookies.get("access_token");
  if (protectedRoute.includes(req.nextUrl.pathname) && !cookie) {
    const absUrl = new URL("/auth", req.nextUrl.origin);
    return NextResponse.redirect(absUrl.toString());
  } else if (publicRoute.includes(req.nextUrl.pathname) && cookie) {
    const absUrl = new URL("/", req.nextUrl.origin);
    return NextResponse.redirect(absUrl.toString());
  }
}
