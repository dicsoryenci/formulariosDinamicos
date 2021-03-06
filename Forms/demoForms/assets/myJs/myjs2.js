﻿function pintarCampos(json) {
    try {
        let titulo = json.valor.titulo;
        let descripcion = json.valor.descripcion;
        let jsFormulario = json.valor.javaScript;
        let htmlTitulo = `<h5>${titulo}</h5> <span id="descripcionTab">${descripcion}</span>`;
        $("#divTitulo").html(htmlTitulo);
        let htmlCampo = '';
        let scriptAuxIni = '$(document).ready(function () {';
        let script = '';
        let scriptAuxFin = '});';
        let script2 = '';
        $.each(json.valor.campos, function (i, campo) {
            let idCampo = campo.idCampo;
            let idTipoCampo = campo.idTipoCampo;
            let idTipoDato = campo.idTipoDato;
            let tabIndex = campo.tabIndex;
            let etiqueta = campo.etiqueta;
            let valor = campo.valor;
            let texto = campo.texto;
            let placeHolder = campo.placeHolder;
            let longitudMinima = campo.longitudMinima;
            let longitudMaxima = campo.longitudMaxima;
            let valMinimo = campo.valMinimo;
            let valMax = campo.valMax;
            let mascara = campo.mascara;
            let esRequerido = campo.esRequerido;
            let tipoOrigen = campo.tipoOrigen;
            let valorLista = campo.valorLista;
            let elementoJson = campo.elementoJson;
            let seleccionMultiple = campo.seleccionMultiple;
            let urlWebBuscar = campo.urlWebBuscar;
            let validacionScript = campo.validacionScript;
            let visible = campo.visible;
            let soloLectura = campo.soloLectura;
            let numeroLineas = campo.numeroLineas;
            let aumentarEn = campo.aumentarEn;
            let expresionRegular = campo.expresionRegular;
            let tamanioDiv = campo.tamanioDiv;
            let elementoJsonPadre = campo.elementoJsonPadre;

            let onchange = '';
            let onclick = '';
            let htmlTamanio = ` class="col-md-6 mb-3" id="div${elementoJson}" `;

            let htmlAdd = '';
            let htmlVisible = '';

            if (parseInt(tamanioDiv) == 12) {
                htmlTamanio = ` class="col-md-12 mb-6" id="div${elementoJson}" `;
            }

            if (esRequerido == 1 && visible == 1) {
                htmlAdd += ` required`
            }

            let camposRelacionados = json.valor.campos.find(item => item.elementoJsonPadre == elementoJson);
            if (camposRelacionados) {
                if (idTipoCampo != 4) {
                    script += `$("#${elementoJson}").change(function () {
                    getItemsListaConParametros('${camposRelacionados.elementoJson}','${camposRelacionados.valorLista}','${elementoJson}');
                    });`;
                } else {
                    script += `$("#hidden${elementoJson}").on("change",function () {
                    getItemsListaConParametros('${camposRelacionados.elementoJson}','${camposRelacionados.valorLista}','hidden${elementoJson}');
                    });`;
                }

            }

            if (validacionScript.trim().length > 0) {
                script2 += validacionScript;
                onchange = ` onchange="fun${elementoJson}()"`;
                if (idTipoCampo == 6) {
                    onclick = ` onclick="fun${elementoJson}()"`;
                }
            }

            

            if (tipoOrigen == 2) {
                if (elementoJsonPadre.trim().length <= 0) {
                    script += ` getItemsListaSinParametros('${elementoJson}','${valorLista}');`;
                }
            }

            if (soloLectura > 0) {
                htmlAdd += ` readonly="readonly"`
            }

            if (visible == 0) {
                htmlVisible = ` style="display: none"`;
            }
            if (idTipoCampo == 1) {

                if (texto.trim().length > 0) {
                    htmlAdd += ` value="${texto}"`;
                }

                if (idTipoDato == 1) {
                    if (expresionRegular.trim().length > 0) {
                        htmlAdd += ` pattern="${expresionRegular}"`;
                    }

                    if (parseInt(longitudMinima) > 0) {
                        htmlAdd += ` minlength="${longitudMinima}"`;
                    }

                    if (parseInt(longitudMaxima) > 0) {
                        htmlAdd += ` maxlength="${longitudMaxima}"`;
                    }

                    htmlCampo += `
                            <div ${htmlTamanio} ${htmlVisible}>
    <label for="texto">${etiqueta}</label>
    <input type="text" class="form-control" id="${elementoJson}" name="${elementoJson}" placeholder="${placeHolder}" ${htmlAdd} ${onchange}>
                            </div>
    `;
                } else if (idTipoDato == 2) {
                    if (parseInt(valMinimo) >= 0) {
                        htmlAdd += ` min="${valMinimo}"`;
                    }
                    if (parseInt(valMax) >= 0) {
                        htmlAdd += ` max="${valMax}"`;
                    }
                    if (parseInt(aumentarEn) > 0) {
                        htmlAdd += ` step="${aumentarEn}"`;
                    }
                    htmlCampo += `
                            <div ${htmlTamanio} ${htmlVisible}>
        <label for="texto">${etiqueta}</label>
        <input type="number" class="form-control" id="${elementoJson}" name="${elementoJson}" placeholder="${placeHolder}" ${htmlAdd} ${onchange}>
                            </div>
        `;
                } else if (idTipoDato == 3) {
                    htmlCampo += `
                            <div ${htmlTamanio} ${htmlVisible}>
                            <label for="texto">${etiqueta}</label>
                            <input type="email" class="form-control" id="${elementoJson}" name="${elementoJson}" placeholder="${placeHolder}" ${htmlAdd} ${onchange}>
                            </div>
                            `;
                } else if (idTipoDato == 4) {

                    if (valMinimo.length == 10) {
                        htmlAdd += ` min="${valMinimo}"`;
                    }
                    if (valMax.length == 10) {
                        htmlAdd += ` max="${valMax}"`;
                    }

                    htmlCampo += `
                            <div ${htmlTamanio} ${htmlVisible}>
            <label for="texto">${etiqueta}</label>
            <input type="date" class="form-control" id="${elementoJson}" name="${elementoJson}" ${htmlAdd} ${onchange}>
                            </div>
            `;
                } else if (idTipoDato == 5) {
                    htmlCampo += `
                            <div ${htmlTamanio} ${htmlVisible}>
                            <label for="texto">${etiqueta}</label>
                            <input type="time" class="form-control" id="${elementoJson}" name="${elementoJson}" ${htmlAdd} ${onchange}>
                            </div>
                            `;
                } else if (idTipoDato == 6) {
                    htmlCampo += `
                            <div ${htmlTamanio} ${htmlVisible}>
                            <label for="texto">${etiqueta}</label>
                            <input type="text" class="form-control" id="${elementoJson}" name="${elementoJson}" placeholder="${placeHolder}" ${htmlAdd} pattern="^[2|3|4|5|6|7][0-9]{7}$" minlength="8" maxlength="8" ${onchange}>
                            </div>
                            `;
                } else if (idTipoDato == 7) {
                    htmlCampo += `
                            <div ${htmlTamanio} ${htmlVisible}>
                            <label for="texto">${etiqueta}</label>
                            <input type="password" class="form-control" id="${elementoJson}" name="${elementoJson}" placeholder="${placeHolder}"  ${htmlAdd} ${onchange}>
                            </div>
                            `;
                } else if (idTipoDato == 8) {
                    htmlCampo += `
                            <div ${htmlTamanio} ${htmlVisible}>
                            <label for="texto">${etiqueta}</label>
                            <input type="url" class="form-control" id="${elementoJson}" name="${elementoJson}" placeholder="${placeHolder}" ${htmlAdd} ${onchange}>
                            </div>
                            `;
                }
            } else if (idTipoCampo == 2) {

                if (expresionRegular.trim().length > 0) {
                    htmlAdd += ` pattern="${expresionRegular}"`;
                }

                if (parseInt(longitudMinima) > 0) {
                    htmlAdd += ` minlength="${longitudMinima}"`;
                }

                if (parseInt(longitudMaxima) > 0) {
                    htmlAdd += ` maxlength="${longitudMaxima}"`;
                }

                htmlCampo += `
                            <div ${htmlTamanio} ${htmlVisible}>
                <label for="texto">${etiqueta}</label>
                <textarea id="${elementoJson}" name="${elementoJson}" placeholder="${placeHolder}" rows="${numeroLineas}" class="form-control" ${htmlAdd} ${onchange}>${texto.trim()}</textarea>
            </div>
            `;
            } else if (idTipoCampo == 3) {
                if (parseInt(tipoOrigen) == 1) {
                    let itemsLista = JSON.parse(valorLista);
                    htmlCampo += `
                            <div ${htmlTamanio} ${htmlVisible}>
                <label for="texto">${etiqueta}</label>
                <select class="form-control custom-select" id="${elementoJson}" name="${elementoJson}" ${htmlAdd} ${onchange}>
                    <option value="">Seleccione</option>
                    `;
                    $.each(itemsLista, function (i, data) {
                        htmlCampo += `
                                    <option value="${data.valor}">${data.text}</option>
                            `;
                    });
                    htmlCampo += `</select></div>`;
                } else if (parseInt(campo.tipoOrigen) == 2) {
                    htmlCampo += `
                            <div ${htmlTamanio} ${htmlVisible}>
                            <label for="texto">${elementoJson}</label>
                              <select class="form-control custom-select" id="${elementoJson}" name="${elementoJson}" ${htmlAdd} ${onchange}>
                                    <option value="">${elementoJsonPadre}</option>
                                </select></div>`;
                }
            } else if (idTipoCampo == 4) {
                htmlCampo += `
                            <div ${htmlTamanio} ${htmlVisible}>
                                <div class="form-group">
                                    <label>${etiqueta}</label>
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="${elementoJson}" name="${elementoJson}"  readonly="readonly">
                                        <div class="input-group-append">
                                            <a class="btn btn-info" id="btn${elementoJson}" name="btn${elementoJson}" onclick="getModal('${elementoJson}','${urlWebBuscar}')"> <span class="icon-share"></span> Buscar</a>
                                            <input class="form-control" type="hidden" id="hidden${elementoJson}" name="hidden${elementoJson}" style="display: none;" value="0"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            `;
            } else if (campo.idTipoCampo == 5) {
                htmlCampo += `
  
                   <div ${htmlTamanio} ${htmlVisible} id="div${elementoJson}">
                        <div class="card">
                            <div class="card-header">
                                <h5>${etiqueta}</h5>
                                <span>${placeHolder}</span>
                            </div>
                            <div class="table-responsive">
                                <table class="table" id="${elementoJson}">
                                    <thead>
                                    <tr>
                                        <th scope="col"></th>
                                        <th scope="col"></th>
                                        <th scope="col"></th>
                                        <th scope="col"></th>
                                        <th scope="col"></th>
                                        <th scope="col"></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <th scope="row"></th>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    
</div>
                    `;
            } else if (campo.idTipoCampo == 6) {
                htmlCampo += `
                     <div ${htmlTamanio} ${htmlVisible}>
                    <div class="form-group">
                    <label for="texto">&nbsp;&nbsp;</label>
                    <div class="input-group">
                    <button type="button" id="${elementoJson}" class="${placeHolder}" ${onclick}>${etiqueta}</button>
                    </div>
                    </div>
                    </div>
                    `;
            }
        });
        let jsScript = document.createElement("script");
        jsScript.text = scriptAuxIni + script + scriptAuxFin;
        document.getElementsByTagName('head')[0].appendChild(jsScript);

        let jsScript2 = document.createElement("script");
        jsScript2.text = script2;
        document.getElementsByTagName('head')[0].appendChild(jsScript2);


        if (jsFormulario) {
            let jsForm = document.createElement("script");
            jsForm.text = jsFormulario;
            document.getElementsByTagName('head')[0].appendChild(jsForm);
        }

        $("#divCampoFormulario").html(htmlCampo);
    }
    catch (error) {
        swal.fire('Error', error.message, 'warning');
    }
}

