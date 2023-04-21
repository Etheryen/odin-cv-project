interface CheckboxProps {
  id: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
}

export default function Checkbox(props: CheckboxProps) {
  return (
    <input
      {...props}
      type="checkbox"
      className="focus:outline-solid h-5 w-5 px-2 py-1 text-white accent-gray-700 focus:outline focus:outline-2 focus:outline-cyan-500 sm:mx-4"
    />
  );
}
