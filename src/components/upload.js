import React, { useState } from 'react';
import sendImage from '../models'

function Upload() {
  const [pressed, setPressed] = useState(false)
  const fileUpload = event => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      sendImage(img)
    }
  }
  let url= "http://localhost:5000/process_image"
  const Image = (prop) => {
    return <img src={prop.url}/>
  }
  if (pressed) {
    return <div><Image url={url} /></div>
  }
  return (
    <div className="App">
      <input type="file" onChange={fileUpload}/>
      <button onClick={() => setPressed(true)}>Show blurred image</button>
    </div>
  );
}

export default Upload;
