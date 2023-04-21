interface LabelProps {
  children: string;
  htmlFor: string;
  isFor?: string;
}

export default function Label({ children, htmlFor, isFor }: LabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={`hover:underline hover:decoration-cyan-500 ${
        isFor === 'task' ? ' text-center' : ''
      }`}
    >
      {children}
    </label>
  );
}
