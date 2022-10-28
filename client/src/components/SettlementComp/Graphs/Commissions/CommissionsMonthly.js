import React from "react";
import ReactApexChart from 'react-apexcharts';
import axios from "axios";
import baseUrl from "../../../config/baseUrl";

export default class CommissionsMonthly extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        
          series: [{
            name: 'Total Amount',
              data: [47, 45, 74, 32, 56, 31, 44, 33, 45, 19, 44, 65, 47, 45, 74, 32, 56, 31, 44, 33, 45, 19, 44, 65, 47, 45, 74, 32, 56, 31, 44],
              color: '#006600'
            }],
          options: {
            chart: {
              height: '100%',
              type: 'area',
              sparkline: {
                enabled: true
              },
            },
            dataLabels: {
              enabled: false
            },
            stroke: {
                width: 3,
                curve: 'smooth'
            },
            fill: {
                type: 'solid',
                opacity: 0
            },
            yaxis : {
                show: false,
            },
            title: {
              text: '',
              align: 'right',
              offsetX: 0,
              color: '#fff',
              style: {
                fontSize: '18px',
                fontFamily:  'Mulish',
              }
            },
            xaxis: {
              type: 'days',
              categories: ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31'],
              axisBorder: {
                show: false,
              },
              axisTicks: {
                show: false,
              },
              labels: {
                show: false,
              }
            },
            tooltip: {
              x: {
                format: 'dd/MM/yy HH:mm'
              },
            },
          },
        };
      }

      componentDidMount() {
        const monthlyCommissions = async() => {
          try {
            const auth = localStorage.getItem("admin");
            let formData = new FormData();
            const config = {
              headers: {
                "content-type": "multipart/form-data",
                Authorization: `Bearer ${auth}`,
              },
            };
            let {data} = await axios.post(`${baseUrl}/monthlyCommissions`, formData, config);
  
            this.setState({series:[{data:Object.values(data.data.monthly)}],options:{xaxis:{categories:Object.keys(data.data.monthly)},title:{text:data.data.total}}})
          } catch (error) {
            console.log(error);
          }
        }
        monthlyCommissions()
      }

      render() {
        return (
          <div id="chart">
              <ReactApexChart options={this.state.options} series={this.state.series} type="area" height={200} />
          </div>
        );
    }
}

