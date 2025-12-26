"use client";

import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import LayoutWithSidebar from "../../dashboard/LayoutWithSidebar";
import Link from "next/link";

interface LayananItem {
  id: number;
  foto: string;
  judul: string;
  deskripsi:string;
}

export default function LayananCardPage() {
  // ================= STATE =================
  const [layanan, setLayanan] = useState<LayananItem[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [judul, setJudul] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [deskripsi, setDeskripsi] = useState("");

  // ================= GET DATA =================
  const fetchData = async () => {
    const res = await fetch("http://localhost:8001/api/layananc");
    const data = await res.json();
    setLayanan(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ================= FILE CHANGE =================
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  // ================= OPEN FORM =================
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

  // ================= SUBMIT =================
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("judul", judul);
    formData.append("deskripsi", deskripsi);
    if (file) formData.append("foto", file);

    if (editingId) {
      // UPDATE
      await fetch(
        `http://localhost:8001/api/layananc/${editingId}`,
        {
          method: "PUT",
          body: formData,
        }
      );
    } else {
      // CREATE
      await fetch("http://localhost:8001/api/layananc", {
        method: "POST",
        body: formData,
      });
    }

    setShowForm(false);
    fetchData();
  };

  // ================= DELETE =================
  const handleDelete = async (id: number) => {
    if (!confirm("Yakin ingin menghapus data ini?")) return;

    await fetch(`http://localhost:8001/api/layananc/${id}`, {
      method: "DELETE",
    });

    fetchData();
  };

  // ================= RENDER =================
  return (
    <LayoutWithSidebar>
      {/* HEADER */}
      <div className="mb-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">
          Layanan Card
        </h1>
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

      {/* TABLE */}
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
                  {item.foto.endsWith(".mp4") ? (
                    <video
                      src={`http://localhost:8001/storage/layanan_card/${item.foto}`}
                      controls
                      className="w-32 h-20 mx-auto object-cover"
                    />
                  ) : (
                    <img
                      src={`http://localhost:8001/storage/layanan_card/${item.foto}`}
                      className="w-32 h-20 mx-auto object-cover"
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
                <td colSpan={4} className="text-center py-4 text-gray-500">
                  Belum ada data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL FORM */}
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
                  {/* INPUT FILE DISEMBUNYIKAN */}
                  <input
                    id="fileInput"
                    type="file"
                    accept="image/*,video/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />

                  {/* BUTTON TELUSURI */}
                  <label
                    htmlFor="fileInput"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-700"
                  >
                    Telusuri File
                  </label>

                  {/* NAMA FILE */}
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
