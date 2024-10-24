import RegisterView from "@/views/auth/Register";
import Link from "next/link";
import { useRouter } from "next/router";


const RegisterPage = () => {
  return (
    <div>
      <RegisterView></RegisterView>
    </div>
  );
};

export default RegisterPage;