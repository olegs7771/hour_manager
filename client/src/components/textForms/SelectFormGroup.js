import React from "react";
import classnames from "classnames";

const SelectFormGroup = ({
  value,
  label,
  onChange,
  name,
  options,
  error,
  type,
  placeholder,
}) => {
  const selectOptions = options.map((option) => (
    <option key={option.label} value={option.value} defaultValue={option.value}>
      {option.label}
    </option>
  ));

  return (
    <div className="group-group mt-2">
      <label>
        {label}

        <select
          type={type}
          className={classnames("form-control form-control-lg", {
            "is-invalid": error,
          })}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          style={{ backgroundColor: "#bfe1f5", borderStyle: "none" }}
        >
          {selectOptions}
        </select>
      </label>
      {error && <div className="invalid-feedback"> {error} </div>}
    </div>
  );
};

export default SelectFormGroup;
