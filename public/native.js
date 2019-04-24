const path = require("path");
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
}

app.on("ready", start);
app.on("window-all-closed", () => app.quit());
