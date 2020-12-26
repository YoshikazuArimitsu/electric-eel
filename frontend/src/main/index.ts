'use strict'

import { app, BrowserWindow, dialog, ipcMain } from 'electron'
import { protocol } from 'electron'
// import * as path from 'path'
// import { format as formatUrl } from 'url'
import { FILE_EVENTS, FILE_FILTERS } from '../util/fileipc'

const isDevelopment = process.env.NODE_ENV !== 'production'

// global reference to mainWindow (necessary to prevent window from being garbage collected)
let mainWindow: BrowserWindow | null

function createMainWindow() {
    const window = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            webSecurity: false,
        },
    })

    if (isDevelopment) {
        //window.webContents.openDevTools();
    }

    if (isDevelopment) {
        import('electron-devtools-installer').then((module) => {
            module
                .default(module.REACT_DEVELOPER_TOOLS)
                .then((name) => console.log(`Added Extension: ${name}`))
                .catch((err) => console.log('An error occurred: ', err))
        })
        window.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`)
    } else {
        window.loadURL('http://localhost:8000/dist/renderer/index.html');
    }

    window.on('closed', () => {
        mainWindow = null
    })

    window.webContents.on('devtools-opened', () => {
        window.focus()
        setImmediate(() => {
            window.focus()
        })
    })

    return window
}

// DevServer 使用時にローカルファイルを読み込めるようにする
// https://github.com/electron/electron/issues/23757#issuecomment-640146333
app.whenReady().then(() => {
    protocol.registerFileProtocol('file', (request, callback) => {
        const pathname = request.url.replace('file:///', '')
        callback(pathname)
    })
})

// quit application when all windows are closed
app.on('window-all-closed', () => {
    // on macOS it is common for applications to stay open until the user explicitly quits
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // on macOS it is common to re-create a window even after all windows have been closed
    if (mainWindow === null) {
        mainWindow = createMainWindow()
    }
})

// create main BrowserWindow when electron is ready
app.on('ready', () => {
    mainWindow = createMainWindow()
})

ipcMain.on(FILE_EVENTS.OPEN_DIALOG, () => {
    if (mainWindow === null) return
    const fileNames: string[] | undefined = dialog.showOpenDialogSync(mainWindow, {
        properties: ['openFile'],
        filters: FILE_FILTERS,
    })

    if (!fileNames || !fileNames.length) return

    mainWindow.webContents.send(FILE_EVENTS.OPEN_FILE, {
        fileName: fileNames[0],
        fileUrl: `file://${fileNames[0]}`,
    })
})
