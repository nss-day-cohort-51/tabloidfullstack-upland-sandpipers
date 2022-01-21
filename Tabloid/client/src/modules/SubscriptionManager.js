const baseUrl = "/api/subscription";

export const addSubscription = (userId, providerUserId) => {
    debugger;
    let subscription = {
        subscriberUserProfileId: parseInt(userId),
        providerUserProfileId: parseInt(providerUserId),
    };
    return fetch(baseUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(subscription),
    });
};

export const cancelSubscription = (subscription) => {
    debugger;
    return fetch(`${baseUrl}/cancelSubscription/`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(subscription),
    });
};

export const deleteSubscription = (subscriptionId) => {
    return fetch(`${baseUrl}/${subscriptionId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((res) => res.json());
};

export const getIsUserSubscribed = (currentUserId, providerUserId) => {
    return fetch(
        `${baseUrl}/GetIsUserSubscribed/?subscriberUserId=${currentUserId}&providerUserId=${providerUserId}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
    ).then((res) => {
        if (res.json().length > 0) {
            return true;
        } else return false;
    });
};

export const getUserProviderSubscription = (currentUserId, providerUserId) => {
    if (!currentUserId || !providerUserId) {
        return null;
    }
    return fetch(
        `${baseUrl}/UserProviderSubscription/?subscriberUserId=${currentUserId}&providerUserId=${providerUserId}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
    ).then((res) => res.json());
};
