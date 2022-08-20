import Auth from "./Auth.js"
import {Navigate} from "react-router-dom";
import {useState,useRef} from "react"
import App from './App';

let contacts=[
    "thinoj",
    "thirupathi",
    "vishal",
    "wesly",
    "vikram"
  ]  
  contacts=contacts.map(d=>{
    return {
      name:d,
      email:d+"@gmail.com"
    }
  })
export {contacts};
export default function Loginpage(){
    
    const [loggedin,setLoggedin]=useState(false)
    const inputref=useRef();
    
    return(
        <>  
       {loggedin &&  <Navigate to="/home"/> }
    <div className="login">
    <h1>tapchat</h1>
    <h2>user login</h2>
    <Auth loggedin={loggedin} setLoggedin={setLoggedin} />
        <h2>Dev login</h2>
        <select ref={inputref}>
            {contacts.map((c,i)=>
  <option key={i} value={i}>{c.name}</option>)}
    </select>
<button onClick={
    ()=>{
       let user=contacts[inputref.current.value];
       sessionStorage.setItem("user",JSON.stringify(user))
       setLoggedin(true)
    }
}>Login</button>
    </div>
    
        </>
    )
}