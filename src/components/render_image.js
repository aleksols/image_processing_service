import axios from 'axios';
import sendImage from '../models'

function getProcessed() {
  let api_base = 'http://localhost:5000/'
  return axios.get(api_base + 'process_image'
  ).then(
    response => {console.log(response)}
  ).catch(error => {console.log("this is an error" + error)})
}

export default getProcessed;
