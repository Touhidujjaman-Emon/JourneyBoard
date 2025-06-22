function IconBtn({ icon, className = "", onClick, text = "" }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center space-x-2 cursor-pointer px-2 py-1 rounded ${className}`}
    >
      {icon} <span>{text}</span>
    </button>
  );
}

export default IconBtn;
