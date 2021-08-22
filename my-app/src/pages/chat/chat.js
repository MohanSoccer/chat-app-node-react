import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import Message from "../../components/message";
import "./chat.css";

var timeout = undefined;
let socket;
const Chat = () => {
   const [user, setUser] = useState("");
   const [room, setRoom] = useState("");
   const [users, setUsers] = useState([]);
   const [message, setMessage] = useState("");
   const [messages, setMessages] = useState([]);
   const socketUrl = "http://localhost:8000";

   useEffect(() => {
      const search = window.location.search;
      const params = new URLSearchParams(search);
      const user = params.get("name");
      const room = params.get("room");

      setUser(user);
      setRoom(room);

      socket = io(socketUrl);

      socket.emit("join", { user, room }, (err) => {
         if (err) {
            // alert(err)
         }
      });

      return () => {
         // User leaves room
         socket.disconnect();

         socket.off();
      };
   }, [socketUrl, window.location.search]);

   useEffect(() => {
      socket.on("message", (msg) => {
         console.log(msg);
         setMessages((prevMsg) => [...prevMsg, msg]);

         setTimeout(() => {
            var div = document.getElementById("chat_body");
            div.scrollTop = div.scrollHeight - div.clientWidth;
         }, 10);
      });

      socket.on("roomMembers", (usrs) => {
         setUsers(usrs);
      });
   }, []);

   useEffect(() => {
      socket.on("display", (data) => {
         console.log(data);
         if (data.typing) {
            document.getElementById(
               "typing"
            ).innerHTML = `${data.user} is typing...`;
         } else {
            document.getElementById("typing").innerHTML = ``;
         }
      });
   }, [message]);

   const Typing = () => {
      clearTimeout(timeout);

      socket.emit("typing", { user, typing: true });
      timeout = setTimeout(() => {
         socket.emit("typing", { user, typing: false });
      }, 3000);
   };

   const sendMessage = (e) => {
      e.preventDefault();

      socket.emit("sendMessage", message, () => setMessage(""));
      socket.emit("typing", { user, typing: false });
      setTimeout(() => {
         var div = document.getElementById("chat_body");
         div.scrollTop = div.scrollHeight;
      }, 100);
   };

   return (
      <>
         <div className="container mt-4 ">
            <div className="row chat-window" id="chat_window_1">
               <div className="col-xs-12 col-md-12">
                  <div className="panel panel-default">
                     <div className="panel-heading top-bar">
                        <div className="col-md-12 col-xs-8">
                           <h3 className="panel-title">
                              <span className="glyphicon glyphicon-comment"></span>
                              {room}
                           </h3>
                           <span
                              data-toggle="modal"
                              data-target="#activeUsers"
                              className="text-light"
                              style={{ cursor: "pointer" }}
                           >
                              {users?.length} Active users
                           </span>
                        </div>
                     </div>
                     <div
                        className="panel-body msg_container_base"
                        id="chat_body"
                     >
                        {messages?.map((e, i) => (
                           <Message
                              key={i}
                              type={
                                 e.user !== user?.toLowerCase()
                                    ? "receive"
                                    : "sent"
                              }
                              user={
                                 e.user !== user?.toLowerCase() ? e.user : "You"
                              }
                              text={e.text}
                           />
                        ))}
                        <div id="typing"></div>
                     </div>
                     <div className="panel-footer">
                        <div className="input-group">
                           <textarea
                              id="btn-input"
                              type="text"
                              value={message}
                              onKeyPress={(event) =>
                                 event.ctrlKey && event.key == "\n" // Ctrl + Enter
                                    ? sendMessage(event)
                                    : Typing()
                              }
                              onChange={(event) =>
                                 setMessage(event.target.value)
                              }
                              className="form-control input-sm chat_input"
                              placeholder="Write your message here..."
                           />
                        </div>
                        <br />
                        <div className="alert alert-info alert-dismissible">
                           <button
                              type="button"
                              class="close"
                              data-dismiss="alert"
                           >
                              &times;
                           </button>
                           Use <code>Ctrl + Enter</code> to send messages
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div class="modal" id="activeUsers">
            <div class="modal-dialog">
               <div class="modal-content">
                  <div class="modal-header">
                     <h4 class="modal-title">Active Users</h4>
                     <button type="button" class="close" data-dismiss="modal">
                        &times;
                     </button>
                  </div>

                  <div class="modal-body">
                     <ul class="list-group">
                        {users.map((val) => (
                           <li class="list-group-item">{val.user}</li>
                        ))}
                     </ul>
                  </div>

                  <div class="modal-footer">
                     <button
                        type="button"
                        class="btn btn-danger"
                        data-dismiss="modal"
                     >
                        Close
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default Chat;
