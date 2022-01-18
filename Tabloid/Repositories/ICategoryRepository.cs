using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    internal interface ICategoryRepository
    {
        void CreateCategory(Category category);
        void Delete(int id);
        List<Category> GetAllCategories();
        Category GetCategoryById(int id);
        void Update(Category category);
    }
}