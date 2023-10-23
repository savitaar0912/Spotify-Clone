// Initialize the var
let songIndex = 0;
let audioElement = new Audio("songs/0.mp3");
let masterPlay = document.getElementById('masterPlay');
let backward = document.getElementById('backward');
let forward = document.getElementById('forward');
let progressbar = document.getElementById('progressbar');
let gif = document.getElementById('gif');
let songplaying = document.getElementById('songplaying');
let songitems = Array.from(document.getElementsByClassName('songitems'));
let PlaySong = Array.from(document.getElementsByClassName('PlaySong'));

// All Songs
let songs = [
    { songname: "When You're Gone", filePath: "songs/When You're Gone.mp3", coverPath: "images/cover.jpg"},
    { songname: "Bad Reputation", filePath: "songs/Bad Reputation.mp3", coverPath: "images/cover.jpg" },
    { songname: "Mercy", filePath: "songs/Mercy.mp3", coverPath: "images/cover.jpg" },
    { songname: "Him & I", filePath: "songs/Him & I.mp3", coverPath: "images/cover.jpg" },
    { songname: "Without Me", filePath: "songs/Without Me.mp3", coverPath: "images/cover.jpg" },
    { songname: "Stitches", filePath: "songs/Stitches.mp3", coverPath: "images/cover.jpg" },
    { songname: "Treat You Better", filePath: "songs/Treat You Better.mp3", coverPath: "images/cover.jpg" }
]

//Songs and cover assignment by js
songitems.forEach((element, i) => {
    // console.log(element,i);
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText = songs[i].songname;
    element.getElementsByClassName('time')[0].innerText = songs[i].audioElement.duration;
})

// Play pause function
const playpause = () => {
    PlaySong.forEach((element, id) => {
        element.classList.remove('fa-circle-pause')
        element.classList.add('fa-circle-play')
    })
}
// const pauseplay = () => {
//     PlaySong.forEach((element,id) => {
//         element.classList.add('fa-circle-pause')
//         element.classList.remove('fa-circle-play')
//     })
// }

// Handle play/pause 
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    }
    else if (audioElement.played) {
        audioElement.pause()
        masterPlay.classList.remove("fa-circle-pause")
        masterPlay.classList.add("fa-circle-play")
        gif.style.opacity = 0;
    }
    songplaying.innerText = songs[songIndex].songname
})

masterPlay.addEventListener('click' , (element)=> {
    if (PlaySong.classList === 'fa-circle-pause'){   
        element.classList.remove('fa-circle-pause')
        element.classList.add('fa-circle-play')
    }
})
    
// ProgressBar 
audioElement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    // console.log("progressbar.value = " + progress);
    progressbar.value = progress
    if (audioElement.currentTime === audioElement.duration) {
        audioElement.pause()
        masterPlay.classList.remove("fa-circle-pause")
        masterPlay.classList.add("fa-circle-play")
        gif.style.opacity = 0;
    }
})

progressbar.addEventListener('change', () => {
    audioElement.currentTime = ((progressbar.value * audioElement.duration) / 100)
    // console.log("audioElement.currentTime = " + audioElement.currentTime);
    let end = parseInt((audioElement.duration / audioElement.duration) * 100)
    if (progressbar.value === end || audioElement.currentTime === audioElement.duration) {
        audioElement.pause()
        masterPlay.classList.remove("fa-circle-pause")
        masterPlay.classList.add("fa-circle-play")
        gif.style.opacity = 0;
    }
})

// Play song from list itself
PlaySong.forEach((element) => {
    element.addEventListener('click', (e) => {
        // console.log(e.target);
        playpause()
        songIndex = parseInt(e.target.id)
        e.target.classList.remove('fa-circle-play')
        e.target.classList.add('fa-circle-pause')
        audioElement.src = `songs/${songIndex}.mp3`
        audioElement.currentTime = 0
        audioElement.play()
        masterPlay.classList.remove('fa-circle-play')
        masterPlay.classList.add('fa-circle-pause')
        gif.style.opacity = 1
        songplaying.innerText = songs[songIndex].songname
    })
})

// forward n backward 
forward.addEventListener('click', () => {
    if (songIndex >= 6) {
        songIndex = 0
    }
    else {
        songIndex += 1
    }
    audioElement.src = `songs/${songIndex}.mp3`
    audioElement.currentTime = 0
    audioElement.play()
    masterPlay.classList.remove('fa-circle-play')
    masterPlay.classList.add('fa-circle-pause')
    songplaying.innerText = songs[songIndex].songname
})
backward.addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 6
    }
    else {
        songIndex -= 1
    }
    audioElement.src = `songs/${songIndex}.mp3`
    audioElement.currentTime = 0
    audioElement.play()
    masterPlay.classList.remove('fa-circle-play')
    masterPlay.classList.add('fa-circle-pause')
    songplaying.innerText = songs[songIndex].songname
})