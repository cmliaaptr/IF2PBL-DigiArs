"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LayoutWithSidebar from "@/app/Admin/dashboard/LayoutWithSidebar";
import FormCard from "../components/form/FormCard";
import InputText from "../components/form/InputText";
import InputLink from "../components/form/InputLink";
import SubmitButton from "../components/form/SubmitButton";

const BACKEND =
  process.env.NEXT_PUBLIC_BACKEND_URL?.replace(/\/$/, "") ||
  "http://localhost:8001";

async function safeJson(res: Response) {
  try {
    return await res.json();
  } catch {
    return null;
  }
}

export default function SettingsPage() {
  const router = useRouter();

  const [wa, setWa] = useState("");
  const [linkIg, setLinkIg] = useState("");
  const [loading, setLoading] = useState(false);

  const getToken = () =>
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const goLogin = () => {
    localStorage.removeItem("token");
    router.replace("/Admin/login");
  };

  const fetchSetting = async () => {
    const token = getToken();
    if (!token) {
      alert("Silakan login terlebih dahulu");
      goLogin();
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${BACKEND}/api/setting`, {
        cache: "no-store",
        headers: { Authorization: `Bearer ${token}` },
      });

      const payload = await safeJson(res);

      if (res.status === 401 || res.status === 403) {
        alert("Sesi kamu habis. Silakan login ulang.");
        goLogin();
        return;
      }

      if (!res.ok) {
        alert(payload?.message || "Gagal mengambil setting");
        return;
      }

      setWa(payload?.wa || "");
      setLinkIg(payload?.link_ig || "");
    } catch (e) {
      console.error(e);
      alert("Gagal mengambil data dari server");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSetting();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = getToken();
    if (!token) {
      alert("Silakan login terlebih dahulu");
      goLogin();
      return;
    }

    if (!wa.trim()) {
      alert("WhatsApp wajib diisi");
      return;
    }
    if (!linkIg.trim()) {
      alert("Link Instagram wajib diisi");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${BACKEND}/api/setting`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ wa: wa.trim(), link_ig: linkIg.trim() }),
      });

      const payload = await safeJson(res);

      if (res.status === 401 || res.status === 403) {
        alert("Sesi kamu habis. Silakan login ulang.");
        goLogin();
        return;
      }

      if (!res.ok) {
        alert(payload?.message || "Gagal menyimpan setting");
        return;
      }

      alert(payload?.message || "✅ Setting berhasil disimpan");

    } catch (e) {
      console.error(e);
      alert("Server error saat menyimpan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LayoutWithSidebar>
      <div className="w-full px-4 md:px-8 py-6">
        <h1 className="text-xl text-black md:text-2xl font-semibold mb-6">
          Settings
        </h1>

        <div className="space-y-6 max-w-3xl">
          <FormCard title="Contact">
            <form onSubmit={handleSubmit} className="space-y-4">
              <InputText
                label="WhatsApp"
                placeholder="contoh: 628123456789"
                value={wa}
                onChange={(e) => setWa(e.target.value)}
                disabled={loading}
              />

              <InputLink
                label="Link Instagram"
                placeholder="https://instagram.com/username"
                value={linkIg}
                onChange={(e) => setLinkIg(e.target.value)}
                disabled={loading}
              />

              <SubmitButton
                disabled={loading}
                text={loading ? "Menyimpan..." : "Simpan"}
              />
            </form>
          </FormCard>
        </div>
      </div>
    </LayoutWithSidebar>
  );
}
