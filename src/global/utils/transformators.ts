export const joinClassNames = (classNamesArray: (string | false | undefined)[]): string => {
	const filteredArray = classNamesArray.filter(className => !!className);
	if (!filteredArray.length) {
		return undefined;
	}

	return filteredArray.join(' ');
};
