using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface ITagRepository
    {
        List<Tag> GetAllTags();
        void CreateTag(Tag tag);
        void Delete(int id);
        Tag GetTagById(int id);
        void Update(Tag tag);

        void AddTagToPost(PostTag postTag);
    }
}
