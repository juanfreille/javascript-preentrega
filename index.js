alert("Bienvenido! Primero debes completar todos los datos solicitados");
let nombre = "";
let email = "";
let telefono = "";

// Validación de nombre y email
do {
  nombre = prompt("Ingresa tu nombre y tu apellido: ");
  email = prompt("Ingresa tu email: ");
  telefono = prompt("Ingresa tu telefono: ");
  document.getElementById("nombre").value = nombre;
  document.getElementById("email").value = email;
  document.getElementById("telefono").value = telefono;
  if (nombre === "" || email === "" || telefono === "") {
    alert("Debes completar todos los campos.");
  } else if (!validarNumero(telefono)) {
    alert("El teléfono ingresado no es válido.");
  }
} while (
  nombre === "" ||
  email === "" ||
  telefono === "" ||
  !validarNumero(telefono)
);

// // Validación de numeros
function validarNumero(numero) {
  return !isNaN(numero);
}

// Cálculo de valores
function calcular() {
  let valor = Number(document.getElementById("importeInicial").value);
  let duracion = Number(document.getElementById("miseleccion").value);
  let frecuencia = Number(
    document.getElementById("frecuencia").options[
      document.getElementById("frecuencia").selectedIndex
    ].text
  );
  let tabla = [];
  let indice = 0;
  let meses = 1;
  let acum = 1;
  let total = 0;
  let porcentaje = Number(document.getElementById("porcentaje").value);
  let comision = 0;
  var lineas2 = "<table id='miTabla' style='width:100%;border: 1px solid;'>";

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
  }
}

function crearTabla(a, b) {
  // Con el ciclo for se recorre el array y se va completando la sintaxis para una tabla, almacenandola por partes en una variable
  for (let i = 0; i < a.length; i++) {
    b = b + "<tr><td>" + a[i] + "</td></tr>";
  }
  // Cierre de tabla y retornar el valor completo
  b = b + "</table>";
  return b;
}
