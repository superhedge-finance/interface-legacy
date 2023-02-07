import React from "react";
import {Line} from 'react-chartjs-2';

export const ReturnsChart = ({ tr1, tr2, strikePrice1, strikePrice2 }: {
    tr1: number, tr2: number, strikePrice1: number, strikePrice2: number
}) => {
    return (
        <div className={'mt-5'}>
            <Line
                data={{
                    labels: ['', '', '', strikePrice1 / 100, strikePrice2 / 100, '', '', '', ''],
                    datasets: [{
                        data: [tr2 / 100,tr2 / 100,tr2 / 100,tr2 / 100,tr1 / 100,tr1 / 100,tr1 / 100,tr1 / 100,tr1 / 100],
                        borderColor: "#11CB79",
                        fill: false,
                        pointStyle: false,
                    }],
                }}
                width={400}
                height={200}
                options={{
                    plugins: {
                        legend: {
                            display: false
                        },
                    },
                    scales: {
                        xAxes: {
                            display: false,
                        },
                        yAxes: {
                            display: true,
                            min: 90,
                            max: 130,
                        }
                    },
                }}
            />
        </div>
    )
}
