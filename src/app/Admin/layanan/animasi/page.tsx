// "use client";

// import { useEffect, useState } from "react";
// import LayoutWithSidebar from "@/app/Admin/dashboard/LayoutWithSidebar";
// import FormCard from "../../components/form/FormCard";
// import InputText from "../../components/form/InputText";
// import TextArea from "../../components/form/TextArea";
// import InputFile from "../../components/form/InputFile";
// import SelectInput from "../../components/form/SelectInput";
// import SubmitButton from "../../components/form/SubmitButton";

// const BACKEND =
//   process.env.NEXT_PUBLIC_BACKEND_URL?.replace(/\/$/, "") ||
//   "http://localhost:8001";

// const FILE_BASE = `${BACKEND}/storage/detail_layanan/`;

// export default function DetailLayananAnimasi() {
//   const token =
//     typeof window !== "undefined" ? localStorage.getItem("token") : null;

//   // HERO
//   const [heroJudul, setHeroJudul] = useState("");
//   const [heroDesc, setHeroDesc] = useState("");
//   const [heroFoto, setHeroFoto] = useState<File | null>(null);
//   const [heroFotoPrev, setHeroFotoPrev] = useState<string>("");

//   // BENEFIT
//   const [pilihan, setPilihan] = useState("Card 1"); // ✅ jangan kosong
//   const [benefitJudul, setBenefitJudul] = useState("");
//   const [benefitDesc, setBenefitDesc] = useState("");
//   const [benefitIcon, setBenefitIcon] = useState<File | null>(null);

//   const [loadingHero, setLoadingHero] = useState(false);
//   const [loadingBenefit, setLoadingBenefit] = useState(false);

//   const fetchHero = async () => {
//     try {
//       const heroRes = await fetch(`${BACKEND}/api/detail-layanan/hero`, {
//         cache: "no-store",
//       });
//       const hero = await heroRes.json().catch(() => null);

//       if (hero) {
//         setHeroJudul(hero.judul || "");
//         setHeroDesc(hero.deskripsi || "");
//         setHeroFotoPrev(hero.foto ? FILE_BASE + hero.foto : "");
//       }
//     } catch {
//       // optional: alert("Gagal ambil data hero")
//     }
//   };

//   useEffect(() => {
//     fetchHero();
//   }, []);

//   const submitHero = async () => {
//     if (!token) return alert("Silakan login terlebih dahulu");
//     if (!heroJudul.trim()) return alert("Headline Hero wajib diisi");

//     try {
//       setLoadingHero(true);

//       const fd = new FormData();
//       fd.append("judul", heroJudul.trim());
//       fd.append("deskripsi", heroDesc);
//       if (heroFoto) fd.append("foto", heroFoto);

//       const res = await fetch(`${BACKEND}/api/detail-layanan/hero`, {
//         method: "PUT",
//         headers: { Authorization: `Bearer ${token}` },
//         body: fd,
//       });

//       const payload = await res.json().catch(() => ({}));
//       if (!res.ok) throw new Error(payload?.message || "Gagal simpan hero");

//       alert("✅ Hero berhasil disimpan");
//       setHeroFoto(null);   // ✅ reset file input state (UI file input tetap kosong by browser)
//       await fetchHero();   // ✅ refresh preview/isi hero
//     } catch (e: any) {
//       alert("❌ Gagal menyimpan Hero\n" + (e.message || ""));
//     } finally {
//       setLoadingHero(false);
//     }
//   };

//   const submitBenefit = async () => {
//     if (!token) return alert("Silakan login terlebih dahulu");
//     if (!pilihan) return alert("Pilih Card dulu");
//     if (!benefitJudul.trim()) return alert("Headline Benefit wajib diisi");
//     if (!benefitDesc.trim()) return alert("Deskripsi Benefit wajib diisi");

//     try {
//       setLoadingBenefit(true);

//       const fd = new FormData();
//       fd.append("pilihan", pilihan);
//       fd.append("judul", benefitJudul.trim());
//       fd.append("deskripsi", benefitDesc);
//       if (benefitIcon) fd.append("icon", benefitIcon);

//       const res = await fetch(`${BACKEND}/api/detail-layanan/benefit`, {
//         method: "POST",
//         headers: { Authorization: `Bearer ${token}` },
//         body: fd,
//       });

//       const payload = await res.json().catch(() => ({}));
//       if (!res.ok) throw new Error(payload?.message || "Gagal simpan benefit");

//       alert("✅ Benefit berhasil ditambahkan");

//       // ✅ reset form benefit lengkap
//       setPilihan("Card 1");
//       setBenefitJudul("");
//       setBenefitDesc("");
//       setBenefitIcon(null);
//     } catch (e: any) {
//       alert("❌ Gagal menyimpan Benefit\n" + (e.message || ""));
//     } finally {
//       setLoadingBenefit(false);
//     }
//   };

//   return (
//     <LayoutWithSidebar>
//       <div className="w-full px-4 md:px-8 py-6">
//         <h1 className="text-xl text-black md:text-2xl font-semibold mb-6">
//           Detail Layanan
//         </h1>

//         <div className="space-y-6 max-w-3xl">
//           <FormCard title="Hero">
//             {heroFotoPrev && (
//               <img
//                 src={heroFotoPrev}
//                 className="w-full max-h-56 object-cover rounded-lg mb-3"
//                 alt="Hero Preview"
//               />
//             )}

//             <InputFile
//               label="Background"
//               onChange={(e: any) => setHeroFoto(e.target.files?.[0] || null)}
//             />
//             <InputText
//               label="Headline"
//               value={heroJudul}
//               onChange={(e) => setHeroJudul(e.target.value)}
//             />
//             <TextArea
//               label="Deskripsi"
//               value={heroDesc}
//               onChange={(e) => setHeroDesc(e.target.value)}
//             />
//             <SubmitButton
//               disabled={loadingHero}
//               text={loadingHero ? "Menyimpan..." : "Simpan Hero"}
//               onClick={(e: any) => {
//                 e.preventDefault();
//                 submitHero();
//               }}
//             />
//           </FormCard>

//           <FormCard title="Benefit">
//             <SelectInput
//               label="Card"
//               value={pilihan}
//               onChange={(e) => setPilihan(e.target.value)}
//             >
//               <option value="Card 1">Card 1</option>
//               <option value="Card 2">Card 2</option>
//               <option value="Card 3">Card 3</option>
//               <option value="Card 4">Card 4</option>
//             </SelectInput>

//             <InputFile
//               label="Icon"
//               onChange={(e: any) => setBenefitIcon(e.target.files?.[0] || null)}
//             />
//             <InputText
//               label="Headline"
//               value={benefitJudul}
//               onChange={(e) => setBenefitJudul(e.target.value)}
//             />
//             <TextArea
//               label="Deskripsi"
//               value={benefitDesc}
//               onChange={(e) => setBenefitDesc(e.target.value)}
//             />
//             <SubmitButton
//               disabled={loadingBenefit}
//               text={loadingBenefit ? "Menyimpan..." : "Tambah Benefit"}
//               onClick={(e: any) => {
//                 e.preventDefault();
//                 submitBenefit();
//               }}
//             />
//           </FormCard>
//         </div>
//       </div>
//     </LayoutWithSidebar>
//   );
// }
