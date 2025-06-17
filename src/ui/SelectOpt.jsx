function SelectOpt({ options, onChange, value, label }) {
  return (
    <label className="flex  gap-2 items-center">
      {label && (
        <span className="text-sm font-medium bg-gray-400 text-black px-2 py-1 rounded">
          {label}
        </span>
      )}
      <select className="cursor-pointer" onChange={onChange} value={value}>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export default SelectOpt;
