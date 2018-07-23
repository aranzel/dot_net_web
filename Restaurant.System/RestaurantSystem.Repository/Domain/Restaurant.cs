using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace RestaurantSystem.Repository.Domain
{
    public class Restaurant : Base<int>
    {
        [Key]
        public int Id { get; set; }

        [Required, MaxLength(60, ErrorMessage = "Name must be 60 characters or less"), MinLength(3, ErrorMessage = "Name must be 3 characters or plus")]
        public string Name { get; set; }

        public virtual ICollection<Dish> Dishes { get; set; }
    }
}
