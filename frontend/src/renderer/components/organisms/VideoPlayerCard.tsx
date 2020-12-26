import React, { useEffect } from 'react'
import { ipcRenderer } from 'electron'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { Button } from '@material-ui/core'
import { VideoPlayer } from '../atoms/VideoPlayer'
import { makeStyles } from '@material-ui/core/styles'

import { FILE_EVENTS, FileInfoType } from '../../../util/fileipc'
import { useDispatch } from 'react-redux'
import { actions } from '../../actions/actions'

const useStyles = makeStyles({
    root: {
        minWidth: 480,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
})

export const VideoPlayerCard: React.FC = () => {
    const classes = useStyles()
    const dispatch = useDispatch()

    const openFileDialog = (): void => {
        ipcRenderer.send(FILE_EVENTS.OPEN_DIALOG)
    }

    useEffect(() => {
        ipcRenderer.on(FILE_EVENTS.OPEN_FILE, (_, fileInfo: FileInfoType) => {
            dispatch(actions.OpenVideoAction(fileInfo.fileUrl))
        })

        return (): void => {
            ipcRenderer.removeAllListeners(FILE_EVENTS.OPEN_FILE)
            ipcRenderer.removeAllListeners(FILE_EVENTS.SAVE_FILE)
        }
    }, [])

    return (
        <Card className={classes.root}>
            <CardContent>
                <VideoPlayer />
                <Button color="primary" onClick={openFileDialog}>
                    Open...
                </Button>
            </CardContent>
        </Card>
    )
}
