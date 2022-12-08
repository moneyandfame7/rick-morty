/**
 * Принимает в параматрах URL и возвращает id из этого URL `(последние цифры после "/")`.
 * @example
 * входные параметры - https://website.com/123
 * возврат -  123
 */

export const getIdFromName = (url: string): number => parseInt(url.split("/")[url.split("/").length - 1]);
