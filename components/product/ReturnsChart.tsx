import React from "react";
import {Line} from 'react-chartjs-2';

export const ReturnsChart = () => {
    return (
        <div className={'mt-5'}>
            <Line
                data={{
                    labels: ['', '', '', 20, 25, '', '', '', ''],
                    datasets: [{
                        data: [100.3,100.3,100.3,100.3,116,116,116,116,116],
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
