export function slugify(str, preferredChar = "-") {
	if (!str) {
		return "";
	}

	const trimPreferredChar = new RegExp(
		`^${preferredChar}|${preferredChar}$`,
		"g",
	);
	return str
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.replace(/[^\w\d]+/g, preferredChar)
		.replace(trimPreferredChar, "")
		.toLowerCase();
}
