import { useEffect, useState } from "react";
import { ArrowUpFromLine, Plus } from "lucide-react";

import {
  getExpenditures,
  createExpenditure,
} from "../services/api";

function Expenditures() {
  const [expenditures, setExpenditures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    baseId: "",
    equipmentTypeId: "",
    quantity: "",
    reason: "",
  });

  // =================================
  // LOAD EXPENDITURES
  // =================================

  const loadExpenditures = async () => {
    try {
      setLoading(true);
      setError("");

      const result = await getExpenditures();

      setExpenditures(
        result.expenditures || []
      );
    } catch (err) {
      console.error(
        "Expenditures error:",
        err
      );

      setError(
        err.message ||
          "Failed to load expenditures"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadExpenditures();
  }, []);

  // =================================
  // HANDLE INPUT
  // =================================

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // =================================
  // CREATE EXPENDITURE
  // =================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");

      await createExpenditure({
        baseId: Number(form.baseId),

        equipmentTypeId: Number(
          form.equipmentTypeId
        ),

        quantity: Number(form.quantity),

        reason: form.reason,
      });

      // Clear form
      setForm({
        baseId: "",
        equipmentTypeId: "",
        quantity: "",
        reason: "",
      });

      // Reload list
      await loadExpenditures();

    } catch (err) {
      console.error(
        "Create expenditure error:",
        err
      );

      setError(
        err.message ||
          "Failed to create expenditure"
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">

      {/* ================================= */}
      {/* HEADER */}
      {/* ================================= */}

      <header className="bg-slate-900 text-white px-6 py-4">

        <div className="flex items-center gap-3">

          <ArrowUpFromLine size={26} />

          <div>

            <h1 className="text-xl font-bold">
              Expenditures
            </h1>

            <p className="text-sm text-slate-400">
              Record and monitor expended assets
            </p>

          </div>

        </div>

      </header>


      {/* ================================= */}
      {/* MAIN */}
      {/* ================================= */}

      <main className="p-6">

        {/* ================================= */}
        {/* ERROR MESSAGE */}
        {/* ================================= */}

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4">

            <p className="text-red-700">
              {error}
            </p>

          </div>
        )}


        {/* ================================= */}
        {/* CREATE EXPENDITURE */}
        {/* ================================= */}

        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">

          <div className="flex items-center gap-2 mb-5">

            <Plus size={20} />

            <h2 className="text-lg font-semibold text-slate-800">
              Record Expenditure
            </h2>

          </div>


          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-4 gap-4"
          >

            {/* BASE ID */}

            <input
              type="number"
              name="baseId"
              placeholder="Base ID"
              value={form.baseId}
              onChange={handleChange}
              required
              min="1"
              className="border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-400"
            />


            {/* EQUIPMENT TYPE ID */}

            <input
              type="number"
              name="equipmentTypeId"
              placeholder="Equipment Type ID"
              value={form.equipmentTypeId}
              onChange={handleChange}
              required
              min="1"
              className="border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-400"
            />


            {/* QUANTITY */}

            <input
              type="number"
              name="quantity"
              placeholder="Quantity"
              value={form.quantity}
              onChange={handleChange}
              required
              min="1"
              className="border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-400"
            />


            {/* REASON */}

            <input
              type="text"
              name="reason"
              placeholder="Reason"
              value={form.reason}
              onChange={handleChange}
              required
              className="border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-400"
            />


            {/* SUBMIT */}

            <button
              type="submit"
              className="md:col-span-4 bg-slate-900 text-white rounded-lg px-5 py-3 font-semibold hover:bg-slate-800 transition"
            >
              Record Expenditure
            </button>

          </form>

        </div>


        {/* ================================= */}
        {/* EXPENDITURE HISTORY */}
        {/* ================================= */}

        <div className="bg-white rounded-xl shadow-sm p-6">

          <div className="flex items-center justify-between mb-5">

            <div>

              <h2 className="text-lg font-semibold text-slate-800">
                Expenditure History
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                List of recorded asset expenditures
              </p>

            </div>

          </div>


          {/* LOADING */}

          {loading ? (

            <p className="text-slate-500">
              Loading expenditures...
            </p>

          ) : expenditures.length === 0 ? (

            /* EMPTY */

            <div className="py-10 text-center">

              <ArrowUpFromLine
                size={40}
                className="mx-auto text-slate-400 mb-3"
              />

              <p className="text-slate-500">
                No expenditures found.
              </p>

            </div>

          ) : (

            /* TABLE */

            <div className="overflow-x-auto">

              <table className="w-full text-sm">

                <thead>

                  <tr className="border-b border-slate-200">

                    <th className="text-left py-3 px-3">
                      ID
                    </th>

                    <th className="text-left py-3 px-3">
                      Base
                    </th>

                    <th className="text-left py-3 px-3">
                      Equipment
                    </th>

                    <th className="text-right py-3 px-3">
                      Quantity
                    </th>

                    <th className="text-left py-3 px-3">
                      Reason
                    </th>

                    <th className="text-left py-3 px-3">
                      Date
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {expenditures.map(
                    (expenditure) => (

                      <tr
                        key={expenditure.id}
                        className="border-b border-slate-100 hover:bg-slate-50"
                      >

                        {/* ID */}

                        <td className="py-3 px-3">
                          {expenditure.id}
                        </td>


                        {/* BASE */}

                        <td className="py-3 px-3">
                          {expenditure.base_name ??
                            expenditure.baseName ??
                            expenditure.base_id ??
                            expenditure.baseId ??
                            "-"}
                        </td>


                        {/* EQUIPMENT */}

                        <td className="py-3 px-3 font-medium">

                          {expenditure.equipment_name ??
                            expenditure.equipmentName ??
                            expenditure.equipment_type_id ??
                            expenditure.equipmentTypeId ??
                            "-"}

                        </td>


                        {/* QUANTITY */}

                        <td className="py-3 px-3 text-right font-semibold">

                          {Number(
                            expenditure.quantity || 0
                          ).toLocaleString()}

                        </td>


                        {/* REASON */}

                        <td className="py-3 px-3">

                          {expenditure.reason ||
                            "-"}

                        </td>


                        {/* DATE */}

                        <td className="py-3 px-3">

                          {expenditure.created_at ||
                          expenditure.createdAt
                            ? new Date(
                                expenditure.created_at ||
                                  expenditure.createdAt
                              ).toLocaleDateString()
                            : "-"}

                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </main>

    </div>
  );
}

export default Expenditures;