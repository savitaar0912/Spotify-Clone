import "../css/Home.css"
import { useState, useEffect, useRef, React, useMemo } from "react";

export default function Home() {

    // All Songs data
    const songs = useMemo(() => [
        { songname: "When You're Gone", filePath: "../songs/0.mp3", coverPath: "images/cover.jpg" },
        { songname: "Bad Reputation", filePath: "../songs/1.mp3", coverPath: "images/cover.jpg" },
        { songname: "Mercy", filePath: "../songs/2.mp3", coverPath: "images/cover.jpg" },
        { songname: "Him & I", filePath: "../songs/3.mp3", coverPath: "images/cover.jpg" },
        { songname: "Without Me", filePath: "../songs/4.mp3", coverPath: "images/cover.jpg" },
        { songname: "Stitches", filePath: "../songs/5.mp3", coverPath: "images/cover.jpg" },
        { songname: "Treat You Better", filePath: "../songs/6.mp3", coverPath: "images/cover.jpg" }
    ], []);

    // Initialize the var
    const audioElementRef = useRef(new Audio());
    const [isPlaying, setIsPlaying] = useState(false);
    const [songIndex, setsongIndex] = useState(0);
    const [progress, setProgress] = useState(0);


    useEffect(() => {
        const audioElement = audioElementRef.current;

        // Update the audio source when the songIndex changes
        audioElement.src = songs[songIndex].filePath;
        audioElement.name = songs[songIndex].songname;

        // Handle audio loading error
        audioElement.addEventListener('error', (e) => {
            console.error('Error loading audio:', e);
            alert('Error loading audio. Please check the file path.');
        });

        if (isPlaying) {
            audioElement.play().catch((error) => {
                console.error('Error playing audio:', error);
                alert('Error playing audio. Please check your audio setup.');
            });
        } else {
            audioElement.pause();
        }

        // reset time
        audioElement.currentTime = 0;

        // update progress bar
        audioElement.addEventListener('timeupdate', updateProgressBar);
        return () => {
            audioElement.removeEventListener('timeupdate', updateProgressBar);
        };
    }, [isPlaying, songIndex, songs]);

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    const forward = () => {
        const nextIndex = (songIndex + 1) % songs.length;
        audioElementRef.current.src = songs[nextIndex].filePath;
        audioElementRef.current.name = songs[nextIndex].songname;
        setsongIndex(nextIndex);
        setIsPlaying(true);
    };

    const backward = () => {
        const prevIndex = (songIndex - 1 + songs.length) % songs.length;
        audioElementRef.current.src = songs[prevIndex].filePath;
        audioElementRef.current.name = songs[prevIndex].songname;
        setsongIndex(prevIndex);
        setIsPlaying(true);
    };

    const getSongDuration = (audioFilePath) => {
        const audio = new Audio(audioFilePath);
        return new Promise((resolve) => {
            audio.addEventListener('loadedmetadata', () => {
                const duration = audio.duration;
                const minutes = Math.floor(duration / 60);
                const seconds = Math.floor(duration % 60);
                resolve(`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`);
            });
        });
    };

    const [songDurations, setSongDurations] = useState(Array(songs.length).fill('0:00'));

    useEffect(() => {
        const promises = songs.map((song) => getSongDuration(song.filePath));
        Promise.all(promises).then((durations) => {
            setSongDurations(durations);
        });
    }, [songs]);

    const updateProgressBar = () => {
        const audioElement = audioElementRef.current;
        const currentTime = audioElement.currentTime;
        const duration = audioElement.duration;

        if (!isNaN(currentTime) && !isNaN(duration)) {
            const calculatedProgress = (currentTime / duration) * 100;
            setProgress(calculatedProgress);
        }
    };


    return (
        <>
            <nav>
                <ul>
                    <li className="brand"><img src="images/spotify-download-logo-30.png" alt="Spotify" />Spotify</li>
                    <li>Home</li>
                    <li>About Us</li>
                </ul>
            </nav>

            <div className="container">
                <div className="songlist">
                    <h1>Best songs in Your Playlist</h1>
                </div>
                <div className="songbanner">
                    {songs.map((e, index) => (
                        <div className="songitems" key={index}>
                            <img src="images/cover.jpg" alt="1" />
                            <span className="songName">{e.songname}</span>
                            <span className="time">
                                {songDurations[index]}{' '}
                                {isPlaying && songIndex === index ? (
                                    <i className="fa-regular fa-circle-pause" id={index}></i>
                                ) : (
                                    <i className="fa-regular fa-circle-play" id={index}></i>
                                )}
                            </span>
                        </div>
                    ))}

                </div>
            </div>

            <div className="bottom">
                <input
                    type="range"
                    name="range"
                    id="progressbar"
                    min="0"
                    value={progress}
                    max="100"
                    onChange={(e) => {
                        const newValue = e.target.value;
                        const newTime = (newValue / 100) * audioElementRef.current.duration;
                        audioElementRef.current.currentTime = newTime;
                        setProgress(newValue);
                    }}
                />

                <div className="icons">
                    {/* <!-- fontawesome icons --> */}
                    <i className="fa-solid fa-2x fa-backward" id="backward" onClick={backward}></i>
                    <i className={`fa-regular fa-2x ${isPlaying ? 'fa-circle-pause' : 'fa-circle-play'}`} id="masterPlay" onClick={handlePlayPause}></i>
                    <i className="fa-solid fa-2x fa-forward" id="forward" onClick={forward}></i>
                </div>
                <div className="songgif" id="gif">
                    {isPlaying ? <><img src="images/Z23b.gif" width="45px" alt="" /><span id="songplaying">{audioElementRef.current.name}</span></> : <></>}
                </div>
            </div>

            <footer className="center">
                <p>
                    Copyright &copy; Rights Reserved
                </p>
            </footer>
        </>
    )
}
