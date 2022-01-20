const baseUrl = "/api/subscription";

export const addSubscription = (subscription) => {
    subscription.BeginDateTime = Date.now();
    return fetch(baseUrl, {
        method: "POST",
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
