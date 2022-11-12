import { useEffect, useRef, useState } from 'react';
import './App.css';
import songsData from './data/songs'
import Player from './components/Player';

function App() {

  const [songs,setSongs]= useState(songsData)
  const [isPlaying,setIsPlaying]=useState(false)
  const [currentSong,setCurrentSong]= useState(songsData[0])
  const audioElem= useRef(null)

  useEffect(()=>{
    if(isPlaying){
      audioElem.current.play()
    }else{
      audioElem.current.pause()
    }
  },[isPlaying,currentSong])

//  Below function is used to set the progress of the player after seek
  const onTimeUpdate = () =>{
   let duration = audioElem.current.duration;
   const ct = audioElem.current.currentTime
   setCurrentSong({...currentSong, "progress": ct/duration *100,"length": duration})
  }

  //  Below function is used to add an autoplay functionality to the music player(endless autoplay)
  const onEnded=()=>{
    const index = songs.findIndex(x=>x.title === currentSong.title);
    if (index === 0)
    {
      setCurrentSong(songs[songs.length - 1])
    }
    else
    {
      setCurrentSong(songs[index - 1])
    }
    audioElem.current.currentTime = 0;
  }
  
  return (
    <div className='app'>
    <audio src={currentSong.url} ref={audioElem} onEnded={onEnded} onTimeUpdate={onTimeUpdate}/>
     <Player songs={songs} setSongs={setSongs} isPlaying={isPlaying}
      setIsPlaying={setIsPlaying} currentSong={currentSong} setCurrentSong={setCurrentSong} 
      audioElem={audioElem}/>
    </div>
  );
}

export default App;
