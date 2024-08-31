// Web page
const path = require("path");
const express = require("express");

const server = express();
server.use(express.static(path.join(__dirname, "public")));
server.use("/", (_, res) => res.redirect("/"));
server.listen(3000, () => console.log("Listening on 3000"));

// Websocket
const { WebSocketServer } = require("ws");
const wss = new WebSocketServer({ port: 443 });
const handleClient = require("./websocketServer");

wss.on("connection", async ws => {
	console.log("New client connected!");
	ws.send(JSON.stringify({
        type: "debug",
        data: "Connection established!"
    }));
	ws.on("close", () => console.log("Client has disconnected!"));
	ws.onerror = err => {
		console.log("Websocket error:" + err);
	}
    handleClient(ws);
});
