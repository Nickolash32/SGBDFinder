using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SGBDFinderAPI.Models
{
    public class SgbdModel
    {
        public object _id { get; set; }
        public string nome { get; set; }
        public  string descricao { get; set; }
        public string caminho_logo { get; set; }
        public string link { get; set; }
        public int seguranca { get; set; }
        public int consistencia_integridade { get; set; }
        public int disponibilidade { get; set; }
        public int facilidade_uso { get; set; }
        public int interoperabilidade { get; set; }
        public int desempenho_escalabilidade { get; set; }
        
    }

    public class CharacteristicsModel
    {
        public int seguranca { get; set; }
        public int consistencia_integridade { get; set; }
        public int disponibilidade { get; set; }
        public int facilidade_uso { get; set; }
        public int interoperabilidade { get; set; }
        public int desempenho_escalabilidade { get; set; }
    }

    public class SgbdResult : SgbdModel
    {
        public decimal distance { get; set; }
    }
}