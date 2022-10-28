import React from "react";
import ReactApexChart from 'react-apexcharts';
import axios from "axios";
import baseUrl from "../../../config/baseUrl";

export default class InternationalMonthly extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        
          series: [{
            name: 'FIAT',
              data: [47, 45, 74, 32, 56, 31, 44, 33, 45, 19, 44, 65, 47, 45, 74, 32, 56, 31, 44, 33, 45, 19, 44, 65, 47, 45, 74, 32, 56, 31, 44],
              color: '#006600'
            }, {
              name: 'CRYPTO',
              data: [11, 32, 45, 32, 34, 52, 41, 11, 32, 45, 32, 34, 52, 41, 11, 32, 45, 32, 34, 52, 41, 11, 32, 45, 32, 34, 52, 41, 50, 45, 60],
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
        const monthlyInternational = async() => {
          try {
            const auth = localStorage.getItem("admin");
            let formData = new FormData();
            const config = {
              headers: {
                "content-type": "multipart/form-data",
                Authorization: `Bearer ${auth}`,
              },
            };
            
            let {data} = await axios.post(`${baseUrl}/monthlyInternational`, formData, config);

            this.setState({series:[{data:[data.data.fiat[0],data.data.fiat[1],data.data.fiat[2],data.data.fiat[3],data.data.fiat[4],data.data.fiat[5],data.data.fiat[6],data.data.fiat[7],data.data.fiat[8],data.data.fiat[9],data.data.fiat[10],data.data.fiat[11],data.data.fiat[12],data.data.fiat[13],data.data.fiat[14],data.data.fiat[15],data.data.fiat[16],data.data.fiat[17],data.data.fiat[18],data.data.fiat[19],data.data.fiat[20],data.data.fiat[21],data.data.fiat[22],data.data.fiat[23],data.data.fiat[24],data.data.fiat[25],data.data.fiat[26],data.data.fiat[27],data.data.fiat[28],data.data.fiat[29]]},{data:[data.data.crypto[0],data.data.crypto[1],data.data.crypto[2],data.data.crypto[3],data.data.crypto[4],data.data.crypto[5],data.data.crypto[6],data.data.crypto[7],data.data.crypto[8],data.data.crypto[9],data.data.crypto[10],data.data.crypto[11],data.data.crypto[12],data.data.crypto[13],data.data.crypto[14],data.data.crypto[15],data.data.crypto[16],data.data.crypto[17],data.data.crypto[18],data.data.crypto[19],data.data.crypto[20],data.data.crypto[21],data.data.crypto[22],data.data.crypto[23],data.data.crypto[24],data.data.crypto[25],data.data.crypto[26],data.data.crypto[27],data.data.crypto[28],data.data.crypto[29]]}],options:{xaxis:{categories:[data.data.dates[0],data.data.dates[1],data.data.dates[2],data.data.dates[3],data.data.dates[4],data.data.dates[5],data.data.dates[6],data.data.dates[7],data.data.dates[8],data.data.dates[9],data.data.dates[10],data.data.dates[11],data.data.dates[12],data.data.dates[13],data.data.dates[14],data.data.dates[15],data.data.dates[16],data.data.dates[17],data.data.dates[18],data.data.dates[19],data.data.dates[20],data.data.dates[21],data.data.dates[22],data.data.dates[23],data.data.dates[24],data.data.dates[25],data.data.dates[26],data.data.dates[27],data.data.dates[28],data.data.dates[29]]},title:{text:data.data.total}}})

          } catch (error) {
            console.log(error);
          }
        }
        monthlyInternational()
      }

      render() {
        return (
          <div id="chart">
              <ReactApexChart options={this.state.options} series={this.state.series} type="area" height={200} />
          </div>
        );
    }
}