var getJson = (data, metodo) => {
    return new Promise(function (resolver, rechazar) {
        try {
            $.ajax({
                url: metodo,
                async: false,
                type: "POST",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify({ stringRequest: data }),
                success: function (myData) {
                    let dataResponse = myData.d;
                    try {
                        resolver(JSON.parse(dataResponse));
                    } catch (err) {
                        rechazar(JSON.stringify(err));
                        swal.fire("ERROR", "El objeto no es un json válido", "error");
                    }
                }
            }).fail(function (xhr, textStatus, errorThrown) {
                swal.fire("Alerta", "No se logró comunicación con el servidor, por favor intente nuevamente", "warning");
                rechazar(JSON.stringify(xhr));
            });
        } catch (error) {
            swal.fire("ERROR", "Ocurrió un error al intentar realizar la petición", "error");
            rechazar(JSON.stringify(error));
        }
    });
}

function getItemsListaConParametros(elementoJson, nombreSp, elementoPadre) {
    let parametro = $(`#${elementoPadre}`).val();
    $(`#${elementoJson}`).empty();
    if (parametro.length > 0) {
        getJson(JSON.stringify({ nombreSp: nombreSp, parametro: parametro }), "55e23f2677c10cde67d50a9802363448.aspx/getItemsLista").then(response => {
            let htmlOptions = '';
            if (response.codigo == 0) {
                htmlOptions = `<option value="">Seleccione</option>`;
                $.each(response.valor, function (i, item) {
                    htmlOptions += `<option value="${item.value}">${item.texto}</option>`;
                });
                $(`#${elementoJson}`).prepend(htmlOptions);
            } else {
                htmlOptions = `<option value="">No existen registros</option>`;
                $(`#${elementoJson}`).prepend(htmlOptions);
                swal.fire("Alerta", response.mensaje, "error");
            }
        }).catch(error => {
            swal.fire("Alerta", error, "warning");
        });
    }
}

