"use client";
import Image from "next/image";
import style from "@/styles/FileHistory.module.css";
import Link from "next/link";
import { parseFormat } from "@/utils/parseFormat";
import { responseFiles } from "@/types";
import { useState } from "react";
import { downloadFile } from "@/utils/downloadExcel";
import { showPasswordError } from "./alerts";
import { getDownloadFile, getDownloadZIP } from "@/app/actions";
import EmailModal from "./EmailModal";

type Props = {
  date: string;
  files: responseFiles[];
  idPDF: number;
};

type DynamicObject = {
  [key: string]: boolean;
};

export default function ViewFiles({ date, files, idPDF }: Props) {
  const [loadingDownloadZip, setLoadingDownloadZip] = useState(false);
  const [loadingDownloadFiles, setLoadingDownloadFiles] =
    useState<DynamicObject>({});
  const [showModalSendEmail, setShowModalSendEmail] = useState(false);

  const handleDownloadZipFiles = async (idPDF: number) => {
    setLoadingDownloadZip(true);
    try {
      const { blob, nameFile } = await getDownloadZIP(idPDF);
      setLoadingDownloadZip(false);
      downloadFile(nameFile, blob);
    } catch (error) {
      setLoadingDownloadZip(false);
      showPasswordError("Error downloading zip files");
      console.error("Error downloading zip files:", error);
    }
  };

  const handleDownloadFile = async (namefile: string) => {
    setLoadingDownloadFiles((stateLoadingFiles) => ({
      ...stateLoadingFiles,
      [namefile]: true,
    }));
    try {
      const response = await getDownloadFile(namefile);
      setLoadingDownloadFiles((stateLoadingFiles) => ({
        ...stateLoadingFiles,
        [namefile]: false,
      }));
      downloadFile(namefile, response);
    } catch (error) {
      setLoadingDownloadFiles((stateLoadingFiles) => ({
        ...stateLoadingFiles,
        [namefile]: false,
      }));
      showPasswordError("Error downloading file");
      console.error("Error downloading file:", error);
    }
  };

  return (
    <div className={`${style.container} mt-5 lg:mt-0`}>
      <Link href="/home/history" className={style.link}>
        <div className={style.backArrow}>
          <Image
            src="/arrow-right.png"
            alt="back arrox"
            width={24}
            height={24}
            //   onClick={goBack}
            className={style.flecha}
          />
          <p>Back to history</p>
        </div>
      </Link>
      <div className={style.subContainer}>
        <div className={style.dateSubmitted}>
          <span>
            Date Submitted:<p>{parseFormat(date)} </p>
          </span>
        </div>
        <div className={style.padre}>
          <div className={style.linea}></div>
          {files.map((file, index) => (
            <div key={index} className={style.fileContainer}>
              <div className={style.files}>
                <div className={style.file}>
                  <Image
                    // src={file.img}
                    src="/img/File-history.png"
                    alt={`File ${index}`}
                    width={32}
                    height={40}
                  />
                  <div>
                    <p className={style.title}>{file.namefile}</p>
                    <p className={style.peso}>50mb</p>
                  </div>
                </div>
                <button
                  className={style.btnDownload}
                  onClick={() => handleDownloadFile(file.namefile)}
                  disabled={loadingDownloadFiles[file.namefile]}
                >
                  <Image
                    className=""
                    src="/img/download.png"
                    alt="download"
                    width={15}
                    height={15}
                  />{" "}
                  <span className="hidden md:block">
                    {" "}
                    {loadingDownloadFiles[file.namefile]
                      ? "Downloading..."
                      : "Download"}
                  </span>{" "}
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className={style.sendContainer}>
          <button className={style.btnSend} onClick={() => setShowModalSendEmail(true)}>
            <Image src="/img/send.png" alt="send" width={18} height={18} />
            Send by email
          </button>
          <button
            className={style.btnDownload2}
            onClick={() => handleDownloadZipFiles(idPDF)}
            disabled={loadingDownloadZip}
          >
            <Image
              src="/img/download2.png"
              alt="download"
              width={18}
              height={18}
            />
            {loadingDownloadZip ? "Downloading..." : "Download all"}
          </button>
        </div>
      </div>
      {
        <EmailModal
          showModal={showModalSendEmail}
          onClose={() => setShowModalSendEmail(false)}
        />
      }
    </div>
  );
}
