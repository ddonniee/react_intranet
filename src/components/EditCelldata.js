import React, { useState, useEffect, useRef } from "react";

const EditCelldata = (props) => {
  const [value, setValue] = useState(props.value);
  const refInput = useRef(null);

  useEffect(() => {
    // focus on the input
    refInput.current.focus();
  }, []);

  const handleInputChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <input
      type="text"
      ref={refInput}
      value={value}
      onChange={handleInputChange}
      style={{ width: "80%", height: "80%" }}
    />
  );
};

export default EditCelldata;
