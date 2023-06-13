import React from "react";

import Select from "react-select";
const SelectBoxRenderer = (props) => {
  const {column, handleChange } = props;


  // Options 데이터를 생성합니다.
  const options = column.options.map((option) => ({
    value: option.value,
    label: option.label,
  }));

  return (
            <select
            className="cell-select-box"
            onChange={handleChange}>
             {options.map((option) => (
             <option 
                key={option.value} 
                value={option.value}
               >
                 {option.label}
             </option>
             ))}
     </select>
  );
};

export default SelectBoxRenderer;
