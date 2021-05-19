import React from 'react';
import ReactPlayer from 'react-player';
import './VideoPlayer.css'

const ResponsivePlayer = (props) => {
    return (
        <div className='player-wrapper'>
            <ReactPlayer
                className='react-player'
                url={props.url}
                width='100%'
                height='100%'
                playing={true}
                controls={true}
                stopOnUnmount={false}
            />
        </div>
    )
}

export default ResponsivePlayer;