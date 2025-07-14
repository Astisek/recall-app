export const parseFilesUrl = (filesPath: string) => {
  const pathnameDirectories = filesPath.replace('/files/', '').split('/');
  pathnameDirectories.pop();
  return pathnameDirectories.map(decodeURIComponent);
};
