import React, {PureComponent} from "react";
import VideoPlayer from "../components/video-player/video-player.jsx";

const withPlayer = (options = {}) => (Component) => {
  class WithPlayer extends PureComponent {
    constructor(props) {
      super(props);

      this._renderPlayer = this._renderPlayer.bind(this);
      this._play = this._play.bind(this);
      this._handlePlay = this._handlePlay.bind(this);
      this._pause = this._pause.bind(this);
      this._timeout = null;

      this.state = {
        isPlaying: false,
      };
    }

    render() {
      return <Component
      {...this.props}

      renderPlayer={this._renderPlayer}
      isPlayerPlaying={this.state.isPlaying}
      onPlayerPlay={this._handlePlay}
      onPlayerPause={this._pause}/>;
    }

    componentWillUnmount() {
      this._resetTimeout();
    }

    _renderPlayer(props) {
      const {isPlaying} = this.state;
      return (
        <VideoPlayer
      width={280}
      height={175}
      {...props}
      isPlaying={isPlaying}/>
    );
    }

    _handlePlay() {
      const timeout =
        this.props.autoPlayTimeout ||
        options.autoPlayTimeout;

      if ((typeof timeout === `number`) && (timeout > 0)) {
        this._resetTimeout();

        this._timeout = setTimeout(() => {
          if (this._timeout) {
            this._play();
          }
        }, timeout);
      } else {
        this._play();
      }
    }

    _play() {
      this.setState({isPlaying: true});
    }

    _pause() {
      this._resetTimeout();
      this.setState({isPlaying: false});
    }

    _resetTimeout() {
      clearTimeout(this._timeout);
      this._timeout = null;
    }
  }
  return WithPlayer;
};

export default withPlayer;