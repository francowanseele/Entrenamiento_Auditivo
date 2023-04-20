import TrackPlayer, { Event } from 'react-native-track-player';

export async function playbackService() {
    TrackPlayer.addEventListener(Event.RemotePause, () => {
        console.log('Event.RemotePause');
        TrackPlayer.pause();
    });

    TrackPlayer.addEventListener(Event.RemotePlay, () => {
        console.log('Event.RemotePlay');
        TrackPlayer.play();
    });

    TrackPlayer.addEventListener(Event.RemoteNext, () => {
        console.log('Event.RemoteNext');
        TrackPlayer.skipToNext();
    });

    TrackPlayer.addEventListener(Event.RemotePrevious, () => {
        console.log('Event.RemotePrevious');
        TrackPlayer.skipToPrevious();
    });

    // TrackPlayer.addEventListener(Event.PlaybackQueueEnded, () => {
    //     console.log('termino de reproducir....');
    // });
}

export async function setupPlayer() {
    let isSetup = false;
    try {
        await TrackPlayer.setupPlayer();
        isSetup = true;
    } catch {
        isSetup = true;
    } finally {
        return isSetup;
    }
}

export async function addTrack(tran) {
    await TrackPlayer.reset();

    await TrackPlayer.add([
        {
            id: 'trackReferenceId',
            url: tran,
            title: 'TrackReference Title',
            artist: 'TrackReference Artist',
        },
    ]);
}
