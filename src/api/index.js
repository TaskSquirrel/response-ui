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

function getRandomNumbers(count = 100) {
    return promisify("random-numbers", count)
        .then(str => JSON.parse(str))
        .then(data => data);
}

function getPhoneNumberData(number) {
    const now = Date.now();

    return promisify("person", number)
        .then(str => JSON.parse(str))
        .then(data => {
            const callReportNumberLabel = "CallReportNum";
            const dateLabel = "EnteredOn";
            const callTypeLabel = "Call Information - Call Type";
            const startTimeLabel = "CallDateAndTimeStart";
            const endTimeLabel = "CallDateAndTimeEnd";
            const callLengthLabel = "CallLength";
            const genderLabel = "Caller Information - Gender";
            const categoryLabel = "Caller Issues - Category";
            const workerLabel = "PhoneWorkerNum";
            const reviewedLabel = "Reviewed";

            const keys = Object.keys(data);
            const mapped = keys.map(key => {
                const entry = data[key];

                return {
                    number,
                    reportNumber: entry[callReportNumberLabel],
                    date: entry[dateLabel],
                    type: entry[callTypeLabel],
                    startTime: entry[startTimeLabel],
                    endTime: entry[endTimeLabel],
                    length: entry[callLengthLabel],
                    gender: entry[genderLabel],
                    category: entry[categoryLabel],
                    worker: entry[workerLabel],
                    reviewed: entry[reviewedLabel],
                    startEmotion: entry.startEmotion,
                    averageEmotion: entry.avgEmotion,
                    endEmotion: entry.endEmotion,
                    timeSince: now - entry[dateLabel]
                };
            });

            return mapped.reverse();
        });
}

export {
    request,
    promisify,
    getTopCallers,
    getRandomNumbers,
    getPhoneNumberData
};
