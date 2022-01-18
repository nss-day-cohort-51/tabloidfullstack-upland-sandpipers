using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    internal interface ICommentRepository
    {
        void Add(Comment comment);
        void Delete(int id);
        List<Comment> GetAllCommentsByPostId(int postId);
        Comment GetCommentById(int id);
        void Update(Comment comment);
    }
}