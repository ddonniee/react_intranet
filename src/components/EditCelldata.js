import React, { useState, useEffect, useRef, } from "react";

const EditCelldata = (props) => {

  const [value, setValue] = useState(props.value);
  const [editRow, setEditRow] = useState('');
  const [editId, setEditId] = useState('')
  const [fieldName, setFieldName] = useState('');

  const refInput = useRef(null);
  const previousInputRef = useRef(null);

  const handleCellRef = () => {
    if (previousInputRef.current) {
      previousInputRef.current.blur(); // 이전 셀의 input 요소에서 포커스 해제
    }
    previousInputRef.current = refInput.current; // 현재 셀의 input 요소를 이전 셀로 설정
  };

  useEffect(() => {
    // focus on the input
    refInput.current.focus();
    setEditRow(props.data.codeSeq);
    setEditId(props.data.codeId);
    setFieldName(props.colDef.field);
  }, [props.data, props.colDef]);

  const handleInputChange = (event) => {
    
    let value = event.target.value;
    setValue(value);
  };

  const handleInputBlur = () => {
    console.log('---')
    if(props.handleLeftCell) {
      props.handleLeftCell(fieldName, editRow,editId, value);
    }else if(props.handleCellValueChanged) {
      let parentCode = props.data.parentCodeSeq;
      console.log('fieldName, parentCode,editRow, editId, value',fieldName, parentCode,editRow, editId, value)
      props.handleCellValueChanged(fieldName, parentCode,editRow, editId, value)
    }
    // setValue('')
  };

  const handleKeyDown = (event) => {

    let type = event.key
    if (type=== 'Tab') {

      if(props.handleLeftCell) {
        event.preventDefault(); // prevent default behavior
        props.handleLeftCell(fieldName, editRow, value);
        const nextColumn = props.columnApi.getColumnAfter(props.column);
        props.api.startEditingCell({
          rowIndex: props.node.rowIndex,
          colKey: nextColumn.getColId()
        });
      }else if(props.handleCellValueChanged) {
        console.log('handleCellValueChanged', props)
      }
    
    }
  };

  const handleCellClick = e => {
    console.log('handleCellClick')
  }
  useEffect(() => {
    setValue(props.value); // Update the component's value when props.value changes
  }, [props.value]);

  return (
    <input
      type="text"
      ref={refInput}
      value={value}
      onChange={handleInputChange}
      onBlur={handleInputBlur}
      onKeyDown={handleKeyDown}
      onClick={handleCellRef}
      style={{ width: "80%", height: "80%" }}
    />
  );
};

export default EditCelldata;