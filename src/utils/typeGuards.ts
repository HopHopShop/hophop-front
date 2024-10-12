export const isArrayOfImages = (
	images: IImage | IImage[],
): images is IImage[] => {
	return Array.isArray(images);
};
export const getImages = (images: undefined | IImage | IImage[]) => {
	if (images) {
		return isArrayOfImages(images) ? images : [images];
	} else {
		return [];
	}
};
