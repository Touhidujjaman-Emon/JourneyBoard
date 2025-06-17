function Button({
  children,
  color = "black",
  text = "white",
  height = "",
  width = "",
}) {
  return (
    <button
      style={{
        backgroundColor: color,
        color: text,
        height: height,
        width: width,
      }}
      className="font-semibold w-full px-4 py-2 rounded transition hover:opacity-70 duration-300 ease-in-out cursor-pointer"
    >
      {children}
    </button>
  );
}

export default Button;
