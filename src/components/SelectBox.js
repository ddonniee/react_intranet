import React from "react";
import Select from 'react-select';

const SelectBox = (props) => {
    
    const {options, handleChange} = props;

    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            borderColor:  state.isSelected ? '#BB0841' : state.isFocused ? '#BB0841' : 'grey',
            boxShadow: state.isFocused ? '0 0 0 2px rgba(255, 0, 0, 0.3)' : null,
        }),
        option: (provided, state) => ({
            ...provided,
            borderColor: state.isSelected ? '#BB0841' : state.isFocused ? '#BB0841' : 'grey',
            backgroundColor: state.isSelected ? '#BB0841' : state.isFocused ? '#FAF1F4' : 'white',
          }),
    };

    return (
        <Select 
            className="custom-select"
            options={options}
            onChange={handleChange}
            styles={customStyles}
            // defaultValue={options[0]}
        />
    )
}

export default SelectBox;