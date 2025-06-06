"use client";

import React, { useEffect } from "react";
import style from "@/styles/HistoryContainer.module.css";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { responseHistory, userProfile } from "@/types";
import { parseFormat } from "@/utils/parseFormat";
import { getHistory } from "@/app/actions";
import { showPasswordError } from "./alerts";
import { useForm } from "react-hook-form";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

interface Props {
  history: responseHistory[];
  users : userProfile[]
}

export default function TableHistory({ history, users }: Props) {
  const router = useRouter();
  const [value, onChange] = useState<Value>(null);
  const [newHistory, setNewHistory] = useState<responseHistory[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const viewConversions = (id: number, fecha: string) => {
    router.push(`/home/history/files/${id}?date=${fecha}`);
  };

  const historyWithIndex = newHistory
    ? newHistory.toReversed().map((item, index) => {
        return {
          index: index + 1,
          ...item,
        };
      })
    : history.toReversed().map((item, index) => {
        return {
          index: index + 1,
          ...item,
        };
      })

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPage = 6;

  const indexOfLastItem = currentPage * itemsPage;
  const indexOfFirstItem = indexOfLastItem - itemsPage;
  const currentItems = historyWithIndex.slice(
    indexOfFirstItem,
    indexOfLastItem
  )

  const totalPages = Math.ceil(historyWithIndex.length / itemsPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const { register, watch } = useForm<{
    user: string;
  }>({
    mode: "onChange",
    defaultValues: {
      user: "",
    },
  });

  useEffect(() => {
    if (value || watch("user") !== "") {
      const historyData = async () => {
        try {
          setLoading(true);
          const response = await getHistory({
            startDate: value ? value.toString() : undefined,
            endDate: value ? value.toString() : undefined,
            idNewUser: watch("user") ? parseInt(watch("user")) : undefined,
          });
          setLoading(false);
          setNewHistory(response.data);
        } catch (error) {
          setLoading(false);
          console.error("Error fetching history data:", error);
          showPasswordError("Error fetching history data");
        }
      };
      historyData();
    } else {
      setNewHistory(null);
    }
    setCurrentPage(1);
  }, [value, watch("user")]);

  

  return (
    <div className={style.historyContainer}>
      <div className={`flex-col md:flex-row ${style.selectDateContainer}`}>
        <div className={`flex-col flex`}>
          <DatePicker onChange={onChange} value={value} locale="en" />
        </div>
        <div className="flex items-center relative w-full md:w-[200px]">
          <select
            {...register("user")}
            className="w-full rounded-[8px] border border-[#b2b2b2] bg-white px-[16px]  h-[40px] outline-none text-[#B2B2B2] font-normal text-[16px] leading-[100%] appearance-none text-black"
            defaultValue={""}
          >
            <option value="">
              See as user
            </option>
            {users.map((ops) => (
              <option key={ops.idUser} value={ops.idUser} className="text-black">
                {ops.name} {ops.last_name} 
              </option>
            ))}
          </select>
          <Image
            src="/arrow-bottom.png"
            alt="arrow down"
            width={16}
            height={16}
            className="absolute right-[15px] pointer-events-none"
          />
        </div>
        {/* <div className={style.filterContainer}>
          <Image
            src="/img/userHistory.png"
            width={16}
            height={16}
            alt="eye"
            className={style.icon}
          />
          <input
            type="text"
            placeholder="See as user"
            className={style.inputText}
          />
        </div> */}
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
            {loading ? (
              <tr>
                <td colSpan={6} className="text-center">
                  Loading...
                </td>
              </tr>
            ) : (
              <>
                {currentItems.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center">
                      No history found
                    </td>
                  </tr>
                )}
                {currentItems.map((item, index) => (
                  <tr key={index}>
                    <td>{item.index}</td>
                    <td>{parseFormat(item.fecha)} </td>
                    <td>{item.archivos.length} </td>
                    <td className={style.vectorOn}>
                      <Image
                        src="/img/VectorOn.png"
                        width={18}
                        height={4}
                        alt="vectorOn"
                      />
                      {item.estado}
                    </td>
                    <td className={style.btnContainer}>
                      <button
                        onClick={() =>
                          viewConversions(item.idPeticion, item.fecha)
                        }
                      >
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
              </>
            )}
          </tbody>
        </table>
      </div>
      {currentItems.length > 0 && (
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
      )}
    </div>
  );
}
