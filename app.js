const express = require('express');
const app = express();
const http = require('http'); //As socket runns on http preinstalled in node
const path = require("path");

// CONFIGURING SOCKET.IO
const socketio = require('socket.io');
const server = http.createServer(app);
const io = socketio(server);


// Setting Up EJ
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

io.on("connection", function (socket) {
    socket.on("send-location", function (data) {
        io.emit("receive-location", {
            id: socket.id, ...data   //sread operator
        });
    socket.on("disconnect",function(){
        io.emit("user-disconnected",socket.id);
    })
    })
    console.log("connected");
})


app.get("/", function (req, res) {
    res.render("index");
})

server.listen(4000, function () {
    console.log("Server is running on port 4000")
});