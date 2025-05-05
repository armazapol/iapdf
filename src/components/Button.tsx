
type Props = {
    children: React.ReactNode;
    type?: "button" | "submit";
  };
  
  export default function Button({ children, type = "button" }: Props) {
    return (
      <button
        type={type}
        className="w-full bg-pink-700 text-white py-2 rounded-lg hover:bg-pink-800 transition"
      >
        {children}
      </button>
    );
  }
  