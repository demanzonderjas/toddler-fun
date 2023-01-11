export const isKeyNumber = (activeKey: string | null) => {
	return activeKey === null ? false : /[0-9]/.test(activeKey);
};

export const isKeyAlphabetCharacter = (activeKey: string | null) => {
	return activeKey === null ? false : /^[A-Za-z]$/.test(activeKey);
};

export const isKeyBackspace = (activeKey: string | null) => {
	return activeKey === null ? false : activeKey === "Backspace";
};

export const isArrowKey = (activeKey: string | null) => {
	return activeKey === null ? false : activeKey.slice(0, 5) === "Arrow";
};
