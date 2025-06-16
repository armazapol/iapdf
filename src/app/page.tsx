'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';


export default function Home() {
  // const [file, setFile] = useState<File | null>(null);
  // const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const router = useRouter()

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const selected = e.target.files?.[0];
  //   if (selected) {
  //     setFile(selected);
  //     setPreviewUrl(URL.createObjectURL(selected));
  //   }
  // };

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!file) return alert("Selecciona un archivo primero");

  //   // Aquí iría lógica para subir al backend (por ejemplo con fetch)
  //   alert(`Archivo ${file.name} listo para subir`);
  // };

  useEffect(() => {
     router.push('/home');
  })
  

  return (
    <div>

    </div>
    // <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 p-4">

    //   <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full space-y-6">
    //     <h1 className="text-2xl font-bold text-center text-blue-700">Subir Documento</h1>
        
    //     <form onSubmit={handleSubmit} className="space-y-4">
    //       <label className="block">
    //         <span className="block text-sm font-medium text-gray-700 mb-2">Selecciona un archivo</span>
    //         <input
    //           type="file"
    //           accept=".pdf,image/*"
    //           onChange={handleFileChange}
    //           className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
    //         />
    //       </label>

    //       {previewUrl && file?.type.startsWith('image') && (
    //         <div className="mt-4">
    //           <img src={previewUrl} alt="preview" className="rounded-lg max-h-64 mx-auto" />
    //         </div>
    //       )}

    //       {previewUrl && file?.type === 'application/pdf' && (
    //         <div className="text-sm text-center text-gray-600 mt-4">
    //           <strong>{file.name}</strong> (PDF)
    //         </div>
    //       )}

    //       <button
    //         type="submit"
    //         className="w-full bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 transition"
    //       >
    //         Subir Archivo
    //       </button>
    //     </form>
    //   </div>
    // </main>
  );
}
