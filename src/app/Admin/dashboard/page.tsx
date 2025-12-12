"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import LayoutWithSidebar from "./LayoutWithSidebar"; // ✅ Gunakan sidebar yang sama
import { LogOut } from "lucide-react"; // Logout icon tetap sama

interface WorkItem {
  id: number;
  photo: string;
  title: string;
  desc: string;
}

export default function DashboardPage() {
  const [works, setWorks] = useState<WorkItem[]>([
    { id: 1, photo: "Putri.jpg", title: "Videography", desc: "Ini Videography." },
    { id: 2, photo: "Louis.jpg", title: "Photography", desc: "Ini Photography." },
    { id: 3, photo: "Dhani.jpg", title: "Sounding", desc: "Ini Sounding." },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<WorkItem>({
    id: 0,
    photo: "",
    title: "",
    desc: "",
  });

  // === OPEN / CLOSE FORM ===
  const handleOpenForm = (item?: WorkItem) => {
    if (item) setFormData(item);
    else setFormData({ id: 0, photo: "", title: "", desc: "" });
    setShowForm(true);
  };

  const handleCloseForm = () => setShowForm(false);

  // === SUBMIT ===
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (formData.id) {
      setWorks((prev) =>
        prev.map((w) => (w.id === formData.id ? formData : w))
      );
    } else {
      setWorks((prev) => [
        ...prev,
        { ...formData, id: prev.length ? prev[prev.length - 1].id + 1 : 1 },
      ]);
    }
    setShowForm(false);
  };

  // === DELETE ===
  const handleDelete = (id: number) => {
    if (confirm("Yakin ingin menghapus data ini?")) {
      const filtered = works.filter((w) => w.id !== id);
      const renumbered = filtered.map((item, i) => ({ ...item, id: i + 1 }));
      setWorks(renumbered);
    }
  };

  // === FILE UPLOAD ===
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setFormData({ ...formData, photo: file.name });
  };

  return (
    <LayoutWithSidebar>
      {/* === HEADER === */}
      <div className="mb-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">Works</h1>
        <button
          onClick={() => handleOpenForm()}
          className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Tambah
        </button>
      </div>

      {/* === TABLE === */}
      <div className="overflow-x-auto border border-gray-200 rounded-md shadow-md">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-sm w-16 text-center">No</th>
              <th className="border border-gray-300 px-4 py-2 text-sm w-40 text-center">Foto/Video</th>
              <th className="border border-gray-300 px-4 py-2 text-sm w-40 text-center">Judul</th>
              <th className="border border-gray-300 px-4 py-2 text-sm text-center">Deskripsi</th>
              <th className="border border-gray-300 px-4 py-2 text-sm w-44 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {works.map((item, index) => (
              <tr key={item.id} className="bg-white hover:bg-gray-50 text-center">
                <td className="border border-gray-300 py-3">{index + 1}</td>
                <td className="border border-gray-300 py-3">{item.photo}</td>
                <td className="border border-gray-300 py-3">{item.title}</td>
                <td className="border border-gray-300 py-3 text-gray-800 text-sm">
                  {item.desc}
                </td>
                <td className="border border-gray-300 py-3">
                  <div className="flex justify-center items-center gap-2">
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-xs"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleOpenForm(item)}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-xs"
                    >
                      Edit
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* === FORM MODAL === */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-[400px] shadow-xl">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              {formData.id ? "Edit Data" : "Tambah Data"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1">Foto/Video</label>
                <div className="flex items-center gap-2">
                  <input
                    id="fileInput"
                    type="file"
                    accept="image/*,video/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="fileInput"
                    className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-md cursor-pointer"
                  >
                    Pilih File
                  </label>
                  {formData.photo && (
                    <span className="text-sm text-gray-600 truncate max-w-[200px]">
                      {formData.photo}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium">Judul</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Deskripsi</label>
                <textarea
                  value={formData.desc}
                  onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-200"
                  rows={4}
                />
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={handleCloseForm}
                  className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </LayoutWithSidebar>
  );
}
