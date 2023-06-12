import React from "react";
import Select from 'react-select';

const SelectBox = (props) => {
    
    const {options, handleChange} = props;

    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            borderColor: state.isFocused ? '#BB0841' : 'grey',
            boxShadow: state.isFocused ? '0 0 0 2px rgba(255, 0, 0, 0.3)' : null,
            backgroundColor: state.isSelected ? "red" : "white",
            color: state.isSelected ? "white" : "black",
            '&:hover': {
                borderColor: '#BB0841',
                backgroundColor: 'white'
              },
            '&:focus': {
                borderColor: '#BB0841'
              },
            '&:selected': {
                backgroundColor: 'black'
            },
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? '#BB0841' : 'white',
          }),
    };

    return (
        <Select 
            className="custom-select"
            options={options}
            onChange={handleChange}
            styles={customStyles}
            
        />
    )
}

export default SelectBox;