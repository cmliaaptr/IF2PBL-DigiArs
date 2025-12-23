import LayoutWithSidebar from "@/app/Admin/dashboard/LayoutWithSidebar";
import FormCard from "../components/form/FormCard";
import InputText from "../components/form/InputText";
import InputLink from "../components/form/InputLink";
import SubmitButton from "../components/form/SubmitButton";

export default function DetailLayananPhotography() {
  return (
    <LayoutWithSidebar>
    <div className="w-full px-4 md:px-8 py-6">
      <h1 className="text-xl text-black md:text-2xl font-semibold mb-6">
        Settings
      </h1>

      <div className="space-y-6 max-w-3xl">
        {/* HERO SECTION */}
        <FormCard title="Contact">
          <InputText label="Whatsapp" />
          <InputLink label="Link Video" />
          <SubmitButton />
        </FormCard>
      </div>
    </div>
    </LayoutWithSidebar>
  );
}
