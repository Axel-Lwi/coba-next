import { useRouter } from "next/router";

import { Roboto } from "next/font/google";
import dynamic from "next/dynamic";

type AppShellProps = {
  children : React.ReactNode;
};

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
})

const Navbar = dynamic(() => import("../Navbar"));

const disableNavbar = ["/404","/auth/login", "/auth/register"];

const AppShell = (props : AppShellProps) => {
  const { children } = props; 
  const {pathname } = useRouter();
  return (
    <main className={roboto.className}>
      {!disableNavbar.includes(pathname) && <Navbar />}
      {children}
    </main>
  );
};


function myFUnc(param1: String){
  // ..

  return param1 + ""
}

const myFunc2 = (param1: number) => {
  return param1 + ""
}

export default AppShell;