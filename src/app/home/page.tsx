export default function PDFToExcelPage() {
  return (
      <main className="h-[100%] w-[100%] p-10 over">

        <section className="space-y-6 ">
          <div>
            <h2 className="text-lg font-semibold">1. Upload your PDF.</h2>
            <p className="text-gray-600">
              Please upload files in PDF, ZIP or RAR format only, as other
              formats will not be supported.
            </p>
          </div>
          <div className="border-2 border-dashed border-gray-300 rounded-md p-10 text-center space-y-2 bg-gray-50">
            <div className="text-4xl">📄</div>
            <p>
              <strong>Drop file or Browse</strong>
              <br />
              <span className="text-sm text-gray-500">
                Format: pdf, zip, rar
              </span>
            </p>
            <button className="px-4 py-2 bg-[#2E3A59] text-white rounded-md hover:pointer m-auto">
              📤 Browse
            </button>
            <p className="text-xs text-gray-400">
              Or Drop files in the drop zone above.
            </p>
          </div>

          <div className="flex justify-center">
            <button className="bg-[#2E3A59] text-white py-2 px-6 rounded-md opacity-50 cursor-not-allowed w-[80%]">
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
