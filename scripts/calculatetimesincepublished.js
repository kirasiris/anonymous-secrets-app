const calculateTimeSincePublished = (createdAt) => {
	const currentTime = new Date();
	const publishedTime = new Date(createdAt);
	const timeDifference = currentTime - publishedTime;

	const seconds = Math.floor(timeDifference / 1000);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 24);

	if (days > 0) {
		return `${days} day${days > 1 ? "s" : ""} ago`;
	} else if (hours > 0) {
		return `${hours} hour${hours > 1 ? "s" : ""} ago`;
	} else if (minutes > 0) {
		return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
	} else {
		return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
	}
};

export default calculateTimeSincePublished;
