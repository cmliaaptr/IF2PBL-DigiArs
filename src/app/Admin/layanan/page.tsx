"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import LayoutWithSidebar from "../dashboard/LayoutWithSidebar";

interface LayananItem {
  id: number;
  photo: string;
  title: string;
}

export default function LayananPage() {
  const [layanan, setLayanan] = useState<LayananItem[]>([
    {
      id: 1,
      photo: "layanan1.jpg",
      title: "Photography",
    },
    {
      id: 2,
      photo: "layanan2.jpg",
      title: "Videography",
    },
    {
      id: 3,
      photo: "layanan3.jpg",
      title: "sounding",
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<LayananItem>({
    id: 0,
    photo: "",
    title: "",
  });

  // === Open/Close Form ===
  const handleOpenForm = (item?: LayananItem) => {
    if (item) setFormData(item);
    else setFormData({ id: 0, photo: "", title: "" });
    setShowForm(true);
  };
  const handleCloseForm = () => setShowForm(false);

  // === Submit (Tambah / Edit) ===
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (formData.id) {
      // Edit data
      setLayanan((prev) =>
        prev.map((l) => (l.id === formData.id ? formData : l))
      );
    } else {
      // Tambah data baru
      setLayanan((prev) => [
        ...prev,
        { ...formData, id: prev.length ? prev[prev.length - 1].id + 1 : 1 },
      ]);
    }
    setShowForm(false);
  };

  // === Delete + Renumber ===
  const handleDelete = (id: number) => {
    if (confirm("Yakin ingin menghapus data ini?")) {
      const filtered = layanan.filter((l) => l.id !== id);
      const renumbered = filtered.map((item, i) => ({ ...item, id: i + 1 }));
      setLayanan(renumbered);
    }
  };

  // === Upload File ===
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, photo: file.name });
    }
  };

  return (
    <LayoutWithSidebar>
      {/* HEADER */}
      <div className="mb-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">Layanan</h1>
        <button
          onClick={() => handleOpenForm()}
          className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Tambah
        </button>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto border border-gray-200 rounded-md shadow-md">
        <table className="min-w-full border-collapse table-fixed">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="w-16 border border-gray-300 px-4 py-2 text-sm text-center">
                No
              </th>
              <th className="w-50 border border-gray-300 px-4 py-2 text-sm text-center">
                Foto/Video
              </th>
              <th className="border border-gray-300 px-4 py-2 text-sm text-center">
                Judul
              </th>
              <th className="w-60 border border-gray-300 px-4 py-2 text-sm text-center">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {layanan.map((item, index) => (
              <tr
                key={item.id}
                className="bg-white hover:bg-gray-50 text-gray-700 text-center align-middle"
              >
                <td className="border border-gray-300 py-3 align-middle">
                  {index + 1}
                </td>
                <td className="border border-gray-300 py-3 align-middle break-words">
                  {item.photo}
                </td>
                <td className="border border-gray-300 py-3 text-gray-800 text-sm text-center align-middle break-words whitespace-pre-line max-w-[250px]">
                {item.title}
                </td>
                <td className="border border-gray-300 px-4 py-3 align-middle">
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

      {/* MODAL FORM */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-[400px] shadow-xl">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              {formData.id ? "Edit Layanan" : "Tambah Layanan"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3">
              {/* FOTO/VIDEO */}
              <div>
                <label className="block text-sm text-gray-700 font-medium mb-1">
                  Foto/Video
                </label>
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

              {/* JUDUL */}
              <div>
                <label className="block text-sm text-gray-700 font-medium">Judul</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full border border-gray-400 text-gray-400 rounded-md p-2 focus:ring focus:ring-blue-200"
                />
              </div>

              {/* BUTTONS */}
              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={handleCloseForm}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
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
