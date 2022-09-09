const cover = document.getElementById('cover');
const disc = document.getElementById('disc');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const timer = document.getElementById('timer');
const duration = document.getElementById('duration');
const prev = document.getElementById('prev');
const play = document.getElementById('play');
const next = document.getElementById('next');
let songIndex = 0;

// Songs info
const songs = [
{
    title: 'undiporaadhey',
    artist: 'Sid Sriram',
    coverPath: 'assets/images/cover8.jpg',
    discPath: 'assets/music/music8.mp3',
    duration: '2:54',
  },
  {
    title: 'Friends',
    artist: 'V and Jimin',
    coverPath: 'assets/images/cover1.jpg',
    discPath: 'assets/music/music1.mp3',
    duration: '3:19',
  },
  {
    title: 'Spring Day',
    artist: 'BTS',
    coverPath: 'assets/images/cover2.jpg',
    discPath: 'assets/music/music2.mp3',
    duration: '5:28',
  },
  {
    title: 'Yet to come',
    artist: 'BTS',
    coverPath: 'assets/images/cover3.jpg',
    discPath: 'assets/music/music3.mp3',
    duration: '4:40',
  },
 {
    title: 'Bad Boy',
    artist: 'Saaho',
    coverPath: 'assets/images/cover4.jpg',
    discPath: 'assets/music/music4.mp3',
    duration: '2:58',
  },
 {
    title: 'Agar tum saath ho',
    artist: 'Arijit singh',
    coverPath: 'assets/images/cover5.jpg',
    discPath: 'assets/music/music5.mp3',
    duration: '5:41',
  },
{
    title: 'Ishq wala love',
    artist: 'student of the year',
    coverPath: 'assets/images/cover6.jpg',
    discPath: 'assets/music/music6.mp3',
    duration: '4:18',
  },
{
    title: 'Kaun tujhe',
    artist: 'Palak Muchhal',
    coverPath: 'assets/images/cover7.jpg',
    discPath: 'assets/music/music7.mp3',
    duration: '4:01',
  },
{
    title: 'Blood Sweat and Tears',
    artist: 'BTS',
    coverPath: 'assets/images/cover10.jpg',
    discPath: 'assets/music/music10.mp3',
    duration: '3:41',
  },
{
    title: 'Pilla raa',
    artist: 'Chaitan Bharadwaj',
    coverPath: 'assets/images/cover9.jpg',
    discPath: 'assets/music/music9.mp3',
    duration: '3:57',
  },
];

// Load song initially
loadSong(songs[songIndex]);

// Load the given song
function loadSong(song) {
  cover.src = song.coverPath;
  disc.src = song.discPath;
  title.textContent = song.title;
  artist.textContent = song.artist;
  duration.textContent = song.duration;
}

// Toggle play and pause
function playPauseMedia() {
  if (disc.paused) {
    disc.play();
  } else {
    disc.pause();
  }
}

// Update icon
function updatePlayPauseIcon() {
  if (disc.paused) {
    play.classList.remove('fa-pause');
    play.classList.add('fa-play');
  } else {
    play.classList.remove('fa-play');
    play.classList.add('fa-pause');
  }
}

// Update progress bar
function updateProgress() {
  progress.style.width = (disc.currentTime / disc.duration) * 100 + '%';

  let minutes = Math.floor(disc.currentTime / 60);
  let seconds = Math.floor(disc.currentTime % 60);
  if (seconds < 10) {
    seconds = '0' + seconds;
  }
  timer.textContent = `${minutes}:${seconds}`;
}

// Reset the progress
function resetProgress() {
  progress.style.width = 0 + '%';
  timer.textContent = '0:00';
}

// Go to previous song
function gotoPreviousSong() {
  if (songIndex === 0) {
    songIndex = songs.length - 1;
  } else {
    songIndex = songIndex - 1;
  }

  const isDiscPlayingNow = !disc.paused;
  loadSong(songs[songIndex]);
  resetProgress();
  if (isDiscPlayingNow) {
    playPauseMedia();
  }
     random_bg_color();
}

// Go to next song
function gotoNextSong(playImmediately) {
  if (songIndex === songs.length - 1) {
    songIndex = 0;
  } else {
    songIndex = songIndex + 1;
  }

  const isDiscPlayingNow = !disc.paused;
  loadSong(songs[songIndex]);
  resetProgress();
  if (isDiscPlayingNow || playImmediately) {
    playPauseMedia();
  }
     random_bg_color();
}

// Change song progress when clicked on progress bar
function setProgress(ev) {
  const totalWidth = this.clientWidth;
  const clickWidth = ev.offsetX;
  const clickWidthRatio = clickWidth / totalWidth;
  disc.currentTime = clickWidthRatio * disc.duration;
}

// Play/Pause when play button clicked
play.addEventListener('click', playPauseMedia);

// Various events on disc
disc.addEventListener('play', updatePlayPauseIcon);
disc.addEventListener('pause', updatePlayPauseIcon);
disc.addEventListener('timeupdate', updateProgress);
disc.addEventListener('ended', gotoNextSong.bind(null, true));

// Go to next song when next button clicked
prev.addEventListener('click', gotoPreviousSong);

// Go to previous song when previous button clicked
next.addEventListener('click', gotoNextSong.bind(null, false));

// Move to different place in the song
progressContainer.addEventListener('click', setProgress);

function random_bg_color() {
  // Get a random number between 64 to 256
  // (for getting lighter colors)
  let red = Math.floor(Math.random() * 256) + 64;
  let green = Math.floor(Math.random() * 256) + 64;
  let blue = Math.floor(Math.random() * 256) + 64;
 
  // Construct a color withe the given values
  let bgColor = "rgb(" + red + ", " + green + ", " + blue + ")";
 
  // Set the background to the new color
  document.body.style.background = bgColor;
}
