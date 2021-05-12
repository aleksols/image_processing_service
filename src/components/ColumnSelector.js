// import { useState } from 'react'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const ColumnSelector = ( {args, columns, onChange} ) => {
  console.log(args)
  return (
    <>
      {args.map((arg, index) => (
        <Dropdown
          key={index}
          options={columns}
          onChange={(e) => onChange(e.value, index)}
          placeholder={arg.description}
        ></Dropdown>
      ))}
    </>
  )
}

export default ColumnSelector
