import React from 'react'
import Navbar from './Navbar'
import { albumsData } from '../assets/assets'
import AlbumItem from './AlbumItem'
import SongItem from './SongItem'
import { songsData } from '../assets/assets'

const DisplayHome = () => {
  return (
    <div >
       <Navbar />
        <div className='mb-4'>
          <h1 className='my-5 font-bold text-2xl'>Featured Charts</h1>
          <div className="flex gap-4 overflow-x-auto hide-scrollbar">
                {albumsData.map((item, index) => (
                           <AlbumItem
                            key={index}
                            name={item.name}
                            desc={item.desc}
                            id={item.id}
                            image={item.image}
                            />
                ))}
          </div>
        </div>
        <div className='mb-4'>
          <h1 className='my-5 font-bold text-2xl'>Today's biggest hits</h1>
          <div className="flex gap-4 overflow-x-auto hide-scrollbar">
             {songsData.map((item,index)=>(<SongItem key={index} name={item.name} desc={item.desc} id={item.id} image={item.image} />))} 
          </div>
        </div>
    </div>
  )
}

export default DisplayHome

