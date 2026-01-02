"use client";

import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import LayoutWithSidebar from "../../dashboard/LayoutWithSidebar";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface LayananItem {
  id: number;
  foto: string;
  judul: string;
  deskripsi: string;
}

const BACKEND =
  process.env.NEXT_PUBLIC_BACKEND_URL?.replace(/\/$/, "") ||
  "http://localhost:8001";

export default function LayananCardPage() {
  const router = useRouter();

  const [layanan, setLayanan] = useState<LayananItem[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [judul, setJudul] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [deskripsi, setDeskripsi] = useState("");

  // ✅ Ambil token dari localStorage
  const getToken = () => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("token");
  };

  // ✅ helper fetch yang otomatis pasang Authorization
  const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
    const token = getToken();
    if (!token) {
      alert("Silakan login terlebih dahulu");
      router.replace("/login"); // sesuaikan route login kamu
      throw new Error("No token");
    }

    const headers: Record<string, string> = {
      ...(options.headers as Record<string, string>),
      Authorization: `Bearer ${token}`,
    };

    const res = await fetch(url, { ...options, headers });

    // kalau token invalid / expired
    if (res.status === 401 || res.status === 403) {
      alert("Session kamu habis / belum login. Silakan login lagi.");
      localStorage.removeItem("token");
      router.replace("/login"); // sesuaikan route login kamu
      throw new Error("Unauthorized");
    }

    return res;
  };

  const fetchData = async () => {
    try {
      const res = await fetchWithAuth(`${BACKEND}/api/layananc`, {
        cache: "no-store",
      });
      const data = await res.json().catch(() => []);
      setLayanan(Array.isArray(data) ? data : []);
    } catch {
      // silent
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setFile(e.target.files[0]);
  };

  const openAddForm = () => {
    setEditingId(null);
    setJudul("");
    setDeskripsi("");
    setFile(null);
    setShowForm(true);
  };

  const openEditForm = (item: LayananItem) => {
    setEditingId(item.id);
    setJudul(item.judul);
    setDeskripsi(item.deskripsi);
    setFile(null); 
    setShowForm(true);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!judul.trim()) {
      alert("Judul wajib diisi!");
      return;
    }

    if (!editingId && !file) {
      alert("Foto / Video wajib diupload!");
      return;
    }

    const formData = new FormData();
    formData.append("judul", judul.trim());
    formData.append("deskripsi", deskripsi);
    if (file) formData.append("foto", file);

    try {
      if (editingId) {
        const res = await fetchWithAuth(`${BACKEND}/api/layananc/${editingId}`, {
          method: "PUT",
          body: formData,
        });

        const payload = await res.json().catch(() => ({}));
        if (!res.ok) {
          alert(payload?.message || "Gagal update layanan");
          return;
        }

        alert("✅ Layanan berhasil diupdate");
      } else {
        const res = await fetchWithAuth(`${BACKEND}/api/layananc`, {
          method: "POST",
          body: formData,
        });

        const payload = await res.json().catch(() => ({}));
        if (!res.ok) {
          alert(payload?.message || "Gagal tambah layanan");
          return;
        }

        alert("✅ Layanan berhasil ditambahkan (muncul di dropdown Layanan)");
      }

      setShowForm(false);
      await fetchData();
    } catch {
      // silent
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin ingin menghapus data ini?")) return;

    try {
      const res = await fetchWithAuth(`${BACKEND}/api/layananc/${id}`, {
        method: "DELETE",
      });

      const payload = await res.json().catch(() => ({}));
      if (!res.ok) {
        alert(payload?.message || "Gagal hapus layanan");
        return;
      }

      await fetchData();
    } catch {
      // silent
    }
  };

  return (
    <LayoutWithSidebar>
      <div className="mb-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">Layanan Card</h1>
        <div className="flex gap-3">
          <Link href="/Admin/layanan">
            <button className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700">
              Kembali
            </button>
          </Link>
          <button
            onClick={openAddForm}
            className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700"
          >
            Tambah
          </button>
        </div>
      </div>

      <div className="overflow-x-auto border rounded-md shadow">
        <table className="min-w-full border-collapse text-grey">
          <thead className="bg-gray-100 text-black font-semibold">
            <tr>
              <th className="border px-3 py-2">No</th>
              <th className="border px-3 py-2">Foto / Video</th>
              <th className="border px-3 py-2">Judul</th>
              <th className="border px-3 py-2">Deskripsi</th>
              <th className="border px-3 py-2">Aksi</th>
            </tr>
          </thead>

          <tbody className="text-black">
            {layanan.map((item, index) => (
              <tr key={item.id} className="text-center">
                <td className="border px-3 py-2">{index + 1}</td>

                <td className="border px-3 py-2">
                  {item.foto?.endsWith(".mp4") ? (
                    <video
                      src={`${BACKEND}/storage/layananc/${item.foto}`}
                      controls
                      className="w-32 h-20 mx-auto object-cover"
                    />
                  ) : (
                    <img
                      src={`${BACKEND}/storage/layananc/${item.foto}`}
                      className="w-32 h-20 mx-auto object-cover"
                      alt={item.judul}
                    />
                  )}
                </td>

                <td className="border px-3 py-2">{item.judul}</td>

                <td className="border px-3 py-2 text-sm text-gray-800 max-w-[300px] break-words">
                  {item.deskripsi || "-"}
                </td>

                <td className="border px-3 py-2">
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded text-xs"
                    >
                      Delete
                    </button>

                    <button
                      onClick={() => openEditForm(item)}
                      className="bg-green-500 text-white px-3 py-1 rounded text-xs"
                    >
                      Edit
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {layanan.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-500">
                  Belum ada data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-[400px] text-black">
            <h2 className="text-lg font-semibold mb-4">
              {editingId ? "Edit Layanan Card" : "Tambah Layanan Card"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-sm mb-1">Foto / Video</label>
                <div className="flex items-center gap-3">
                  <input
                    id="fileInput"
                    type="file"
                    accept="image/*,video/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="fileInput"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-700"
                  >
                    Telusuri File
                  </label>
                  {file && (
                    <span className="text-sm text-gray-600 truncate max-w-[180px]">
                      {file.name}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm mb-1">Judul</label>
                <input
                  type="text"
                  value={judul}
                  onChange={(e) => setJudul(e.target.value)}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Deskripsi</label>
                <textarea
                  value={deskripsi}
                  onChange={(e) => setDeskripsi(e.target.value)}
                  rows={3}
                  className="w-full border p-2 rounded"
                  placeholder="Masukkan deskripsi layanan"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 bg-gray-200 rounded"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded"
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
