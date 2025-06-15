function Button({ children, color = "black", text = "white" }) {
  return (
    <button
      style={{ backgroundColor: color, color: text }}
      className=" font-semibold w-full px-4 py-2 rounded transition hover:opacity-70 duration-300 ease-in-out"
    >
      {children}
    </button>
  );
}

export default Button;
