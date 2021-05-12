import { useState, useEffect } from 'react'
import Argument from './Argument';
import { Breadcrumbs, Button } from '@material-ui/core';
import axios from 'axios';
import Result from './Result';

const CloudService = ({ service }) => {
  const [result, setResult] = useState(null)
  const [args, setArgs] = useState(Array(service.arguments.length))
  const [showResult, setShowResult] = useState(false)
  const [sessionId, setSessionId] = useState(null)

  const getSessionId = async () => {
    const res = await axios.get('http://localhost:5000/get-session-id')
    console.log(res)
    const data = await res.data
    setSessionId(data)
  }

  

  const getResults = async () => {
    const res = await axios.get('http://localhost:5000/execute',
      {
        headers: {
          'Content-Type': "image/png",
          'Session-Id': sessionId,
          'Service-Id': service.id,
          'Access-Control-Allow-Origin': "*"
        }
      }
    )
    console.log(res)
    const data = await res.data
    setResult(res)
    setShowResult(true)
    
  }



  const uploadArg = async (content, contentType) => {
    const res = await axios.post('http://localhost:5000/upload',
      content,
      {
        headers: {
          'Content-Type': contentType,
          'Session-Id': sessionId,
          'Access-Control-Allow-Origin': "*"
        }
      }
    )
    console.log(res)
  }

  const addArgs = (newArg, index) => {
    if (sessionId === null) getSessionId()
    console.log(sessionId)
    // console.log(newArg + "   " + index)
    // console.log(args)
    const a = args.slice()
    a[index] = newArg
    setArgs(a)
    // var i;
    // for (i = 0; i < args.length; i++) {
    //   console.log(args[i])
    //   // uploadArg(args[i].arg, args[i].type)
    // }
    // console.log(args)
  }

  const submitArguments = () => {
    var i;
    for (i = 0; i < args.length; i++) {
      uploadArg(args[i].arg, args[i].type)
    }
  }

  const clear = () => {
    setShowResult(false)
    setArgs(Array(service.arguments.length))
    setSessionId(null)
  }


  return (
    <div>
      <h2>{service.name}</h2>
      <form className='argument-form'>
        {
          service.arguments.map((serviceArgument, index) => (
            <Argument key={index} index={index} onChange={addArgs} serviceArgument={{ ...serviceArgument }}></Argument>
          ))
        }
        <br />
        {/* <input onSubmit={submitArguments} className="btn" type="submit" name="submit" value="Submit Arguments"></input> */}
        {/* {sessionId != null && <p>Submitted successfully</p>} */}
      </form>
      <Button className="btn" onClick={() => submitArguments()}>Submit Arguments</Button>
      <Button className="btn" onClick={getResults}>Execute</Button>
      <Button className="btn" onClick={clear}>Clear Results</Button>
      <br />
      {showResult && <Result result={result} sessionId={sessionId}></Result>}
    </div>
  );
}

export default CloudService
