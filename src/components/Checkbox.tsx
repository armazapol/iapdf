
type Props = {
    label: string;
  };
  
  export default function Checkbox({ label }: Props) {
    return (
      <label className="inline-flex items-center">
        <input type="checkbox" className="form-checkbox h-4 w-4 text-pink-700" />
        <span className="ml-2 text-gray-700">{label}</span>
      </label>
    );
  }
  