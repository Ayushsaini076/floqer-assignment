import React from 'react'
import { registerables, Chart } from "chart.js";
import { Line } from "react-chartjs-2";
Chart.register(...registerables);

const Graph = ({mapData,name}) => {
  const data = {
    labels:['2020','2021','2022','2023','2024'],
    datasets:[
      {
        label:name,
        data:[mapData.get('2020'),mapData.get('2021'),mapData.get('2022'),mapData.get('2023'),mapData.get('2024')],
        fill:false,
        tension:0.1
      }
    ]
  }

  return (
    <div className='h-full p-[1rem] w-[40%] flex items-center rounded-lg bg-white'>
      <Line className='w-full h-full' data={data} />
    </div>
  )
}

export default Graph
