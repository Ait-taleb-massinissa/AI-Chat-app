import ChatBubble from "./Modules/ChatBubble"
import {useState} from 'react'

function App() {
  const API_Key = "sk-proj-y2eH7MeDkImwdwti4dhpT3BlbkFJLTSAVZdMgSNfBLqiW9Gq"
  const [message,setMessage] = useState();

  const handelSubmit = async (e)=>{
    e.preventDefault();
    const newMessage = {
      role:"user",
      content:message
    } 

    const apiReq = {
      "model":"gpt-3.5-turbo",
      "messages": [
        {
          "role": "system",
          "content": "You are a helpful assistant."
        },newMessage
      ]
    }

    await fetch("https://api.openai.com/v1/chat/completions",{
      method:"POST",
      headers:{
        "Authorization": "Bearer "+API_Key,
        "Content-Type" : "application/json"
      },
      body:JSON.stringify(apiReq)
    }).then(data=>console.log(data))
  }
  
  return (
    <>
      <div className="header" style={{display:"flex",flexDirection:"column",gap:"5px",alignItems:"center",margin:"5vh 0 5vh 0"}} >
        <h3 style={{margin:"0px"}} >Welcome to AI ask</h3>
        <h6 style={{margin:"0px"}} >powored by GPT 3.5</h6>
      </div>
      <div className="messages">
        <ChatBubble who="AI" />
        <ChatBubble who="user" />
        <span style={{margin:"10px"}} >AI is thinking . . .</span>
      </div>
      
      <form onSubmit={handelSubmit} style={{marginLeft:"10vw",position:"fixed",bottom:"5%",border:"1px solid grey",padding:"10px",borderRadius:"20px",width:"80vw"}} >
          <input type="text"
                onChange={(e)=>setMessage(e.target.value)}
                onFocus={(e) => e.target.style = 'all: unset; width: 70vw; padding-left: 10px '}
                style={{
                appearance: 'none',
                WebkitAppearance: 'none',
                MozAppearance: 'none',
                border: 'none',
                background: 'none',
                color: 'inherit',
                font: 'inherit',
                cursor: 'pointer',
                width:"70vw",
                paddingLeft:"10px"
            }}/>
          <input type="submit" value="ask" style={{width:"8vw",height:"30px",borderRadius:"20px",border:"1px solid grey",cursor:"pointer"}} />
      </form>
    </>
  )
}

export default App
