import React, { useRef } from 'react'
import { GiNextButton,GiPreviousButton} from 'react-icons/gi'
import {FaPlay} from 'react-icons/fa'
import {ImPause2} from 'react-icons/im'

const Player = ({songs,setSongs,isPlaying,setIsPlaying,currentSong,setCurrentSong,audioElem}) => {

    const seekRef = useRef(null)

    const PlayAudio =() =>{
        setIsPlaying(!isPlaying)
        }  

  const seekAudio = (e) => {
    let width = seekRef.current.clientWidth;
    const offset = e.nativeEvent.offsetX;
    const divprogress = offset / width * 100;
    audioElem.current.currentTime = divprogress / 100 * currentSong.length;
    console.log(width,offset,divprogress)
    console.log(audioElem.current.currentTime)
  }

  const skipBack = ()=>
  {
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

  const skiptoNext = ()=>
  {
    const index = songs.findIndex(x=>x.title === currentSong.title);

    if (index === songs.length-1)
    {
      setCurrentSong(songs[0])
    }
    else
    {
      setCurrentSong(songs[index + 1])
    }
    audioElem.current.currentTime = 0;
  }

  return (
    <div className="player__container">
        {/* {JSON.stringify(currentSong,null,2)} */}
      <div className='player__title'>{currentSong.title}</div>
      
      <div className='player__duration'>
        <p>{!currentSong.progress ? "_._" : (Math.round(currentSong.progress * 100) / 100).toFixed(1)}</p>
        <p>{!currentSong.length ? "_._": (Math.round(currentSong.length * 100) / 100).toFixed(1)}</p>
        </div>

      <div className='player__controls'>
        <div className="player__track" onClick={seekAudio} ref={seekRef}>
          <div className='player__progress-track'  style={{width:`${currentSong && currentSong.progress+"%"}`}}></div>
        </div>
        <div className="player__buttons">
        <GiPreviousButton className='button' onClick={skipBack}/>
        { isPlaying ? <ImPause2 className='button' onClick={PlayAudio}/> : <FaPlay  className='button' onClick={PlayAudio} /> }
        <GiNextButton className='button' onClick={skiptoNext}/>
        </div>
      </div>

     </div>
  )
}

export default Player