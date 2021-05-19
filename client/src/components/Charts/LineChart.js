import React , { useState, useEffect } from 'react'
import { Doughnut } from 'react-chartjs-2'

export default function Chart() {
    const [chartData , setChartData] = useState({})

    useEffect(() => {
        setChartData(
            {
                labels: ["one" , "two" , "Three"] ,
                datasets : [
                    {
                        label:'Chumma',
                        data : [0 , 20 , 10],
                        fill:false
                    }
                ],
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)'
                  ],
            }
        )
    } , [])

    
    return (
        <div>
            <Doughnut 
                data={chartData}
                options = {{
                    responsive : true,
                    title : {text : "Daily Weight" , display:true},
                    
                }}
            />
        </div>
    )
}
