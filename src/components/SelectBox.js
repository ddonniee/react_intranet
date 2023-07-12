import React from "react";
import Select from 'react-select';

const SelectBox = (props) => {
    
    const {options, handleChange, defaultValue, placeholder, minHeight} = props;

    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            borderColor:  state.isSelected ? '#BB0841' : state.isFocused ? '#BB0841' : '#D8D8D8',
            boxShadow: state.isFocused ? '0 0 0 2px rgba(255, 0, 0, 0.3)' : null,
            minHeight: '32px',
            height: minHeight ? '32px' : null,
        }),
        option: (provided, state) => ({
            ...provided,
            borderColor: state.isSelected ? '#BB0841' : state.isFocused ? '#BB0841' : '#D8D8D8',
            backgroundColor: state.isSelected ? '#BB0841' : state.isFocused ? '#FAF1F4' : 'white',
            minHeight: '32px',
            height: minHeight ? '32px' : null,
          }),
    };

    return (
        <Select 
            className="custom-select"
            options={options}
            onChange={handleChange}
            styles={customStyles}
            defaultValue={ defaultValue ? defaultValue : null}
            placeholder={ placeholder ? placeholder : null}
        />
    )
}

export default SelectBox;