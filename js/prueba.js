window.addEventListener("DOMContentLoaded", () => {
    const MENOR = 1;
    const MAYOR = 49;
    const cantidadNums = 6;
    const numsFila = 7;
    var vectorPrueba = [2, 3, 4, 1, 5, 16];
    var premioPrueba = [1, 2, 3, 4, 5, 6];
    var cadenaPrueba = "clave=1,2,3,4,5,6; 10/2/1997=8,45,12,14,35,6; 31/2/2017=a-45-blue-34,34,45-35-6"
    var separador = ";"
    var nodoPrueba = document.getElementById("prueba");

    var fechaPrueba;
    var fechaCookie;
    var premio = [];
    var misNumeros = [];

    /************* REALIZAR SORTEO  ****************************/ // FALTA VALIDAR FECHA ANTES SISTEMA
    var botonValidarFecha = document.getElementById("botonValidarFecha"); // antesSistema -> true botones aleatorios/grabar enabled

    botonValidarFecha.addEventListener('click', function(){
        if(validarFecha(fechaPrueba)<0){
            fechaCookie = fechaPrueba.toLocaleDateString();
        }else{
            alert("No es correcto");
        }
    });

    var fecha1 = document.getElementById("fecha1");

    fecha1.addEventListener('change', function () {
        fechaPrueba = new Date(fecha1.value);
        console.log("fechaPrueba = fecha 1: " + fechaPrueba);

    });

    var botonGenerarAleatorios = document.getElementById("botonGenerarAleatorios");

    botonGenerarAleatorios.addEventListener('click', function () {
        premio = generarAleatorios(MENOR, MAYOR, cantidadNums)
        console.log(premio)
    });

    var botonGrabar = document.getElementById("botonGrabar"); // crearCookie(clave,valor)

    botonGrabar.addEventListener('click', function () {
        crearCookie(fechaCookie,premio,30)
    });



    /**************************** PARTE ABAJO ***************************/

    var fecha2 = document.getElementById("fecha2");

    fecha2.addEventListener('change', function () {
        fechaPrueba = new Date(fecha2.value).toLocaleDateString();
        console.log("fechaPrueba = fecha 2: " + fechaPrueba);

    });



    let caja = document.getElementById("misNumeros");
    let nombresAtrib = ["type", "min", "max", "pattern", "required"];
    let valoresAtrib = ["number", 1, 49, "[0-9]{2}", "required"];

    for (let i = 0; i < 6; i++) { crearNodo("input", caja, nombresAtrib, valoresAtrib) }

    function crearNodo(tipoNodo = "", nodoPadre, nombresAtributos, valoresAtributos) {

        let nodo = nodoPadre;
        // let valores = valoresAtributos.slice()

        let nodoHijo = document.createElement(tipoNodo);
        nombresAtributos.forEach((valor, indice) => {
            nodoHijo.setAttribute(valor, valoresAtributos[indice]);
        });
        //         console.log(nodoHijo.getAttributeNames())

        nodo.appendChild(nodoHijo);
    }

    var cajaTabla = document.getElementById("prueba");
    var botonComprobarPremio = document.getElementById("botonComprobarPremio");

    botonComprobarPremio.addEventListener('click', function () {
        misNumeros = [];
        document.querySelectorAll("input[type='number']").forEach(element => {
            misNumeros.push(element.value);
            console.log(misNumeros)
        });
        console.log("Hay repetidos?: " + validarRepetidos(misNumeros))
        crearTablaNodo(MENOR, MAYOR, numsFila, cajaTabla);
        ComprobarPremio(premio,misNumeros);
    });




    // console.log(generarAleatorios(MENOR, MAYOR, cantidadNums))
    //   botonGenerarAleatorios.addEventListener("click", function () { return premio=generarAleatorios(MENOR, MAYOR, cantidadNums) })
    //   console.log(premio)
    //  console.log(separarCadena( cadenaPrueba,separador))
    // console.log(crearTablaNodo(MENOR, MAYOR, numsFila, nodoPrueba))
    // console.log(ComprobarPremio(vectorPrueba, premioPrueba))
    // DAVID

    function generarAleatorios(NUMMENOR, NUMMAYOR, cantidad) {
        numeros = new Array();

        if (cantidad > NUMMAYOR) {
            return numeros //Comprobamos si la cantidad de numeros es mayor al intervalo de numeros min y max
            //Si falla devulve un array vacio
        } else {
            for (i = 0; i < cantidad; i++) {
                temp = Math.round(Math.random() * NUMMAYOR);   //generanos número aleatorio
                temporal = parseInt((Math.floor(temp)) + 1); //redondeamos, para evitar decimales

                if ((temporal >= NUMMENOR) && (temporal <= NUMMAYOR)) {
                    // Si el elemento no se encuentra en numeros[] agregamos (push), en caso
                    // de que si se encuentre (continue;), saltar al siguente numero, restando
                    // uno al contador del for.
                    if (numeros.indexOf(temporal) != -1) {
                        i--; //en caso de valor incorrecto se descuenta uno para que salgan 6 valores
                        continue;
                    } else {
                        numeros.push(temporal); //agregamos al array el número de temporal
                    }
                } else {
                    i--;
                    continue;
                }
            }
        }
        return numeros;
    }
    
    function crearCookie(clave, valor, diasexpiracion) { 
        var d = new Date(); 
        d.setTime(d.getTime() + (diasexpiracion*24*60*60*1000)); 
        var expires = "expires="+d.toUTCString(); 
        document.cookie = clave + "=" + valor + "; " + expires; 
    }// bien

    // SANTI

    function separarCadena(cadena, separador) {
        var array
        array = cadena.split(separador)
        return array
    }// bien

    // RAUL

    function crearTablaNodo(numMenor, numMayor, long, div) {
        var tabla = document.createElement("table");
        if (numMenor > numMayor) {
            let aux = numMenor;
            numMenor = numMayor;
            numMayor = aux;
        }
        let dif = (numMayor - numMenor) + 1;
        if (dif % long == 0) {
            var fila = document.createElement("tr");
            for (i = numMenor; i <= numMayor + 1; i++) {
                var celda = document.createElement("td");
                var texto = document.createTextNode(i);
                celda.appendChild(texto);
                fila.appendChild(celda);
                if (i % long == 0) {
                    tabla.appendChild(fila);
                    fila = document.createElement("tr");
                }
            }
            div.append(tabla);
            return 1;
        } else {
            console.log("La longitud de fila no es valida para la cantidad de valores que hay en el array.");
            return 0;
        }
    } // bien

    function isNum(dato) {
        let isOk = true;
        if (isNaN(dato)) {
            isOk = false;
        }

        return isOk;
    } // bien

    function validarMinMax(num, numMin, numMax) {
        let isOk = false;
        if (numMax < numMin) {
            let aux = numMax;
            numMax = numMin
            numMin = aux
        }
        if (num >= numMin && num <= numMax) {
            isOk = true;
        }

        return isOk;
    } // bien

    function validarRepetidos(arra) {
        let repe = false;
        arra.sort();

        for (let i = 0; i < arra.length; i++) {
            if (arra[i + 1] == arra[i]) {
                repe = true;
            }
        }

        return repe;
    } // bien

    function crearFecha(valor) {
        let fecha;
        if (valor == undefined) {
            fecha = new Date();
        } else {
            fecha = new Date(valor);
        }

        return fecha.toLocaleDateString();
    } 

    function validarFecha(date){
        var fechActual=new Date(Date.now());
        var fechComp=new Date(date);
        console.log(fechActual);
        console.log(fechComp);
    
        console.log(fechActual<fechComp);
    
        if(fechActual<fechComp){
            console.log(1);
            return 1;
        }
        if(fechActual>fechComp){
            console.log(-1);
            return -1;
        }else{
            console.log(0);
            return 0;
        }
    }// bien

    function ComprobarPremio(aleatorio, ganador) {
        let celdas = document.querySelectorAll("td");
        if (ganador.length == 6 && aleatorio.length == ganador.length) {
            let total = aleatorio.concat(ganador);
            console.log(total.sort());
            for (let i = 0; i < celdas.length; i++) {
                //console.log(celdas[i].textContent);
                if (total.indexOf(parseInt(celdas[i].textContent)) != -1) {
                    if (ganador.indexOf(parseInt(celdas[i].textContent)) != -1 && aleatorio.indexOf(parseInt(celdas[i].textContent)) != -1) {
                        celdas[i].classList.add("acierto");
                    }
                    if (ganador.indexOf(parseInt(celdas[i].textContent)) != -1 && aleatorio.indexOf(parseInt(celdas[i].textContent)) == -1) {
                        celdas[i].classList.add("salido");
                    }
                    if (ganador.indexOf(parseInt(celdas[i].textContent)) == -1 && aleatorio.indexOf(parseInt(celdas[i].textContent)) != -1) {
                        celdas[i].classList.add("equivocacion");
                    }
                }
            }
            return 1;
        } else {
            return 0;
        }
    } /*

    El boolean que devolvemos indica si los elementos de los dos arrays son iguales, no si las longitudes de los arrays son iguales.
    Eso significa que, si los dos arrays tienen la misma longitud, cuando tenemos premio devuelve 1 y cuando no tenemos premio
    también devuelve 1, entonces, si no hay premio, en la tabla habrá números rojos pero la función nos dice que si tenemos premio
    porque devuelve 1.

    Está bien validar las longitudes de los arrays. Si son iguales entonces habría que validar que sus valores son iguales y ahí acabaríamos.

    Funciona para como lo hemos pensado porque pinta en una tabla los números premiados y los de la combinación que mete el usuario,
    pero dependemos de que ya exista una tabla creada para poder coger sus elementos <td> y eso no es lo que necesitamos hacer en esta función.

    Podrías modificarla y hacer 2, una la que compara los arrays y otra que reciba como parámetro una tabla y dos arrays y entonces los pinta
    y devuelve la tabla pintada o algo así se me ocurre.

    Muy bien trabajado crack

*/

});






