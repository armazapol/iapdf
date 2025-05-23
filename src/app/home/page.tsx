"use client";

import EmailModal from "@/components/EmailModal";
import FileUploadBox from "@/components/FileUploadBox";
import Step from "@/components/Step";
import Image from "next/image";
import { useEffect, useState } from "react";
import {fieldsInit} from "@/utils";

const listReadyFiles = [
  {
    id: 1,
    name: "Brainly Design System Privacy Policy.xls",
    sizeFile: "2.5 MB",
  },
  {
    id: 2,
    name: "Brainly Design System Privacy Policy.xls",
    sizeFile: "2.5 MB",
  },
  {
    id: 3,
    name: "Brainly Design System Privacy Policy.xls",
    sizeFile: "2.5 MB",
  },
  {
    id: 4,
    name: "Brainly Design System Privacy Policy.xls",
    sizeFile: "2.5 MB",
  },
  {
    id: 5,
    name: "Brainly Design System Privacy Policy.xls",
    sizeFile: "2.5 MB",
  },
];

const stepsInit = {
  step1: {
    isShow: true,
    isCompleted: false,
  },
  step2: {
    isShow: false,
    isCompleted: false,
  },
  step3: {
    isShow: false,
    isCompleted: false,
  },
  step4: {
    isShow: false,
    isCompleted: false,
  },
};

