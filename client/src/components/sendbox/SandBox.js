import React, { useRef, useEffect } from "react";

const SandBox = (props) => {
  // textInput must be declared here so the ref can refer to it
  const textInput = useRef(null);

  function handleClick() {
    textInput.current.focus();
  }

  useEffect(() => {
    console.log("textInput", textInput);
  });

  return (
    <div>
      <input type="text" ref={textInput} />
      <input type="button" value="Focus the text input" onClick={handleClick} />
    </div>
  );
};
export default SandBox;
