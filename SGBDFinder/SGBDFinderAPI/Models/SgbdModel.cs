using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SGBDFinderAPI.Models
{
    public class SgbdModel : CharacteristicsModel
    {
        public object _id { get; set; }
        public string nome { get; set; }
        public  string descricao { get; set; }
        public string caminho_logo { get; set; }
        public string link { get; set; }
        
    }

    public class CharacteristicsModel
    {
        public decimal seguranca { get; set; }
        public decimal consistencia_integridade { get; set; }
        public decimal disponibilidade { get; set; }
        public decimal facilidade_uso { get; set; }
        public decimal interoperabilidade { get; set; }
        public decimal desempenho_escalabilidade { get; set; }
    }

    public class SgbdResult : SgbdModel
    {
        public decimal distance { get; set; }
    }
}