function getItemsListaSinParametros(elementoJson, nombreSp) {
    $(`#${elementoJson}`).empty();
    getJson(JSON.stringify({ nombreSp: nombreSp, parametro: null }), "55e23f2677c10cde67d50a9802363448.aspx/getItemsLista").then(response => {
        let htmlOptions = '';
        if (response.codigo == 0) {
            htmlOptions = `<option value="">Seleccione</option>`;
            $.each(response.valor, function (i, item) {
                htmlOptions += `<option value="${item.value}">${item.texto}</option>`;
            });
            $(`#${elementoJson}`).prepend(htmlOptions);
        } else {
            htmlOptions = `<option value="">No existen registros</option>`;
            $(`#${elementoJson}`).prepend(htmlOptions);
            swal.fire("Alerta", response.mensaje, "error");
        }
    }).catch(error => {
        swal.fire("Alerta", error, "warning");
    });
}


$(document).ready(function () {
    $("#miFormulario").submit(function (event) {
        event.preventDefault();
        registrarFormulario();
    });

});
function getModal(elementoJson, idModal) {
    $("#tblModal_wrapper").hide();
    $("#tbTitulo").empty();
    $("#tBody").empty();
    $("#txtCodigoModal").val(0);
    $("#txtCriterioBusqueda").val('')
    $("#txtElementoJson").val(elementoJson);
    getJson(JSON.stringify({ idModal: idModal }), "55e23f2677c10cde67d50a9802363448.aspx/getInfoModal").then(response => {
        if (response.codigo == 0) {
            $("#TituloDivModal").html(response.valor[0].textoAyuda);
            $("#txtCodigoModal").val(idModal);
            $("#tituLoModal").html(response.valor[0].nombre);
            $('#modalBusqueda').modal('show');
            $('#txtCriterioBusqueda').attr("placeholder", response.valor[0].textoAyuda);
        } else {
            swal.fire("Alerta", response.mensaje, "error");
        }
    }).catch(error => {
        swal.fire("Alerta", error, "warning");
    });
}

