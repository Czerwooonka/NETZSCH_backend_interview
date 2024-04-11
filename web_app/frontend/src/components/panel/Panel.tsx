import useWebSocket, { ReadyState } from "react-use-websocket";
import "./Panel.css";
import { ChangeEvent, useCallback, useEffect, useRef } from "react";

function Panel() {
  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket<string>(
    "ws://localhost:8080/"
  );

  const handleSendMessage = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) =>
      sendJsonMessage({
        type: "newmessage",
        content: e.target.value,
      }),
    []
  );

  let message = lastJsonMessage || "";
  let ready = readyState === ReadyState.OPEN;

  return (
    <div className="panel big medium small">
      {ready ? (
        <div className="led-green"></div>
      ) : (
        <div className="led-red"></div>
      )}
      <p className="title">Walkie-Talkie</p>
      <div className="section">
        <label htmlFor="inputMessage" className="section-title">
          Message
        </label>
        <textarea
          id="inputMessage"
          className="section-textarea"
          onChange={handleSendMessage}
        ></textarea>
      </div>
      <div className="section">
        <label htmlFor="outputMessage" className="section-title">
          Response
        </label>
        <textarea
          id="outputMessage"
          readOnly
          className="section-textarea"
          value={message}
        ></textarea>
      </div>
    </div>
  );
}

export default Panel;
