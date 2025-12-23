import LayoutWithSidebar from "@/app/Admin/dashboard/LayoutWithSidebar";
import FormCard from "../../components/form/FormCard";
import InputText from "../../components/form/InputText";
import TextArea from "../../components/form/TextArea";
import InputFile from "../../components/form/InputFile";
import SelectInput from "../../components/form/SelectInput";
import SubmitButton from "../../components/form/SubmitButton";

export default function DetailLayananPhotography() {
  return (
    <LayoutWithSidebar>
    <div className="w-full px-4 md:px-8 py-6">
      <h1 className="text-xl text-black md:text-2xl font-semibold mb-6">
        Detail Game
      </h1>

      <div className="space-y-6 max-w-3xl">
        {/* HERO SECTION */}
        <FormCard title="Hero">
          <InputFile label="Background" />
          <InputText label="Headline" />
          <TextArea label="Deskripsi" />
          <SubmitButton />
        </FormCard>

        {/* BENEFIT SECTION */}
        <FormCard title="Benefit">
          <SelectInput label="Card">
            <option>Card 1</option>
            <option>Card 2</option>
            <option>Card 3</option>
          </SelectInput>

          <InputFile label="Icon" />
          <InputText label="Headline" />
          <TextArea label="Deskripsi" />
          <SubmitButton />
        </FormCard>
      </div>
    </div>
    </LayoutWithSidebar>
  );
}
