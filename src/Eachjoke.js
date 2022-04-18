import { Component } from "react";
import "./Eachjoke.css";

class Eachjoke extends Component {
  borderColor = () => {
    if (this.props.votes >= 15) {
      return "brown";
    } else if (this.props.votes >= 12) {
      return "blue";
    } else if (this.props.votes >= 9) {
      return "purple";
    } else if (this.props.votes >= 3) {
      return "green";
    } else if (this.props.votes >= 0) {
      return "red";
    } else {
      return "yellow";
    }
  };
  emojis = () => {
    if (this.props.votes >= 15) {
      return "em em-rolling_on_the_floor_laughing";
    } else if (this.props.votes >= 12) {
      return "em em-laughing";
    } else if (this.props.votes >= 9) {
      return "em em-grin";
    } else if (this.props.votes >= 3) {
      return "em em-smile";
    } else if (this.props.votes >= 0) {
      return "em em-neutral_face";
    } else {
      return "em em-angry";
    }
  };
  render() {
    return (
      <div className="mainJokeDiv">
        <div className="Joke-buttons">
          <i className="fas fa-arrow-up" onClick={this.props.upVote}></i>
          <span
            className="voteShow"
            style={{ borderColor: this.borderColor() }}
          >
            {this.props.votes}
          </span>
          <i className="fas fa-arrow-down" onClick={this.props.downVote}></i>
        </div>
        <div className="joke-text">{this.props.text}</div>
        <div className="joke-emojis">
          <i
            // class="em em-rolling_on_the_floor_laughing"
            className={this.emojis()}
          ></i>
        </div>
      </div>
    );
  }
}
export default Eachjoke;
