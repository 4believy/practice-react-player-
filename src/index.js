import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

const track1 = "https://vgmdownloads.com/soundtracks/persona-5/szuiidvl/1-01.%20Wake%20Up%2C%20Get%20Up%2C%20Get%20Out%20There.mp3";

const track2 = "https://vgmdownloads.com/soundtracks/persona-5/ledxghzp/1-29.%20Beneath%20the%20Mask.mp3";

const track3 = "https://vgmdownloads.com/soundtracks/persona-5/ipzumxmd/3-22.%20Rivers%20in%20the%20Desert.mp3";

const track4 = "https://vgmdownloads.com/soundtracks/nier-automata-gamerip/grooobgl/4-22%20Song%20of%20the%20Ancients%20%5BPopola%5D%20%28Vocals%29.mp3";

const track5 = "https://vgmdownloads.com/soundtracks/nier-automata-original-soundtrack/swaznxgw/3-13%20Bipolar%20Nightmare.mp3";

const track6 = "https://vgmdownloads.com/soundtracks/persona-3-original-soundtrack/eikuofni/1-02%20The%20Poem%20for%20Everyone%27s%20Souls.mp3";

const track7 = "https://vgmdownloads.com/soundtracks/persona-3-dancing-moon-night-persona-5-dancing-star-night-full-soundtrack/eeuknboeov/1-01%20Our%20Moment%20%28OP%20ver.%29.mp3";

function getTime(time) {
    if (!isNaN(time)) {
        return (
            Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
        );
    }
}
class App extends React.Component {
    state = {
        currentSong: null,
        music: "stopped",
        currentTime: null,
        duration: null
    };

    render() {
        const currentTime = getTime(this.state.currentTime);
        const duration = getTime(this.state.duration);
        const playlist = [
            {
                id: 1,
                title: "Wake Up, Get Up",
            },
            {
                id: 2,
                title: "Beneath the Mask",
            },
            {
                id: 3,
                title: "Rivers in the Desert",
            },
            {
                id: 4,
                title: "Song of the Ancients",
            },
            {
                id: 5,
                title: "Bipolar Nightmare",
            },
            {
                id: 6,
                title: "The Poem for Everyone's Souls",
            },
            {
                id: 7,
                title: "Our Moment",
            }
        ].map(item => {
            return (
                <div class="ui list">
                    <div class="item">
                        <div class="content">

                            <li type="none"
                                className="title"
                                key={item.id}
                                onClick={() => this.setState({ currentSong: item.title })}
                            >
                                {item.title}
                            </li>

                        </div></div></div>
            );
        });

        return (
            <>
                <h1 className="header">Music Player</h1>
                <div className="App">
                    <div className="ui card main-container">
                        <div className="info-container">
                            {this.state.music === "playing" ? (
                                <div className="current-song">
                                    {this.state.currentSong}
                                </div>
                            ) : null}
                            {this.state.music === "paused" ? (
                                <div className="current-song">
                                    {this.state.currentSong}
                                </div>
                            ) : null}
                            {this.state.music === "playing" ||
                            this.state.music === "paused" ? (
                                <div>
                                    {currentTime} / {duration}
                                </div>
                            ) : (
                                ""
                            )}
                        </div>
                        <div className="button-container">
                            {this.state.music === "paused" && (
                                <button
                                    class="button"
                                    onClick={() => this.setState({ music: "playing" })}
                                >
                                    <i class="play button" />
                                    Play
                                </button>
                            )}
                            {this.state.music === "playing" && (
                                <button
                                    class="button"
                                    onClick={() => this.setState({ music: "paused" })}
                                >
                                    <i class="pause button" />
                                    Pause
                                </button>
                            )}
                            {this.state.music === "playing" ||
                            this.state.music === "paused" ? (
                                <button
                                    class="button"
                                    onClick={() => this.setState({ music: "stop" })}
                                >
                                    <i class="stop button" />
                                    Stop
                                </button>
                            ) :null }
                        </div>


                        <div className="playlist">{playlist}</div>

                        <audio ref={ref => (this.music = ref)} />
                    </div></div></>
        );
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.currentSong !== prevState.currentSong) {
            let track;
            switch (this.state.currentSong) {
                case "Wake Up, Get Up":
                    track = track1;
                    break;
                case "Beneath the Mask":
                    track = track2;
                    break;
                case "Rivers in the Desert":
                    track = track3;
                    break;
                case "Song of the Ancients":
                    track = track4;
                    break;
                case "Bipolar Nightmare":
                    track = track5;
                    break;
                case "The Poem for Everyone's Souls":
                    track = track6;
                    break;
                case "Our Moment":
                    track = track7;
                    break;
                default:
                    break;
            }

            if (track) {
                this.music.src = track;
                this.music.play();
                this.setState({
                    music: "playing"
                });
            }
        }

        if (this.state.music !== prevState.music) {
            if (this.state.music === "paused") {
                this.music.pause();
            }
            if (this.state.music === "playing" && prevState.music === "paused") {
                this.music.play();
            }
            if (this.state.music === "stop") {
                this.music.pause();
                this.currentTime = 0;
                this.setState({
                    currentSong: null
                });
            }
        }
    }

    componentDidMount() {
        this.music.addEventListener("timeupdate", e => {
            this.setState({
                currentTime: e.target.currentTime,
                duration: e.target.duration
            });
        });
    }

    componentWillUnmount() {
        this.music.removeEventListener("timeupdate", () => {});
    }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);



