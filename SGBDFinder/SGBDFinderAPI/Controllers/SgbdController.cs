using MongoDB.Driver;
using SGBDFinderAPI.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace SGBDFinderAPI.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class SgbdController : ApiController
    {
        public static string ourDBName = ConfigurationManager.AppSettings["mongoName"];
        public static string connStr = ConfigurationManager.ConnectionStrings["connStr"].ConnectionString;
        private MongoClient client = new MongoClient(connStr);

        public List<SgbdModel> getDataBase()
        {
            var database = client.GetDatabase(ourDBName);
            var data = database.GetCollection<SgbdModel>("SGBD").AsQueryable().ToList();
            return data;
        }
        // POST api/<controller>
        public List<SgbdResult> Post([FromBody] SgbdModel sgbdModel)
        {
            List<SgbdResult> distancedItems = new List<SgbdResult>();

            var data = getDataBase();

            foreach (SgbdModel item in data)
            {

                decimal segurancaDistance = sgbdModel.seguranca - item.seguranca;
                decimal consistenciaDistance = sgbdModel.consistencia_integridade - item.consistencia_integridade;
                decimal disponibDistance = sgbdModel.disponibilidade - item.disponibilidade;
                decimal facilidadeDistance = sgbdModel.facilidade_uso - item.facilidade_uso;
                decimal interopDistance = sgbdModel.interoperabilidade - item.interoperabilidade;
                decimal desempenhoDistance = sgbdModel.desempenho_escalabilidade - item.desempenho_escalabilidade;

                decimal sumOfSquare = (segurancaDistance * segurancaDistance)
                    + (consistenciaDistance * consistenciaDistance)
                    + (disponibDistance * disponibDistance)
                    + (facilidadeDistance * facilidadeDistance)
                    + (interopDistance * interopDistance)
                    + (desempenhoDistance * desempenhoDistance);

                double distance = Math.Sqrt((double)sumOfSquare);

                distancedItems.Add(new SgbdResult()
                {
                    nome = item.nome,
                    descricao = item.descricao,
                    link = item.link,
                    caminho_logo = item.caminho_logo,
                    consistencia_integridade = item.consistencia_integridade,
                    facilidade_uso = item.facilidade_uso,
                    disponibilidade = item.disponibilidade,
                    interoperabilidade = item.interoperabilidade,
                    desempenho_escalabilidade = item.desempenho_escalabilidade,
                    seguranca = item.seguranca,
                    distance = (decimal)distance
                });
            }

            return distancedItems.OrderBy(x => x.distance).Take(3).ToList();
        }

    }
}