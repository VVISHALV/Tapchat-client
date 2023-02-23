import { useEffect } from "react";
import io from "socket.io-client";

const dev = "http://localhost:3001/";
const production = "";
const socket = io(dev, {
  transportOptions: {
    polling: {
      extraHeaders: {
        "Access-Control-Allow-Origin": "*",
      },
    },
  },
});
console.log("usesocket rendered");
let User;
function useSocket(selectedContact) {
  //   const [isConnected, setIsConnected] = useState(false);
  useEffect(() => {
    socket.on("connect", () => {
      //   setIsConnected(true);
      const sessionID = socket.id;
      console.log("yes");
      console.log(sessionID);
      let user = JSON.parse(sessionStorage.getItem("user"));
      User = user;
      socket.emit("setusers", {
        email: user.email,
        id: sessionID,
      });
    });

    
    socket.on("disconnect", () => {
      //   setIsConnected(false);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  return socket;
}
function SocketSetMessage(setMessages,states){
  
    const socket=states.socket;
    socket.on("convo", (msg) => {
      setMessages(msg);
      console.log("convo", msg);
    });
    socket.on("chat", (msg) => {
      if (
        msg.sender_email == states.selectedContact.email ||
        msg.sender_email == states.user.email
      )
        setMessages((m) => [...m, msg]);
      console.log("server", msg);
    });
    return socket;
}
export default useSocket;
export {SocketSetMessage}