function getBusquedaModal() {
    $("#tbTitulo").empty();
    $("#tBody").empty();
    let idModal = $("#txtCodigoModal").val();
    let parametro = $("#txtCriterioBusqueda").val();

    if (parametro.trim().length > 0) {
        let tituloAgregado = false;
        let nombreTitulos = '';
        let htmlBody = '';
        getJson(JSON.stringify({ idModal: idModal, parametro: parametro }), "55e23f2677c10cde67d50a9802363448.aspx/getBusquedaModal").then(response => {
            if (response.codigo == 0) {
                $.each(response.valor, function (i, fila) {
                    let titulo = fila;
                    if (!tituloAgregado) {
                        let htmlTitulo = '<tr>';
                        for (let key in titulo) {
                            htmlTitulo += `<th>${key}</th>`;
                            nombreTitulos += key + '|';
                        }
                        htmlTitulo += `<th></th>`;
                        htmlTitulo += '</tr>';
                        $("#tbTitulo").html(htmlTitulo);
                        tituloAgregado = true;
                    }

                    htmlBody += '<tr>';
                    let codigo = '';
                    let descripcion = '';
                    let arregloText = nombreTitulos.split('|');
                    for (let i = 0; i < (arregloText.length - 1); i++) {
                        let llave = arregloText[i];
                        htmlBody += '<td>' + fila[llave] + '</td>';

                        if (i == 0) {
                            codigo = fila[llave];
                        }
                        if (i == 1) {
                            descripcion = fila[llave];
                        }
                    }
                    htmlBody += `<td class="text-right">
                                    <a class="icon" href="javascript:void(0)"></a>
                                    <a href="javascript:void(0)" onclick="agregarValor(${codigo},'${descripcion}');" class="btn btn-primary btn-sm"><i
                                        class="fa fa-pencil"></i>Seleccionar</a>
                                </td>`;
                    htmlBody += '</tr>';
                });
                $("#tblModal").dataTable().fnDestroy();
                $("#tBody").html(htmlBody);
                $('#tblModal').DataTable({
                    "searching": false,
                    "bLengthChange": false,
                    "bAutoWidth": false,
                    "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "Todos"]],
                    language: {
                        processing: "Cargando información",
                        search: "Filtrar por:",
                        lengthMenu: "Mostrar _MENU_ filas",
                        info: "Vizualización  _END_ de _TOTAL_ filas",
                        infoEmpty: "Vizualización del elemento 0 a 0 de 0 filas",
                        infoFiltered: "(Filtrado de _MAX_ filas en total)",
                        infoPostFix: "",
                        loadingRecords: "Cargando...",
                        zeroRecords: "No se logró encontrar ninguna coincidencia",
                        emptyTable: "Aucune donnée disponible dans le tableau",
                        paginate: {
                            first: "Primera",
                            previous: "Anterior",
                            next: "Siguiente",
                            last: "Ultima"
                        },
                        aria: {
                            sortAscending: ": active para ordenar la columna en orden ascendente",
                            sortDescending: ": active para ordenar la columna en orden descendente"
                        }
                    }
                });
            } else {
                swal.fire("Alerta", response.mensaje, "error");
            }
        }).catch(error => {
            swal.fire("Alerta", error, "warning");
        });
    } else {
        mostrarAlertaGeneral("Error", "Debe de ingresar un valor", "danger");
    }
}

