import electron from "../utils/electron";

const DEFAULT_REQUEST_OPTIONS = {
    once: false
};

function request(
    channel,
    callbacks,
    ...args
) {
    electron.ipcRenderer.on(`${channel}-reply`, (_, result) => {
        if (typeof callbacks === "function") {
            callbacks(result);
        } else {
            callbacks.forEach(cb => cb(result));
        }
    });

    electron.ipcRenderer.send(channel, ...args);

    return () => {
        electron.ipcRenderer.removeAllListeners(`${channel}-reply`);
    };
}

function promisify(channel, ...args) {
    let req;

    return new Promise((resolve, reject) => {
        try {
            req = request(channel, result => {
                resolve(result);
            }, ...args);
        } catch (error) {
            reject(error);
        }
    })
        .then(value => {
            if (req) {
                req();
            }

            return value;
        });
}

function getTopCallers() {
    return promisify("topcallers")
        .then(str => JSON.parse(str))
        .then(callers => {
            const keys = Object.keys(callers);

            return keys.map(key => {
                const phone = "PhoneNumberFull";
                const entry = callers[key];

                return {
                    phoneNumber: entry.index,
                    count: entry[phone]
                };
            });
        })
        .catch(e => console.error(e));
}

export {
    request,
    promisify,
    getTopCallers
};
