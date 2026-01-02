"use client";

import { useState, useEffect, ChangeEvent, FormEvent, useCallback } from "react";
import { useRouter } from "next/navigation";
import LayoutWithSidebar from "./LayoutWithSidebar";

type Layanan1Option = {
  id: number;
  judul: string;
};

interface WorkItem {
  id: number;

  layanan1_id: number;
  kategori_nama?: string; 

  foto: string;
  link_video: string;
  audio: string;
  judul: string;
  deskripsi: string;
}

const BACKEND =
  process.env.NEXT_PUBLIC_BACKEND_URL?.replace(/\/$/, "") ||
  "http://localhost:8001";

const API_ADMIN_LIST = `${BACKEND}/api/works/admin/list`;
const API_BASE = `${BACKEND}/api/works`;

const API_LAYANAN1 = `${BACKEND}/api/layananc`;

const FILE_BASE = `${BACKEND}/storage/works/`;
const AUDIO_BASE = `${BACKEND}/storage/works/`;

async function safeJson(res: Response) {
  try {
    return await res.json();
  } catch {
    return null;
  }
}

export default function DashboardPage() {
  const router = useRouter();

  const [works, setWorks] = useState<WorkItem[]>([]);
  const [layanan1Options, setLayanan1Options] = useState<Layanan1Option[]>([]);

  const [selectedFoto, setSelectedFoto] = useState<File | null>(null);
  const [selectedAudio, setSelectedAudio] = useState<File | null>(null);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<WorkItem>({
    id: 0,
    layanan1_id: 0,
    kategori_nama: "",
    foto: "",
    link_video: "",
    audio: "",
    judul: "",
    deskripsi: "",
  });

  const getToken = () =>
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const redirectToLogin = () => {
    localStorage.removeItem("token");
    router.replace("/Admin/login");
  };

  const fetchLayanan1 = useCallback(async () => {
    const token = getToken();
    if (!token) return redirectToLogin();

    try {
      const res = await fetch(API_LAYANAN1, {
        cache: "no-store",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 401 || res.status === 403) return redirectToLogin();

      const data = await safeJson(res);

      // dukung beberapa format response
      const arr = Array.isArray(data)
        ? data
        : Array.isArray(data?.data)
        ? data.data
        : Array.isArray(data?.layanan1)
        ? data.layanan1
        : [];

      const mapped: Layanan1Option[] = (arr || [])
        .map((x: any) => ({
          id: Number(x.id),
          judul: String(x.judul || x.nama || x.kategori || "").trim(),
        }))
        .filter((x) => x.id > 0 && x.judul !== "");

      setLayanan1Options(mapped);
    } catch (err) {
      console.error(err);
      alert("Gagal mengambil kategori (layanan1) dari server");
      setLayanan1Options([]);
    }
  }, [router]);

  const fetchWorks = useCallback(async () => {
    const token = getToken();
    if (!token) return redirectToLogin();

    try {
      const res = await fetch(API_ADMIN_LIST, {
        cache: "no-store",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 401 || res.status === 403) return redirectToLogin();

      const data = await safeJson(res);
      const arr = Array.isArray(data) ? data : [];

      const mapped: WorkItem[] = arr.map((w: any) => ({
        id: Number(w.id),
        layanan1_id: Number(w.layanan1_id || 0),
        kategori_nama: String(w.kategori_nama || w.kategori || "").trim(),

        foto: w.foto || "",
        link_video: w.link_video || "",
        audio: w.audio || "",
        judul: w.judul || "",
        deskripsi: w.deskripsi || "",
      }));

      setWorks(mapped);
    } catch (err) {
      console.error(err);
      alert("Gagal mengambil data dari server");
    }
  }, [router]);

  useEffect(() => {
    const token = getToken();
    if (!token) return redirectToLogin();

    fetchLayanan1();
    fetchWorks();

    setSelectedFoto(null);
    setSelectedAudio(null);
  }, [fetchWorks, fetchLayanan1]);

  useEffect(() => {
    if (!showForm) return;
    if (formData.id !== 0) return; // hanya mode tambah
    if (formData.layanan1_id && formData.layanan1_id > 0) return;

    if (layanan1Options.length > 0) {
      setFormData((prev) => ({
        ...prev,
        layanan1_id: layanan1Options[0].id,
      }));
    }
  }, [layanan1Options, showForm]);

  // === OPEN / CLOSE FORM ===
  const handleOpenForm = (item?: WorkItem) => {
    if (item) {
      setFormData({
        id: Number(item.id),
        layanan1_id: Number(item.layanan1_id || 0),
        kategori_nama: item.kategori_nama || "",
        foto: item.foto || "",
        link_video: item.link_video || "",
        audio: item.audio || "",
        judul: item.judul || "",
        deskripsi: item.deskripsi || "",
      });
    } else {
      setFormData({
        id: 0,
        layanan1_id: layanan1Options[0]?.id || 0,
        kategori_nama: "",
        foto: "",
        link_video: "",
        audio: "",
        judul: "",
        deskripsi: "",
      });
    }

    setSelectedFoto(null);
    setSelectedAudio(null);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedFoto(null);
    setSelectedAudio(null);
  };

  // === SUBMIT ===
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const token = getToken();
    if (!token) return redirectToLogin();

    const isEdit = !!formData.id;

    // ✅ kategori wajib dipilih
    const layanan1_id = Number(formData.layanan1_id);
    if (!Number.isFinite(layanan1_id) || layanan1_id <= 0) {
      alert("Kategori wajib dipilih");
      return;
    }

    // judul wajib (tambah & edit)
    if (!String(formData.judul || "").trim()) {
      alert("Judul wajib diisi");
      return;
    }

    // edit: judul + deskripsi wajib
    if (isEdit && !String(formData.deskripsi || "").trim()) {
      alert("Deskripsi wajib diisi saat edit");
      return;
    }

    const hasFoto = !!selectedFoto;
    const hasVideo = !!String(formData.link_video || "").trim();
    const hasAudio = !!selectedAudio;

    // tambah: minimal salah satu konten
    if (!isEdit && !hasFoto && !hasVideo && !hasAudio) {
      alert("Minimal upload foto atau isi link video atau upload audio");
      return;
    }

    const fd = new FormData();

    fd.append("layanan1_id", String(layanan1_id));
    fd.append("judul", String(formData.judul || ""));
    fd.append("deskripsi", String(formData.deskripsi || ""));
    fd.append("link_video", String(formData.link_video || ""));

    if (selectedFoto) fd.append("foto", selectedFoto);
    if (selectedAudio) fd.append("audio", selectedAudio);

    try {
      const res = await fetch(isEdit ? `${API_BASE}/${formData.id}` : API_BASE, {
        method: isEdit ? "PUT" : "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: fd,
      });

      const data = await safeJson(res);

      if (res.status === 401 || res.status === 403) return redirectToLogin();

      if (!res.ok) {
        alert(data?.message || "Gagal simpan data");
        return;
      }

      alert(isEdit ? "✅ Work berhasil diperbarui" : "✅ Work berhasil ditambahkan");

      setShowForm(false);
      setSelectedFoto(null);
      setSelectedAudio(null);
      await fetchWorks();
    } catch (err) {
      console.error(err);
      alert("Server error saat simpan");
    }
  };

  // === DELETE ===
  const handleDelete = async (id: number) => {
    if (!confirm("Yakin ingin menghapus data ini?")) return;

    const token = getToken();
    if (!token) return redirectToLogin();

    try {
      const res = await fetch(`${API_BASE}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await safeJson(res);

      if (res.status === 401 || res.status === 403) return redirectToLogin();

      if (!res.ok) {
        alert(data?.message || "Gagal menghapus data");
        return;
      }

      alert("✅ Work berhasil dihapus");
      await fetchWorks();
    } catch (err) {
      console.error(err);
      alert("Terjadi error saat delete data");
    }
  };

  // === FILE UPLOAD ===
  const handleFotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFoto(file);
  };

  const handleAudioChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedAudio(file);
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
              <th className="border border-gray-300 px-4 py-2 text-sm w-12 text-center">
                No
              </th>
              <th className="border border-gray-300 px-4 py-2 text-sm w-28 text-center">
                Kategori
              </th>
              <th className="border border-gray-300 px-4 py-2 text-sm w-35 text-center">
                Foto
              </th>
              <th className="border border-gray-300 px-4 py-2 text-sm w-60 text-center">
                Link Video
              </th>
              <th className="border border-gray-300 px-4 py-2 text-sm w-40 text-center">
                Audio
              </th>
              <th className="border border-gray-300 px-4 py-2 text-sm w-40 text-center">
                Judul
              </th>
              <th className="border border-gray-300 px-4 py-2 text-sm text-center">
                Deskripsi
              </th>
              <th className="border border-gray-300 px-4 py-2 text-sm w-35 text-center">
                Aksi
              </th>
            </tr>
          </thead>

          <tbody>
            {works.map((item, index) => (
              <tr key={item.id} className="bg-white hover:bg-gray-50 text-center">
                <td className="border border-gray-300 py-3 text-gray-800 text-sm">
                  {index + 1}
                </td>
                <td className="border border-gray-300 py-3 text-gray-800 text-sm">
                  {item.kategori_nama || "-"}
                </td>
                <td className="border border-gray-300 py-3 text-gray-800 text-sm">
                  {item.foto ? (
                    <img
                      src={`${FILE_BASE}${item.foto}`}
                      alt={item.judul}
                      className="mx-auto h-16 w-24 object-cover rounded"
                    />
                  ) : (
                    "-"
                  )}
                </td>
                <td className="border border-gray-300 py-3 text-gray-800 text-sm">
                  {item.link_video || "-"}
                </td>
                <td className="border border-gray-300 py-3 text-gray-800 text-sm">
                  {item.audio ? (
                    <audio controls className="mx-auto w-56">
                      <source src={`${AUDIO_BASE}${item.audio}`} type="audio/mpeg" />
                    </audio>
                  ) : (
                    "-"
                  )}
                </td>
                <td className="border border-gray-300 py-3 text-gray-800 text-sm">
                  {item.judul}
                </td>
                <td className="border border-gray-300 py-3 text-gray-800 text-sm">
                  {item.deskripsi || "-"}
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

            {works.length === 0 && (
              <tr>
                <td colSpan={8} className="text-center py-4 text-gray-500">
                  Belum ada data
                </td>
              </tr>
            )}
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
                <label className="block text-sm text-gray-700 font-medium">
                  Kategori
                </label>
                <select
                  value={String(formData.layanan1_id || 0)}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      layanan1_id: Number(e.target.value),
                    })
                  }
                  className="w-full border border-gray-400 text-gray-700 rounded-md p-2 focus:ring focus:ring-blue-200"
                >
                  <option value="0">-- Pilih Kategori --</option>
                  {layanan1Options.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.judul}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-700 font-medium">
                  Foto
                </label>
                <div className="flex items-center gap-2">
                  <input
                    id="fileInput"
                    type="file"
                    accept="image/*,video/*"
                    onChange={handleFotoChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="fileInput"
                    className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-md cursor-pointer mb-3"
                  >
                    Pilih File
                  </label>

                  <span className="text-sm text-gray-600 truncate max-w-[200px]">
                    {selectedFoto?.name || formData.foto || "Tidak ada"}
                  </span>
                </div>
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
                  className="w-full border border-gray-400 text-gray-700 rounded-md p-2 focus:ring focus:ring-blue-200"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 font-medium">
                  Audio (MP3)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    id="audioInput"
                    type="file"
                    accept="audio/mpeg"
                    onChange={handleAudioChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="audioInput"
                    className="bg-purple-600 hover:bg-purple-700 text-white text-sm px-4 py-2 rounded-md cursor-pointer mb-3"
                  >
                    Pilih MP3
                  </label>

                  <span className="text-sm text-gray-600 truncate max-w-[200px]">
                    {selectedAudio?.name || formData.audio || "Tidak ada"}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-700 font-medium">
                  Judul
                </label>
                <input
                  type="text"
                  value={formData.judul}
                  onChange={(e) =>
                    setFormData({ ...formData, judul: e.target.value })
                  }
                  className="w-full border border-gray-400 text-gray-700 rounded-md p-2 focus:ring focus:ring-blue-200"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 font-medium">
                  Deskripsi
                </label>
                <textarea
                  value={formData.deskripsi}
                  onChange={(e) =>
                    setFormData({ ...formData, deskripsi: e.target.value })
                  }
                  className="w-full border border-gray-400 text-gray-700 rounded-md p-2 focus:ring focus:ring-blue-200"
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