function agregarValor(value, text) {
    let elementoJson = $("#txtElementoJson").val();
    $(`#${elementoJson}`).val(text);
    $(`#hidden${elementoJson}`).val(value);
    $('#modalBusqueda').modal('hide');
}

function registrarFormulario() {
    let miForm = document.getElementById('divCampoFormulario');
    let campoValue = new Array();
    let infoCampo;
    let controlesInput = miForm.getElementsByClassName("form-control")
    for (i = 0; i < controlesInput.length; i++) {
        let control = controlesInput[i];
        let elementoJson = '' + control.id;
        let valor = '';
        let texto = '';

        if (control.type != 'hidden') {
            
            if (control.readOnly !== true) {

                if (control.type == "select-one") {
                    valor = $(`#${elementoJson}`).val();
                    texto = $(`#${elementoJson} option:selected`).text();;
                } else {
                    valor = $(`#${elementoJson}`).val();
                    texto = $(`#${elementoJson}`).val();
                }
                infoCampo = {
                    elementoJson: elementoJson,
                    valor: valor,
                    texto: texto
                };
                campoValue.push(infoCampo);
            }
        }

        if (control.type == 'hidden') {
            valor = $(`#${elementoJson}`).val();
            let idInput = elementoJson.replace('hidden', '');
            texto = $(`#${idInput}`).val();
            elementoJson = idInput;
            infoCampo = {
                elementoJson: elementoJson,
                valor: valor,
                texto: texto
            };
            campoValue.push(infoCampo);
        }

    }
    let idForm = $("#hidIdFormulario").val();
    getJson(JSON.stringify({ idForm: idForm, data: campoValue }), "55e23f2677c10cde67d50a9802363448.aspx/regForm").then(response => {
        if (response.codigo == 0) {
            Swal.fire({
                title: 'Información?',
                text: response.mensaje,
                icon: 'success',
                showCancelButton: false,
                allowOutsideClick: false,
                allowEscapeKey: false,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Aceptar!'
            }).then((result) => {
                if (result.value) {
                    window.location.reload();
                }
            })

        } else {
            swal.fire("Alerta", response.mensaje, "error");
        }
    }).catch(error => {
        swal.fire("Alerta", error, "error");
    });

}

