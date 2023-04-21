import { HTMLInputTypeAttribute } from 'react';

interface InputProps {
  type: HTMLInputTypeAttribute;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

export default function Input(props: InputProps) {
  return (
    <input
      {...props}
      className="focus:outline-solid rounded bg-gray-700 px-2 py-1 text-white focus:outline focus:outline-2 focus:outline-cyan-500 sm:mx-4"
    />
  );
}