/*

    let caja = document.getElementById("misNumeros");
    let nombresAtrib = ["type", "min", "max", "pattern", "required"];
    let valoresAtrib = ["number", 1, 49, "[0-9]{2}", "required"];
/*console.log(nombresAtrib.forEach(element=>{

}))
*/
/*
    var objeto = {
        clave1: "valor1",
        clave2: "valor2",
        clave3: "valor3",

    };

 //   var { claves, valores } =  Object,Object.keys(objeto);
    console.log("claves: " + Object.keys(objeto))
    console.log(`valores: ${Object.values(objeto)}`)
    console.log(objeto.clave1)
 //   claves.forEach((element) => { console.log(element) })
    for (let i = 0; i < 6; i++) { crearNodo("input", caja, nombresAtrib, valoresAtrib) }

    var fecha = document.getElementById("fecha");

    fecha.addEventListener('change', function () {

        console.log(new Date(fecha.value).toLocaleDateString());

    });

    var mes = document.getElementById("mes");
    var dia = document.getElementById("dia")

    mes.addEventListener("change", function (e) {
        //    let numeroMes = (parseInt(e.target.valueAsNumber));
        let numeroMes = e.target.valueAsNumber;
        console.log(numeroMes)
        console.log(typeof (numeroMes))
        dia.setAttribute("max", numeroMes === 2 ? 9 : 38);
    })
    /*   var cajasTexto=document.querySelectorAll("input[type='text']");

       console.log(cajasTexto);

     <input type="number" min="1" max="49" pattern="[0-9]{2}" required>


   */

/*
function crearNodo(tipoNodo = "", nodoPadre, nombresAtributos, valoresAtributos) {

    let nodo = nodoPadre;
    // let valores = valoresAtributos.slice()

    let nodoHijo = document.createElement(tipoNodo);
    nombresAtributos.forEach((valor, indice) => {
        nodoHijo.setAttribute(valor, valoresAtributos[indice]);
    });
    //         console.log(nodoHijo.getAttributeNames())

    nodo.appendChild(nodoHijo);
}
*/