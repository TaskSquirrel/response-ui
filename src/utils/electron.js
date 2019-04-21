import noop from "./noop";

const electronNoop = {
    ipcRenderer: {
        send: noop
    }
};

const electron = window.require
    ? window.require("electron")
    : electronNoop;

export default electron;
