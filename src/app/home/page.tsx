import FileUploadBox from "@/components/FileUploadBox";


export default function PDFToExcelPage() {
  return (
      <main className="h-[100%] w-[100%] p-10 over ">
          <div className="mb-3">
            <h2 className="text-lg font-semibold">1. Upload your PDF.</h2>
            <p className="text-gray-600">
              Please upload files in PDF, ZIP or RAR format only, as other
              formats will not be supported.
            </p>
          </div>
      <FileUploadBox  />
        <section className="space-y-6 mt-3 ">

          <div className="flex justify-center mt-8">
            <button className="bg-[#2E3A59] text-white py-2 px-6 rounded-md  cursor-not-allowed w-[80%]">
              Continue
            </button>
          </div>

          <div className="space-y-4 mt-8 text-sm text-gray-700">
            <p>
              <strong>2. Choose fields:</strong> Choose the fields you want to
              be exported with the document.
            </p>
            <p>
              <strong>3. Converting your files:</strong> We’re converting your
              files. This may take a few minutes, so sit back and relax.
            </p>
            <p>
              <strong>4. Save and send files:</strong> Your files are ready! You
              can save them or send them by email.
            </p>
          </div>
        </section>
      </main>

  );
}
