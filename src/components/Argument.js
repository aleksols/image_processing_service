import React from 'react'
import axios from 'axios'

const Argument = ({ index, onChange, serviceArgument, }) => {

  console.log(serviceArgument.description + " " + index)
  let contentType = "png/image"
  switch (serviceArgument.type) {
    case "png":
      return (
        <>
          <label>{serviceArgument.description}: </label>
          <br />
          <input type="file" onChange={(e) => onChange({ arg: e.target.files[0], type: contentType }, index)}></input>
          <br/>
        </>
      )
    case "integer":
      return (
        <>
          <label>{serviceArgument.description}: </label>
          <br />
          <input type="text" onChange={(e) => onChange({ arg: e.target.value, type: "text/plain" }, index)}></input>
          <br />
        </>
      )
    default:
      return (
        <p>Default in Argument.js</p>
      )

  }
  // return (
  //   <form className='argument-form'>
  //     <label>{serviceArgument.description} </label>
  //     <input
  //       type={serviceArgument.type === "png" ? "file" : "text"}
  //       // value={serviceArgument.description}
  //       onChange={(e) => onChange(e)}
  //     />
  //   </form>
  // )
}

export default Argument
