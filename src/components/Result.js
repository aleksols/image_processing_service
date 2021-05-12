import axios from "axios"

const Result = ({ result, sessionId }) => {

  console.log(result)
  switch (result.headers["content-type"]) {
    case "image/png":
      // getResult()
      return (
        <img src={'http://localhost:5000/get-image/' + sessionId}></img>
      )
    case "integer":
      return (
        <p>{result.data}</p>
      )
    default:
      return (
        <p>{result.data}</p>
      )
  }
  // return (
  //   <div>
  //     <img src='http://localhost:5000/execute'></img>
  //   </div>
  // )
}

export default Result
