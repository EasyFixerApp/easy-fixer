// export { default } from "./_landing/page";

import RegisterForm from "./auth/register/RegisterForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
      <RegisterForm />
    </main>
  );
}
