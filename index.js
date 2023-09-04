// Variables para los elementos del formulario
const formNombre = document.getElementById("nombre");
const formDni = document.getElementById("dni");
const formEmail = document.getElementById("email");
const formTelefono = document.getElementById("telefono");
const selector = document.getElementById("selector");
const nombrecito = document.getElementById("parrafo");
const formImporteInicial = document.getElementById("importeInicial");
const formPorcentaje = document.getElementById("porcentaje");

// Event listeners
selector.addEventListener("change", selectabladata);
formNombre.addEventListener("input", comprobarCampos);
formEmail.addEventListener("input", comprobarCampos);
formDni.addEventListener("input", comprobarCampos);
formTelefono.addEventListener("input", comprobarCampos);
formImporteInicial.addEventListener("input", comprobarSegundosCampos);
formPorcentaje.addEventListener("input", comprobarSegundosCampos);

// Elementos del DOM
let botonAgregar = document.getElementById("btnAgregar");
let botonBuscar = document.getElementById("btnBuscar");
let botonCalcular = document.getElementById("btnCalcular");
let tablaClientes = [];
let tablaContratos = [];
const miDiv = document.getElementById("caja2");

// Event listeners para los botones
botonAgregar.addEventListener("click", clickAgregar);
botonBuscar.addEventListener("click", clickBuscarCliente);
botonCalcular.addEventListener("click", clickCalcular);

// Deshabilitar botones por defecto y selector
botonAgregar.disabled = true;
botonCalcular.disabled = true;
selector.hidden = true;
nombrecito.hidden = true;

// Clase Clientes
class Clientes {
  constructor(nombre, dni, email, telefono) {
    this.nombre = nombre;
    this.dni = dni;
    this.email = email;
    this.telefono = telefono;
  }
}

// Clase Contratos
class Contratos {
  constructor(dni, importeInicial, duracion, frecuencia, porcentaje) {
    this.dni = dni;
    this.importeInicial = importeInicial;
    this.duracion = duracion;
    this.frecuencia = frecuencia;
    this.porcentaje = porcentaje;
  }
  // Funcion para que si el elemento de la clase coincide con un dni ya ingresado lo reemplace
  // reemplazarElementoPorDni(elementoNuevo) {
  //   const index = this.dni.findIndex((item) => item.dni === elementoNuevo.dni);
  //   if (index !== -1) {
  //     this.dni.splice(index, 1, elementoNuevo);
  //   }
  // }
}

// Llamamos la Función para comprobar el estado del array de clientes, si esta vacio deshabiliar caja
comprobarArray();

function comprobarArray() {
  if (tablaClientes.length === 0) {
    var childNodes = document.getElementById("caja2").getElementsByTagName("*");
    for (var node of childNodes) {
      node.disabled = true;
    }
  } else {
    var childNodes = document.getElementById("caja2").getElementsByTagName("*");
    for (var node of childNodes) {
      node.disabled = false;
    }
  }
}

// Función para cargar los datos seleccionados en el formulario
function selectabladata() {
  nombrecitoAlLado();
  document.getElementById("caja3").innerHTML = "";
  document.getElementById("div1").innerHTML = "";
  document.getElementById("div3").innerHTML = "";
  if (tablaContratos.length === 0) {
    console.log("Aun no se cargaron datos de contratos en la db");
  } else {
    let buscar = document.getElementById("selector").value;
    let contratoEncontrado = tablaContratos.find((cliente) => {
      return cliente.dni === buscar;
    });
    if (contratoEncontrado) {
      console.log("contrato encontrado en la db, cargandolo");
      document.getElementById("importeInicial").value =
        contratoEncontrado.importeInicial;
      document.getElementById("miseleccion").options[
        document.getElementById("miseleccion").selectedIndex
      ].value = contratoEncontrado.duracion;
      document.getElementById("frecuencia").options[
        document.getElementById("frecuencia").selectedIndex
      ].text = contratoEncontrado.frecuencia;
      document.getElementById("porcentaje").value =
        contratoEncontrado.porcentaje;
    } else {
      document.getElementById("importeInicial").value = "";
      document.getElementById("miseleccion").options[
        document.getElementById("miseleccion").selectedIndex
      ].value = 1;
      document.getElementById("frecuencia").options[
        document.getElementById("frecuencia").selectedIndex
      ].text = 3;
      document.getElementById("porcentaje").value = "";
    }
  }
}

// Función para comprobar los campos del formulario
function comprobarCampos() {
  if (
    formNombre.value !== "" &&
    formDni.value !== "" &&
    formEmail.value !== "" &&
    formTelefono.value !== ""
  ) {
    botonAgregar.disabled = false;
  } else {
    botonAgregar.disabled = true;
  }
}

// Función para comprobar los campos de la segunda caja
function comprobarSegundosCampos() {
  if (formImporteInicial.value !== "" && formPorcentaje.value !== "") {
    botonCalcular.disabled = false;
  } else {
    botonCalcular.disabled = true;
  }
}

