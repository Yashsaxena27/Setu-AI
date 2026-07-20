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
    const { name, value } = e.target;
    if (name === "phone") {
      const numeric = value.replace(/\D/g, "").slice(0, 10);
      setFormData((prev: any) => ({ ...prev, phone: numeric }));
    } else {
      setFormData((prev: any) => ({ ...prev, [name]: value }));
    }
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
        <option value="Bengali">Bengali</option>
        <option value="Marathi">Marathi</option>
        <option value="Telugu">Telugu</option>
        <option value="Tamil">Tamil</option>
        <option value="Gujarati">Gujarati</option>
        <option value="Kannada">Kannada</option>
        <option value="Malayalam">Malayalam</option>
        <option value="Punjabi">Punjabi</option>
      </Select>

      <Input
        label="Phone Number"
        type="tel"
        name="phone"
        placeholder="10-digit mobile number (e.g. 9876543210)"
        value={formData.phone}
        onChange={handleChange}
        maxLength={10}
        required
      />
    </div>
  );
}