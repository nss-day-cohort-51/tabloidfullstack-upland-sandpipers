using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    internal interface IPostTagRepository
    {
        void Delete(int id);
        PostTag GetById(int id);
        List<PostTag> GetPostTagsByPostId(int id); 
    }
}