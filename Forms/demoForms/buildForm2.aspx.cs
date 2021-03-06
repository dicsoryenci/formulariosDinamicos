﻿using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;
using CapaEntidad;
using CapaNegocio;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace demoForms
{
    public partial class buildForm2 : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            
        }
        [WebMethod]
        static public string getInfoSp(string stringRequest)
        {
            string jsonResponse = string.Empty;
            RespuestaEntidad response = new RespuestaEntidad();
            InfoSpNegocio infoSp = new InfoSpNegocio();
            try
            {
                JObject solicitud = JObject.Parse(stringRequest);
                string nombreSp = (string)solicitud["nombreSp"];

                response = infoSp.infoSp(nombreSp);
                jsonResponse = JsonConvert.SerializeObject(response);
            }
            catch (Exception ex)
            {
                response.codigo = -1;
                response.mensaje = "Ocurrió un error al serializar el objeto";
                response.error = ex.ToString();
                response.valor = null;
                jsonResponse = JsonConvert.SerializeObject(response);

            }
            return jsonResponse;

        }
        [WebMethod]
        static public string regFormulario(string stringRequest)
        {

            FormularioEntidad frm = new FormularioEntidad();
            frm = JsonConvert.DeserializeObject<FormularioEntidad>(stringRequest);
            RespuestaEntidad rsp = new RespuestaEntidad();
            string jsonResponse = string.Empty;
            try
            {
                if (frm != null)
                {
                    DataTable dtCampo = new DataTable();
                    dtCampo.Columns.Add("elementoJson", typeof(string));
                    dtCampo.Columns.Add("etiqueta", typeof(string));
                    dtCampo.Columns.Add("idTipoCampo", typeof(string));
                    dtCampo.Columns.Add("idTipoDato", typeof(string));
                    dtCampo.Columns.Add("tabIndex", typeof(string));
                    dtCampo.Columns.Add("valor", typeof(string));
                    dtCampo.Columns.Add("texto", typeof(string));
                    dtCampo.Columns.Add("placeHolder", typeof(string));
                    dtCampo.Columns.Add("longitudMinima", typeof(string));
                    dtCampo.Columns.Add("longitudMaxima", typeof(string));
                    dtCampo.Columns.Add("valMinimo", typeof(string));
                    dtCampo.Columns.Add("valMax", typeof(string));
                    dtCampo.Columns.Add("aumentarEn", typeof(string));
                    dtCampo.Columns.Add("expresionRegular", typeof(string));
                    dtCampo.Columns.Add("esRequerido", typeof(string));
                    dtCampo.Columns.Add("mascara", typeof(string));
                    dtCampo.Columns.Add("tipoOrigen", typeof(string));
                    dtCampo.Columns.Add("valorLista", typeof(string));
                    dtCampo.Columns.Add("seleccionMultiple", typeof(string));
                    dtCampo.Columns.Add("urlWebBuscar", typeof(string));
                    dtCampo.Columns.Add("validacionScript", typeof(string));
                    dtCampo.Columns.Add("visible", typeof(string));
                    dtCampo.Columns.Add("soloLectura", typeof(string));
                    dtCampo.Columns.Add("numeroLineas", typeof(string));
                    dtCampo.Columns.Add("tamanioDiv", typeof(string));
                    dtCampo.Columns.Add("elementoJsonPadre", typeof(string));
                    dtCampo.Columns.Add("parametroSp", typeof(string));

                    int contador = 0;
                    foreach (Campos campo in frm.infoFormulario.campos)
                    {
                        DataRow nuevaFila = dtCampo.NewRow();
                        nuevaFila["elementoJson"] = campo.elementoJson;
                        nuevaFila["etiqueta"] = campo.etiqueta;
                        nuevaFila["idTipoCampo"] = campo.idTipoCampo;
                        nuevaFila["idTipoDato"] = campo.idTipoDato;
                        nuevaFila["tabIndex"] = contador;
                        nuevaFila["valor"] = campo.valor;
                        nuevaFila["texto"] = campo.texto;
                        nuevaFila["placeHolder"] = campo.placeHolder;
                        nuevaFila["longitudMinima"] = campo.longitudMinima;
                        nuevaFila["longitudMaxima"] = campo.longitudMaxima;
                        nuevaFila["valMinimo"] = campo.valMinimo;
                        nuevaFila["valMax"] = campo.valMax;
                        nuevaFila["aumentarEn"] = campo.aumentarEn;
                        nuevaFila["expresionRegular"] = campo.expresionRegular;
                        nuevaFila["esRequerido"] = campo.esRequerido;
                        nuevaFila["mascara"] = campo.mascara;
                        nuevaFila["tipoOrigen"] = campo.tipoOrigen;
                        nuevaFila["valorLista"] = campo.valorLista;
                        nuevaFila["seleccionMultiple"] = campo.seleccionMultiple;
                        nuevaFila["urlWebBuscar"] = campo.urlWebBuscar;
                        nuevaFila["validacionScript"] = campo.validacionScript;
                        nuevaFila["visible"] = campo.visible;
                        nuevaFila["soloLectura"] = campo.soloLectura;
                        nuevaFila["numeroLineas"] = campo.numeroLineas;
                        nuevaFila["tamanioDiv"] = campo.tamanioDiv;
                        nuevaFila["elementoJsonPadre"] = campo.elementoJsonPadre;
                        nuevaFila["parametroSp"] = campo.parametroSp;
                        dtCampo.Rows.Add(nuevaFila);
                        contador++;
                    }

                    if (dtCampo.Rows.Count > 0)
                    {
                        dataFormulario dataForm = new dataFormulario();
                        dataForm.titulo = frm.infoFormulario.titulo;
                        dataForm.descripcion = frm.infoFormulario.descripcion;
                        dataForm.nombreSp = frm.infoFormulario.nombreSp;
                        dataForm.javaScript = frm.infoFormulario.javaScript;
                        dataForm.idTipoFormulario = frm.infoFormulario.idTipoFormulario;
                        dataForm.idUsuario = 1;
                        dataForm.dtCampos = dtCampo;
                        FormularioNegocio frmNegocio = new FormularioNegocio();
                        rsp = frmNegocio.RegistrarFormulario(dataForm);
                    }
                    else
                    {
                        rsp.codigo = -1;
                        rsp.mensaje = "El formulario no contiene ningun campo";
                        rsp.valor = null;
                    }
                }
                else
                {
                    rsp.codigo = -1;
                    rsp.mensaje = "El objeto enviado es inválido";
                }
                jsonResponse = JsonConvert.SerializeObject(rsp);
            }
            catch (Exception ex)
            {
                rsp.codigo = -1;
                rsp.mensaje = string.Empty;
                rsp.error = ex.ToString();
                jsonResponse = JsonConvert.SerializeObject(rsp);
            }
            return jsonResponse;

        }
        [WebMethod]
        static public string getInfoSpTabla(string stringRequest)
        {
            string jsonResponse = string.Empty;
            RespuestaEntidad response = new RespuestaEntidad();
            InfoSpNegocio infoSp = new InfoSpNegocio();
            try
            {
                JObject solicitud = JObject.Parse(stringRequest);
                string nombreSp = (string)solicitud["nombreSp"];
                response = infoSp.infoSpTabla(nombreSp);
                jsonResponse = JsonConvert.SerializeObject(response);
            }
            catch (Exception ex)
            {
                response.codigo = -1;
                response.mensaje = "Ocurrió un error al serializar el objeto";
                response.error = ex.ToString();
                response.valor = null;
                jsonResponse = JsonConvert.SerializeObject(response);

            }
            return jsonResponse;

        }
        [WebMethod]
        static public string getOrigenesList(string stringRequest)
        {
            OrigenesListNegocio _origenesListNegocio = new OrigenesListNegocio();
            RespuestaEntidad rsp = new RespuestaEntidad();
            string jsonResponse = string.Empty;
            try
            {
                rsp = _origenesListNegocio.getOrigenesList();
                jsonResponse = JsonConvert.SerializeObject(rsp);
            }
            catch (Exception ex)
            {
                rsp.codigo = -1;
                rsp.mensaje = "Ocurrió un error al serializar el objeto";
                rsp.error = ex.ToString();
                jsonResponse = JsonConvert.SerializeObject(rsp);
            }
            return jsonResponse;

        }
        [WebMethod]
        static public string getModalsBusqueda(string stringRequest)
        {
            ModalBusquedaNegocio _ModalBusquedaNegocio = new ModalBusquedaNegocio();
            RespuestaEntidad rsp = new RespuestaEntidad();
            string jsonResponse = string.Empty;
            try
            {
                rsp = _ModalBusquedaNegocio.getModalsBusqueda();
                jsonResponse = JsonConvert.SerializeObject(rsp);
            }
            catch (Exception ex)
            {
                rsp.codigo = -1;
                rsp.mensaje = "Ocurrió un error al serializar el objeto";
                rsp.error = ex.ToString();
                jsonResponse = JsonConvert.SerializeObject(rsp);
            }
            return jsonResponse;

        }
    }

    public class infoSpTabla{
        public string nombreSp { get; set; }
        public List<parametros> parametros { get; set; }
        }
    public class parametros
    {
        public string parametro { get; set; }
        public string valor { get; set; }
    }
}