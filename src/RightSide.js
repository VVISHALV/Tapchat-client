import { useState, useEffect } from "react";

import {
  Profilepic,
  Header,
  ChatArea,
  MessageArea,
  MessageField,
  Message,
  Input,
  SendButton,
  LastMessage,
} from "./Styles.js";
import { BsEmojiLaughing } from "react-icons/bs";
import { IoSend } from "react-icons/io5";
import { useRef } from "react";
import { randomimg } from "./utils.js";
import { SocketSetMessage } from "./useSocket.js";
export default function RightSide(props) {
  console.log("rightside component");
  const states = props.states;
  const textfield = useRef();
  const lastmessage = useRef();
  const [messages, setMessages] = useState([]);
   
  useEffect(() => {
    const socket=SocketSetMessage(setMessages,states);
    return ()=>{
      socket.off("convo");
      socket.off("chat");

    }
  }, [states.selectedContact]);

  function handleSend(e) {
    const msg = textfield.current.value;
    console.log(msg);
    console.log(textfield, lastmessage);
    const current = new Date();

    states.socket.emit("chat", {
      sender: states.user.name,
      sender_email: states.user.email,
      receiver: states.selectedContact.name,
      receiver_email: states.selectedContact.email,
      message: msg,
      createdAt: current.toLocaleTimeString(),
    });
    lastmessage.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }

  return (
    <MessageArea>
      <Header>
        <Profilepic src={randomimg()} />
        <h2>{states.selectedContact.name}</h2>
      </Header>
      <ChatArea>
        {messages.map((m, i) => (
          <Message key={i} mine={m.sender == states.user.name}>
            <p>{m.sender == states.user.name ? "me" : m.sender}</p>
            <h2>{m.message}</h2>
            <p className="createdAt">{m.createdAt}</p>
          </Message>
        ))}

        <LastMessage ref={lastmessage}>
  
        </LastMessage>
      </ChatArea>
      <MessageField>
        <SendButton>
          <BsEmojiLaughing />
        </SendButton>

        <Input type="text" placeholder="Type Something" ref={textfield}></Input>
        <SendButton onClick={handleSend}>
          <IoSend />
        </SendButton>
      </MessageField>
    </MessageArea>
  );
}
