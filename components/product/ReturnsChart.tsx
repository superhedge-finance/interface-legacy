import React from "react";
import { Line } from "react-chartjs-2";

export const ReturnsChart = ({
  tr1,
  tr2,
  strikePrice1,
  strikePrice2,
  strikePrice3
}: {
  tr1: number;
  tr2: number;
  strikePrice1: number;
  strikePrice2: number;
  strikePrice3: number;
}) => {
  return (
    <div className={"mt-5"}>
      <Line
        data={{
          labels:
            strikePrice3 > 0
              ? ["", strikePrice1 / 100, strikePrice2 / 100, strikePrice3 / 100, ""]
              : ["", "", "", strikePrice1 / 100, strikePrice2 / 100, "", "", ""],
          datasets: [
            {
              data:
                strikePrice3 > 0
                  ? [tr2 / 100, tr2 / 100, tr1 / 100, tr2 / 100, tr2 / 100]
                  : [tr2 / 100, tr2 / 100, tr2 / 100, tr2 / 100, tr1 / 100, tr1 / 100, tr1 / 100, tr1 / 100],
              borderColor: "#11CB79",
              fill: false,
              pointStyle: false
            }
          ]
        }}
        width={400}
        height={150}
        options={{
          plugins: {
            title: {
              display: true,
              text: 'Total Returns(%)',
              align: 'start',
              padding: {
                bottom: 20
              }
            },
            legend: {
              display: false
            }
          },
          scales: {
            y: {
              min: tr1 > tr2 ? tr2 / 100 : tr1 / 100,
              max: tr1 > tr2 ? tr1 / 100 : tr2 / 100,
              ticks: {
                stepSize: (Math.abs(tr1 - tr2)) / 100
              }
            },
            x: {
              title: {
                display: true,
                align: 'end',
                text: "ETH (`00)"
              }
            }
          }
        }}
      />
    </div>
  );
};
