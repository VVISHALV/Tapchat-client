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
  console.log("app component");
  const [selectedContact, setSelectedContact] = useState("");
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("user")));
  const [user_contacts,setUser_contacts] = useState(contacts.filter((c) => c.email != user.email));
  console.log("sel",selectedContact);

  const socket = useSocket(selectedContact);
  const states = {
    socket,
    selectedContact,
    setSelectedContact,
    user,
    setUser,
    user_contacts,
  };
  // console.log(messages)
  useEffect(()=>{
    
    socket.on("online",(email)=>{
      console.log("online",email);
       console.log(user_contacts); 
      setUser_contacts((uc)=>uc.map((c)=>{
        console.log(c);
        if(c.email==email)return {...c,isonline:true}
        else return c;
      }))
    })
    return ()=>{
      socket.off("online")
    }
},[])  

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
