// import AuthContext from "@/context/AuthContext"
// import Link from "next/link"
// import React,{useState,useEffect,useContext} from "react"

// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { Line } from "react-chartjs-2";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );


// const MakeGraph=()=>{
//     const options = {
//         responsive: true,
//         plugins: {
//             title: {
//                 display: true,
//                 text: "グラフタイトル",
//             },
//         },
//     }
    
//     const labels = [
//         "January",
//         "February",
//         "March",
//         "April",
//         "May",
//         "June",
//         "July",
//     ];
    
//     const data = {
//         labels,
//         datasets: [
//             {
//                 label: "データ1",
//                 data: [10, 40, 30, 40, 50, 80, 120],
//                 borderColor: "rgb(255, 99, 132)",
//                 backgroundColor: "rgba(255, 99, 132, 0.5)",
//             },
//         ],
//     }
    
//     return (
//         <div>
//             <p>You can make the graph on this page</p>
//             <Line options={options} data={data} />
//         </div>
//     )
// }

// export default MakeGraph

//---------------------------------------------------------------------------------------------

import {
    Chart,
    registerables,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import React, { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import chartjsPluginDragdata from 'chartjs-plugin-dragdata'

Chart.register(...registerables,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    chartjsPluginDragdata,
);

const MakeGraph=()=> {

    const options = {
        type: 'line',
        data: {
            labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                fill: true,
                tension: 0.4,
                borderWidth: 1,
                pointHitRadius: 25
            },
            {
                label: '# of Points',
                data: [7, 11, 5, 8, 3, 7],
                fill: true,
                tension: 0.4,
                borderWidth: 1,
                pointHitRadius: 25
            }]
        },
        options: {
            scales: {
                y: {
                    min: 0,
                    max: 20
                }
            },
            onHover: function (e) {
                const point = e.chart.getElementsAtEventForMode(e, 'nearest', { intersect: true }, false)
                if (point.length) e.native.target.style.cursor = 'grab'
                else e.native.target.style.cursor = 'default'
            },
            plugins: {
                dragData: {
                    round: 1,
                    showTooltip: true,
                    onDragStart: function (e, datasetIndex, index, value) {
                        // console.log(e)
                    },
                    onDrag: function (e, datasetIndex, index, value) {
                        e.target.style.cursor = 'grabbing'
                        // console.log(e, datasetIndex, index, value)
                    },
                    onDragEnd: function (e, datasetIndex, index, value) {
                        e.target.style.cursor = 'default'
                        // console.log(datasetIndex, index, value)
                    },
                }
            }
        }
    }

    const width = 250;
    const height = 250;
    useEffect(() => {
        const canvasElement = document.createElement('canvas');
        canvasElement.width = width;
        canvasElement.height = height;
        const ctx = canvasElement.getContext('2d');

        // draw
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = '#888888';
        ctx.fillRect(0, 0, width, height);
    }, []);

    return (
        <Line height={300} width={400} data={options.data} options={options.options} plugins={[options.options.plugins]}/>
    )
}

export default MakeGraph

