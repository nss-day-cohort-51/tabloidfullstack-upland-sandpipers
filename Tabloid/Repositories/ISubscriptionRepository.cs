using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface ISubscriptionRepository
    {
        void Add(Subscription subscription);
        void Delete(int id);
        Subscription GetActiveUserProviderSubscrption(int subscriberUserId, int providerUserId);
        void Update(Subscription subscription);
    }
}