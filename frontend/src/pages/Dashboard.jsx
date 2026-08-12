
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import {
  Package,
  ArrowDownToLine,
  ArrowUpFromLine,
  ClipboardList,
  AlertTriangle,
} from "lucide-react";

const stats = [
  {
    title: "Opening Balance",
    value: "12,500",
    icon: Package,
  },
  {
    title: "Net Movement",
    value: "+2,350",
    icon: ArrowDownToLine,
  },
  {
    title: "Assigned",
    value: "1,250",
    icon: ClipboardList,
  },
  {
    title: "Expended",
    value: "850",
    icon: ArrowUpFromLine,
  },
];

function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <header className="bg-slate-900 text-white px-6 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold">
            Military Asset Management
          </h1>
          <p className="text-sm text-slate-400">
            Asset Operations Dashboard
          </p>
        </div>

        <div className="text-right">
          <p className="font-semibold">Admin User</p>
          <p className="text-sm text-slate-400">ADMIN</p>
        </div>
      </header>

      {/* Main */}
      <main className="p-6">
        {/* Navigation */}
<div className="bg-white rounded-xl shadow-sm p-4 mb-6">
  <div className="flex flex-wrap gap-3 items-center">

    <h2 className="text-lg font-bold text-slate-800 mr-4">
      Management System
    </h2>

    <Link
      to="/dashboard"
      className="bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-700"
    >
      Dashboard
    </Link>

    <Link
      to="/purchases"
      className="bg-slate-100 text-slate-800 px-4 py-2 rounded-lg hover:bg-slate-200"
    >
      Purchases
    </Link>

    <Link
      to="/transfers"
      className="bg-slate-100 text-slate-800 px-4 py-2 rounded-lg hover:bg-slate-200"
    >
      Transfers
    </Link>

    <Link
      to="/assignments"
      className="bg-slate-100 text-slate-800 px-4 py-2 rounded-lg hover:bg-slate-200"
    >
      Assignments
    </Link>

    <Link
      to="/expenditures"
      className="bg-slate-100 text-slate-800 px-4 py-2 rounded-lg hover:bg-slate-200"
    >
      Expenditures
    </Link>

    <Link
      to="/audit-logs"
      className="bg-slate-100 text-slate-800 px-4 py-2 rounded-lg hover:bg-slate-200"
    >
      Audit Logs
    </Link>

  </div>
</div>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-800">
            Dashboard
          </h2>

          <p className="text-slate-500">
            Overview of military assets and movements.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-5 mb-6">
          <h3 className="font-semibold text-slate-800 mb-4">
            Filters
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select className="border border-slate-300 rounded-lg px-4 py-3">
              <option>All Bases</option>
              <option>Fort Alpha</option>
              <option>Fort Bravo</option>
              <option>Fort Charlie</option>
            </select>

            <select className="border border-slate-300 rounded-lg px-4 py-3">
              <option>All Equipment</option>
              <option>Weapons</option>
              <option>Vehicles</option>
              <option>Ammunition</option>
            </select>

            <input
              type="date"
              className="border border-slate-300 rounded-lg px-4 py-3"
            />
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="bg-white rounded-xl shadow-sm p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500">
                      {stat.title}
                    </p>

                    <p className="text-3xl font-bold text-slate-800 mt-2">
                      {stat.value}
                    </p>
                  </div>

                  <div className="bg-slate-100 p-3 rounded-lg">
                    <Icon className="text-slate-700" size={26} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Closing Balance */}
        <div className="mt-6 bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3">
            <Package size={28} />

            <div>
              <p className="text-sm text-slate-500">
                Current Closing Balance
              </p>

              <p className="text-3xl font-bold text-slate-800">
                12,750
              </p>
            </div>
          </div>
        </div>

        {/* Warning */}
        <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-5 flex gap-3">
          <AlertTriangle className="text-amber-600" />

          <div>
            <h3 className="font-semibold text-amber-800">
              Inventory Notice
            </h3>

            <p className="text-sm text-amber-700 mt-1">
              Some equipment categories require inventory review.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;


// import { useEffect, useMemo, useState } from "react";

// import {
//   Package,
//   ArrowDownToLine,
//   ArrowUpFromLine,
//   ClipboardList,
//   AlertTriangle,
// } from "lucide-react";

// import { getDashboard } from "../services/api";


// function Dashboard() {
//   const [dashboardData, setDashboardData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");


//   // ================================
//   // LOAD DASHBOARD DATA
//   // ================================

//   useEffect(() => {
//     const loadDashboard = async () => {
//       try {
//         setLoading(true);
//         setError("");

//         const result = await getDashboard();

//         setDashboardData(
//           result.dashboard || []
//         );
//       } catch (err) {
//         console.error(
//           "Dashboard error:",
//           err
//         );

//         setError(
//           err.message ||
//           "Failed to load dashboard"
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadDashboard();
//   }, []);


