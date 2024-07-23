import React, { useState } from "react";
import { Line } from "react-chartjs-2";

export const PortfolioSummary = () => {
  const [tab, setTab] = useState(0);

  return (
    <div className={"bg-white w-full rounded-lg p-5"}>
      <div>
        <Line
          data={{
            labels: [
              "",
              "8 Jan 2023",
              "",
              "",
              "22 Jan 2023",
              "",
              "",
              "5 Feb 2023",
              "",
              "",
              "19 Feb 2023",
              "",
              "",
              "5 Mar 2023",
              "",
              "",
              "19 Mar 2023",
              "",
              "",
              "2 Apr 2023",
              "",
              "",
              "16 Apr 2023"
            ],
            datasets: [
              {
                data: [
                  1000, 1010, 1020, 1030, 1040, 1040, 1045, 1050, 1055, 1160, 1000, 1000, 1005, 1010, 1015, 1320, 2000, 2000, 2015, 2030,
                  2045, 2060, 0
                ],
                borderColor: "#11CB79",
                fill: false,
                label: "",
                pointStyle: false
              }
            ]
          }}
          width={400}
          height={250}
          options={{
            responsive: true,
            plugins: {
              legend: {
                display: false
              },
              title: {
                display: true,
                text: "Total Balance vs. Date"
              }
            }
          }}
        />
      </div>

      <div className={"mt-5 p-1 flex items-center space-x-2 rounded-[6px] h-[38px]"}>
        <div
          className={`${
            tab === 0 ? "bg-[#EBEBEB]" : "bg-[rgba(0,0,0,0.04)]"
          } cursor-pointer h-[30px] rounded-[6px] p-2 flex flex-1 items-center justify-center`}
          onClick={() => setTab(0)}
        >
          WEEK
        </div>
        <div
          className={`${
            tab === 1 ? "bg-[#EBEBEB]" : "bg-[rgba(0,0,0,0.04)]"
          } cursor-pointer h-[30px] rounded-[6px] p-2 flex flex-1 items-center justify-center`}
          onClick={() => setTab(1)}
        >
          MONTH
        </div>
        <div
          className={`${
            tab === 2 ? "bg-[#EBEBEB]" : "bg-[rgba(0,0,0,0.04)]"
          } cursor-pointer h-[30px] rounded-[6px] p-2 flex flex-1 items-center justify-center`}
          onClick={() => setTab(2)}
        >
          ALL TIME
        </div>
      </div>
    </div>
  );
};
