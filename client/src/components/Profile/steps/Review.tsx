type Props = {
  formData: any;
};

export default function Review({ formData }: Props) {
  return (
    <div className="space-y-3">

      {Object.entries(formData).map(([key, value]) => (
        <div
          key={key}
          className="flex justify-between border-b py-2"
        >
          <span className="font-medium capitalize">
            {key}
          </span>

          <span>{String(value) || "-"}</span>
        </div>
      ))}

    </div>
  );
}