import { FileText, ShieldCheck } from "lucide-react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const auditLogs = [
  {
    id: 1,
    user: "admin_user",
    role: "ADMIN",
    action: "PURCHASE",
    details: "Added 100 assets to Fort Alpha",
    date: "12-Aug-2026 10:30 AM",
  },
  {
    id: 2,
    user: "logistics_officer",
    role: "LOGISTICS_OFFICER",
    action: "TRANSFER",
    details: "Transferred assets from Fort Alpha to Fort Bravo",
    date: "12-Aug-2026 11:15 AM",
  },
  {
    id: 3,
    user: "commander_alpha",
    role: "BASE_COMMANDER",
    action: "ASSIGNMENT",
    details: "Assigned assets to personnel",
    date: "12-Aug-2026 12:20 PM",
  },
];

function AuditLogs() {
  return (
    <div className="min-h-screen bg-slate-100">
      <Sidebar />
      <Navbar />

      <main className="ml-64 pt-16 p-6">
        <div className="mb-6 flex items-center gap-3">
          <FileText className="text-blue-600" size={30} />

          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              Audit Logs
            </h1>

            <p className="text-slate-500">
              Track system activities.
            </p>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-6 flex gap-3">
          <ShieldCheck className="text-blue-600" size={24} />

          <div>
            <h3 className="font-semibold text-blue-800">
              System Audit Trail
            </h3>

            <p className="text-sm text-blue-700">
              Important asset operations are recorded here.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold">
              Activity History
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-left">ID</th>
                  <th className="px-6 py-4 text-left">User</th>
                  <th className="px-6 py-4 text-left">Role</th>
                  <th className="px-6 py-4 text-left">Action</th>
                  <th className="px-6 py-4 text-left">Details</th>
                  <th className="px-6 py-4 text-left">Date</th>
                </tr>
              </thead>

              <tbody>
                {auditLogs.map((log) => (
                  <tr
                    key={log.id}
                    className="border-t border-slate-200"
                  >
                    <td className="px-6 py-4">
                      {log.id}
                    </td>

                    <td className="px-6 py-4 font-medium">
                      {log.user}
                    </td>

                    <td className="px-6 py-4">
                      {log.role}
                    </td>

                    <td className="px-6 py-4">
                      {log.action}
                    </td>

                    <td className="px-6 py-4">
                      {log.details}
                    </td>

                    <td className="px-6 py-4">
                      {log.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AuditLogs;