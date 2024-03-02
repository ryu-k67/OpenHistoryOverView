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
import React, { useEffect,useState,useContext } from 'react';
import { Line } from 'react-chartjs-2';
import chartjsPluginDragdata from 'chartjs-plugin-dragdata'
import AuthContext from '@/context/AuthContext'


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
    let initDatas=[5,5,5,5,5,5,5]

    const [graphPoints, setGraphPoints] = useState([]);
    const [graphInit, setGraphInit] = useState(false);
    const {user}=useContext(AuthContext);
    console.log(user)
    // console.log(user.user_id)
    let userId=null
    // const userId=1
    // console.log(userId)

    let options = {
        type: 'line',
        data: {
            // labels: [0,10,20,30,40,50,60,70,80,90,100],
            labels:['幼少期','小学校低学年','小学校高学年','中学生','高校生','大学生','就職～'],
            datasets: [{
                // label: '# of Votes',
                data: graphPoints,
                fill: false,
                tension: 0.4,
                borderWidth: 2,
                pointHitRadius: 25
            }]
        },
        options: {
            scales: {
                // x: {
                //     min: 0,
                //     max: 60
                // },
                y: {
                    min: 0,
                    max: 10
                },
            },
            maintainAspectRatio: false,
            onHover: function (e) {
                const point = e.chart.getElementsAtEventForMode(e, 'nearest', { intersect: true }, false)
                if (point.length) e.native.target.style.cursor = 'grab'
                else e.native.target.style.cursor = 'default'
            },
            plugins: {
                legend: {
                    display: false,
                },
                dragData: {
                    round: 1,
                    showTooltip: true,
                    onDragStart: function (e, datasetIndex, index, value) {
                        // console.log(e)
                        console.log(datasetIndex, index, value)
                    },
                    onDrag: function (e, datasetIndex, index, value) {
                        e.target.style.cursor = 'grabbing'
                        // console.log(e, datasetIndex, index, value)
                    },
                    onDragEnd: function (e, datasetIndex, index, value) {
                        e.target.style.cursor = 'default'
                        console.log(datasetIndex, index, value)
                        graphPoints[index]=value
                    },
                }
            }
        }
    }

    const width = 250;
    const height = 250;
    useEffect(() => {
        console.log('effect')
        const canvasElement = document.createElement('canvas');
        canvasElement.width = width;
        canvasElement.height = height;
        const ctx = canvasElement.getContext('2d');

        // draw
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = '#888888';
        ctx.fillRect(0, 0, width, height);
    }, []);

    const save=()=>{
        console.log('save')
        // console.log(datas)
        console.log(graphPoints)
        // imageSave()
        handleSavePoint()
    }

    const imageSave=async(e)=>{
        console.log('imageSave')
        let targetCanvas = document.getElementById('chartJSContainer')
        let link = targetCanvas.toDataURL('image/png')

        // let body=JSON.stringify({'name':e.target.name.value,'email':e.target.email.value,'password':e.target.password.value})
        // console.log(body)
        // let response=await fetch('http://localhost:8000/api/register/',{
        //     method:'POST',
        //     headers:{
        //         'Content-Type':'application/json',
        //     },
        //     body:body
        // })
        // .then(async(res)=>{
        //     if(res.status===201){
        //         console.log('画像保存に成功')
        //     }
        //     else{
        //         console.log('画像保存に失敗')
        //     }
        // })
        // .then(()=>{
        //     console.log('image save success')
        // })
        // .catch(err=>{
        //     console.log(err)
        // })
    }

    const handleSavePoint = async () => {
        if (graphInit) {
            console.log('create')
            try {
                const response = await fetch('http://localhost:8000/app/graph/create/', {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ 
                        user_id: userId,
                        graph_point_0: parseInt(graphPoints[0]*10),
                        graph_point_1: parseInt(graphPoints[1]*10),
                        graph_point_2: parseInt(graphPoints[2]*10),
                        graph_point_3: parseInt(graphPoints[3]*10),
                        graph_point_4: parseInt(graphPoints[4]*10),
                        graph_point_5: parseInt(graphPoints[5]*10),
                        graph_point_6: parseInt(graphPoints[6]*10),
                        graph_point_num: graphPoints.length,
                    }),
                });
                console.log('response:')
                console.log(response)
                console.log(response.body)
                if (!response.ok) {
                    throw new Error('グラフポイントの作成に失敗しました');
                }
                console.log('グラフポイントが正常に作成されました');
                setGraphInit(false);
            } catch (error) {
                console.error('グラフポイントの作成中にエラーが発生しました:', error);
            }
        }
        else {
            console.log('update')
            try {
                const response = await fetch(`http://localhost:8000/app/graph/update/`, {
                    method: 'PUT',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ 
                        user_id: userId,
                        graph_point_0: parseInt(graphPoints[0]*10),
                        graph_point_1: parseInt(graphPoints[1]*10),
                        graph_point_2: parseInt(graphPoints[2]*10),
                        graph_point_3: parseInt(graphPoints[3]*10),
                        graph_point_4: parseInt(graphPoints[4]*10),
                        graph_point_5: parseInt(graphPoints[5]*10),
                        graph_point_6: parseInt(graphPoints[6]*10),
                        graph_point_num: graphPoints.length,
                    }),
                });
                if (!response.ok) {
                    throw new Error('グラフポイントの更新に失敗しました');
                }
                console.log('グラフポイントが正常に更新されました');
            } catch (error) {
                console.error('グラフポイントの更新中にエラーが発生しました:', error);
            }
        }
    };

    useEffect(() => {
        if (user != undefined) {
            userId = user.user_id;
            const fetchGraphPoints = async () => {
            try {
                const response = await fetch(`http://localhost:8000/app/graph/get/${userId}`);
                if (!response.ok) {
                throw new Error('グラフポイントの取得に失敗しました');
                }
                let data = await response.json();
                data = data[0]
                let datas=[]
                // console.log(response)
                console.log(data)
                if (data == undefined) {
                    datas = initDatas;
                    setGraphInit(true);
                }
                else{
                    for (let i=0;i<7;i++){
                        console.log(data['graph_point_'+i])
                        if (data['graph_point_'+i] == undefined) {
                            datas.push(initDatas[i])
                        }
                        else{
                            datas.push(data['graph_point_'+i]/10)
                        }
                        console.log('datas:'+datas[i])
                    }
                }
                console.log('data:'+data)
                console.log('graph_pioints:'+datas)
                console.log('init_graph_pioints:'+initDatas)
                setGraphPoints(datas);
            } catch (error) {
                console.error('グラフポイントの取得中にエラーが発生しました:', error);
            }
            };
        
            fetchGraphPoints();
        }
    }, [user]);


    return (
        <div>
            <div>
                <button className='button-yellow' type='button' onClick={save}>保存</button>
            </div>
            <div>
                <Line id="chartJSContainer" height={500} width={50} data={options.data} options={options.options} plugins={[options.options.plugins]}/>
            </div>
        </div>
    )
}

export default MakeGraph

