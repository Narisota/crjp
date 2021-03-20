export const GetProductId = () => {
    if (process.env.NODE_ENV === "production") {
        return Number(window.location.href.split(":")[2]);
    } else {
        return Number(window.location.href.split(":")[3]);
    }
};
