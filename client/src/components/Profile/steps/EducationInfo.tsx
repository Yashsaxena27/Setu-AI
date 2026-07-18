import Select from "../../ui/Select";

type Props = {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
};

export default function EducationInfo({ formData, setFormData }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prev: any) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="space-y-5">
      <Select
        label="Education Qualification"
        name="education"
        value={formData.education}
        onChange={handleChange}
        required
      >
        <option value="">Select Qualification</option>
        <option value="School">School</option>
        <option value="Graduate">Graduate</option>
        <option value="Post Graduate">Post Graduate</option>
        <option value="Other">Other</option>
      </Select>

      <Select
        label="Disability Status"
        name="disability"
        value={formData.disability}
        onChange={handleChange}
        required
      >
        <option value="">Select Status</option>
        <option value="No">No</option>
        <option value="Yes">Yes</option>
      </Select>
    </div>
  );
}