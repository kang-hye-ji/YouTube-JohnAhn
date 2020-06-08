import React, {useState, useEffect} from 'react'
import Axios from 'axios'

function SideVideo() {
    const [SideVideo, setSideVideo] = useState([])

    useEffect(() => {
        Axios.get('/api/video/getVideos')
            .then(response=>{
                if(response.data.success){
                    setSideVideo(response.data.videos)
                }else{
                    alert('비디오 가져오기를 실패했습니다.')
                }
            })
    }, [])

    const renderSideVideo=SideVideo.map((videos, index)=>{
        var minutes = Math.floor(videos.duration / 60);
        var seconds = Math.floor((videos.duration - minutes*60));

        return(
            <div style={{display:'flex', marginBottom:'2rem', padding:'0 2rem'}}>
                <div style={{width:'50%'}}>
                    <a href>
                        <img style={{width:'100%', height:'100%'}} src={`http://localhost:5000/${videos.thumbnail}`} alt="thumbnail"/>
                    </a>
                </div>
                <div style={{width:'50%', paddingLeft:'1rem'}}>
                    <a href style={{color:'gray'}}>
                        <span style={{fontSize:'1rem', color:'#000'}}>{videos.title}</span><br/>
                        <span>{videos.writer.name}</span><br/>
                        <span>{videos.views} views</span><br/>
                        <span>{minutes} : {seconds}</span>
                    </a>
                </div>
            </div>
        )
    })

    return (
        <React.Fragment>
            <div style={{marginTop:'3rem'}}>
                {renderSideVideo}
            </div>
        </React.Fragment>
        
    )
}

export default SideVideo
