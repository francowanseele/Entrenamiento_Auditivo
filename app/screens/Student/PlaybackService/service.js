import TrackPlayer from 'react-native-track-player';

module.exports = async (data) => {
    console.log(data);
    if (data.type === 'playback-state') {
        // Update the UI with the new state
        console.log('sdlfjslkdfjks');
    } else if (data.type === 'remote-play') {
        TrackPlayer.play();
        console.log('play');
    } else if (data.type === 'remote-pause') {
        TrackPlayer.pause();
        console.log('pause');
    } else if (data.type === 'remote-stop') {
        TrackPlayer.stop();
        console.log('stop');
    } else if (data.type === 'remote-seek') {
        console.warn(data.position);
        TrackPlayer.seekTo(data.position);
    } else if (data.type === 'playback-track-changed') {
        console.log('CHANGEEEEEEDDDD');
    } else if (data.type === 'playback-queue-ended') {
        console.log('endddddddddd');
    }
};
