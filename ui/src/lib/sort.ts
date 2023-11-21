export const sortBySlug = (a: SortableWithSlug, b: SortableWithSlug): number => {
	if (a.slug < b.slug) return -1;
	if (a.slug > b.slug) return 1;
	return 0;
};

export const sortBySlugMoveLast =
	(last: string) =>
	(a: SortableWithSlug, b: SortableWithSlug): number => {
		if (a.slug === last) return 1;
		if (b.slug === last) return -1;
		return sortBySlug(a, b);
	};

interface SortableWithSlug {
	get slug(): string;
}
