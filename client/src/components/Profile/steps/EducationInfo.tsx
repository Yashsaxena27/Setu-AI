import React from 'react';

type Props = {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
};

export default function EducationInfo({
  formData,
  setFormData,
}: Props) {
  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement>
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
          Education
        </label>

        <select
          name="education"
          value={formData.education}
          onChange={handleChange}
          className="w-full border rounded-xl p-3"
        >
          <option value="">Select</option>
          <option>School</option>
          <option>Graduate</option>
          <option>Post Graduate</option>
          <option>Other</option>
        </select>
      </div>

      <div>
        <label className="block mb-2 font-medium">
          Disability
        </label>

        <select
          name="disability"
          value={formData.disability}
          onChange={handleChange}
          className="w-full border rounded-xl p-3"
        >
          <option value="">Select</option>
          <option>No</option>
          <option>Yes</option>
        </select>
      </div>

    </div>
  );
}