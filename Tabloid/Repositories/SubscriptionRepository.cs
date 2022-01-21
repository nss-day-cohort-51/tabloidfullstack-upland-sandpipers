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
    public class SubscriptionRepository : BaseRepository, ISubscriptionRepository
    {
        public SubscriptionRepository(IConfiguration config) : base(config) { }

        public void Add(Subscription subscription)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Subscription (SubscriberUserProfileId, ProviderUserProfileId, BeginDateTime) OUTPUT INSERTED.ID
                                                     VALUES (@subscriberUserProfileId, @providerUserProfileId, @beginDateTime)";
                    cmd.Parameters.AddWithValue("@subscriberUserProfileId", subscription.SubscriberUserProfileId);
                    cmd.Parameters.AddWithValue("@providerUserProfileId", subscription.ProviderUserProfileId);
                    cmd.Parameters.AddWithValue("@beginDateTime", subscription.BeginDateTime);
                    
                    int id = (int)cmd.ExecuteScalar();

                    subscription.Id = id;
                }
            }
        }

        public void Update(Subscription subscription)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE Subscription
                                        SET  subscriberUserProfileId = @subscriberUserProfileId,
                                             providerUserProfileId = @providerUserProfileId,
                                             beginDateTime = @beginDateTime,
                                             endDateTime= @endDateTime
                                        WHERE id = @id";

                    cmd.Parameters.AddWithValue("@subscriberUserProfileId", subscription.SubscriberUserProfileId);
                    cmd.Parameters.AddWithValue("@providerUserProfileId", subscription.ProviderUserProfileId);
                    cmd.Parameters.AddWithValue("@beginDateTime", subscription.BeginDateTime);
                    cmd.Parameters.AddWithValue("@endDateTime", subscription.EndDateTime);
                    cmd.Parameters.AddWithValue("@id", subscription.Id);

                    cmd.ExecuteNonQuery();
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
                    cmd.CommandText = @"DELETE FROM Subscription WHERE id = @id";
                    cmd.Parameters.AddWithValue("@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public Subscription GetActiveUserProviderSubscrption(int subscriberUserId, int providerUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                               Select SubscriberUserProfileId, ProviderUserProfileId,           BeginDateTime, EndDateTime
                               FROM Subscription
                               WHERE SubscriberUserProfileId = @SubscriberUserProfileId 
                                 AND ProviderUserProfileId = @ProviderUserProfileId
                                 AND EndDateTime is null";

                    cmd.Parameters.AddWithValue("@SubscriberUserprofileId", subscriberUserId);
                    cmd.Parameters.AddWithValue("@ProviderUserProfileId", providerUserId);

                    var reader = cmd.ExecuteReader();

                    Subscription subscription = null;
                    if (reader.Read())
                    {
                        subscription = new Subscription()
                        {
                            SubscriberUserProfileId = reader.GetInt32(reader.GetOrdinal("SubscriberUserProfileId")),
                            ProviderUserProfileId = reader.GetInt32(reader.GetOrdinal("ProviderUserProfileId")),
                            BeginDateTime = reader.GetDateTime(reader.GetOrdinal("BeginDateTime")),
                            EndDateTime = DbUtils.GetNullableDateTime(reader, "EndDateTime")
                        };
                    }
                    reader.Close();
                    return subscription;
                }
            }
        }
    }
}
