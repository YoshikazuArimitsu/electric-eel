import React, {useState} from 'react'
import { ipcRenderer } from 'electron'
import { FILE_EVENTS } from '../util/fileipc'
import { Button } from '@material-ui/core'
declare var eel: any

const App: React.FC = () => {
    // const classes = useStyles()
    const [message, setMessage] = useState("");

    const openFileDialog = (): void => {
        ipcRenderer.send(FILE_EVENTS.OPEN_DIALOG)
    }

    const myFunction = (): void => {
        eel.hello_eel()((msg:string) => {
            setMessage(msg)
        });
    }

    return (
        <div className="App">
                <Button color="primary" onClick={openFileDialog}>
                    Open...
                </Button>
                <Button color="secondary" onClick={myFunction}>
                    Click Me!
                </Button>
                <br/>
                <p>
                    {message}
                </p>
        </div>
    )
}

export default App
