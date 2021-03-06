const path = require("path");
const url = require("url");
const zerorpc = require("zerorpc");
const { execFile } = require("child_process");
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
let client = null;
let ready = false;

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
        width: 200,
        height: 100,
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

    // for Ben: Hard-coded data for now -- use data to pass in what you need
    ipcMain.on("upload", (event, data) => {
        console.log("Received: ", data);

        ready = false;

        if (!data) {
            return;
        }

        client = new zerorpc.Client({ heartbeatInterval: 100000, timeout: 100 });
        client.connect("tcp://127.0.0.1:6111");
        client.invoke("start", data, (error, res) => {
            if (error) {
                console.log(error);
            } else {
                console.log(res);
                ready = true;

                event.sender.send("upload-done");
            }
        });
    });

    ipcMain.on("online-check", event => {
        event.sender.send("online-check-reply", {
            client: client ? 1 : 0,
            ready: ready ? 1 : 0
        });
    });

    ipcMain.on("topcallers", (event, count) => {
        const fetchAmount = count || 10;

        // 1, 5 are start, end for pagination
        client.invoke("topcallers", 0, fetchAmount, (error, res) => {
            if (error) {
                console.error(error);
            } else {
                console.log("topcallers dispatched response!");

                event.sender.send("topcallers-reply", res);
            }
        });
    });

    ipcMain.on("person", (event, data) => {
        console.log(`Looking up ${data}...`);

        // Must be number
        const lookup = Number.parseInt(data, 10);

        client.invoke("person", lookup, (error, res) => {
            if (error) {
                console.error(error);
            } else {
                console.log("person dispatched response!");

                event.sender.send("person-reply", res);
            }
        });
    });

    ipcMain.on("random-numbers", (event, count = 5) => {
        client.invoke("randcallers", count, (error, result) => {
            if (error) {
                console.error(error);
            } else {
                console.log("randcallers dispatched response!");

                event.sender.send("random-numbers-reply", result);
            }
        });
    });
}

app.on("ready", start);
app.on("will-quit", exit);
app.on("quit", () => app.quit());
app.on("window-all-closed", () => app.quit());
