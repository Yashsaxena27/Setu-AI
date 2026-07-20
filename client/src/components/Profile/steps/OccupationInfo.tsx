import Input from "../../ui/Input";
import SearchableSelect from "../../ui/SearchableSelect";

type Props = {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
};

const OCCUPATION_OPTIONS = [
  "Student",
  "Farmer",
  "Homemaker",
  "Unemployed",
  "Private Employee",
  "Government Employee",
  "Business",
  "Self Employed",
  "Labour",
  "Retired",
  "Other",
];

export default function OccupationInfo({ formData, setFormData }: Props) {
  const handleOccupationChange = (value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      occupation: value,
    }));
  };

  const handleIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev: any) => ({
      ...prev,
      income: e.target.value,
    }));
  };

  return (
    <div className="space-y-5">
      <SearchableSelect
        label="Occupation"
        options={OCCUPATION_OPTIONS}
        value={formData.occupation || ""}
        onChange={handleOccupationChange}
        placeholder="Select Occupation..."
        required
      />

      <Input
        label="Annual Income (₹)"
        type="number"
        name="income"
        min="0"
        placeholder="Enter annual household income (e.g. 180000)"
        value={formData.income}
        onChange={handleIncomeChange}
        required
      />
    </div>
  );
}