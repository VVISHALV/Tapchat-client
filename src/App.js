import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Container } from "./Styles.js";
import { IconContext } from "react-icons";
import LeftSide from "./LeftSide.js";
import RightSide from "./RightSide.js";
import { v1 } from "uuid";
import { contacts } from "./Loginpage.js";
import useSocket from "./useSocket.js";

function App() {
  const [messages, setMessages] = useState([]);
  const [selectedContact, setSelectedContact] = useState("");
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("user")));
  const user_contacts = contacts.filter((c) => c.email != user.email);
  const [display_contacts, setDisplay_contacts] = useState([...user_contacts]);
  console.log(selectedContact);

  const socket = useSocket(setMessages, selectedContact);
  const states = {
    socket,
    messages,
    setMessages,
    selectedContact,
    setSelectedContact,
    user,
    setUser,
    display_contacts,
    setDisplay_contacts,
    user_contacts,
  };
  // console.log(messages)
  useEffect(() => {
    socket.on("chat", (msg) => {
      if (
        msg.sender_email == selectedContact.email ||
        msg.sender_email == user.email
      )
        setMessages((m) => [...m, msg]);
      console.log("server", msg);
    });
    return () => {
      socket.off("chat");
    };
  }, [selectedContact]);

  return (
    <>
      {!user && <Navigate to="/" />}
      <IconContext.Provider
        value={{
          size: "1.8em",
          color: "#8696a0",
          className: "global-class-name",
        }}
      >
        <Container>
          <LeftSide states={states} />
          <RightSide states={states} />
        </Container>
      </IconContext.Provider>
    </>
  );
}

export default App;
