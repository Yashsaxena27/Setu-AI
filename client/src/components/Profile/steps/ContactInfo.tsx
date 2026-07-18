import Input from "../../ui/Input";
import Select from "../../ui/Select";

type Props = {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
};

export default function ContactInfo({ formData, setFormData }: Props) {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev: any) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="space-y-5">
      <Select
        label="Preferred Communication Language"
        name="language"
        value={formData.language}
        onChange={handleChange}
        required
      >
        <option value="">Select Language</option>
        <option value="English">English</option>
        <option value="Hindi">Hindi</option>
        <option value="Hinglish">Hinglish</option>
      </Select>

      <Input
        label="Phone Number"
        type="tel"
        name="phone"
        placeholder="10-digit mobile number"
        value={formData.phone}
        onChange={handleChange}
        maxLength={10}
        required
      />
    </div>
  );
}