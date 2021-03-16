let URI = "";

if (process.env.NODE_ENV === "production") {
    URI = "https://shrouded-plains-70355.herokuapp.com";
} else {
    URI = "http://localhost:4000";
}

export default URI;
