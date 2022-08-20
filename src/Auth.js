import jwt_decode from "jwt-decode";

export default function Auth(props){
  let Client_id=process.env.REACT_APP_ClientID;
        function handleCredentialResponse(response) {
        let user=jwt_decode(response.credential)
        
        sessionStorage.setItem("user",JSON.stringify(user));

        fetch("http://localhost:3001/adduser",{
          method:"POST",
          mode:"cors",
          body:JSON.stringify({
            email:user.email,
            name:user.name
          }),
          headers:{
            "Content-Type":"application/json"
          }
        }).then((r)=>r.json()).then(r=>console.log(r))
     
        props.setLoggedin(true)
      }
      async function init() {
        let google=window.google;
        await google.accounts.id.initialize({
          client_id: Client_id,
          callback: handleCredentialResponse
        });
        rendersignin();
      }
      init();
      function rendersignin(){
        window.google.accounts.id.renderButton(
          document.getElementById("buttonDiv"),
          { theme: "outline", size: "large" }  // customization attributes
        );

      }
      
    return(
<>
        <div id="buttonDiv"></div>

</>  
    )
}