function prueba() {
    let infoCampo = new Array();
    let parametro = {
        parametroSp: "@id",
        valor: "1"
    }
    infoCampo.push(parametro);

    let parametro2 = {
        parametroSp: "@nombre",
        valor: "Byron"
    }

    infoCampo.push(parametro2);
    getDataTabla("tablaPagos","getClientes", infoCampo);
}


function getDataTabla(el,nombreSp, data) {
    let tituloAgregado = false;
    let htmlTabla = '';
    let nombreTitulos = '';
    let htmlBody = '<tbody>';
    let htmlTitulo = '<thead>';
    getJson(JSON.stringify({ nombreSp,data}), "55e23f2677c10cde67d50a9802363448.aspx/getTabla").then(response => {
        if (response.codigo == 0) {
            $(`#${el}`).empty();
            $.each(response.valor, function (i, fila) {

                let titulo = fila;
                console.log("Valor fila", fila);
                if (!tituloAgregado) {
                    htmlTitulo += '<tr>';
                    for (let key in titulo) {
                        htmlTitulo += `<th>${key}</th>`;
                        nombreTitulos += key + '|';
                    }
                    htmlTitulo += `<th></th>`;
                    htmlTitulo += '</tr></thead>';
                    tituloAgregado = true;
                }

                htmlBody += '<tr>';
                let codigo = '';
                let descripcion = '';
                let arregloText = nombreTitulos.split('|');
                for (let i = 0; i < (arregloText.length - 1); i++) {
                    let llave = arregloText[i];
                    htmlBody += '<td>' + fila[llave] + '</td>';

                    if (i == 0) {
                        codigo = fila[llave];
                    }
                    if (i == 1) {
                        descripcion = fila[llave];
                    }
                }

            });
            htmlBody += "</tbody>";
            htmlTabla = htmlTitulo + htmlBody;
            $(`#${el}`).html(htmlTabla);
        } else {
            swal.fire("Alerta", response.mensaje, "error");
        }
    }).catch(error => {
        swal.fire("Error", error.message, "error");
    });
}
