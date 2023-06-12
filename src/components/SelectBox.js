import React from "react";
import Select from 'react-select';

const SelectBox = (props) => {
    
    const {options, handleChange} = props;

    return (
        <Select
        className="custom-select"
            options={options}
            onChange={handleChange}
        />
    )
}

export default SelectBox;