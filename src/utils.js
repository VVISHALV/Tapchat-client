function signout(user,setUser) {
    sessionStorage.removeItem("user");
    setUser(null);
    window.google.accounts.id.revoke(user.email, (done) => {
      console.log(done);
    });
  }
  function handleAddContact(states) {
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
  function handleContact(e,states) {
    states.socket.emit("contact", {
      sender_email: states.user.email,
      receiver_email: e.email,
    });
    states.setSelectedContact(e);
  }
  function handleSearch(e,states) {
    states.setDisplay_contacts(
      states.user_contacts.filter((v) => v.name.startsWith(e.target.value))
    );
  }
  function randomimg() {
    return `https://picsum.photos/seed/picsum/100/${Math.floor(
      Math.random() * 500
    )}`;
  }

  export{signout,handleAddContact,handleSearch,handleContact,randomimg}