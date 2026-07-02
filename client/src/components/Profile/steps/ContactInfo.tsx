type Props = {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
};

export default function ContactInfo({
  formData,
  setFormData,
}: Props) {

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

      <div>
        <label className="block mb-2 font-medium">
          Preferred Language
        </label>

        <select
          name="language"
          value={formData.language}
          onChange={handleChange}
          className="w-full border rounded-xl p-3"
        >
          <option value="">Select</option>
          <option>English</option>
          <option>Hindi</option>
          <option>Hinglish</option>
        </select>
      </div>

      <div>
        <label className="block mb-2 font-medium">
          Phone Number
        </label>

        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="9876543210"
          className="w-full border rounded-xl p-3"
        />
      </div>

    </div>
  );
}