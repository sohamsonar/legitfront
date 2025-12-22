import { Outlet } from "react-router-dom";
import { Sidebar } from "../pages/Sidebar";
import { Header } from "../pages/Header";

export default function AppLayout() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-auto">
          <div className="max-w-6xl mx-auto p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
