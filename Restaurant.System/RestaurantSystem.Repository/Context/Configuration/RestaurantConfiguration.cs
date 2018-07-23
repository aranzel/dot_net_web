using RestaurantSystem.Repository.Domain;
using System.Data.Entity.ModelConfiguration;

namespace RestaurantSystem.Repository.Context.Configuration
{
    public class RestaurantConfiguration : EntityTypeConfiguration<Restaurant>
    {
        public RestaurantConfiguration()
        { }
    }
}
