function validarFormIngreso(forma){
    var usuario = forma.usuario;
    if(correo.value === "") {
        alert("Debe de proporcionar un email");
        usuario.focus();
        usuario.select();
        return false;
    }

    var password = forma.password;
    if(password.value === "" || password.value.length < 8) {
        alert("Debe de proporcionar una contraseña de al menos de 8 caracteres");
        password.focus();
        password.select();
        return false;
    }


    return true;
}

function ingresoUsuario() {
    var form = document.getElementById("formRegistro");
    if (validarFormIngreso(form)) {
        fetch("assets/scripts/usuarios.json")
            .then(response => response.json())
            .then(value => {
                const correoAct = document.getElementById("correo").value;
                const password = document.getElementById("password").value;
                let esValido = false;
                for (var jsonObj of value) {
                    if (jsonObj.correo === correoAct && jsonObj.password === password) {
                        esValido = true;
                        break;
                    }
                }

                if (!esValido) {
                    alert("No hay un usuario registrado con ese correo, vuelva a intentarlo");
                    return;
                }

                var anchor = document.createElement("a");
                anchor.href = "index.html?user=" + correoAct.substring(0, correoAct.indexOf("@"));
                anchor.click();
            });
    }
}

function validarFormRegistro(forma){
    const password = forma.password;
    const confirmarPassword = forma.validarPassword;

    if (!validarFormIngreso(forma))
        return false;

    if(confirmarPassword.value === "" || confirmarPassword.value !== password.value) {
        alert("Su contraseña debe de coincidir");
        confirmarPassword.focus();
        confirmarPassword.select();
        return false;
    }

    return true;
}

function registroUsuario() {
    const form = document.getElementById("formRegistro");
    if (validarFormRegistro(form)) {
        alert("Se registró correctamente");
        let correoAct = document.getElementById("correo").value;
        let anchor = document.createElement("a");
        anchor.href = "index.html?user=" + correoAct.substring(0, correoAct.indexOf("@"));
        anchor.click();
    }
}


function obtenerElementoAUsar() {
    let boton = document.createElement("button");

    const queryString = window.location.search;
    const params = {};
    queryString.split('&').forEach((pair) => {
        const [key, value] = pair.split('=');
        params[key] = decodeURIComponent(value);
    });
    if (Object.keys(params).length === 0 || Object.keys(params) === '') {
        boton.className = "boton-verde";

        var anchor = document.createElement("a");
        anchor.href = "ingreso.html";
        anchor.text = "Ingresar";

        boton.append(anchor);
    }
    else {
        boton.className = "boton-avatar";

        let image = document.createElement("img");
        image.src = "assets/images/avatar.png";
        image.className = "imagen-avatar";
        image.alt = "Usuario: " + params["?user"];

        boton.append(image);
    }

    return boton;
}


function cambiarHeaderFijo() {
    let elemento = document.getElementById("div-header");
    if (elemento) {
        let a = obtenerElementoAUsar();
        elemento.append(a);
    }
}

if (document.body.id === 'index') {
    cambiarHeaderFijo();
}


function mostrarOcultarIntegrantes() {
    let oculto = document.getElementById("integrantes-grupo").hidden;

    if (oculto) {
        document.getElementById("ver-mas").textContent = "Ver menos";
        document.getElementById("integrantes-grupo").hidden = false;
    }
    else {
        document.getElementById("ver-mas").textContent = "Ver más";
        document.getElementById("integrantes-grupo").hidden = true;
    }

}