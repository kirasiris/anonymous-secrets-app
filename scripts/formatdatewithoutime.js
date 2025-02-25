const formatDateWithoutTime = (createdAt) => {
	return new Date(createdAt).toLocaleDateString();
};

export default formatDateWithoutTime;
