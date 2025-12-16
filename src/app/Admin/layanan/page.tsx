"use client";

import { useEffect, useMemo, useState, ChangeEvent, FormEvent } from "react";
import LayoutWithSidebar from "../dashboard/LayoutWithSidebar";
import { useParams } from "next/navigation";

interface LayananItem {
  id: number;
  kategori: string;
  foto: string;
  link_video: string;
  judul: string;
}

const API_BASE = "http://localhost:8001/api/layanan";
const FILE_BASE = "http://192.168.1.13:8001/storage/layanan/";

const KATEGORI_MAP: Record<string, string> = {
  photography: "Photography",
  videography: "Videography",
  design: "Design",
  animasi: "Animasi",
  game: "Game",
  broadcasting: "Broadcasting",
  soundproduction: "Sound Production",
  sewabarang: "Sewa Barang",
};
  
export default function LayananPage() {
  // === Kategori dari URL Param ===
    const params = useParams<{ kategori?: string }>();

    const KATEGORI = useMemo(() => {
    const slug = (params?.kategori || "").toString().toLowerCase();
    return KATEGORI_MAP[slug] || "";
  }, [params?.kategori]);

    const [layanan, setLayanan] = useState<LayananItem[]>([]);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState<LayananItem>({
      id: 0,
      kategori: KATEGORI,
      foto: "",
      link_video: "",
      judul: "",
    });

  // === Fetch Data from API ===
    const fetchLayanan = async () => {
    const res = await fetch(`${API_BASE}?kategori=${encodeURIComponent(KATEGORI)}`, {
      cache: "no-store",
    });
    const data = await res.json();
    setLayanan(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    // kategori berubah -> refresh & reset form
    fetchLayanan();
    setShowForm(false);
    setSelectedFile(null);
    setFormData({ id: 0, kategori: KATEGORI, foto: "", link_video: "", judul: "" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [KATEGORI]);

    
  // === Open/Close Form ===
  const handleOpenForm = (item?: LayananItem) => {
    setSelectedFile(null);
    if (item) setFormData(item);
    else setFormData({ id: 0, kategori: KATEGORI, foto: "", link_video:"", judul: "" });
    setShowForm(true);
  };
  const handleCloseForm = () => setShowForm(false);

  // === Submit (Tambah / Edit) ===
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const isEdit = !!formData.id;

    const fd = new FormData();
    fd.append("kategori", KATEGORI);
    fd.append("judul", formData.judul);
    fd.append("link_video", formData.link_video || "");

    if (selectedFile) { fd.append("foto", selectedFile);
    } else {
      fd.append("foto", formData.foto || ""); // biar update tanpa ganti file tetap aman
    }

    const res = await fetch(isEdit ? `${API_BASE}/${formData.id}` : API_BASE, {
      method: isEdit ? "PUT" : "POST",
      body: fd,
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      alert(data.message || `Gagal simpan (HTTP ${res.status})`);
      console.log("ERR:", data);
      return;
    }

    setShowForm(false);
    setSelectedFile(null);
    fetchLayanan();
  };

  // === Delete + Renumber ===
  const handleDelete = async (id: number) => {
    if (!confirm("Yakin ingin menghapus data ini?")) return;

    const res = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      alert(data.message || "Gagal hapus");
      return;
    }
    fetchLayanan();
  };

  // === Upload File ===
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFile(file); // ✅ ini yang kemarin belum ada
    setFormData((prev) => ({ ...prev, foto: file.name }));
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
              <th className="w-10 border border-gray-300 px-4 py-2 text-sm text-center">
                No
              </th>
              <th className="w-40 border border-gray-300 px-4 py-2 text-sm text-center">
                Foto
              </th>
              <th className="w-40 border border-gray-300 px-4 py-2 text-sm text-center">
                Link Video
              </th>
              <th className="w-40 border border-gray-300 px-4 py-2 text-sm text-center">
                Judul
              </th>
              <th className="w-40 border border-gray-300 px-4 py-2 text-sm text-center">
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
                  {item.foto ? (
                    <img
                      src={`${FILE_BASE}${item.foto}`}
                      alt={item.judul}  
                      className="mx-auto max-h-16 object-cover rounded"
                    />
                  ) : (
                    "-"
                  )}
                </td>
                <td className="border border-gray-300 py-3 text-gray-800 text-sm">
                  {item.link_video}
                </td>
                <td className="border border-gray-300 py-3 text-gray-800 text-sm text-center align-middle break-words whitespace-pre-line max-w-[250px]">
                {item.judul}
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
                  Foto
                </label>
                <div className="flex items-center gap-2">
                  <input
                    id="fileInput"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="fileInput"
                    className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-md cursor-pointer"
                  >
                    Pilih File
                  </label>
                  <span className="text-sm text-gray-600 truncate max-w-[200px]">
                    {selectedFile ? selectedFile.name : formData.foto || "-"}
                  </span>
                </div>
              </div>

              {/* LINK VIDEO */}
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

              {/* JUDUL */}
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
