function IconBtn({ icon, className = "", onClick, text = "" }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center space-x-2 cursor-pointer  ${className}`}
    >
      {icon} {text}
    </button>
  );
}

export default IconBtn;
