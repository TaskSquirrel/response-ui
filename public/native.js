const path = require("path");
const zerorpc = require("zerorpc");
const { spawn } = require("child_process");
const {
    app,
    ipcMain,
    BrowserWindow,
    Notification
} = require("electron");

const IS_DEV = process.env.NODE_ENV !== "production";

function start() {
    const main = new BrowserWindow({
        width: 900,
        height: 600
    });

    main.loadURL(
        IS_DEV
            ? "http://localhost:3000"
            : `file://${path.join(__dirname, "build", "index.html")}`
    );

    ipcMain.on("welcome", (event, data) => {
        const notif = new Notification({
            title: "Welcome!",
            body: `${data}`
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

const port = 6111;
let serv = null;
const connect = () => {
    const api = path.join(__dirname, "server.py");

    serv = spawn("python3", [api, port]);
};

const exit = () => {
    serv.kill();
};

app.on("ready", start);
app.on("window-all-closed", () => app.quit());

app.on("ready", connect);
app.on("will-quit", exit);
