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
    [RoutePrefix("api/sgbd")]
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

        [HttpPost]
        [Route("knn")]
        public List<SgbdResult> Post([FromBody] CharacteristicsModel sgbdModel)
        {
            List<SgbdResult> distancedItems = new List<SgbdResult>();

            if (sgbdModel.seguranca > 10) sgbdModel.seguranca = 10;
            if (sgbdModel.consistencia_integridade > 10) sgbdModel.consistencia_integridade = 10;
            if (sgbdModel.disponibilidade > 10) sgbdModel.disponibilidade = 10;
            if (sgbdModel.facilidade_uso > 10) sgbdModel.facilidade_uso = 10;
            if (sgbdModel.interoperabilidade > 10) sgbdModel.interoperabilidade = 10;
            if (sgbdModel.desempenho_escalabilidade > 10) sgbdModel.desempenho_escalabilidade = 10;

            List<SgbdModel> data = getDataBase();

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