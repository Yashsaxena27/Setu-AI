import SearchableSelect from "../../ui/SearchableSelect";
import { ALL_INDIAN_STATES, getDistrictsForState } from "../../../data/indiaLocations";

type Props = {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
};

export default function LocationInfo({ formData, setFormData }: Props) {
  const handleStateChange = (selectedState: string) => {
    const validDistricts = getDistrictsForState(selectedState);
    const isDistrictValid = validDistricts.includes(formData.district);

    setFormData((prev: any) => ({
      ...prev,
      state: selectedState,
      district: isDistrictValid ? prev.district : "",
    }));
  };

  const handleDistrictChange = (selectedDistrict: string) => {
    setFormData((prev: any) => ({
      ...prev,
      district: selectedDistrict,
    }));
  };

  const districtOptions = getDistrictsForState(formData.state);

  return (
    <div className="space-y-5">
      <SearchableSelect
        label="State"
        options={ALL_INDIAN_STATES}
        value={formData.state || ""}
        onChange={handleStateChange}
        placeholder="Select your State or UT..."
        required
      />

      <SearchableSelect
        label="District"
        options={districtOptions}
        value={formData.district || ""}
        onChange={handleDistrictChange}
        placeholder={
          formData.state
            ? `Select District in ${formData.state}...`
            : "Select a State first to view districts..."
        }
        disabled={!formData.state}
        required
      />
    </div>
  );
}