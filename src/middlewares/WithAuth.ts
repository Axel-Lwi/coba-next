import { getToken } from "next-auth/jwt";
import { 
  NextMiddleware, 
  NextRequest, 
  NextFetchEvent, 
  NextResponse 
} from "next/server";

const onlyAdmin = ["/admin"];

export default function WithAuth(
  middleware: NextMiddleware,
  requireAuth : string [] = []
){
  return async( req : NextRequest, next : NextFetchEvent) => {
    const pathname = req.nextUrl.pathname;
    if (requireAuth.includes(pathname)){
      const token = await getToken({
        req, 
        secret : process.env.NEXTAUTH_SECRET,
      });
      if(!token){
        console.log("login",{token});
        const url = new URL("/auth/login", req.url);
        url.searchParams.set("callbackUrl", encodeURI(req.url));
        return NextResponse.redirect(url);
        console.log("login",{token});
      }
      if (token?.role !== "admin" && onlyAdmin.includes(pathname)){
        console.log(token?.role,"ga admin",{token});
        return NextResponse.redirect(new URL("/", req.url));
        console.log("ga admin",{token});
      }
      
      
    }
    return middleware(req, next);
  };
} 