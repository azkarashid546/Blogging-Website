import { NextResponse } from "next/server";
import { VerifyToken } from "./helpers/jwt";


export async function middleware(req, res) {
   var pathname = req.nextUrl.pathname;
    var AccessToken =
      req.cookies.get("AccessToken")?.value &&
      (await VerifyToken(req.cookies.get("AccessToken")?.value));

  
    console.log(AccessToken)

    var NoTokenPaths = ["/dashboard"]

    if(!AccessToken &&  NoTokenPaths.includes(pathname)){
        return NextResponse.redirect(new URL("/login", req.url))
    }
    if(AccessToken && pathname === "/login"){
        return NextResponse.redirect(new URL("/dashboard", req.url))
    }
  }

  

  export const config = {
    matcher: [
        "/Login",
        "/Form",
        "/Signup"
    ],
  }