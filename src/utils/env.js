import noop from "./noop";
import electron from "./electron";

const __IS_DEV__ = process.env.NODE_ENV !== "production";

export {
    __IS_DEV__,
    noop,
    electron
};
