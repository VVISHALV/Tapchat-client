import { IoSearch } from "react-icons/io5";
import {
  Search,
  Profilepic,
  Header,
  Contact,
  ContactsContainer,
} from "./Styles.js";
import { Navigate } from "react-router-dom";

export default function LeftSide(props) {
  const states = props.states;
  function signout() {
    sessionStorage.removeItem("user");
    states.setUser(null);
    window.google.accounts.id.revoke(states.user.email, (done) => {
      console.log(done);
    });
  }
  function handleAddContact() {
    let val = document.querySelector("#addcontact").value;
    console.log(val);
    postdata("contact", {
      user_name: states.user.name,
      user_email: states.user.email,
      contact_name: val,
    });
  }
  function postdata(path, data) {
    fetch("http://localhost:3001/" + path, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((r) => r.json())
      .then((r) => console.log(r));
  }
  function handleContact(e) {
    states.socket.emit("contact", {
      sender_email: states.user.email,
      receiver_email: e.email,
    });
    states.setSelectedContact(e);
  }
  function handleSearch(e) {
    states.setDisplay_contacts(
      states.contacts.filter((v) => v.name.startsWith(e.target.value))
    );
  }
  function randomimg() {
    return `https://picsum.photos/seed/picsum/100/${Math.floor(
      Math.random() * 500
    )}`;
  }

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
            signout();
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
        <input type="text" placeholder="Search chat" onInput={handleSearch} />
      </Search>
      <div className="scroll">
        {states.display_contacts.map((d, i) => (
          <Contact
            key={i}
            onClick={() => handleContact(d)}
            selected={states.selectedContact == d}
          >
            <Profilepic src={randomimg()} />
            <h2>{d.name}</h2>
          </Contact>
        ))}
      </div>
    </ContactsContainer>
  );
}
