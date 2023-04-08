interface LabelProps {
  children: string;
  htmlFor: string;
}

export default function Label({ children, htmlFor }: LabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className="hover:underline hover:decoration-cyan-500"
    >
      {children}
    </label>
  );
}
