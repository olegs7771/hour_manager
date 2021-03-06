import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const TextFormGroup = ({
  label,
  placeholder,
  type,
  info,
  value,
  name,
  onChange,
  error,
  message,
  styleLabel,
  styleInput,
  styleContainer,
  maxLength,
  minLength,
  onMouseEnter,
}) => {
  return (
    <div className="form-group " style={{ ...styleContainer }}>
      {label && <label style={{ ...styleLabel }}>{label}</label>}
      <input
        className={classnames(
          "form-control",
          { "is-invalid": error },
          { "is-valid": message }
        )}
        placeholder={placeholder}
        type={type}
        maxLength={maxLength}
        minLength={minLength}
        value={value}
        name={name}
        onChange={onChange}
        onMouseEnter={onMouseEnter}
        style={{ ...styleInput }}
        // style={{paddingBottom}}
      />
      {error && <div className="invalid-feedback pl-4">{error}</div>}
      {message && <div className="valid-feedback">{message}</div>}
      {info && <small className="text-muted"> {info}</small>}
    </div>
  );
};

TextFormGroup.defaultProps = {
  type: "text",
};
TextFormGroup.propTypes = {
  placeholder: PropTypes.string,
  info: PropTypes.string,
};

export default TextFormGroup;
