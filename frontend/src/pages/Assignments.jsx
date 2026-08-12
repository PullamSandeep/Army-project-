import { useState } from "react";
import {
  ClipboardList,
  UserPlus,
  PackageCheck,
} from "lucide-react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Assignments() {
  const [assignment, setAssignment] = useState({
    base: "",
    equipment: "",
    personnel: "",
    quantity: "",
  });

  const [expenditure, setExpenditure] = useState({
    base: "",
    equipment: "",
    quantity: "",
    reason: "",
  });

  const [assignments, setAssignments] = useState([]);
  const [expenditures, setExpenditures] = useState([]);

  const handleAssignmentChange = (event) => {
    const { name, value } = event.target;

    setAssignment((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleExpenditureChange = (event) => {
    const { name, value } = event.target;

    setExpenditure((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const submitAssignment = (event) => {
    event.preventDefault();

    if (
      !assignment.base ||
      !assignment.equipment ||
      !assignment.personnel ||
      !assignment.quantity
    ) {
      alert("Please fill all assignment fields.");
      return;
    }

    const newAssignment = {
      id: assignments.length + 1,
      ...assignment,
      date: new Date().toLocaleDateString(),
    };

    setAssignments((previous) => [
      newAssignment,
      ...previous,
    ]);

    setAssignment({
      base: "",
      equipment: "",
      personnel: "",
      quantity: "",
    });
  };

  const submitExpenditure = (event) => {
    event.preventDefault();

    if (
      !expenditure.base ||
      !expenditure.equipment ||
      !expenditure.quantity ||
      !expenditure.reason
    ) {
      alert("Please fill all expenditure fields.");
      return;
    }

    const newExpenditure = {
      id: expenditures.length + 1,
      ...expenditure,
      date: new Date().toLocaleDateString(),
    };

    setExpenditures((previous) => [
      newExpenditure,
      ...previous,
    ]);

    setExpenditure({
      base: "",
      equipment: "",
      quantity: "",
      reason: "",
    });
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <Sidebar />
      <Navbar />

      <main className="ml-64 pt-16 p-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3">
            <ClipboardList
              className="text-blue-600"
              size={30}
            />

            <div>
              <h1 className="text-2xl font-bold text-slate-800">
                Assignments & Expenditures
              </h1>

              <p className="text-slate-500">
                Track assigned and consumed military assets.
              </p>
            </div>
          </div>
        </div>

        {/* Assignment Form */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center gap-2 mb-5">
            <UserPlus
              className="text-blue-600"
              size={21}
            />

            <h2 className="text-lg font-semibold text-slate-800">
              Assign Asset
            </h2>
          </div>

          <form
            onSubmit={submitAssignment}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Base
              </label>

              <select
                name="base"
                value={assignment.base}
                onChange={handleAssignmentChange}
                className="w-full border border-slate-300 rounded-lg px-4 py-3"
              >
                <option value="">Select Base</option>
                <option value="Fort Alpha">Fort Alpha</option>
                <option value="Fort Bravo">Fort Bravo</option>
                <option value="Fort Charlie">Fort Charlie</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Equipment
              </label>

              <select
                name="equipment"
                value={assignment.equipment}
                onChange={handleAssignmentChange}
                className="w-full border border-slate-300 rounded-lg px-4 py-3"
              >
                <option value="">Select Equipment</option>
                <option value="M4 Carbine">M4 Carbine</option>
                <option value="Humvee">Humvee</option>
                <option value="5.56mm Ammunition">
                  5.56mm Ammunition
                </option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Personnel
              </label>

              <input
                type="text"
                name="personnel"
                value={assignment.personnel}
                onChange={handleAssignmentChange}
                placeholder="Enter personnel name"
                className="w-full border border-slate-300 rounded-lg px-4 py-3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Quantity
              </label>

              <input
                type="number"
                min="1"
                name="quantity"
                value={assignment.quantity}
                onChange={handleAssignmentChange}
                placeholder="Enter quantity"
                className="w-full border border-slate-300 rounded-lg px-4 py-3"
              />
            </div>

            <div className="md:col-span-2">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg"
              >
                Assign Asset
              </button>
            </div>
          </form>
        </div>

        {/* Assignment History */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-lg font-semibold text-slate-800">
              Assignment History
            </h2>
          </div>

          {assignments.length === 0 ? (
            <div className="p-8 text-center text-slate-500">
              No assignments recorded yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-4 text-left">ID</th>
                    <th className="px-6 py-4 text-left">Base</th>
                    <th className="px-6 py-4 text-left">
                      Equipment
                    </th>
                    <th className="px-6 py-4 text-left">
                      Personnel
                    </th>
                    <th className="px-6 py-4 text-left">
                      Quantity
                    </th>
                    <th className="px-6 py-4 text-left">
                      Date
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {assignments.map((item) => (
                    <tr
                      key={item.id}
                      className="border-t border-slate-200"
                    >
                      <td className="px-6 py-4">{item.id}</td>
                      <td className="px-6 py-4">{item.base}</td>
                      <td className="px-6 py-4">
                        {item.equipment}
                      </td>
                      <td className="px-6 py-4">
                        {item.personnel}
                      </td>
                      <td className="px-6 py-4">
                        {item.quantity}
                      </td>
                      <td className="px-6 py-4">
                        {item.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Expenditure Form */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center gap-2 mb-5">
            <PackageCheck
              className="text-red-600"
              size={21}
            />

            <h2 className="text-lg font-semibold text-slate-800">
              Record Expenditure
            </h2>
          </div>

          <form
            onSubmit={submitExpenditure}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Base
              </label>

              <select
                name="base"
                value={expenditure.base}
                onChange={handleExpenditureChange}
                className="w-full border border-slate-300 rounded-lg px-4 py-3"
              >
                <option value="">Select Base</option>
                <option value="Fort Alpha">Fort Alpha</option>
                <option value="Fort Bravo">Fort Bravo</option>
                <option value="Fort Charlie">Fort Charlie</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Equipment
              </label>

              <select
                name="equipment"
                value={expenditure.equipment}
                onChange={handleExpenditureChange}
                className="w-full border border-slate-300 rounded-lg px-4 py-3"
              >
                <option value="">Select Equipment</option>
                <option value="M4 Carbine">M4 Carbine</option>
                <option value="Humvee">Humvee</option>
                <option value="5.56mm Ammunition">
                  5.56mm Ammunition
                </option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Quantity Expended
              </label>

              <input
                type="number"
                min="1"
                name="quantity"
                value={expenditure.quantity}
                onChange={handleExpenditureChange}
                placeholder="Enter quantity"
                className="w-full border border-slate-300 rounded-lg px-4 py-3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Reason
              </label>

              <input
                type="text"
                name="reason"
                value={expenditure.reason}
                onChange={handleExpenditureChange}
                placeholder="Enter reason"
                className="w-full border border-slate-300 rounded-lg px-4 py-3"
              />
            </div>

            <div className="md:col-span-2">
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-lg"
              >
                Record Expenditure
              </button>
            </div>
          </form>
        </div>

        {/* Expenditure History */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-lg font-semibold text-slate-800">
              Expenditure History
            </h2>
          </div>

          {expenditures.length === 0 ? (
            <div className="p-8 text-center text-slate-500">
              No expenditures recorded yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-4 text-left">ID</th>
                    <th className="px-6 py-4 text-left">Base</th>
                    <th className="px-6 py-4 text-left">
                      Equipment
                    </th>
                    <th className="px-6 py-4 text-left">
                      Quantity
                    </th>
                    <th className="px-6 py-4 text-left">
                      Reason
                    </th>
                    <th className="px-6 py-4 text-left">
                      Date
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {expenditures.map((item) => (
                    <tr
                      key={item.id}
                      className="border-t border-slate-200"
                    >
                      <td className="px-6 py-4">{item.id}</td>
                      <td className="px-6 py-4">{item.base}</td>
                      <td className="px-6 py-4">
                        {item.equipment}
                      </td>
                      <td className="px-6 py-4">
                        {item.quantity}
                      </td>
                      <td className="px-6 py-4">
                        {item.reason}
                      </td>
                      <td className="px-6 py-4">
                        {item.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Assignments;