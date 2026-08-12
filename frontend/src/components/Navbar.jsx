import { Bell, UserCircle } from "lucide-react";

function Navbar() {
  return (
    <header className="fixed top-0 left-64 right-0 h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 z-10">
      <div>
        <h2 className="text-lg font-semibold text-slate-800">
          Asset Management Dashboard
        </h2>
      </div>

      <div className="flex items-center gap-5">
        <button className="relative text-slate-600 hover:text-slate-900">
          <Bell size={21} />

          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        <div className="flex items-center gap-2">
          <UserCircle size={30} className="text-slate-600" />

          <div>
            <p className="text-sm font-semibold text-slate-800">
              Admin User
            </p>

            <p className="text-xs text-slate-500">
              Administrator
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;