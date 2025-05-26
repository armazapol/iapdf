"use client";

import React from "react";
import style from "@/styles/HistoryContainer.module.css";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { responseHistory } from "@/types";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

interface Props{
  history: responseHistory[]
}

export default function TableHistory({history}:Props) {
  const router = useRouter();
  const [value, onChange] = useState<Value>(new Date());

  const viewConversions = () => {
    router.push(`/home/history/files`);
  };

  // const history2 = [
  //   { Nro: 1, DateSubmited: "04/18/2025", TotalFiles: 20, status: "queued" },
  //   { Nro: 2, DateSubmited: "04/18/2025", TotalFiles: 20, status: "Converted" },
  //   { Nro: 3, DateSubmited: "04/18/2025", TotalFiles: 20, status: "Converted" },
  //   { Nro: 4, DateSubmited: "04/18/2025", TotalFiles: 20, status: "Converted" },
  //   { Nro: 5, DateSubmited: "04/18/2025", TotalFiles: 20, status: "Converted" },
  //   { Nro: 6, DateSubmited: "04/18/2025", TotalFiles: 20, status: "Converted" },
  //   { Nro: 7, DateSubmited: "04/18/2025", TotalFiles: 18, status: "Converted" },
  //   { Nro: 8, DateSubmited: "04/18/2025", TotalFiles: 20, status: "Converted" },
  //   { Nro: 9, DateSubmited: "04/18/2025", TotalFiles: 20, status: "Converted" },
  //   {
  //     Nro: 10,
  //     DateSubmited: "04/18/2025",
  //     TotalFiles: 20,
  //     status: "Converted",
  //   },
  //   {
  //     Nro: 11,
  //     DateSubmited: "04/18/2025",
  //     TotalFiles: 20,
  //     status: "Converted",
  //   },
  //   {
  //     Nro: 12,
  //     DateSubmited: "04/18/2025",
  //     TotalFiles: 20,
  //     status: "Converted",
  //   },
  //   {
  //     Nro: 13,
  //     DateSubmited: "04/18/2025",
  //     TotalFiles: 20,
  //     status: "Converted",
  //   },
  //   {
  //     Nro: 14,
  //     DateSubmited: "04/18/2025",
  //     TotalFiles: 20,
  //     status: "Converted",
  //   },
  // ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPage = 6;

  const indexOfLastItem = currentPage * itemsPage;
  const indexOfFirstItem = indexOfLastItem - itemsPage;
  const currentItems = history.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(history.length / itemsPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className={style.historyContainer}>
      <div className={`flex-col md:flex-row ${style.selectDateContainer}`}>
        <div className={`flex-col flex`}>
          <DatePicker onChange={onChange} value={value} locale="en" />
        </div>
        <div className={style.filterContainer}>
          <Image
            src="/img/userHistory.png"
            width={16}
            height={16}
            alt="eye"
            className={style.icon}
          />
          <input type="text" placeholder="See as user"   className={style.inputText} />
        </div>
      </div>
      <div className="overflow-x-auto mb-5">
        <table className={style.TableHistory}>
          <thead>
            <tr>
              <th>No.</th>
              <th>Date submited</th>
              <th>Total files converted</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr key={index}>
                <td>{index+1}</td>
                <td>Falta campo</td>
                <td>Falta campo</td>
                <td className={style.vectorOn}>
                  <Image
                    src="/img/VectorOn.png"
                    width={18}
                    height={4}
                    alt="vectorOn"
                  />
                  {item.state}
                </td>
                <td className={style.btnContainer}>
                  <button onClick={viewConversions}>
                    <Image
                      src="/img/eyeWhite.png"
                      width={18}
                      height={18}
                      alt="eye"
                    />{" "}
                    View Files
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={style.paginationContainer}>
        {currentPage > 4 && (
          <button
            className={style.btnArrow}
            onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#2E3A59"
              strokeWidth="1.0"
              width="16"
              height="16"
            >
              <path
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        )}

        {Array.from({ length: totalPages }, (_, index) => index + 1)
          .filter((page) => {
            const start = Math.floor((currentPage - 1) / 4) * 4 + 1;
            return page >= start && page < start + 4;
          })
          .map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={currentPage === page ? style.activePage : ""}
            >
              {page}
            </button>
          ))}
        <button
          className={`${style.btnArrow} ${
            currentPage >= totalPages ? style.btnArrowDisabled : ""
          }`}
          onClick={() =>
            setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))
          }
          disabled={currentPage >= totalPages}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="#2E3A59"
            strokeWidth="1.0"
            width="16"
            height="16"
          >
            <path
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
        <button
          className={`${style.btnArrow} ${
            currentPage + 1 >= totalPages ? style.btnArrowDisabled : ""
          }`}
          onClick={() =>
            setCurrentPage((prevPage) => Math.min(prevPage + 2, totalPages))
          }
          disabled={currentPage + 1 >= totalPages}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="#2E3A59"
            strokeWidth="1"
            width="16"
            height="16"
          >
            <path
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13 5l7 7-7 7M4 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
