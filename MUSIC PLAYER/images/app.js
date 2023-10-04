let currentMusic = 0;

const music = document.querySelector('#audio');

const seekBar = document.querySelector('.seek-bar');
const songName = document.querySelector('.music-name');
const artistName = document.querySelector('.artist-name');
const disk = document.querySelector('.disk');
const currentTime = document.querySelector('.current-time');
const musicDuration = document.querySelector('.song-duration');
const playBtn = document.querySelector('.play-btn');
const forwardBtn = document.querySelector('.forward-btn');
const backwardBtn = document.querySelector('.backward-btn');
let songs = [
    {
        name: 'Dilawara',
        path: 'musics/Song 2.mp3',
        artist: 'Propet C',
        cover: 'Dilawara.jpg'
    },
    {
        name: 'Mi-amor',
        path: 'musics/Song 3.mp3',
        artist: 'artist 3',
        cover: 'mi-amor.jpg'
    },
    {
        name: 'song 4',
        path: 'musics/Song 4.mp3',
        artist: 'artist 4',
        cover: 'cover 4.png'
    },
    {
        name: 'song 5',
        path: 'musics/Song 5.mp3',
        artist: 'artist 5',
        cover: 'images/cover 5.png'
    },
]

playBtn.addEventListener('click', () => {
    if(playBtn.className.includes('pause')){
        music.play();
    } else{
        music.pause();
    }
    playBtn.classList.toggle('pause');
    disk.classList.toggle('play');
})

//setup music

const setMusic = (i) => {
    seekBar.value = 0; // set range slide value to 0;
    let song = songs[i];
    currentMusic = i;
    music.src = song.path;

    songName.innerHTML = song.name;
    artistName.innerHTML = song.artist;
    disk.style.backgroundImage = `url('${ song.cover } ')`;

    currentTime.innerHTML = '00:00';
    setTimeout(() => {
        seekBar.max = music.duration;
        musicDuration.innerHTML = formatTime(music.duration);
    }, 300);
}

setMusic(0);

//formatting time in min and seconds format

const formatTime = (time) => {
    let min = Math.floor(time/60);
    if(min < 10){
        min = `0${min}`;
    }
    let sec = Math.floor(time % 60);
    if(sec < 10){
        sec = `0${sec}`;
    }
    return `${min} : ${sec}`;
}

//seek bar
setInterval(() => {
    seekBar.value = music.currentTime;
    currentTime.innerHTML = formatTime(music.currentTime);
    if(Math.floor(music.currentTime) == Math.floor(seekBar.max)){
        forwardBtn.click();
    }
  }, 500)

  seekBar.addEventListener('change', () => {
    music.currentTime = seekBar.value;
  })

  const playMusic = () => {
    music.play();
    playBtn.classList.remove('pause');
    disk.classList.add('play');
  }

  //forward and backward buttons
forwardBtn.addEventListener('click', () => {
    if(currentMusic >= songs.length - 1){
        currentMusic = 0;
    } else{
        currentMusic++;
    }
    setMusic(currentMusic);
    playMusic();
})

backwardBtn.addEventListener('click', () => {
    if(currentMusic <= 0){
        currentMusic = songs.length - 1
    } else{
        currentMusic--;
    }
    setMusic(currentMusic);
    playMusic();
})
const volumeInput = document.querySelector('#volume');

volumeInput.addEventListener('input', () => {
    const volume = volumeInput.value;
    music.volume = volume;
});

// Set the initial volume when the page loads
music.volume = volumeInput.value;

