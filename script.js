console.log("Welcome to Spotify Clone - bysrk")
let songIndex = 1;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let cgif = document.getElementById("cgif");
let songItems = Array.from(document.getElementsByClassName("songItems"));

let songs = [
  {songName:"Awaara Dogs Kuttey" ,filePath:"songs/1.mp3" ,coverPath:"cover/1.jpeg"},
  {songName:"Billo Tu Agg h" ,filePath:"songs/2.mp3" ,coverPath:"cover/2.jpeg"},
  {songName:"Jhoome Jo Pathaan" ,filePath:"songs/3.mp3" ,coverPath:"cover/3.jpeg"},
  {songName:"Current Laga Re" ,filePath:"songs/4.mp3" ,coverPath:"cover/4.jpeg"},
  {songName:"Bin tere ab na hoye" ,filePath:"songs/5.mp3" ,coverPath:"cover/5.jpeg"},
  {songName:"Jai Shree Ram" ,filePath:"songs/6.mp3" ,coverPath:"cover/6.jpeg"}
];

let x = 1;
setInterval(()=>{
  document.getElementsByClassName("container")[0].style.backgroundImage = 'url(instrument' + x + '.jpg)';
   x == 3 ? x=1 : x++;
},5000)

songItems.forEach((element,i)=>{
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songname")[0].innerText = songs[i].songName;
  //duration code pending
})

//handle play/pause event
masterPlay.addEventListener('click', ()=>{
  if(audioElement.paused || audioElement.currentTime<=0){
    audioElement.play();
  }
  else{
    audioElement.pause();
  }
})

audioElement.addEventListener('timeupdate',()=>{
  let progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
  myProgressBar.value = progress;
})

audioElement.onplaying = () =>{
  gif.style.opacity = 1;
  let curr_song_div = audioElement.currentSrc.charAt(audioElement.currentSrc.length - 5);
  document.getElementById(`div${curr_song_div}`).style.backgroundColor = "#6af099";
  document.getElementById(curr_song_div).classList.remove("fa-play");
  document.getElementById(curr_song_div).classList.add("fa-pause");
  masterPlay.classList.remove("fa-play");
  masterPlay.classList.add("fa-pause");
};

audioElement.addEventListener('pause',()=>{
   gif.style.opacity = 0;
   songItems.forEach((element)=>{
    element.style.backgroundColor = "white";
   })
  let curr_song_div = audioElement.currentSrc.charAt(audioElement.currentSrc.length - 5);
  document.getElementById(curr_song_div).classList.remove("fa-pause");
  document.getElementById(curr_song_div).classList.add("fa-play");
  masterPlay.classList.remove("fa-pause");
  masterPlay.classList.add("fa-play");
})

audioElement.addEventListener('ended',()=>{
   if(songIndex<6){
      songIndex += 1;
      audioElement.src = `songs/${songIndex}.mp3`;
      audioElement.currentTime = 0;
      audioElement.play();
      document.getElementsByClassName("currentPlay")[0].innerText = songs[songIndex-1].songName;
   }
})

myProgressBar.addEventListener('change', ()=>{
  audioElement.currentTime =  audioElement.duration * myProgressBar.value/ 100;
})

const makeAllPlay = () =>{
  Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
    element.classList.remove("fa-pause");
    element.classList.add("fa-play");
  })
}

Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
  element.addEventListener('click', (e)=>{
    if(songIndex != parseInt(e.target.id)){
      // make white previous song
      document.getElementById(`div${songIndex}`).style.backgroundColor = "white";
      makeAllPlay();
      songIndex = parseInt(e.target.id);
      e.target.classList.remove("fa-play");
      e.target.classList.add("fa-pause");
      document.getElementById(`div${songIndex}`).style.backgroundColor = "#6af099";
      audioElement.src = `songs/${songIndex}.mp3`;
      audioElement.currentTime = 0;
      audioElement.play();
      document.getElementsByClassName("currentPlay")[0].innerText = songs[songIndex-1].songName;
    }
    else{
     //else condition pending to pause from song container
      if(document.getElementById(songIndex.toString()).classList.contains("fa-pause")){
        document.getElementById(songIndex.toString()).classList.remove("fa-pause");
        document.getElementById(songIndex.toString()).classList.add("fa-play"); 
        audioElement.pause();
      }
      else{
        document.getElementById(songIndex.toString()).classList.remove("fa-play");
        document.getElementById(songIndex.toString()).classList.add("fa-pause");
        audioElement.play();
      }
    }
  })
})

document.getElementById("previous").addEventListener('click',()=>{
  document.getElementById(`div${songIndex}`).style.backgroundColor = "white";
  document.getElementById(songIndex).classList.remove("fa-pause");
  document.getElementById(songIndex).classList.add("fa-play");
  if(songIndex>1)
    songIndex = songIndex - 1;
  audioElement.src = `songs/${songIndex}.mp3`;
  audioElement.currentTime = 0;
  audioElement.play();
  document.getElementsByClassName("currentPlay")[0].innerText = songs[songIndex-1].songName;
})

document.getElementById("next").addEventListener('click',()=>{
  document.getElementById(`div${songIndex}`).style.backgroundColor = "white";
  document.getElementById(songIndex).classList.remove("fa-pause");
  document.getElementById(songIndex).classList.add("fa-play");
  if(songIndex>=6){
    songIndex = 1;
  }
  else{
    songIndex += 1;
  }
    audioElement.src = `songs/${songIndex}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    document.getElementsByClassName("currentPlay")[0].innerText = songs[songIndex-1].songName;
})