// Función para agregar un cliente a la tabla
function clickAgregar() {
  if (!tablaClientes.find((p) => p.dni === formDni.value)) {
    tablaClientes.push(
      new Clientes(
        formNombre.value,
        formDni.value,
        formEmail.value,
        formTelefono.value
      )
    );
    console.log(tablaClientes);
    document.getElementById("nombre").value = "";
    document.getElementById("dni").value = "";
    document.getElementById("email").value = "";
    document.getElementById("telefono").value = "";
    comprobarArray();
    botonCalcular.disabled = true;
    const contenedor = document.getElementById("hide");
    contenedor.innerHTML = "Seleccione el dni del cliente de la DB";
    selector.hidden = false;
    selector.innerHTML = "";

    tablaClientes.forEach((opcion) => {
      const option = document.createElement("option");
      option.text = opcion.dni;
      option.classList.add(opcion.clase);
      selector.add(option);
    });
    contenedor.appendChild(selector);
    nombrecitoAlLado();
  } else {
    alert("Ese dni ya existe, ingrese otro");
  }
  botonAgregar.disabled = true;
}

function nombrecitoAlLado() {
  let buscar = document.getElementById("selector").value;
  let clienteEncontrado = tablaClientes.find((cliente) => {
    return cliente.dni === buscar;
  });
  if (clienteEncontrado) {
    nombrecito.hidden = false;
    nombrecito.innerHTML = clienteEncontrado.nombre;
  } else {
    alert("No se encontro el cliente");
  }
}

// Función para buscar un cliente en la tabla
function clickBuscarCliente() {
  let buscar = prompt("Ingresá el numero de dni del cliente");
  let clienteEncontrado = tablaClientes.find((cliente) => {
    return cliente.dni === buscar;
  });
  console.log(clienteEncontrado);
  if (clienteEncontrado) {
    alert(
      "DNI encontrado, el cliente " +
        clienteEncontrado.nombre +
        " se encuentra cargado en nuestra database"
    );
  } else {
    alert("No se encontro el cliente");
  }
}

// Función para calcular los valores
function clickCalcular() {
  console.log(tablaClientes);
  let valor = Number(document.getElementById("importeInicial").value);
  let duracion = Number(document.getElementById("miseleccion").value);
  let frecuencia = Number(
    document.getElementById("frecuencia").options[
      document.getElementById("frecuencia").selectedIndex
    ].text
  );
  let porcentaje = Number(document.getElementById("porcentaje").value);
  let tabla = [];
  let indice = 0;
  let meses = 1;
  let acum = 1;
  let total = 0;
  let comision = 0;
  var lineas2 = "<table id='miTabla' style='width:100%;'>";
  if (
    !tablaContratos.find(
      (p) => p.dni === document.getElementById("selector").value
    )
  ) {
    tablaContratos.push(
      new Contratos(
        document.getElementById("selector").value,
        valor,
        duracion,
        frecuencia,
        porcentaje
      )
    );
  } else {
    alert("El contrato correspondiente a ese dni ya existe");
    // const elementoNuevo = {
    //   dni: document.getElementById("selector").value,
    //   importeInicial: valor,
    //   duracion: duracion,
    //   frecuencia: frecuencia,
    //   porcentaje: porcentaje,
    // };
    // const miArray = new Contratos(tablaContratos);
    // // miArray.reemplazarElementoPorDni(elementoNuevo);
    // console.log(tablaContratos);
  }

  // // Validación de numeros
  function validarNumero(numero) {
    return !isNaN(numero);
  }

  // Validación de valores numéricos
  if (!validarNumero(porcentaje) || !validarNumero(valor)) {
    alert("El valor inicial y el porcentaje deben ser valores numericos");
  } else {
    // Asignación de valores según duración seleccionada
    switch (duracion) {
      case 1:
        duracion = 24;
        comision = 5 / 100;
        break;
      case 2:
        duracion = 36;
        comision = 6 / 100;
        break;
      case 3:
        duracion = 48;
        comision = 7 / 100;
        break;
      case 4:
        duracion = 60;
        comision = 8 / 100;
        break;
    }

    // Cálculo de cuotas y totales
    while (meses <= duracion) {
      if (meses === frecuencia + 1) {
        porcentaje =
          (valor * Number(document.getElementById("porcentaje").value)) / 100;
        valor += porcentaje;

        // un array para ir almacenando cada celda del ciclo
        tabla[indice] = "Cuota del mes " + (meses + (": $" + valor.toFixed(2)));
        indice++;
        total += valor;
        acum++;
      } else if (meses === frecuencia * acum + 1) {
        porcentaje =
          (valor * Number(document.getElementById("porcentaje").value)) / 100;
        valor += porcentaje;
        tabla[indice] = "Cuota del mes " + (meses + (": $" + valor.toFixed(2)));
        indice++;
        total += valor;
        acum++;
      } else {
        total += valor;
        tabla[indice] = "Cuota del mes " + (meses + (": $" + valor.toFixed(2)));
        indice++;
      }
      meses++;
    }

    // Carga de divs con los resultados almacenados
    document.getElementById("div1").innerHTML =
      "Importe Total: $ " + total.toFixed(2);
    document.getElementById("div3").innerHTML =
      "Comisión: $" + (total * comision).toFixed(2);

    // crear variable nueva donde alojar los datos de la tabla, enviar el array y el inicio de la tabla para ir llenandola
    let lineas = crearTabla(tabla, lineas2);

    // carga de tabla completa en el div
    document.getElementById("caja3").innerHTML = "<h1>" + lineas + "</h1>";
    document.getElementById("caja3").style.height = "300px";
  }
}

// Función para crear la tabla
function crearTabla(a, b) {
  // Con el ciclo for se recorre el array y se va completando la sintaxis para una tabla, almacenandola por partes en una variable
  for (let i = 0; i < a.length; i++) {
    b = b + "<tr><td>" + a[i] + "</td></tr>";
  }
  // Cierre de tabla y retornar el valor completo
  b = b + "</table>";
  return b;
}
