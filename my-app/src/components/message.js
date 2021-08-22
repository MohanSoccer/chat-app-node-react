import React from "react";

const Message = ({ user, text, type }) => {
   return (
      <div className={`row msg_container base_${type}`}>
         <div className="col-xs-10 col-md-10">
            <div className={`messages msg_${type}`}>
               {text.split("\n")?.map((line) => (
                  <p>{line}</p>
               ))}
               <time>{user}</time>
            </div>
         </div>
      </div>
   );
};

export default Message;
