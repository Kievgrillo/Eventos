using System.Threading.Tasks;
using ProEventos.Domain;

namespace ProEventos.Persistence.Contratos
{
    public interface ILotePersist
    {
        /// <summary>
        /// m�todo get que retonar� uma lista de lotes por eventoId
        /// </summary>
        /// <param name="eventoId"> C�digo chave da tabela Evento </param>
        /// <returns>lista de lotes</returns>
        Task<Lote[]> GetLotesByEventoIdAsync(int eventoId);
        /// <summary>
        /// M�todo get que retornar� apenas 1 lote
        /// </summary>
        /// <param name="eventoId"> C�digo chave da tabela Evento</param>
        /// <param name="id"> c�digo chave da tabela lote </param>
        /// <returns>apenas 1 lote</returns>
        Task<Lote> GetLoteByIdsAsync(int eventoId, int id);
       

    }
}