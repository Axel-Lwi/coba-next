import {NextResponse} from "next/server";
import type {NextRequest} from "next/server";
import WithAuth from "./middlewares/WithAuth";

export function mainMiddleware(req: NextRequest) {
  const res = NextResponse.next();
  return res;
}

export default WithAuth(mainMiddleware, ["/profile", "/admin"]);