export const validateStep = (step: number, data: any) => {
  switch (step) {
    case 1:
      return (
        data.name.trim() !== "" &&
        data.age !== "" &&
        data.gender !== ""
      );

    case 2:
      return (
        data.state.trim() !== "" &&
        data.district.trim() !== ""
      );

    case 3:
      return (
        data.occupation.trim() !== "" &&
        data.income !== ""
      );

    case 4:
      return (
        data.education !== "" &&
        data.disability !== ""
      );

    case 5:
      return (
        data.language !== "" &&
        data.phone.length === 10
      );

    default:
      return true;
  }
};