import SignInForm from "@/components/auth/SignInForm";
import Image from "next/image";
import Link from "next/link";
import authLogo from "@/../public/images/logo/auth-logo.png";

export const metadata = {
  title: "Sign In",
  description: "Sign in to your account"
};

export default function SignInPage() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50 dark:bg-gray-900">
      {/* Left side - Form */}
      <div className="flex flex-col flex-1 lg:w-1/2 w-full justify-center items-center p-4">
        <div className="w-full max-w-md">
          <SignInForm />
        </div>
      </div>

      {/* Right side - Logo/Branding */}
      <div className="hidden lg:flex lg:w-1/2 justify-center items-center bg-brand-950 dark:bg-white/5">
        <Link href="/" className="block p-8">
          <Image 
            width={231} 
            height={48} 
            src={authLogo} 
            alt="Logo" 
            priority 
          />
        </Link>
      </div>
    </div>
  );
}