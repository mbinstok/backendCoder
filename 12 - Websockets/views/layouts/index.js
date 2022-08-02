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

socket.on('envioProds', (data) => {
    const prods = data;
    let html = '';
    const detalle = document.getElementById('tablaProds')
    if (detalle != null) {
        prods.map( p => 
            html +=`
                <tr>
                    <td class="nombreProd"><input type="text" id="title${p.id}" value="${p.title}"></td>
                    <td class="prProd"><input type="number" id="price${p.id}" value="${p.price}"></td>
                    <td><img alt="Foto" style="width: 100px;" src=${p.thumbnail}><span id="foto${p.id}" style="display: none;">${p.thumbnail}</span></td>
                    <td>
                        <button class="btn btn-sm btn-warning" onclick="modificarProd(${p.id})"><i class="bi bi-pencil-square"></i> Modificar</button>
                        <button class="btn btn-sm btn-danger" onclick="eliminarProd(${p.id})"><i class="bi bi-trash3"></i> Eliminar</button>
                    </td>
                </tr>
            `
        );            
        detalle.innerHTML = html;
    }
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