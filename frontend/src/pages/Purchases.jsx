import { useState } from "react";
import { ShoppingCart, Plus } from "lucide-react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Purchases() {
  const [formData, setFormData] = useState({
    base: "",
    equipment: "",
    quantity: "",
    date: "",
  });

  const [purchases, setPurchases] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !formData.base ||
      !formData.equipment ||
      !formData.quantity ||
      !formData.date
    ) {
      alert("Please fill all fields.");
      return;
    }

    const newPurchase = {
      id: purchases.length + 1,
      ...formData,
    };

    setPurchases([newPurchase, ...purchases]);

    setFormData({
      base: "",
      equipment: "",
      quantity: "",
      date: "",
    });
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <Sidebar />
      <Navbar />

      <main className="ml-64 pt-16 p-6">
        {/* Page Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3">
            <ShoppingCart className="text-blue-600" size={30} />

            <div>
              <h1 className="text-2xl font-bold text-slate-800">
                Purchases
              </h1>

              <p className="text-slate-500">
                Record incoming military assets.
              </p>
            </div>
          </div>
        </div>

        {/* Purchase Form */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center gap-2 mb-5">
            <Plus size={20} className="text-blue-600" />

            <h2 className="text-lg font-semibold text-slate-800">
              Add Purchase
            </h2>
          </div>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            {/* Base */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Base
              </label>

              <select
                name="base"
                value={formData.base}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-lg px-4 py-3"
              >
                <option value="">Select Base</option>
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

            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Purchase Date
              </label>

              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-lg px-4 py-3"
              />
            </div>

            <div className="md:col-span-2">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition"
              >
                Add Purchase
              </button>
            </div>
          </form>
        </div>

        {/* Purchase History */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-lg font-semibold text-slate-800">
              Purchase History
            </h2>
          </div>

          {purchases.length === 0 ? (
            <div className="p-8 text-center text-slate-500">
              No purchases recorded yet.
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
                      Base
                    </th>

                    <th className="text-left px-6 py-4 text-sm font-semibold">
                      Equipment
                    </th>

                    <th className="text-left px-6 py-4 text-sm font-semibold">
                      Quantity
                    </th>

                    <th className="text-left px-6 py-4 text-sm font-semibold">
                      Date
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {purchases.map((purchase) => (
                    <tr
                      key={purchase.id}
                      className="border-t border-slate-200"
                    >
                      <td className="px-6 py-4">{purchase.id}</td>
                      <td className="px-6 py-4">{purchase.base}</td>
                      <td className="px-6 py-4">
                        {purchase.equipment}
                      </td>
                      <td className="px-6 py-4">
                        {purchase.quantity}
                      </td>
                      <td className="px-6 py-4">
                        {purchase.date}
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

export default Purchases;