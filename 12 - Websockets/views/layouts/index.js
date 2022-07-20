// Si no hay definido un username, solicita uno.
let username = sessionStorage.getItem("username");
if (!username) {
    username = prompt("Ingrese Dirección de e-mail");
}
$("#username").html(username);

const socket = io.connect();
loadFirstData();

// Muestra Mensajes de websocket
function render(data) {
    data.forEach((info) => {
        $("#messages").prepend(`
            <div>
                <em class="text-primary fw-bold">${info.author}</em>
                [<em class="text-danger">${info.time}</em>]: <em class="text-success fst-italic">${info.text}</em>
            </div>
        `);
    });
}

// Recibe Mensajes por websocket.
socket.on("messages", (data) => {
    console.log(data);
    render(data);
});

// Envía mensajes por websocket.
$('#myChat').on('submit', e => {
    e.preventDefault();

    const message = {
        author: username,
        text: $("#text").val()
    };

    socket.emit("new-message", message);
});


// Carga los datos por primera vez
function loadFirstData() {
    fetch('/data')
        .then(data => data.json())
        .then (d => {
            render(d.data);                           
        })
        .catch(e => alert(e))
}