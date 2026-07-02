interface Props {
  formData: any;
  setFormData: any;
}

export default function BasicInfo({
  formData,
  setFormData,
}: Props) {
  return (
    <div className="space-y-5">

      <div>
        <label className="font-medium">
          Full Name
        </label>

        <input
          type="text"
          value={formData.name}
          onChange={(e) =>
            setFormData({
              ...formData,
              name: e.target.value,
            })
          }
          className="w-full border rounded-xl p-3 mt-2"
          placeholder="Enter your name"
        />
      </div>

      <div>
        <label className="font-medium">
          Age
        </label>

        <input
          type="number"
          value={formData.age}
          onChange={(e) =>
            setFormData({
              ...formData,
              age: e.target.value,
            })
          }
          className="w-full border rounded-xl p-3 mt-2"
          placeholder="Enter your age"
        />
      </div>

      <div>
        <label className="font-medium">
          Gender
        </label>

        <select
          value={formData.gender}
          onChange={(e) =>
            setFormData({
              ...formData,
              gender: e.target.value,
            })
          }
          className="w-full border rounded-xl p-3 mt-2"
        >
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
      </div>

    </div>
  );
}