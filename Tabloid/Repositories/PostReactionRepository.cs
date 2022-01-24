using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid.Models;
using System.Data;
using System.Reflection.PortableExecutable;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Tabloid.Utils;

namespace Tabloid.Repositories
{
    public class PostReactionRepository : BaseRepository, IPostReactionRepository
    {
        public PostReactionRepository(IConfiguration config) : base(config) { }

        public PostReaction GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT PostId, ReactionID
                         FROM PostReaction
                        WHERE Id = @id;";

                    cmd.Parameters.AddWithValue("@id", id);
                    var reader = cmd.ExecuteReader();

                    PostReaction postReaction = new PostReaction();

                    if (reader.Read())
                    {
                        postReaction.Id = id;
                        postReaction.PostId = reader.GetInt32(reader.GetOrdinal("PostId"));
                        postReaction.ReactionId = reader.GetInt32(reader.GetOrdinal("ReactionId"));
                    }

                    reader.Close();

                    return postReaction;
                }
            }
        }
        public List<PostReaction> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT pr.Id, pr.PostId, pr.ReactionId, pr.UserProfileId, r.Name
                         FROM PostReaction pr
                              LEFT JOIN Reaction r ON r.Id = pr.ReactionId
                              LEFT JOIN Post p ON p.id= pr.PostId
                        ";


                    var reader = cmd.ExecuteReader();

                    List<PostReaction> postReactions = new List<PostReaction> { };

                    while (reader.Read())
                    {
                        PostReaction postReaction = new PostReaction()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            PostId = reader.GetInt32(reader.GetOrdinal("PostId")),
                            ReactionId = reader.GetInt32(reader.GetOrdinal("ReactionId")),
                            Reaction = new Reaction()
                            {   
                                Name = reader.GetString(reader.GetOrdinal("Name")),
                            }
                        };

                        postReactions.Add(postReaction);
                    }

                    reader.Close();

                    return postReactions;
                }
            }
        }
        public List<PostReaction> GetPostReactionsByPostId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT pr.Id, pr.PostId, pr.ReactionId, pr.UserProfileId, r.Name, r.ImageLocation
                         FROM PostReaction pr
                              LEFT JOIN Reaction r ON r.Id = pr.ReactionId
                              LEFT JOIN Post p ON p.id= pr.PostId
                        WHERE p.id = @id";

                    cmd.Parameters.AddWithValue("@id", id);
                    var reader = cmd.ExecuteReader();

                    List<PostReaction> postReactions = new List<PostReaction> { };

                    while (reader.Read())
                    {
                        PostReaction postReaction = new PostReaction()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            PostId = reader.GetInt32(reader.GetOrdinal("PostId")),
                            ReactionId = reader.GetInt32(reader.GetOrdinal("ReactionId")),
                            Reaction = new Reaction()
                            {
                                Name = reader.GetString(reader.GetOrdinal("Name")),
                                ImageLocation = reader.GetString(reader.GetOrdinal("ImageLocation")),
                            }
                        };

                        postReactions.Add(postReaction);
                    }

                    reader.Close();

                    return postReactions;
                }
            }
        }
        public void Add(PostReaction postReaction)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO PostReaction (PostId, ReactionId, UserProfileId) OUTPUT INSERTED.ID
                                                     VALUES (@postId, @reactionId, @userProfileId)";
                    cmd.Parameters.AddWithValue("@postId", postReaction.PostId);
                    cmd.Parameters.AddWithValue("@reactionId", postReaction.ReactionId);
                    cmd.Parameters.AddWithValue("@userProfileId", postReaction.UserProfileId);

                    int id = (int)cmd.ExecuteScalar();

                    postReaction.Id = id;
                }
            }
        }
        public void Delete(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"DELETE FROM PostReaction WHERE id = @id";
                    cmd.Parameters.AddWithValue("@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
        public void clearPostReactionsForPost(int postId)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"DELETE FROM PostReaction WHERE PostId = @postId";
                    cmd.Parameters.AddWithValue("@postId", postId);

                    cmd.ExecuteNonQuery();
                }
            }

        }

    }
}
