import { useState } from "react";
import { ArrowLeftRight, Send } from "lucide-react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Transfers() {
  const [formData, setFormData] = useState({
    sourceBase: "",
    destinationBase: "",
    equipment: "",
    quantity: "",
  });

  const [transfers, setTransfers] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !formData.sourceBase ||
      !formData.destinationBase ||
      !formData.equipment ||
      !formData.quantity
    ) {
      alert("Please fill all fields.");
      return;
    }

    if (formData.sourceBase === formData.destinationBase) {
      alert("Source and destination bases must be different.");
      return;
    }

    const newTransfer = {
      id: transfers.length + 1,
      ...formData,
      status: "COMPLETED",
      date: new Date().toLocaleDateString(),
    };

    setTransfers((previous) => [newTransfer, ...previous]);

    setFormData({
      sourceBase: "",
      destinationBase: "",
      equipment: "",
      quantity: "",
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
            <ArrowLeftRight className="text-blue-600" size={30} />

            <div>
              <h1 className="text-2xl font-bold text-slate-800">
                Asset Transfers
              </h1>

              <p className="text-slate-500">
                Transfer assets between military bases.
              </p>
            </div>
          </div>
        </div>

        {/* Transfer Form */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center gap-2 mb-5">
            <Send className="text-blue-600" size={20} />

            <h2 className="text-lg font-semibold text-slate-800">
              Create Transfer
            </h2>
          </div>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            {/* Source Base */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Source Base
              </label>

              <select
                name="sourceBase"
                value={formData.sourceBase}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-lg px-4 py-3"
              >
                <option value="">Select Source Base</option>
                <option value="Fort Alpha">Fort Alpha</option>
                <option value="Fort Bravo">Fort Bravo</option>
                <option value="Fort Charlie">Fort Charlie</option>
              </select>
            </div>

            {/* Destination Base */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Destination Base
              </label>

              <select
                name="destinationBase"
                value={formData.destinationBase}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-lg px-4 py-3"
              >
                <option value="">Select Destination Base</option>
                <option value="Fort Alpha">Fort Alpha</option>
                <option value="Fort Bravo">Fort Bravo</option>
                <option value="Fort Charlie">Fort Charlie</option>
              </select>
            </div>

            {/* Equipment */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Equipment Type
              </label>

              <select
                name="equipment"
                value={formData.equipment}
                onChange={handleChange}
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

            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Quantity
              </label>

              <input
                type="number"
                name="quantity"
                min="1"
                value={formData.quantity}
                onChange={handleChange}
                placeholder="Enter quantity"
                className="w-full border border-slate-300 rounded-lg px-4 py-3"
              />
            </div>

            {/* Submit */}
            <div className="md:col-span-2">
              <button
                type="submit"
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition"
              >
                <Send size={18} />
                Create Transfer
              </button>
            </div>
          </form>
        </div>

        {/* Transfer History */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-lg font-semibold text-slate-800">
              Transfer History
            </h2>
          </div>

          {transfers.length === 0 ? (
            <div className="p-8 text-center text-slate-500">
              No transfers recorded yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="text-left px-6 py-4 text-sm font-semibold">
                      ID
                    </th>

                    <th className="text-left px-6 py-4 text-sm font-semibold">
                      Source
                    </th>

                    <th className="text-left px-6 py-4 text-sm font-semibold">
                      Destination
                    </th>

                    <th className="text-left px-6 py-4 text-sm font-semibold">
                      Equipment
                    </th>

                    <th className="text-left px-6 py-4 text-sm font-semibold">
                      Quantity
                    </th>

                    <th className="text-left px-6 py-4 text-sm font-semibold">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {transfers.map((transfer) => (
                    <tr
                      key={transfer.id}
                      className="border-t border-slate-200"
                    >
                      <td className="px-6 py-4">{transfer.id}</td>

                      <td className="px-6 py-4">
                        {transfer.sourceBase}
                      </td>

                      <td className="px-6 py-4">
                        {transfer.destinationBase}
                      </td>

                      <td className="px-6 py-4">
                        {transfer.equipment}
                      </td>

                      <td className="px-6 py-4">
                        {transfer.quantity}
                      </td>

                      <td className="px-6 py-4">
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                          {transfer.status}
                        </span>
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

export default Transfers;