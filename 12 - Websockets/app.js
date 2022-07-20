// Curso Backend Coderhouse
// Comisión 31015
// Alumno: Miguel Binstok
// Websockets


const express = require("express");
const Contenedor = require("./class/contenedor");
const handlebars = require("express-handlebars");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./views/layouts"));

const productos = new Contenedor(__dirname + "/data/productos.json");
const messages = [];
const db = new Contenedor('db.json');

// Utilizo Handlebars
app.engine(
    "hbs",
    handlebars.engine({
        extname: ".hbs",
        partialsDir: __dirname + "/views/partials",
    })
);
app.set("views", "./views");
app.set("views engine", "hbs");

app.get("/", (req, res) => {
    let content = productos.content;
    let boolean = content.length !== 0;
    return res.render("layouts/main.hbs", {
        list: content,
        showList: boolean,
    });
});

// Levanta los datos de los chats
app.get('/data', (req, res) => {
    const data = db.getAll();
    res.json({data});
})

app.post("/", (req, res) => {
    productos.save(req.body);
    let content = productos.content;
    let boolean = content.length !== 0;
    return res.render("layouts/main.hbs", { list: content, showList: boolean });
});

// Escucho en el puerto definido en el entorno o en el 8080
httpServer.listen(process.env.PORT || 8080, () => {
    console.log("Server Listening...");
});

// Chat
io.on("connection", (socket) => {
    socket.emit("messages", messages);

    socket.on("new-message", (data) => {
        data.time = new Date().toLocaleString();
        messages.push(data);
        io.sockets.emit("messages", [data]);

        // Guarda los mensajes
        db.save(data);
        console.log(data);
    });
});