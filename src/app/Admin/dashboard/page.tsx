"use client";

import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import LayoutWithSidebar from "./LayoutWithSidebar"; // ✅ Gunakan sidebar yang sama
import { LogOut } from "lucide-react"; // Logout icon tetap sama

interface WorkItem {
  id: number;
  kategori: "Foto" | "Video" | "Animasi";
  foto: string;
  link_video?: string;
  judul: string;
  deskripsi: string;
}

const API_BASE = "http://192.168.1.13:8001/api/works";

export default function DashboardPage() {
  const [works, setWorks] = useState<WorkItem[]>([]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<WorkItem>({
    id: 0,
    kategori: "Foto",
    foto: "",
    link_video: "",
    judul: "",
    deskripsi: "",
  });

  const fetchWorks = async () => {
    try {
      const res = await fetch(API_BASE, { cache: "no-store" });
      const data = await res.json();

      // support jika backend kirim link_video atau link_video
      const mapped: WorkItem[] = (Array.isArray(data) ? data : []).map(
        (w: any) => ({
          id: w.id,
          kategori: w.kategori,
          foto: w.foto,
          link_video: w.link_video ?? w.link_video ?? "",
          judul: w.judul,
          deskripsi: w.deskripsi ?? w["deskripsi"] ?? "",
        })
      );

      setWorks(mapped);
    } catch (err) {
      console.error(err);
      alert("Gagal mengambil data dari server");
    }
  };

  useEffect(() => {
    fetchWorks();
  }, []);

  // === OPEN / CLOSE FORM ===
  const handleOpenForm = (item?: WorkItem) => {
    if (item) setFormData(item);
    else
      setFormData({
        id: 0,
        kategori: "Foto",
        foto: "",
        link_video: "",
        judul: "",
        deskripsi: "",
      });
    setShowForm(true);
  };

  const handleCloseForm = () => setShowForm(false);

  // === SUBMIT ===
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const isEdit = !!formData.id;

      const payload = {
        kategori: formData.kategori,
        foto: formData.foto,
        link_video: formData.link_video || "",
        judul: formData.judul,
        deskripsi: formData.deskripsi,
      };

      const res = await fetch(
        isEdit ? `${API_BASE}/${formData.id}` : API_BASE,
        {
          method: isEdit ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        alert(data.message || `Gagal simpan data (HTTP ${res.status})`);
        console.log("ERROR SAVE:", res.status, data);
        return;
      }

      setShowForm(false);
      fetchWorks(); // refresh dari database
    } catch (err) {
      console.error(err);
      alert("Terjadi error saat simpan data");
    }
  };

  // === DELETE ===
  const handleDelete = async (id: number) => {
    if (!confirm("Yakin ingin menghapus data ini?")) return;

    try {
      const res = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Gagal menghapus data");
        return;
      }

      fetchWorks(); // refresh dari database
    } catch (err) {
      console.error(err);
      alert("Terjadi error saat delete data");
    }
  };

  // === FILE UPLOAD ===
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setFormData({ ...formData, foto: file.name });
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
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-sm w-16 text-center">
                No
              </th>
              <th className="border border-gray-300 px-4 py-2 text-sm w-40 text-center">
                Kategori
              </th>
              <th className="border border-gray-300 px-4 py-2 text-sm w-40 text-center">
                Foto
              </th>
              <th className="border border-gray-300 px-4 py-2 text-sm w-60 text-center">
                Link Video
              </th>
              <th className="border border-gray-300 px-4 py-2 text-sm w-40 text-center">
                Judul
              </th>
              <th className="border border-gray-300 px-4 py-2 text-sm text-center">
                Deskripsi
              </th>
              <th className="border border-gray-300 px-4 py-2 text-sm w-44 text-center">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {works.map((item, index) => (
              <tr
                key={item.id}
                className="bg-white hover:bg-gray-50 text-center"
              >
                <td className="border border-gray-300 py-3 text-gray-800 text-sm">
                  {index + 1}
                </td>
                <td className="border border-gray-300 py-3 text-gray-800 text-sm">
                  {item.kategori}
                </td>
                <td className="border border-gray-300 py-3 text-gray-800 text-sm">
                  {item.foto}
                </td>
                <td className="border border-gray-300 py-3 text-gray-800 text-sm">
                  {item.link_video}
                </td>
                <td className="border border-gray-300 py-3 text-gray-800 text-sm">
                  {item.judul}
                </td>
                <td className="border border-gray-300 py-3 text-gray-800 text-sm">
                  {item.deskripsi}
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
                <label className="block text-sm text-gray-700 font-medium">Kategori</label>
                <select
                  value={formData.kategori}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      kategori: e.target.value as WorkItem["kategori"],
                    })
                  }
                  className="w-full border border-gray-400 text-gray-400 rounded-md p-2 focus:ring focus:ring-blue-200"
                >
                  <option value="Foto">Foto</option>
                  <option value="Video">Video</option>
                  <option value="Animasi">Animasi</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-700 font-medium">Foto</label>
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
                    className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-md cursor-pointer mb-3"
                  >
                    Pilih File
                  </label>
                  {formData.foto && (
                    <span className="text-sm text-gray-600 truncate max-w-[200px]">
                      {formData.foto}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-sm text-gray-700 font-medium">
                    Link Video
                  </label>
                  <input
                    type="url"
                    placeholder="https://youtube.com/..."
                    value={formData.link_video}
                    onChange={(e) =>
                      setFormData({ ...formData, link_video: e.target.value })
                    }
                    className="w-full border border-gray-400 text-gray-400 rounded-md p-2 focus:ring focus:ring-blue-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-700 font-medium">Judul</label>
                <input
                  type="text"
                  value={formData.judul}
                  onChange={(e) =>
                    setFormData({ ...formData, judul: e.target.value })
                  }
                  className="w-full border border-gray-400 text-gray-400 rounded-md p-2 focus:ring focus:ring-blue-200"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 font-medium">Deskripsi</label>
                <textarea
                  value={formData.deskripsi}
                  onChange={(e) =>
                    setFormData({ ...formData, deskripsi: e.target.value })
                  }
                  className="w-full border border-gray-400 text-gray-400 rounded-md p-2 focus:ring focus:ring-blue-200"
                  rows={4}
                />
              </div>

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
