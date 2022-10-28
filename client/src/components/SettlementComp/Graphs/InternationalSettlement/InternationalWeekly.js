import React from "react";
import ReactApexChart from 'react-apexcharts';
import axios from "axios";
import baseUrl from "../../../config/baseUrl";

export default class InternationalWeekly extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        
          series: [{
            name: 'FIAT',
              data: [31, 40, 28, 51, 42, 109, 100],
              color: '#006600'
            }, {
              name: 'CRYPTO',
              data: [11, 100, 45, 32, 34, 52, 41],
              color: '#b3d9b3'
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
        const weeklyInternational = async() => {
          try {
            const auth = localStorage.getItem("admin");
            let formData = new FormData();
            const config = {
              headers: {
                "content-type": "multipart/form-data",
                Authorization: `Bearer ${auth}`,
              },
            };
            let {data} = await axios.post(`${baseUrl}/weeklyInternational`, formData, config);
            
            this.setState({series:[{data:[data.data.weekly[0].fiat,data.data.weekly[1].fiat,data.data.weekly[2].fiat,data.data.weekly[3].fiat,data.data.weekly[4].fiat,data.data.weekly[5].fiat,data.data.weekly[6].fiat]},{data:[data.data.weekly[0].crypto,data.data.weekly[1].crypto,data.data.weekly[2].crypto,data.data.weekly[3].crypto,data.data.weekly[4].crypto,data.data.weekly[5].crypto,data.data.weekly[6].crypto]}],options:{xaxis:{categories:[data.data.weekly[0].day,data.data.weekly[1].day,data.data.weekly[2].day,data.data.weekly[3].day,data.data.weekly[4].day,data.data.weekly[5].day,data.data.weekly[6].day]},title:{text:data.data.total}}})

          } catch (error) {
            console.log(error);
          }
        }
        weeklyInternational()
      }
      render() {
        return (
          <div id="chart">
              <ReactApexChart options={this.state.options} series={this.state.series} type="area" height={200} />
          </div>
        );
    }
}

