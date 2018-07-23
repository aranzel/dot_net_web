using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RestaurantSystem.Repository.Domain
{
    public class Dish : Base<int>
    {
        [Key]
        public int Id { get; set; }

        [Required, MaxLength(60, ErrorMessage = "Name must be 60 characters or less"), MinLength(3, ErrorMessage = "Name must be 3 characters or plus")]
        public string Name { get; set; }
        public float Value { get; set; }

        [ForeignKey("Restaurant")]
        public virtual int RestaurantId { get; set; }
        public virtual Restaurant Restaurant { get; set; }
    }
}
