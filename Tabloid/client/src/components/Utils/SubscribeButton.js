import { Button } from "reactstrap";

export const SubscribeButton = ({
    handleSubscribeClicked,
    post,
    isSubscribed,
}) => {
    return (
        <Button
            className="mt-2"
            color="success"
            onClick={handleSubscribeClicked}
        >
            {!isSubscribed
                ? `Subscribe To ${post.userProfile?.displayName}'s Feed`
                : `Unubscribe From ${post.userProfile?.displayName}'s Feed`}
        </Button>
    );
};
