import { createContext, useRef, useState, useEffect } from "react";
import { songsData } from "../assets/assets";

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
  const audioRef = useRef();
  const seekBg = useRef();
  const seekBar = useRef();

  const [track, setTrack] = useState(songsData[0]);
  const [playStatus, setPlayStatus] = useState(false);

  const [time, setTime] = useState({
    currentTime: {
      second: 0,
      minute: 0,
    },
    totalTime: {
      second: 0,
      minute: 0,
    },
  });

  const play = () => {
    audioRef.current.play();
    setPlayStatus(true);
  };

  const pause = () => {
    audioRef.current.pause();
    setPlayStatus(false);
  };

  const playWithid =  async(id)=>{
    await setTrack(songsData[id]);
    await audioRef.current.play();
    setPlayStatus(true)
  }

  const previous =async ()=>{
    if(track.id>0){
      await setTrack(songsData[track.id-1])
      await audioRef.current.play();
      setPlayStatus(true)
    }
  }

  const next =async ()=>{
    if(track.id < songsData.length-1){
      await setTrack(songsData[track.id+1])
      await audioRef.current.play();
      setPlayStatus(true)
    }
  }

  const seeksong =async(e)=>{
       audioRef.current.currentTime =((e.nativeEvent.offsetX / seekBg.current.offsetWidth)*audioRef.current.duration)
  }

  useEffect(() => {
    const audio = audioRef.current;

    const updateTime = () => {
      const current = audio.currentTime || 0;
      const duration = audio.duration || 0;

      // seekBar.current.style.width =(Math.floor(audioRef.current.currentTime/audioRef.current.duration*100))+"%";


      setTime({
        currentTime: {
          second: Math.floor(current % 60),
          minute: Math.floor(current / 60),
        },
        totalTime: {
          second: Math.floor(duration % 60),
          minute: Math.floor(duration / 60),
        },
      });

      const progress = (current / duration) * 100;
      if (seekBar.current) {
        seekBar.current.style.width = `${progress}%`;
      }
    };

    audio.addEventListener("timeupdate", updateTime);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
    };
  }, []);

  const contextValue = {
    audioRef,
    seekBar,
    seekBg,
    track,
    setTrack,
    playStatus,
    setPlayStatus,
    time,
    setTime,
    play,
    pause,
    playWithid,
    previous,next,
    seeksong
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
      {/* Make sure audio element is here */}
      <audio ref={audioRef} src={track.file}></audio>
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
