// import { Shield, Lock, User } from "lucide-react";

// function Login() {
//   return (
//     <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
//       <div className="w-full max-w-md">
//         {/* Logo / Header */}
//         <div className="text-center mb-8">
//           <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-600 mb-4">
//             <Shield className="w-8 h-8 text-white" />
//           </div>

//           <h1 className="text-3xl font-bold text-white">
//             Military Asset Management
//           </h1>

//           <p className="text-slate-400 mt-2">
//             Secure Asset Management System
//           </p>
//         </div>

//         {/* Login Card */}
//         <div className="bg-white rounded-xl shadow-2xl p-8">
//           <h2 className="text-2xl font-bold text-slate-800 mb-2">
//             Sign In
//           </h2>

//           <p className="text-slate-500 mb-6">
//             Enter your credentials to access the system.
//           </p>

//           <form>
//             {/* Username */}
//             <div className="mb-5">
//               <label className="block text-sm font-medium text-slate-700 mb-2">
//                 Username
//               </label>

//               <div className="relative">
//                 <User
//                   className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
//                   size={20}
//                 />

//                 <input
//                   type="text"
//                   placeholder="Enter username"
//                   className="w-full border border-slate-300 rounded-lg py-3 pl-10 pr-4 outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//             </div>

//             {/* Password */}
//             <div className="mb-6">
//               <label className="block text-sm font-medium text-slate-700 mb-2">
//                 Password
//               </label>

//               <div className="relative">
//                 <Lock
//                   className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
//                   size={20}
//                 />

//                 <input
//                   type="password"
//                   placeholder="Enter password"
//                   className="w-full border border-slate-300 rounded-lg py-3 pl-10 pr-4 outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//             </div>

//             {/* Login Button */}
//             <button
//               type="submit"
//               className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
//             >
//               Sign In
//             </button>
//           </form>
//         </div>

//         <p className="text-center text-slate-500 text-sm mt-6">
//           Military Asset Management System
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Login;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    setError("");

    if (!username || !password) {
      setError("Please enter username and password.");
      return;
    }

    // Temporary login for frontend testing
    if (username === "admin_user" && password === "AdminPass123!") {
      localStorage.setItem(
        "user",
        JSON.stringify({
          username: "admin_user",
          role: "ADMIN",
          baseId: null,
        })
      );

      navigate("/dashboard");
    } else {
      setError("Invalid username or password.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800">
            Kristallball
          </h1>

          <p className="text-slate-500 mt-2">
            Military Asset Management System
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Username
            </label>

            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
          >
            Sign In
          </button>

        </form>

        <div className="mt-6 bg-slate-50 rounded-lg p-4 text-sm">
          <p className="font-semibold text-slate-700 mb-2">
            Test Account
          </p>

          <p className="text-slate-600">
            Username: admin_user
          </p>

          <p className="text-slate-600">
            Password: AdminPass123!
          </p>
        </div>

      </div>
    </div>
  );
}

export default Login;