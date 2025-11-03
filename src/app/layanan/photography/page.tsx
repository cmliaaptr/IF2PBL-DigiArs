"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import LayoutWithSidebar from "@/app/components/LayoutWithSidebar";

interface PhotoItem {
  id: number;
  photo: string;
  title: string;
}

export default function PhotographyPage() {
  const [photos, setPhotos] = useState<PhotoItem[]>([
    { id: 1, photo: "photo1.jpg", title: "Wedding Photography" },
    {
      id: 2,
      photo: "photo2.jpg",
      title:
        "Product Photography",
    },
    { id: 3, photo: "photo3.jpg", title: "Event Photography" },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<PhotoItem>({
    id: 0,
    photo: "",
    title: "",
  });

  // === Open / Close Form ===
  const handleOpenForm = (item?: PhotoItem) => {
    if (item) setFormData(item);
    else setFormData({ id: 0, photo: "", title: "" });
    setShowForm(true);
  };

  const handleCloseForm = () => setShowForm(false);

  // === Submit (Tambah / Edit) ===
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (formData.id) {
      setPhotos((prev) =>
        prev.map((p) => (p.id === formData.id ? formData : p))
      );
    } else {
      setPhotos((prev) => [
        ...prev,
        { ...formData, id: prev.length ? prev[prev.length - 1].id + 1 : 1 },
      ]);
    }
    setShowForm(false);
  };

  // === Delete + Renumber ===
  const handleDelete = (id: number) => {
    if (confirm("Yakin ingin menghapus data ini?")) {
      const filtered = photos.filter((p) => p.id !== id);
      const renumbered = filtered.map((item, i) => ({ ...item, id: i + 1 }));
      setPhotos(renumbered);
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
      {/* === HEADER === */}
      <div className="mb-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">Photography</h1>
        <button
          onClick={() => handleOpenForm()}
          className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Tambah
        </button>
      </div>

      {/* === TABLE === */}
      <div className="overflow-x-auto border border-gray-200 rounded-md shadow-md">
        <table className="min-w-full table-fixed border-collapse">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="w-16 border border-gray-300 px-4 py-2 text-sm text-center">
                No
              </th>
              <th className="w-40 border border-gray-300 px-4 py-2 text-sm text-center">
                Foto/Video
              </th>
              <th className="border border-gray-300 px-4 py-2 text-sm text-center">
                Judul
              </th>
              <th className="w-44 border border-gray-300 px-4 py-2 text-sm text-center">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {photos.map((item, index) => (
              <tr
                key={item.id}
                className="bg-white hover:bg-gray-50 text-center align-middle"
              >
                {/* === NO === */}
                <td className="border border-gray-300 py-3 align-middle text-center">
                  {index + 1}
                </td>

                {/* === FOTO === */}
                <td className="border border-gray-300 py-3 align-middle text-center">
                  {item.photo}
                </td>

                {/* === JUDUL (wrap otomatis) === */}
                <td className="border border-gray-300 py-3 px-4 text-gray-800 text-sm text-center align-middle whitespace-pre-line break-words">
                  {item.title}
                </td>

                {/* === AKSI === */}
                <td className="border border-gray-300 py-3 align-middle text-center">
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

      {/* === MODAL FORM === */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-[400px] shadow-xl">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              {formData.id ? "Edit Data" : "Tambah Data"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3">
              {/* FOTO/VIDEO */}
              <div>
                <label className="block text-sm font-medium mb-1">
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
                <label className="block text-sm font-medium">Judul</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-200"
                />
              </div>

              {/* BUTTONS */}
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
