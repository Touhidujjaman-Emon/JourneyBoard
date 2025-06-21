export default function Input({ value, onChange, placeholder, type = "text" }) {
  return (
    <input
      className="border rounded p-2 w-full"
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}
