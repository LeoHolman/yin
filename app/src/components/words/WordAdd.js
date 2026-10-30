import React, { Component } from "react";

class AudioUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pinyin: "",
      character: "",
      // alternateTones: [],
      correct: "",
      form_complete: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    // this.createAlternateToneArray = this.createAlternateToneArray.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const { target } = event;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const { name } = target;

    this.setState({
      [name]: value,
    });
  }

  // createAlternateToneArray(){
  //     const altTone1 = document.getElementById("altTone1").value;
  //     const altTone2 = document.getElementById("altTone2").value;
  //     const altTone3 = document.getElementById("altTone3").value;
  //     this.setState({
  //         alternateTones: [altTone1, altTone2, altTone3]
  //     })
  // }

  async handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    const file = document.getElementById("audioFileInput").files[0];

    if (!file) {
      alert("Please choose an audio file first.");
      return;
    }

    formData.append("audioFile", file);
    formData.append("pinyin", this.state.pinyin);
    formData.append("correctTone", this.state.correct);
    formData.append("character", this.state.character);

    try {
      const response = await fetch("/api/words/add/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed with status ${response.status}`);
      }

      this.setState({ form_complete: true }, () => {
        this.props.history.push("/teacherInterface/words/");
      });
    } catch (error) {
      console.error("Word upload failed:", error);
      alert("The audio upload failed. Please try again.");
    }
  }

  render() {
    return (
      <>
        {!this.state.form_complete ? (
          <form onSubmit={this.handleSubmit} className="audioForm">
            <label htmlFor="audioFileInput">Audio File:</label>
            <input id="audioFileInput" type="file" name="audioFile" />
            <label htmlFor="character">Character</label>
            <input
              id="character"
              type="text"
              name="character"
              value={this.state.character}
              onChange={this.handleInputChange}
            />
            <label htmlFor="pinyin">Pinyin</label>
            <input
              id="pinyin"
              type="text"
              name="pinyin"
              value={this.state.pinyin}
              onChange={this.handleInputChange}
            />
            <label htmlFor="tone">Correct Tone:</label>
            <input
              id="tone"
              type="text"
              name="correct"
              value={this.state.correct}
              onChange={this.handleInputChange}
            />
            <label id="submitButton">
              <input type="submit" value="Submit" />
            </label>
          </form>
        ) : null}
      </>
    );
  }
}

export default AudioUpload;
