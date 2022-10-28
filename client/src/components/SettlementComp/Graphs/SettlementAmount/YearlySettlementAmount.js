import React from "react";
import ReactApexChart from 'react-apexcharts';
import axios from "axios";
import baseUrl from "../../../config/baseUrl";

export default class YearlySettlementAmount extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        
          series: [{
            name: 'Total Amount',
              data: [0, 75, 47, 65, 14, 32, 19, 54, 44, 61, 77, 0],
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
            tooltip: {
              x: {
                format: 'dd/MM/yy HH:mm'
              },
            },
          },
        };
      }

      componentDidMount() {
        const yearly = async() => {
          try {
            const auth = localStorage.getItem("admin");
            let formData = new FormData();
            const config = {
              headers: {
                "content-type": "multipart/form-data",
                Authorization: `Bearer ${auth}`,
              },
            };
            let {data} = await axios.post(`${baseUrl}/yearly`, formData, config);

            this.setState({series:[{data:Object.values(data.data.yearly)}],options:{xaxis:{categories:Object.keys(data.data.yearly)},title:{text:data.data.total}}})

            // this.setState({series:[{data:[data.data.yearly[0].output,data.data.yearly[1].output,data.data.yearly[2].output,data.data.yearly[3].output,data.data.yearly[4].output,data.data.yearly[5].output,data.data.yearly[6].output,data.data.yearly[7].output,data.data.yearly[8].output,data.data.yearly[9].output,data.data.yearly[10].output,data.data.yearly[11].output]}],options:{xaxis:{categories:[data.data.yearly[0].name,data.data.yearly[1].name,data.data.yearly[2].name,data.data.yearly[3].name,data.data.yearly[4].name,data.data.yearly[5].name,data.data.yearly[6].name,data.data.yearly[7].name,data.data.yearly[8].name,data.data.yearly[9].name,data.data.yearly[10].name,data.data.yearly[11].name]},title:{text:data.data.total}}})
            
          } catch (error) {
            console.log(error);
          }
        }
        yearly()
      }
      render() {
        return (
          <div id="chart">
              <ReactApexChart options={this.state.options} series={this.state.series} type="area" height={200} />
          </div>
        );
    }
}