//   // ================================
//   // CALCULATE TOTALS
//   // ================================

//   const totals = useMemo(() => {
//     return dashboardData.reduce(
//       (total, item) => {
//         total.purchases += Number(
//           item.purchases || 0
//         );

//         total.transfersIn += Number(
//           item.transfersIn || 0
//         );

//         total.transfersOut += Number(
//           item.transfersOut || 0
//         );

//         total.assigned += Number(
//           item.assigned || 0
//         );

//         total.expended += Number(
//           item.expended || 0
//         );

//         total.closingBalance += Number(
//           item.closingBalance || 0
//         );

//         return total;
//       },
//       {
//         purchases: 0,
//         transfersIn: 0,
//         transfersOut: 0,
//         assigned: 0,
//         expended: 0,
//         closingBalance: 0,
//       }
//     );
//   }, [dashboardData]);


//   // ================================
//   // NET MOVEMENT
//   // ================================

//   const netMovement =
//     totals.purchases +
//     totals.transfersIn -
//     totals.transfersOut;


//   // ================================
//   // STATISTICS
//   // ================================

//   const stats = [
//     {
//       title: "Opening Balance",
//       value: "—",
//       icon: Package,
//     },
//     {
//       title: "Net Movement",
//       value: netMovement.toLocaleString(),
//       icon: ArrowDownToLine,
//     },
//     {
//       title: "Assigned",
//       value: totals.assigned.toLocaleString(),
//       icon: ClipboardList,
//     },
//     {
//       title: "Expended",
//       value: totals.expended.toLocaleString(),
//       icon: ArrowUpFromLine,
//     },
//   ];


//   return (
//     <div className="min-h-screen bg-slate-100">

//       {/* ================================= */}
//       {/* HEADER */}
//       {/* ================================= */}

//       <header className="bg-slate-900 text-white px-6 py-4 flex justify-between items-center">

//         <div>

//           <h1 className="text-xl font-bold">
//             Military Asset Management
//           </h1>

//           <p className="text-sm text-slate-400">
//             Asset Operations Dashboard
//           </p>

//         </div>


//         <div className="text-right">

//           <p className="font-semibold">
//             Admin User
//           </p>

//           <p className="text-sm text-slate-400">
//             ADMIN
//           </p>

//         </div>

//       </header>


//       {/* ================================= */}
//       {/* MAIN */}
//       {/* ================================= */}

//       <main className="p-6">

//         {/* PAGE TITLE */}

//         <div className="mb-6">

//           <h2 className="text-2xl font-bold text-slate-800">
//             Dashboard
//           </h2>

//           <p className="text-slate-500">
//             Overview of military assets and movements.
//           </p>

//         </div>


//         {/* ================================= */}
//         {/* LOADING */}
//         {/* ================================= */}

//         {loading && (
//           <div className="bg-white rounded-xl shadow-sm p-5 mb-6">

//             <p className="text-slate-500">
//               Loading dashboard data...
//             </p>

//           </div>
//         )}


//         {/* ================================= */}
//         {/* ERROR */}
//         {/* ================================= */}

//         {error && (
//           <div className="bg-red-50 border border-red-200 rounded-xl p-5 mb-6">

//             <h3 className="font-semibold text-red-800">
//               Dashboard Error
//             </h3>

//             <p className="text-sm text-red-700 mt-1">
//               {error}
//             </p>

//           </div>
//         )}


//         {/* ================================= */}
//         {/* FILTERS */}
//         {/* ================================= */}

//         <div className="bg-white rounded-xl shadow-sm p-5 mb-6">

//           <h3 className="font-semibold text-slate-800 mb-4">
//             Filters
//           </h3>


//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

//             {/* BASE */}

//             <select className="border border-slate-300 rounded-lg px-4 py-3">

//               <option>
//                 All Bases
//               </option>

//               {[
//                 ...new Set(
//                   dashboardData.map(
//                     (item) => item.baseName
//                   )
//                 ),
//               ].map((base) => (

//                 <option
//                   key={base}
//                   value={base}
//                 >
//                   {base}
//                 </option>

//               ))}

//             </select>


//             {/* EQUIPMENT */}

//             <select className="border border-slate-300 rounded-lg px-4 py-3">

//               <option>
//                 All Equipment
//               </option>

//               {[
//                 ...new Set(
//                   dashboardData.map(
//                     (item) =>
//                       item.equipmentName
//                   )
//                 ),
//               ].map((equipment) => (

//                 <option
//                   key={equipment}
//                   value={equipment}
//                 >
//                   {equipment}
//                 </option>

//               ))}

//             </select>


//             {/* DATE */}

//             <input
//               type="date"
//               className="border border-slate-300 rounded-lg px-4 py-3"
//             />

//           </div>

//         </div>


//         {/* ================================= */}
//         {/* STATISTICS */}
//         {/* ================================= */}

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

