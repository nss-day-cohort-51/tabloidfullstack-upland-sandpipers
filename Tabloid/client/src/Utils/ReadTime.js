export const getTextReadTimeString = (postText) => {
    const wordCount = postText.split(" ").length;
    const estimatedReadSpead = 265;
    const estimatedTime = Math.ceil(wordCount / estimatedReadSpead);
    if (estimatedTime > 1) {
        return `${estimatedTime} minutes`;
    } else {
        return `1 minute`;
    }
};
