// We need to import the CSS so that webpack will load it.
// The MiniCssExtractPlugin is used to separate it out into
// its own CSS file.
import "../css/app.scss"

// webpack automatically bundles all modules in your
// entry points. Those entry points can be configured
// in "webpack.config.js".
//
// Import deps with the dep name or local files with a relative path, for example:
//
//     import {Socket} from "phoenix"
//     import socket from "./socket"
//
import "phoenix_html"

let phoenix = require("phoenix");
let socket = new phoenix.Socket("/socket", {});
socket.connect()

function new_channel(player, screenName) {
    return socket.channel("game:" + player, {screen_name: screenName});
}

function join(channel) {
    channel.join()
    .receive("ok", response => { console.log("Joined successfolly", response) })
    .receive("error", response => { console.log("Unable to join", response) })
}

var game_channel = new_channel("moon", "moon")
