const path = require("path");
const url = require("url");
const {
    app,
    ipcMain,
    BrowserWindow,
    Notification
} = require("electron");

const IS_DEV = process.env.NODE_ENV !== "production";
const { ELECTRON_WEB_URL } = process.env;

function createLoadingScreen() {
    const loading = new BrowserWindow({
        width: 400,
        height: 300,
        frame: false
    });

    return loading;
}

function start() {
    const loading = createLoadingScreen();
    const main = new BrowserWindow({
        show: false,
        width: 900,
        height: 600,
        title: "Call History Analyzer",
        webPreferences: {
            devTools: IS_DEV
        }
    });

    loading.show();

    main.loadURL(
        ELECTRON_WEB_URL
            || url.format({
                pathname: path.join(__dirname, "./index.html"),
                protocol: "file:",
                slashes: true
            })
    );

    ipcMain.on("welcome", (event, data) => {
        const notif = new Notification({
            title: "Welcome!",
            body: `${data}`,
            silent: true
        });

        notif.show();
    });

    main.once("ready-to-show", () => {
        loading.destroy();
        main.show();
    });
}

app.on("ready", start);
app.on("window-all-closed", () => app.quit());
