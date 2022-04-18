import axios from "axios";
import { Component } from "react";
import Eachjoke from "./Eachjoke";
import "./JokesList.css";
import { v4 as uuidv4 } from "uuid";
const JOKES_URL = `https://icanhazdadjoke.com/`;
class Jokes extends Component {
  static defaultProps = {
    numberOfJokes: 10, //number of jokes to be rendered on click is fetched by default props
  };
  constructor(props) {
    super(props);
    this.state = {
      jokes: JSON.parse(window.localStorage.getItem("jokes")) || [],
      loading: false,
    };
    this.seenJokes = new Set(this.state.jokes.map((s) => s.text)); //removing duplicate jokes from the data
    // console.log(this.seenJokes);
    this.getJokes = this.getJokes.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    if (this.state.jokes.length === 0) {
      //if state has no jokes call the getJokes function .
      this.getJokes();
    }
  }
  async getJokes() {
    let jokes = [];
    while (jokes.length < this.props.numberOfJokes) {
      let response = await axios.get(JOKES_URL, {
        headers: {
          Accept: "application/json",
        },
      });
      let newJoke = response.data.joke;
      if (!this.seenJokes.has(newJoke)) {
        // if joke is new means old one is not there
        jokes.push({ id: uuidv4(), text: newJoke, votes: 0 });
      } else {
        console.log(newJoke);
      }
    }
    this.setState(
      (st) => ({ loading: false, jokes: [...st.jokes, ...jokes] }),
      () =>
        window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes))
    );
  }
  handleVotes(id, val) {
    this.setState(
      (prvState) => ({
        jokes: prvState.jokes.map((j) =>
          j.id === id ? { ...j, votes: j.votes + val } : j
        ),
      }),
      () =>
        window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes))
    );
  }
  handleClick() {
    this.setState({ loading: true }, this.getJokes);
    // this.getJokes();
  }
  render() {
    return (
      <div className="JokesList">
        <div className="JokeList-sidebar">
          <h1 className="curlystyle">
            <span>DAD</span>Jokes
          </h1>
          <div className="imgDiv">
            <img
              src="https://www.transparentpng.com/thumb/laughing-emoji/laughing-emoji-free-png-22.png"
              alt="laughing emoji free png @transparentpng.com"
            ></img>
          </div>
          <button className="moreJokes-btn" onClick={this.handleClick}>
            More Jokes
          </button>
        </div>

        {this.state.loading ? (
          <div style={{ textAlign: "center", color: "white" }}>
            <i className="far fa-laugh"></i>
            <h1>Loading...</h1>
          </div>
        ) : (
          <div className="JokesList-jokes">
            {this.state.jokes.map((j) => {
              return (
                <Eachjoke
                  votes={j.votes}
                  text={j.text}
                  key={j.id}
                  upVote={() => this.handleVotes(j.id, 1)}
                  downVote={() => this.handleVotes(j.id, -1)}
                />
              );
            })}
          </div>
        )}
        {/* <div className="JokesList-jokes">
          {this.state.jokes.map((j) => {
            return (
              <Eachjoke
                votes={j.votes}
                text={j.text}
                key={j.id}
                upVote={() => this.handleVotes(j.id, 1)}
                downVote={() => this.handleVotes(j.id, -1)}
              />
            );
          })}
        </div> */}
      </div>
    );
  }
}
export default Jokes;
