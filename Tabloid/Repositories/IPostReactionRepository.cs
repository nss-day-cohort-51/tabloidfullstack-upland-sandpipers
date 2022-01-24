using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface IPostReactionRepository
    {
        void Add(PostReaction postReaction);
        void clearPostReactionsForPost(int postId);
        void Delete(int id);
        PostReaction GetById(int id);
        List<PostReaction> GetPostReactionsByPostId(int id);
        List<PostReaction> GetAll();

    }
}