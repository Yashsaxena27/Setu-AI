import Input from "../../ui/Input";

type Props = {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
};

export default function LocationInfo({ formData, setFormData }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev: any) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="space-y-5">
      <Input
        label="State"
        type="text"
        name="state"
        placeholder="Enter your state (e.g. Uttar Pradesh)"
        value={formData.state}
        onChange={handleChange}
        required
      />

      <Input
        label="District"
        type="text"
        name="district"
        placeholder="Enter your district (e.g. Lucknow)"
        value={formData.district}
        onChange={handleChange}
        required
      />
    </div>
  );
}