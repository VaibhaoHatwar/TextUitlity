import React, { useState } from "react"

const TextForm = (props) => {
  const [text, setText] = useState("")

  const handleUpcase = () => {
    let newText = text.toUpperCase()
    setText(newText)
    props.showAlert("Converted to uppercase!", "success")
  }

  const handleLowcase = () => {
    let newText = text.toLowerCase()
    setText(newText)
    props.showAlert("Converted to lowercase!", "success")
  }

  const handleRead = () => {
    let msg = new SpeechSynthesisUtterance()
    msg.text = text
    window.speechSynthesis.speak(msg)
    props.showAlert("Reading the content!", "success")
  }

  const handleCopy = () => {
    let text = document.getElementById("textBox")
    text.select()
    navigator.clipboard.writeText(text.value)
    props.showAlert("Copied to clipboard!", "success")
  }

  const handleExtraSpaces = () => {
    let newText = text.split(/[ ]+/)
    setText(newText.join(" "))
    props.showAlert("Removed extra spaces!", "success")
  }

  const handleClear = () => {
    let newText = ""
    setText(newText)
    props.showAlert("Text cleared!", "success")
  }

  const handleChange = (event) => {
    setText(event.target.value)
  }

  return (
    <>
      <div className="container">
        <h1
          style={{
            color: props.mode === "dark" ? "white" : "black",
          }}
        >
          {props.heading}
        </h1>
        <div className="mb-3">
          <textarea
            className="form-control"
            id="textBox"
            rows="8"
            value={text}
            onChange={handleChange}
            style={{
              backgroundColor: props.mode === "dark" ? "#13466e" : "white",
              color: props.mode === "dark" ? "white" : "black",
            }}
          ></textarea>
        </div>
        <button className="btn btn-primary mx-1 my-1" onClick={handleUpcase}>
          Convert to Uppercase
        </button>
        <button className="btn btn-primary mx-1 my-1" onClick={handleLowcase}>
          Convert to Lowercase
        </button>
        <button className="btn btn-primary mx-1 my-1" onClick={handleRead}>
          Read at Loud
        </button>
        <button className="btn btn-primary mx-1 my-1" onClick={handleCopy}>
          Copy Text
        </button>
        <button
          className="btn btn-primary mx-1 my-1"
          onClick={handleExtraSpaces}
        >
          Remove Extra Space
        </button>
        <button className="btn btn-primary mx-1 my-1" onClick={handleClear}>
          Clear Text
        </button>
      </div>
      <div
        className="container my-3"
        style={{
          color: props.mode === "dark" ? "white" : "black",
        }}
      >
        <h2>Your text summary</h2>
        <p>
          {
            text.split(" ").filter((element) => {
              return element.length !== 0
            }).length
          }{" "}
          word, {text.length} characters
        </p>
        <p>
          {0.008 *
            text.split(" ").filter((element) => {
              return element.length !== 0
            }).length}{" "}
          Minutes read
        </p>
        <h2>Preview</h2>
        <p>
          {text.length > 0
            ? text
            : "Enter something in textbox above to preview here"}
        </p>
      </div>
    </>
  )
}

export default TextForm
