import React from 'react'

import { Player } from 'video-react'
import 'video-react/dist/video-react.css' // import css
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
    root: {
        maxWidth: '480px',
    },
})

export const VideoPlayer: React.FC = () => {
    const classes = useStyles()

    const videoSrc = useSelector((state: RootState) => {
        return state.state.videoSource
    })

    return (
        <div className={classes.root}>
            {videoSrc}
            <Player playsInline src={videoSrc} />
        </div>
    )
}
