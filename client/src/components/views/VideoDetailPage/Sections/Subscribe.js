import React, {useEffect, useState} from 'react'
import Axios from 'axios'

function Subscribe() {
    
    useEffect(() => {
        let variable={userTo}
        Axios.post('/api/subscribe/subscribeNumber',)
    }, [])

    return (
        <div>
            <button
                style={{backgroundColor:'#000', borderRadius:'4px', color:'#fff', padding:'10px 16px', fontWeight:'500', fontSize:'1rem', textTransform:'uppercase'}}
                onClick
            >
                0 Subscribe
            </button>
        </div>
    )
}

export default Subscribe
