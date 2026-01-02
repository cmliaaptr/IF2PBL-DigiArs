"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import LayoutWithSidebar from "@/app/Admin/dashboard/LayoutWithSidebar";
import FormCard from "../../components/form/FormCard";
import InputText from "../../components/form/InputText";
import TextArea from "../../components/form/TextArea";
import InputFile from "../../components/form/InputFile";
import SelectInput from "../../components/form/SelectInput";
import SubmitButton from "../../components/form/SubmitButton";

const BACKEND =
  process.env.NEXT_PUBLIC_BACKEND_URL?.replace(/\/$/, "") ||
  "http://localhost:8001";

const FILE_BASE = `${BACKEND}/storage/detail_layanan/`;

type BenefitPilihan = "Card 1" | "Card 2" | "Card 3" | "Card 4";

type BenefitRow = {
  id: number;
  pilihan: BenefitPilihan;
  judul: string;
  deskripsi: string;
  icon?: string | null;
};

async function safeJson(res: Response) {
  try {
    return await res.json();
  } catch {
    return null;
  }
}

export default function DetailLayananByIdPage() {
  const params = useParams();
  const layananId = String((params as any)?.id || "");

  /* HERO */
  const [heroJudul, setHeroJudul] = useState("");
  const [heroDesc, setHeroDesc] = useState("");
  const [heroFoto, setHeroFoto] = useState<File | null>(null);
  const [heroFotoPrev, setHeroFotoPrev] = useState("");

  const [heroError, setHeroError] = useState<string>("");

  /* BENEFIT  */
  const [pilihan, setPilihan] = useState<BenefitPilihan>("Card 1");
  const [benefitJudul, setBenefitJudul] = useState("");
  const [benefitDesc, setBenefitDesc] = useState("");
  const [benefitIcon, setBenefitIcon] = useState<File | null>(null);
  const [benefitError, setBenefitError] = useState<string>("");

  const [benefits, setBenefits] = useState<BenefitRow[]>([]);
  const [loadingHero, setLoadingHero] = useState(false);
  const [loadingBenefit, setLoadingBenefit] = useState(false);

  const getToken = () =>
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  /* FETCH HERO */
  const fetchHero = useCallback(async () => {
    if (!layananId) return;

    try {
      const res = await fetch(
        `${BACKEND}/api/detail-layanan/${layananId}/hero`,
        { cache: "no-store" }
      );

      const hero = await safeJson(res);

      if (!res.ok || !hero) {
        setHeroJudul("");
        setHeroDesc("");
        setHeroFotoPrev("");
        return;
      }

      setHeroJudul(hero.judul || "");
      setHeroDesc(hero.deskripsi || "");
      setHeroFotoPrev(hero.foto ? FILE_BASE + hero.foto : "");
    } catch (e) {
      console.error("fetchHero error:", e);
    }
  }, [layananId]);

  /* FETCH BENEFITS */
  const fetchBenefits = useCallback(async () => {
    if (!layananId) return;

    try {
      const res = await fetch(
        `${BACKEND}/api/detail-layanan/${layananId}/benefits`,
        { cache: "no-store" }
      );

      const rows = await safeJson(res);
      setBenefits(res.ok && Array.isArray(rows) ? rows : []);
    } catch (e) {
      console.error("fetchBenefits error:", e);
    }
  }, [layananId]);

  useEffect(() => {
    if (!layananId) return;
    fetchHero();
    fetchBenefits();
  }, [layananId, fetchHero, fetchBenefits]);

  /* isi form benefit saat ganti card */
  useEffect(() => {
    const found = benefits.find((b) => b.pilihan === pilihan);
    if (found) {
      setBenefitJudul(found.judul || "");
      setBenefitDesc(found.deskripsi || "");
      setBenefitIcon(null);
    } else {
      setBenefitJudul("");
      setBenefitDesc("");
      setBenefitIcon(null);
    }
    setBenefitError("");
  }, [pilihan, benefits]);

  /* SUBMIT HERO  */
  const submitHero = async () => {
    setHeroError("");

    if (!heroJudul.trim()) {
      setHeroError("⚠️ Headline Hero wajib diisi");
      return;
    }
    if (!heroDesc.trim()) {
      setHeroError("⚠️ Deskripsi Hero wajib diisi");
      return;
    }

    const token = getToken();
    if (!token) return alert("Silakan login terlebih dahulu");

    try {
      setLoadingHero(true);

      const fd = new FormData();
      fd.append("judul", heroJudul.trim());
      fd.append("deskripsi", heroDesc);
      if (heroFoto) fd.append("foto", heroFoto);

      const res = await fetch(
        `${BACKEND}/api/detail-layanan/${layananId}/hero`,
        {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
          body: fd,
        }
      );

      const payload = await safeJson(res);
      if (!res.ok) throw new Error(payload?.message || "Gagal simpan hero");

      alert("✅ Hero berhasil disimpan");
      setHeroFoto(null);
      await fetchHero();
    } catch (e: any) {
      alert("❌ " + (e?.message || "Gagal menyimpan Hero"));
    } finally {
      setLoadingHero(false);
    }
  };

  /* SUBMIT BENEFIT */
  const submitBenefit = async () => {
    setBenefitError("");

    if (!benefitJudul.trim())
      return setBenefitError("⚠️ Headline Benefit wajib diisi");
    if (!benefitDesc.trim())
      return setBenefitError("⚠️ Deskripsi Benefit wajib diisi");

    const token = getToken();
    if (!token) return alert("Silakan login terlebih dahulu");

    try {
      setLoadingBenefit(true);

      const fd = new FormData();
      fd.append("pilihan", pilihan);
      fd.append("judul", benefitJudul.trim());
      fd.append("deskripsi", benefitDesc);
      if (benefitIcon) fd.append("icon", benefitIcon);

      const res = await fetch(
        `${BACKEND}/api/detail-layanan/${layananId}/benefits`,
        {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
          body: fd,
        }
      );

      const payload = await safeJson(res);
      if (!res.ok) throw new Error(payload?.message || "Gagal simpan benefit");

      alert("✅ Benefit berhasil disimpan");
      setBenefitIcon(null);
      await fetchBenefits();
    } catch (e: any) {
      alert("❌ " + (e?.message || "Gagal menyimpan Benefit"));
    } finally {
      setLoadingBenefit(false);
    }
  };

  const currentIcon = benefits.find((b) => b.pilihan === pilihan)?.icon || null;

  return (
    <LayoutWithSidebar>
      <div className="w-full px-4 md:px-8 py-6">
        <h1 className="text-xl text-black md:text-2xl font-semibold mb-6">
          Detail Layanan
        </h1>

        <div className="space-y-6 max-w-3xl">
          {/* HERO */}
          <FormCard title="Hero">
            {heroFotoPrev && (
              <img
                src={heroFotoPrev}
                className="w-full max-h-56 object-cover rounded-lg mb-3"
                alt="Hero Preview"
              />
            )}

            <InputFile
              label="Background"
              onChange={(e: any) =>
                setHeroFoto(e.target.files?.[0] || null)
              }
            />

            <InputText
              label="Headline"
              value={heroJudul}
              onChange={(e) => setHeroJudul(e.target.value)}
            />

            <TextArea
              label="Deskripsi"
              value={heroDesc}
              onChange={(e: any) => setHeroDesc(e.target.value)}
            />

            {heroError && (
              <div className="text-red-600 text-sm font-medium">
                {heroError}
              </div>
            )}

            <SubmitButton
              disabled={loadingHero}
              text={loadingHero ? "Menyimpan..." : "Simpan Hero"}
              onClick={(e: any) => {
                e.preventDefault();
                submitHero();
              }}
            />
          </FormCard>

          {/* BENEFIT */}
          <FormCard title="Benefit">
            <SelectInput
              label="Card"
              value={pilihan}
              onChange={(e) =>
                setPilihan(e.target.value as BenefitPilihan)
              }
            >
              <option value="Card 1">Card 1</option>
              <option value="Card 2">Card 2</option>
              <option value="Card 3">Card 3</option>
              <option value="Card 4">Card 4</option>
            </SelectInput>

            {currentIcon && (
              <img
                src={FILE_BASE + currentIcon}
                className="h-12 w-12 object-contain mb-2"
                alt="Icon Preview"
              />
            )}

            <InputFile
              label="Icon"
              onChange={(e: any) =>
                setBenefitIcon(e.target.files?.[0] || null)
              }
            />

            <InputText
              label="Headline"
              value={benefitJudul}
              onChange={(e) => setBenefitJudul(e.target.value)}
            />

            <TextArea
              label="Deskripsi"
              value={benefitDesc}
              onChange={(e: any) => setBenefitDesc(e.target.value)}
            />

            {benefitError && (
              <div className="text-red-600 text-sm font-medium">
                {benefitError}
              </div>
            )}

            <SubmitButton
              disabled={loadingBenefit}
              text={loadingBenefit ? "Menyimpan..." : "Simpan Benefit"}
              onClick={(e: any) => {
                e.preventDefault();
                submitBenefit();
              }}
            />
          </FormCard>
        </div>
      </div>
    </LayoutWithSidebar>
  );
}
