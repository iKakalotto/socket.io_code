const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {cors: true});

app.get("/", (req, resp) => {
    resp.sendFile(__dirname + "/index.html");
});

// 拦截器，身份认证
io.use((client, next) => {
    if (client.handshake.query.token == "helloworld") {
        return next();
    } else {
        return next(new Error("oops!!! Get out!"));
    }
});

io.on("connection", client => {
    client.on("chat", (args, callback) => {
        console.info(`${client.id}: ${args}`);
        callback(`Server recv success!`);
    });

    client.on("test", (args, callback) => {
        console.log(args);
        client.broadcast.emit("test", `recv ${args} from ${client.id}`);
    });
});

server.listen(3000, () => {
    console.log("server start......");
});
