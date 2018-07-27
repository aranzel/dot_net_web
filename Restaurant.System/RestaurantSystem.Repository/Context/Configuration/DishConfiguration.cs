using RestaurantSystem.Repository.Domain;
using System.Data.Entity.ModelConfiguration;

namespace RestaurantSystem.Repository.Context.Configuration
{
    public class DishConfiguration : EntityTypeConfiguration<Dish>
    {
        public DishConfiguration()
        {
            this.HasRequired(d => d.Restaurant)
                .WithMany(r => r.Dishes)
                .HasForeignKey(d => d.RestaurantId)
                .WillCascadeOnDelete(true);
        }
    }
}
