import { useEffect, useState } from "react"
import axios from "axios"
import Argument from "./Argument";
import { Button } from "@material-ui/core";
import BigDataDistribution from "./BigDataDistribution";
import BigDataGraph from "./BigDataGraph";
import ColumnSelector from "./ColumnSelector";
import Result from "./Result";

const BigDataService = ({ service }) => {
  console.log(service)
  const [result, setResult] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [sessionId, setSessionId] = useState(null)

  useEffect(() => {
    const getSessionId = async () => {
      const sessId = await fetchSessionId()
      console.log("Session ID: " + sessId)
      setSessionId(sessId)
    }
    getSessionId()
  }, [])

  const fetchSessionId = async () => {
    const res = await axios.get('http://localhost:5000/get-session-id')
    const data = await res.data
    return data
  }

  const [args, setArgs] = useState({})

  const addArg = (arg, idx) => {
    const tmp = { ...args }
    tmp[idx] = arg
    setArgs(tmp)
  }

  const [dfColumns, setDfColumns] = useState([])

  const submitArguments = async () => {
    const res = await axios.post(
      'http://localhost:5000/execute',
      {...args},
      {
        headers: {
          'Content-Type': 'application/json', //'multipart/form-data',
          'Session-Id': sessionId,
          'Service-Id': service.id,
          'Access-Control-Allow-Origin': "*"
        }
      }
    )
    const data = await res.data
    setResult(res)
    setShowResult(true)
    console.log(data)
  }

  const sendFile = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData();
    formData.append("csv", file)
    formData.append("test", {"this": "is", "test": 1})
    const res = await axios.post(
      'http://localhost:5000/upload',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Session-Id': sessionId,
          'Access-Control-Allow-Origin': "*"
        }
      }
    )
    const data = await res.data
    console.log(data)
    setDfColumns(data)
    return data
  }


  return (
    <div>
      <h2>{service.name}</h2>
      <form className='argument-form'>
        <input onChange={sendFile} type="file"></input>
        <br />
        <ColumnSelector 
        args={service.arguments} 
        columns={dfColumns} 
        onChange={addArg}
        ></ColumnSelector>
        {/* <input onSubmit={submitArguments} className="btn" type="submit" name="submit" value="Submit Arguments"></input> */}
        {/* {sessionId != null && <p>Submitted successfully</p>} */}
      </form>
      <Button className="btn" onClick={() => submitArguments()}>Execute</Button>
      {/* <Button className="btn" onClick={getResults}>Execute</Button>
       <Button className="btn" onClick={clear}>Clear Results</Button> */}
      {/* <Button className="btn" onClick={() => console.log(args)}>Debug</Button> */}
      <br />
      {showResult && <Result result={result} sessionId={sessionId}></Result>}
    </div>
  )
}

export default BigDataService
