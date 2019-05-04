const path = require("path");
const url = require("url");
const zerorpc = require("zerorpc");
const { spawn, execFile } = require("child_process");
const {
    app,
    ipcMain,
    BrowserWindow,
    Notification
} = require("electron");

const IS_DEV = process.env.NODE_ENV !== "production";
const { ELECTRON_WEB_URL } = process.env;
const port = "6111";
let serv = null;

const connect = () => {
    // const api = path.join(__dirname, "server.py");
    // serv = spawn("python3", [api, port]);
    const api = path.join(__dirname, "server");
    serv = execFile(api, [port]);
};

const exit = () => {
    serv.kill();
};

function createLoadingScreen() {
    const loading = new BrowserWindow({
        width: 400,
        height: 300,
        frame: false
    });

    return loading;
}

function start() {
    connect();

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

    main.on("ready-to-show", () => {
        loading.destroy();
        main.show();
    });

    ipcMain.on("welcome", (event, data) => {
        const notif = new Notification({
            title: "Welcome!",
            body: `${data}`,
            silent: true
        });

        notif.show();
    });

    ipcMain.on("echo", (event, data) => {
        const client = new zerorpc.Client();

        client.connect("tcp://127.0.0.1:6111");
        client.invoke("echo", (error, res) => {
            if (error) {
                console.error(error);
            } else {
                console.log(res);
            }
        });
    });
}

app.on("ready", start);
app.on("will-quit", exit);
app.on("window-all-closed", () => app.quit());
