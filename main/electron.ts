import electron, { BrowserWindow } from 'electron';
import path from 'path';
import url from 'url';
import unhandled from 'electron-unhandled';
import './websocket';

unhandled();

const { app } = electron;
const PORT = process.env.PORT || 4000;

let window: BrowserWindow | null;

const installExtensions = async (): Promise<unknown> => {
    const installer = require('electron-devtools-installer');
    const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
    const extensions = ['REACT_DEVELOPER_TOOLS', 'MOBX_DEVTOOLS'];

    return Promise.all(
        extensions.map((name) => installer.default(installer[name], forceDownload)),
    ).catch(console.log);
};

const createWindow = async (): Promise<void> => {
    if (process.env.NODE_ENV === 'dev') {
        await installExtensions();
    }

    window = new BrowserWindow({
        width: 1000,
        height: 800,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: false,
        },
    });

    if (process.env.NODE_ENV === 'dev') {
        window.loadURL(`http:localhost:${PORT}`);
        window.webContents.once('dom-ready', () => {
            window!.webContents.openDevTools();
        });
    } else {
        window.loadURL(
            url.format({
                pathname: path.join(__dirname, '/index.html'),
                protocol: 'file:',
                slashes: true,
            }),
        );
        window.webContents.once('dom-ready', () => {
            window!.webContents.openDevTools();
        });
    }

    window.on('closed', () => {
        window = null;
    });
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (window === null) {
        createWindow();
    }
});
