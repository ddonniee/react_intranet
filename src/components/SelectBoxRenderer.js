import React from "react";
import SelectBox from "./SelectBox";

const SelectBoxRenderer = (props) => {
  const { value, data, column, handleChange } = props;

  // Options 데이터를 생성합니다.
  const options = column.options.map((option) => ({
    value: option,
    label: option,
  }));

  return (
    <SelectBox
      options={options}
    //   value={{ value, label: value }}
      handleChange={(selectedOption) => handleChange(selectedOption.value, data)}
    />
  );
};

export default SelectBoxRenderer;
