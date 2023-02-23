import { useState,useEffect } from "react";

import { IoSearch } from "react-icons/io5";
import {
  Search,
  Profilepic,
  Header,
  Contact,
  ContactsContainer,
} from "./Styles.js";
import { Navigate } from "react-router-dom";

import {signout,handleAddContact,handleSearch,handleContact,randomimg} from "./utils.js"

export default function LeftSide(props) {
  console.log("leftside component");
  const states = props.states;
 
  const user_contacts=states.user_contacts;
  const [display_contacts, setDisplay_contacts] = useState([...states.user_contacts]);
  useEffect(()=>{
    setDisplay_contacts(user_contacts)
  },[user_contacts])
 
  return (
    <ContactsContainer>
      {!states.user && <Navigate to="/" />}
      <Header>
        <Profilepic src={randomimg()} />
        <h2>{states.user.name}</h2>
        <input
          type="button"
          value="signout"
          onClick={() => {
            signout(states.user,states.setUser);
            states.setUser(null);
          }}
        />
      </Header>
      {/* <input type="text" id="addcontact"/>
        <button onClick={handleAddContact}>
          Add contact
        </button> */}
      <Search>
        <IoSearch size={25} />
        <input type="text" placeholder="Search chat" onInput={(e)=>handleSearch(e,{user_contacts,setDisplay_contacts})} />
      </Search>
      <div className="scroll">
        {display_contacts.map((d, i) => (
          <Contact
            key={i}
            onClick={() => handleContact(d,states)}
            selected={states.selectedContact == d}
          >
            <Profilepic src={randomimg()} />
            <h2>{d.name}:{d.isonline?"yes":"no"}</h2>
          </Contact>
        ))}
      </div>
    </ContactsContainer>
  );
}