export default function PDFToExcelPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [steps, setSteps] = useState(stepsInit);
  const [fields, setFields] = useState(fieldsInit);
  const [showModalSendEmail, setShowModalSendEmail] = useState(false);

  const handleContinueStep1 = () => {
    setSteps((showSteps) => ({
      ...showSteps,
      step1: {
        isShow: false,
        isCompleted: true,
      },
      step2: {
        ...showSteps.step2,
        isShow: true,
      },
    }));
  };

  const handleContinueStep2 = () => {
    setSteps((showSteps) => ({
      ...showSteps,
      step2: {
        isShow: false,
        isCompleted: true,
      },
      step3: {
        ...showSteps.step3,
        isShow: true,
      },
    }));
  };

  const handleContinueStep3 = () => {
    setSteps((showSteps) => ({
      ...showSteps,
      step3: {
        isShow: false,
        isCompleted: true,
      },
      step4: {
        isCompleted: true,
        isShow: false,
      },
    }));
  };

  const handleSelectAllAndUnselectAll = (
    type: "select-all" | "unselected-all"
  ) => {
    const newFields = fields.map((field) => {
      return {
        ...field,
        checked: type === "select-all" ? true : false,
      };
    });
    setFields(newFields);
  };

  const handleConvertAnotherFile = () => {
    setSteps(stepsInit);
    setFields(fieldsInit);
    setFiles([]);
  };

  const handleSendEmail = () => {
    setShowModalSendEmail(true);
  };

  useEffect(() => {
    const simulateLoading = async () => {
      if (steps.step3.isShow && !steps.step3.isCompleted) {
        setLoading(true);

        await new Promise((resolve) => setTimeout(resolve, 3000));

        setLoading(false);
        handleContinueStep3();
      }
    };

    simulateLoading();
  }, [steps]);

  return (
    <main className=" pb-10  md:p-10 flex flex-col ">
      <Step
        title="1. Upload your PDF."
        description="Please upload files in PDF, ZIP or RAR format only, as other formats
          will not be supported."
        isCompleted={steps.step1.isCompleted}
        isShow={steps.step1.isShow}
      >
        <FileUploadBox setFiles={setFiles} files={files} />
        <div className=" my-8">
          <button
            onClick={handleContinueStep1}
            className={`btn-primary w-full`}
            disabled={files.length === 0}
          >
            Continue
          </button>
        </div>
      </Step>
      <Step
        title="2. Choose fields."
        description="Choose the fields you want to be exported..."
        isCompleted={steps.step2.isCompleted}
        isShow={steps.step2.isShow}
      >
        <div
          className={`mt-3 ${
            steps.step2.isCompleted || !steps.step2.isShow ? "hidden" : "block"
          }`}
        >
          <div className="border border-[#2E3A59] rounded-lg p-4 bg-white ">
            <div className="flex gap-4 mb-4">
              <button
                onClick={() => handleSelectAllAndUnselectAll("select-all")}
                className={`btn-primary`}
              >
                Select all
              </button>
              <button
                onClick={() => handleSelectAllAndUnselectAll("unselected-all")}
                className={`btn-primary`}
              >
                Unselect all
              </button>
            </div>
            <div className="flex flex-col gap-2 overflow-y-auto  max-h-[250px]">
              {fields.map((field) => (
                <label
                  key={field.id}
                  className="flex items-center bg-[#F6F8FE] py-3 px-4 rounded-md"
                >
                  <input
                    type="checkbox"
                    className="mr-2 accent-[#2E3A59] "
                    checked={field.checked}
                    onChange={(e) => {
                      const newFields = fields.map((f) =>
                        f.id === field.id
                          ? { ...f, checked: e.target.checked }
                          : f
                      );
                      setFields(newFields);
                    }}
                  />
                  <span>{field.name} </span>
                </label>
              ))}
            </div>
          </div>

          <div className=" my-8 flex gap-6 ">
            <button
              onClick={handleContinueStep2}
              className={`bg-[#B32646] btn-primary flex-1`}
            >
              Skip
            </button>
            <button
              onClick={handleContinueStep2}
              className={`btn-primary flex-1`}
            >
              Continue
            </button>
          </div>
        </div>
      </Step>
      <Step
        title="3. Converting your files."
        description="We’re converting your files. This may take a few minutes, so sit back
          and relax."
        isCompleted={steps.step3.isCompleted}
        isShow={steps.step3.isShow}
      >
        <div className="border border-[#2E3A59] rounded-lg p-4 bg-white border-dotted min-h-[200px] flex items-center justify-center">
          {/* spinner */}
          {loading && (
            <div className="flex flex-col items-center">
              <div className="border-gray-300 h-14 w-14 animate-spin rounded-full border-8 border-t-[#2E3A59]" />
              <p className="text-gray-600 mt-2 font-bold">Procesing...</p>
            </div>
          )}
        </div>

        <div className=" my-8 flex gap-6 ">
          <button
            onClick={handleContinueStep3}
            className={`bg-[#B32646] text-white py-2 px-6 rounded-md  disabled:opacity-50 cursor-pointer flex-1`}
          >
            Cancel upload
          </button>
        </div>
      </Step>

      <Step
        title="4. Save and send files."
        description="Your files are ready! You can save them or send them by email."
        isCompleted={steps.step4.isCompleted}
        isShow={steps.step4.isShow}
        lastStep={true}
      >
        <div className="flex gap-2 items-center mb-6">
          <Image src={"/check_hex.png"} alt="check" width={40} height={40} />
          <p className="text-[#1B881F] font-semibold text-lg">
            Your files are ready!
          </p>
        </div>
        <div className="border border-[#2E3A59] border-dotted rounded-lg p-4 bg-white ">
          <div className="flex flex-col gap-2">
            {listReadyFiles.map((file) => (
              <div
                key={file.id}
                className="flex items-center justify-between  py-3 px-4 rounded-md"
              >
                <div className="flex items-center gap-2">
                  <Image
                    src={"/icon_excel.png"}
                    alt="icon_excel"
                    width={30}
                    height={30}
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold">{file.name}</span>
                    <span className="text-xs text-gray-600 opacity-50">
                      {file.sizeFile}
                    </span>
                  </div>
                </div>
                <button className="bg-[#F4F4F5] text-[#2E3A59] py-2 px-4 rounded-md flex items-center gap-2">
                  <Image
                    src={"/svg/icons/download.svg"}
                    alt="download"
                    width={15}
                    height={15}
                    className="invert brightness-[#2E3A59]"
                  />
                  <span className="text-sm">Download</span>
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center mt-4">
          <div className="flex w-full  md:w-[60%] gap-2 md:gap-6">
            <button
              onClick={handleSendEmail}
              className={`bg-white text-[#2E3A59] py-2 px-2 md:px-6 rounded-md  disabled:opacity-50 cursor-pointer flex-1 flex items-center gap-2 justify-center`}
            >
              <Image
                src={"/svg/icons/send.svg"}
                alt="send"
                width={15}
                height={15}
                className="invert brightness-[#2E3A59]"
              />
              <span className="font-semibold">Send by email</span>
            </button>
            <button
              // onClick={handleContinueStep2}
              className={`bg-[#2E3A59] text-white py-2 px-2 md:px-6 rounded-md  disabled:opacity-50 cursor-pointer flex-1 flex items-center gap-2 justify-center`}
            >
              <Image
                src={"/svg/icons/download.svg"}
                alt="download"
                width={15}
                height={15}
                className="invert brightness-0"
              />
              <span className="font-semibold">Download all</span>
            </button>
          </div>
        </div>
        <div className="flex my-4 md:my-8">
          <button
            onClick={handleConvertAnotherFile}
            className={`bg-[#2E3A59] text-white py-2 px-6 rounded-md  disabled:opacity-50 cursor-pointer flex-1`}
          >
            Convert another file
          </button>
        </div>
      </Step>
      {
        <EmailModal
          showModal={showModalSendEmail}
          onClose={() => setShowModalSendEmail(false)}
        />
      }
    </main>
  );
}
