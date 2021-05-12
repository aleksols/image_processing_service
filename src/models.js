import axios from 'axios';

const api_base = 'http://localhost:5000/'

function sendImage(img) {

  axios.post(api_base + 'upload', img, {
    headers: {
      'Content-Type': 'image/png',
    }
  }
  ).then(
    function (response) {
      console.log(console.log(response))
    }
  )
}

export default sendImage;
