﻿using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
   public class dataFormulario
    {
        public int idFormulario { get; set; }
        public string titulo { get; set; }
        public string descripcion { get; set; }
        public DataTable dtCampos { get; set; }
    }
}
