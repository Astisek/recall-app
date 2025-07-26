export const formatFileName = (fileName: string) => {
  const illegalRe = /[/\\:*?"<>|]/g;
  // eslint-disable-next-line no-control-regex
  const controlRe = /[\u0000-\u001F\u0080-\u009F]/g;
  const reservedRe = /^\.+$/;

  let sanitized = fileName.trim().replace(illegalRe, '').replace(controlRe, '');

  if (reservedRe.test(sanitized)) {
    sanitized = '';
  }

  return sanitized.slice(0, 255);
};
