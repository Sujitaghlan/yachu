import React from "react";

export default function FormField({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder = "",
  options = null, 
  textarea = false,
  readOnly = false,
  error = "",
}) {
  return (
    <div>
      <label className="block text-xs font-medium mb-1 text-tertiary">
        {label}
      </label>

      {textarea ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          className="w-full border px-4 py-3 rounded"
          placeholder={placeholder}
        />
      ) : options ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          className="w-full border border-primary px-4 py-3 text-sm rounded"
        >
          {options.map((opt) => (
            <option key={opt.label} value={opt.label}>
              {opt.label} (Rs. {opt.price})
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          readOnly={readOnly}
          className="w-full border border-primary px-4 py-3 rounded text-sm"
        />
      )}

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
