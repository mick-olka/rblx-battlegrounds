export function getRemainingProps<T>(props: T, keys: string[] = []) {
	const remainingProps: Record<string, T> = {};

	for (const [key, value] of pairs(props as Record<string, T>)) {
		if (!keys.includes(key)) {
			remainingProps[key] = value;
		}
	}

	return remainingProps;
}
