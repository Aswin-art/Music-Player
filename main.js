const play = document.getElementById('play')
const prev = document.getElementById('prev')
const next = document.getElementById('next')
const musicContainer = document.getElementById('music-container')
const progress = document.getElementById('progress')
const progressContainer = document.querySelector('.progress-container')
const icon = document.querySelector('.fa-play')
const audio = document.getElementById('audio')
const cover = document.getElementById('cover')
const title = document.getElementById('title')

// Song titles
const songs = ['Oblivion', 'Ankatra', 'Demonlusk']

// Keep track of songs
let songIndex = 0

// Initially load song
loadSong(songs[songIndex])

// Update song details
function loadSong(song){
    title.textContent = song
    audio.src = `music/${song}.mp3`
    cover.src = `images/${song}.jpg`
}

function pauseSong(){
    musicContainer.classList.remove('play')
    icon.classList.remove('fa-pause')
    icon.classList.add('fa-play')
    audio.pause()
}

function playSong(){
    musicContainer.classList.add('play')
    icon.classList.remove('fa-play')
    icon.classList.add('fa-pause')
    audio.play()
}

function nextSong(){
    songIndex++
    if(songIndex > 2){
        songIndex = 0
    }
    loadSong(songs[songIndex])
    playSong()
}

function prevSong(){
    songIndex--
    if(songIndex < 0){
        songIndex = songs.length - 1
    }
    console.log(songIndex)
    loadSong(songs[songIndex])
    playSong()
}

function updateProgress(e){
    const {duration, currentTime} = e.srcElement
    const progressPercent = (currentTime / duration) * 100
    progress.style.width = `${progressPercent}%`
}

function setProgress(e){
    const width = this.clientWidth
    const clickX = e.offsetX
    let duration = audio.duration
    audio.currentTime = (clickX / width) * duration
}

// Event Handler

play.addEventListener('click', function(){
    const isPlaying = musicContainer.classList.contains('play')
    if(isPlaying){
        pauseSong()
    }else{
        playSong()
    }
})

prev.addEventListener('click', prevSong)

next.addEventListener('click', nextSong)

audio.addEventListener('timeupdate', updateProgress)

progressContainer.addEventListener('click', setProgress)

audio.addEventListener('ended', nextSong)