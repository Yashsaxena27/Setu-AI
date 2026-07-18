import Input from "../../ui/Input";
import Select from "../../ui/Select";

interface Props {
  formData: any;
  setFormData: any;
}

export default function BasicInfo({ formData, setFormData }: Props) {
  return (
    <div className="space-y-5">
      <Input
        label="Full Name"
        type="text"
        placeholder="Enter your name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />

      <Input
        label="Age"
        type="number"
        placeholder="Enter your age"
        value={formData.age}
        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
        required
      />

      <Select
        label="Gender"
        value={formData.gender}
        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
        required
      >
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </Select>
    </div>
  );
}