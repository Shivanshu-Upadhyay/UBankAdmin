import React from "react";
import ReactApexChart from 'react-apexcharts';
import axios from "axios";
import baseUrl from "../../../config/baseUrl";

export default class InternationalYearly extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        
          series: [{
            name: 'FIAT',
              data: [0, 75, 47, 65, 14, 32, 19, 54, 44, 61, 77, 0],
              color: '#006600'
            }, {
              name: 'CRYPTO',
              data: [11, 32, 45, 32, 34, 52, 41, 11, 32, 45, 32, 34],
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
              categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
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
        const yearlyInternational = async() => {
          try {
            const auth = localStorage.getItem("admin");
            let formData = new FormData();
            const config = {
              headers: {
                "content-type": "multipart/form-data",
                Authorization: `Bearer ${auth}`,
              },
            };
            let {data} = await axios.post(`${baseUrl}/yearlyInternational`, formData, config);
            // console.log(data.data)

            this.setState({series:[{data:[data.data.yearly[0].fiat,data.data.yearly[1].fiat,data.data.yearly[2].fiat,data.data.yearly[3].fiat,data.data.yearly[4].fiat,data.data.yearly[5].fiat,data.data.yearly[6].fiat,data.data.yearly[7].fiat,data.data.yearly[8].fiat,data.data.yearly[9].fiat,data.data.yearly[10].fiat,data.data.yearly[11].fiat]},{data:[data.data.yearly[0].crypto,data.data.yearly[1].crypto,data.data.yearly[2].crypto,data.data.yearly[3].crypto,data.data.yearly[4].crypto,data.data.yearly[5].crypto,data.data.yearly[6].crypto,data.data.yearly[7].crypto,data.data.yearly[8].crypto,data.data.yearly[9].crypto,data.data.yearly[10].crypto,data.data.yearly[11].crypto]}],options:{xaxis:{categories:[data.data.yearly[0].day,data.data.yearly[1].day,data.data.yearly[2].day,data.data.yearly[3].day,data.data.yearly[4].day,data.data.yearly[5].day,data.data.yearly[6].day,data.data.yearly[7].day,data.data.yearly[8].day,data.data.yearly[9].day,data.data.yearly[10].day,data.data.yearly[11].day]},title:{text:data.data.total}}})

          } catch (error) {
            console.log(error);
          }
        }
        yearlyInternational()
      }
      render() {
        return (
          <div id="chart">
              <ReactApexChart options={this.state.options} series={this.state.series} type="area" height={200} />
          </div>
        );
    }
}

