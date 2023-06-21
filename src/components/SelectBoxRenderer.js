import { param } from "jquery";
import React, {useEffect, useState} from "react";

import Select from "react-select";
const SelectBoxRenderer = (params) => {
  const {column, handleChange } = params;

  // Options 데이터를 생성합니다.
  const options = column.options.map((option) => ({
    value: option.value,
    label: option.label,
  }));

  let columnField = params.data.USE_YN;
  const [selectedValue, setSelectedValue] = useState(columnField);
  const handleUserGroupChange = event => {
    let value = event.target.value;
    console.log(event)
    setSelectedValue(value);
    // handleChange()
  };

  return (
            <select
            className="cell-select-box"
            onChange={handleUserGroupChange}
            value={selectedValue}>
             {options.map((option,idx) => (
             <option 
                key={option.value+idx} 
                value={option.value}
               >
                 {option.label}
             </option>
             ))}
     </select>
  );
};

export default SelectBoxRenderer;
