const baseUrl = process.env.NEXT_PUBLIC_API_URL

const downloadExcel = (url:string) => {
    const anchor = document.createElement("a");
    anchor.href = `${baseUrl}/${url}`;
    anchor.download = ""; // Puedes especificar un nombre de archivo aquí si es necesario
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
}

export default downloadExcel