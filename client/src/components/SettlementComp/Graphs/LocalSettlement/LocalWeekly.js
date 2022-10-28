import React from "react";
import ReactApexChart from 'react-apexcharts';
import axios from "axios";
import baseUrl from "../../../config/baseUrl";

export default class LocalWeekly extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          series: [{
            name: 'Total Amount',
              data: [31, 40, 28, 51, 42, 109, 100],
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
            xaxis: {
              type: 'weekly',
              categories: ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
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
            tooltip: {
              x: {
                format: 'dd/MM/yy HH:mm'
              },
            },
          },
        };
      }

      componentDidMount() {
        const localWeekly = async() => {
          try {
            const auth = localStorage.getItem("admin");
            let formData = new FormData();
            const config = {
              headers: {
                "content-type": "multipart/form-data",
                Authorization: `Bearer ${auth}`,
              },
            };
            let {data} = await axios.post(`${baseUrl}/weeklySettlement`, formData, config);
  
            this.setState({series:[{data:Object.values(data.data.weekly)}],options:{xaxis:{categories:Object.keys(data.data.weekly)},title:{text:data.data.total}}})
          } catch (error) {
            console.log(error);
          }
        }
        localWeekly()
      }
      
      render() {
        return (
          <div id="chart">
              <ReactApexChart options={this.state.options} series={this.state.series} type="area" height={200} />
          </div>
        );
    }
}

