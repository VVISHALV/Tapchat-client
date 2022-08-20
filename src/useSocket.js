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
function useSocket(setMessages, selectedContact) {
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

    socket.on("convo", (msg) => {
      setMessages(msg);
      console.log("convo", msg);
    });
    socket.on("disconnect", () => {
      //   setIsConnected(false);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("convo");
    };
  }, []);

  return socket;
}

export default useSocket;
