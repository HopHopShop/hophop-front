'use server';
import { revalidatePath } from 'next/cache';

export const revalidateFunc = async (
	path: string,
	type: 'page' | 'layout' | null = 'page',
) => {
	if (type) {
		return revalidatePath(path, type);
	} else {
		return revalidatePath(path);
	}
};
