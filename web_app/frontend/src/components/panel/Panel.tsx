import "./Panel.css";

function Panel() {
  return (
    <div className="panel big medium small">
      <p className="title">Walkie-Talkie</p>
      <div className="section">
        <label htmlFor="inputMessage" className="section-title">
          Message
        </label>
        <textarea id="inputMessage" className="section-textarea"></textarea>
      </div>
      <div className="section">
        <label htmlFor="outputMessage" className="section-title">
          Response
        </label>
        <textarea
          id="outputMessage"
          readOnly
          className="section-textarea"
        ></textarea>
      </div>
    </div>
  );
}

export default Panel;
