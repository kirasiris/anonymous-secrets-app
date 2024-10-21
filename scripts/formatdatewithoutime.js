export const formatDateWithoutTime = (createdAt) => {
	return new Date(createdAt).toLocaleDateString();
};
