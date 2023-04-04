export const getIdFromName = (url: string): number => parseInt(url.split("/")[url.split("/").length - 1]);
