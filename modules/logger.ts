export const logger = (logLevel: "debug" | "error" | "info", ...args: any) => {
    const date = new Date();
    const hour = date.getHours();
    const minutes = date.getMinutes();

    console[logLevel](`[${hour}:${minutes}] `, ...args);
};