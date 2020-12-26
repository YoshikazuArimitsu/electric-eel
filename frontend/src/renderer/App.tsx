import React from 'react'
import Box from '@material-ui/core/Box'
import { VideoPlayerCard } from './components/organisms/VideoPlayerCard'
import { RechartCard } from './components/organisms/RechartCard'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
    pos: {
        marginBottom: 24,
    },
})

const App: React.FC = () => {
    const classes = useStyles()

    return (
        <div className="App">
            <Box color="primary.main" className={classes.pos}>
                <VideoPlayerCard />
            </Box>
            <Box color="primary.main" className={classes.pos}>
                <RechartCard />
            </Box>
        </div>
    )
}

export default App
