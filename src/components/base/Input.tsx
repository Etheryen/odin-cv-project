import { HTMLInputTypeAttribute } from 'react';

interface InputProps {
  type: HTMLInputTypeAttribute;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  isTask?: boolean;
  handleInputKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export default function Input(props: InputProps) {
  const { isTask: _, handleInputKeyPress: __, ...propsToPass } = props;
  const autoFocusElements = ['name', 'schoolName', 'companyName', 'mainTask'];

  return (
    <input
      autoFocus={autoFocusElements.includes(props.id)}
      onKeyDown={props.handleInputKeyPress}
      {...propsToPass}
      className={`focus:outline-solid rounded bg-gray-700 px-2 py-1 text-white focus:outline focus:outline-2 focus:outline-cyan-500 ${
        !props.isTask ? 'sm:mx-4' : ''
      }`}
    />
  );
}
