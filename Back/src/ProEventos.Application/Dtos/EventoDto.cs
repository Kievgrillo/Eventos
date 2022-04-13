using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ProEventos.Application.Dtos
{
    public class EventoDto
    {
        public int Id { get; set; }
        public string Local { get; set; }
        public string DataEvento { get; set; }
        
        [Required(ErrorMessage = "O campo {0} é obrigatório."),
         MinLength(4, ErrorMessage = "{0} deve ter no mínimo 5 caracteres."),
         MaxLength(40, ErrorMessage = "{0} deve ter no máximo 40 caracteres")]
        public string Tema { get; set; }
        
        [Display(Name = "Qtd Pessoas")]
        [Range(1, 10000, ErrorMessage = "{0} não pode ser menor que 1 e maior que 10000")]
        public int QtdPessoas { get; set; }
        
        [RegularExpression(@".*\.(gif|jpe?g|bmp|png)$", ErrorMessage = "Não é uma imagem válida. (gif, jpg, jpeg, bmp ou png)")]
        public string ImagemURL { get; set; }
        
        [Required(ErrorMessage = "O campo {0} é obrigatório")]
        [Phone(ErrorMessage = "O campo {0} está com número inválido")]
        public string Telefone { get; set; }
        
        [Required(ErrorMessage = "O campo {0} é obrigatório.")]
        [Display(Name = "e-mail")]
        [EmailAddress(ErrorMessage = "É necessário ser um {0} válido")]
        public string Email { get; set; }
        public int UserId { get; set; }
        public UserDto UserDto { get; set; }

        public IEnumerable<LoteDto> Lotes { get; set; }
        public IEnumerable<RedeSocialDto> RedesSociais { get; set; }
        public IEnumerable<PalestranteDto> PalestrantesEventos { get; set; }
    }
}
