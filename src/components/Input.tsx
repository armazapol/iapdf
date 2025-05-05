
type Props = {
    id: string;
    label: string;
    type?: string;
    placeholder?: string;
  };
  
  export default function Input({ id, label, type = "text", placeholder }: Props) {
    return (
      <div className="flex flex-col space-y-1">
        <label htmlFor={id} className="text-sm text-gray-700">{label}</label>
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-700"
        />
      </div>
    );
  }