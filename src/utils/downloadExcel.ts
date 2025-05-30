const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const downloadFileForUrl = (
  url: string,
  openInNewTab: boolean = false,
) => {
  const fullUrl = `${baseUrl}${url}`;

  if (openInNewTab) {
    // Abrir en nueva pestaña
    window.open(fullUrl, "_blank");
  } else {
    // Descarga tradicional
    const anchor = document.createElement("a");
    anchor.href = `${baseUrl}/${url}`;
    anchor.download = ""; // Puedes especificar un nombre de archivo aquí si es necesario
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  }
};

export const downloadFile = (namefile = "test", blob: Blob) => {
  // Descarga tradicional
  const downloadUrl = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = downloadUrl;
  link.setAttribute("download", `${namefile}`);
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(downloadUrl);
};
