export const exportSqlFile = (sql: string) => {
  const blob = new Blob([sql], { type: 'text/plain' });
  const fileDownloadUrl = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = fileDownloadUrl;
  link.download = 'database.sql';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(fileDownloadUrl);
};