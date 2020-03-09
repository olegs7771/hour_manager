import React, { useRef } from "react";
function TextInputWithFocusButton() {
  const inputEl = useRef(null);
  const onButtonClick = () => {
    // `current` points to the mounted text input element
    inputEl.current.focus();
    console.log("inputEl.current.focus()", inputEl.current.focus());
  };
  return (
    <>
      <button onClick={onButtonClick}>Focus the input</button>
      <input ref={inputEl} type="text" />
    </>
  );
}
export default TextInputWithFocusButton;
