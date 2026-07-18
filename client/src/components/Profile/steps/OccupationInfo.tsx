import Input from "../../ui/Input";

type Props = {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
};

export default function OccupationInfo({ formData, setFormData }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev: any) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="space-y-5">
      <Input
        label="Occupation"
        type="text"
        name="occupation"
        placeholder="Student / Farmer / Homemaker / Unemployed"
        value={formData.occupation}
        onChange={handleChange}
        required
      />

      <Input
        label="Annual Income (₹)"
        type="number"
        name="income"
        placeholder="Enter annual household income"
        value={formData.income}
        onChange={handleChange}
        required
      />
    </div>
  );
}