//           {stats.map((stat) => {

//             const Icon = stat.icon;

//             return (

//               <div
//                 key={stat.title}
//                 className="bg-white rounded-xl shadow-sm p-6"
//               >

//                 <div className="flex items-center justify-between">

//                   <div>

//                     <p className="text-sm text-slate-500">
//                       {stat.title}
//                     </p>


//                     <p className="text-3xl font-bold text-slate-800 mt-2">
//                       {stat.value}
//                     </p>

//                   </div>


//                   <div className="bg-slate-100 p-3 rounded-lg">

//                     <Icon
//                       className="text-slate-700"
//                       size={26}
//                     />

//                   </div>

//                 </div>

//               </div>

//             );

//           })}

//         </div>


//         {/* ================================= */}
//         {/* CLOSING BALANCE */}
//         {/* ================================= */}

//         <div className="mt-6 bg-white rounded-xl shadow-sm p-6">

//           <div className="flex items-center gap-3">

//             <Package
//               size={28}
//               className="text-slate-700"
//             />


//             <div>

//               <p className="text-sm text-slate-500">
//                 Current Closing Balance
//               </p>


//               <p className="text-3xl font-bold text-slate-800">

//                 {totals.closingBalance.toLocaleString()}

//               </p>

//             </div>

//           </div>

//         </div>


//         {/* ================================= */}
//         {/* INVENTORY DETAILS */}
//         {/* ================================= */}

//         <div className="mt-6 bg-white rounded-xl shadow-sm p-6">

//           <h3 className="font-semibold text-slate-800 mb-4">
//             Inventory Details
//           </h3>


//           {dashboardData.length === 0 ? (

//             <p className="text-slate-500">
//               No inventory data available.
//             </p>

//           ) : (

//             <div className="overflow-x-auto">

//               <table className="w-full text-sm">

//                 <thead>

//                   <tr className="border-b border-slate-200">

//                     <th className="text-left py-3 px-3">
//                       Base
//                     </th>

//                     <th className="text-left py-3 px-3">
//                       Equipment
//                     </th>

//                     <th className="text-left py-3 px-3">
//                       Category
//                     </th>

//                     <th className="text-right py-3 px-3">
//                       Purchases
//                     </th>

//                     <th className="text-right py-3 px-3">
//                       Transfers In
//                     </th>

//                     <th className="text-right py-3 px-3">
//                       Transfers Out
//                     </th>

//                     <th className="text-right py-3 px-3">
//                       Assigned
//                     </th>

//                     <th className="text-right py-3 px-3">
//                       Expended
//                     </th>

//                     <th className="text-right py-3 px-3">
//                       Closing
//                     </th>

//                   </tr>

//                 </thead>


//                 <tbody>

//                   {dashboardData.map(
//                     (item) => (

//                       <tr
//                         key={`${item.baseId}-${item.equipmentTypeId}`}
//                         className="border-b border-slate-100 hover:bg-slate-50"
//                       >

//                         <td className="py-3 px-3">
//                           {item.baseName}
//                         </td>


//                         <td className="py-3 px-3 font-medium">
//                           {item.equipmentName}
//                         </td>


//                         <td className="py-3 px-3">
//                           {item.category}
//                         </td>


//                         <td className="py-3 px-3 text-right">
//                           {Number(
//                             item.purchases || 0
//                           ).toLocaleString()}
//                         </td>


//                         <td className="py-3 px-3 text-right">
//                           {Number(
//                             item.transfersIn || 0
//                           ).toLocaleString()}
//                         </td>


//                         <td className="py-3 px-3 text-right">
//                           {Number(
//                             item.transfersOut || 0
//                           ).toLocaleString()}
//                         </td>


//                         <td className="py-3 px-3 text-right">
//                           {Number(
//                             item.assigned || 0
//                           ).toLocaleString()}
//                         </td>


//                         <td className="py-3 px-3 text-right">
//                           {Number(
//                             item.expended || 0
//                           ).toLocaleString()}
//                         </td>


//                         <td className="py-3 px-3 text-right font-bold">
//                           {Number(
//                             item.closingBalance || 0
//                           ).toLocaleString()}
//                         </td>

//                       </tr>

//                     )
//                   )}

//                 </tbody>

//               </table>

//             </div>

//           )}

//         </div>


//         {/* ================================= */}
//         {/* WARNING */}
//         {/* ================================= */}

//         <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-5 flex gap-3">

//           <AlertTriangle
//             className="text-amber-600"
//             size={24}
//           />


//           <div>

//             <h3 className="font-semibold text-amber-800">
//               Inventory Notice
//             </h3>


//             <p className="text-sm text-amber-700 mt-1">
//               Some equipment categories require inventory review.
//             </p>

//           </div>

//         </div>

//       </main>

//     </div>
//   );
// }


// export default Dashboard;
