function IconBtn({ icon, className = "", onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center space-x-2 cursor-pointer  ${className}`}
    >
      {icon}
    </button>
  );
}

export default IconBtn;
