import { Outlet } from "react-router-dom";
import Header from "../components/header";

function RootLayout() {
  return (
    <div className="min-h-screen relative bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow w-full px-4 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
}

export default RootLayout;
