type Props = {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
};

export default function OccupationInfo({
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
          Occupation
        </label>

        <input
          type="text"
          name="occupation"
          value={formData.occupation}
          onChange={handleChange}
          placeholder="Student / Farmer / Employee"
          className="w-full border rounded-xl p-3"
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">
          Annual Income (₹)
        </label>

        <input
          type="number"
          name="income"
          value={formData.income}
          onChange={handleChange}
          placeholder="Enter annual income"
          className="w-full border rounded-xl p-3"
        />
      </div>

    </div>
  );
}