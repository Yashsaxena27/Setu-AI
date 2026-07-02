type Props = {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
};

export default function LocationInfo({
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
          State
        </label>

        <input
          type="text"
          name="state"
          value={formData.state}
          onChange={handleChange}
          placeholder="Enter your state"
          className="w-full border rounded-xl p-3"
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">
          District
        </label>

        <input
          type="text"
          name="district"
          value={formData.district}
          onChange={handleChange}
          placeholder="Enter your district"
          className="w-full border rounded-xl p-3"
        />
      </div>

    </div>
  );
}