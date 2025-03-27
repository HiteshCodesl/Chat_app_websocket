import { useEffect, useRef, useState } from "react"

function App() {
  const [messages, setMessages] = useState([]);
  const wsRef = useRef();
  const inputRef = useRef();
useEffect(()=>{
const ws = new WebSocket("http://localhost:8080")

ws.onmessage = (event)=>{
  const data = JSON.parse(event.data)
  setMessages(m => [...m, data])
}
wsRef.current = ws;

ws.onopen = () =>{
  ws.send(JSON.stringify({
    type: "join",
    payload: {
      roomId: "red"
    }
  }))
}
return () =>{
  ws.close()
}

}, [])

  return (
    <div className="h-screen bg-black overflow-y-auto">
     <div className="[h-80vh] bg-grey">
      {messages.map(message => <div className="mt-8">
        <span className="bg-white text-black p-3 m-8 rounded-lg">{message}</span>
        </div>
      )}
     </div>

     <div className="flex gap-3 bottom-5 absolute mx-2">
     <input ref={inputRef} id="message" className=" bg-white w-[80vw] p-3 text-lg" type="text" placeholder="Enter a Message"  />
     <button onClick={() =>{
      const message = inputRef.current?.value;
      wsRef.current.send(JSON.stringify({
        type: "chat",
        payload: {
          message: message
        }
      }))
     }}
className="bg-white w-[15vw] font-medium font-mono text-black">Send</button>
     </div>
    </div>
  )
}

export default App
