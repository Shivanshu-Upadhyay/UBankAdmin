import React from "react";
import ReactApexChart from 'react-apexcharts';
import axios from "axios";
import baseUrl from "../../../config/baseUrl";

export default class LocalYesterday extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          series: [{
            name: 'Total Amount',
              data: [31, 40, 28, 51, 42, 109],
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
              type: 'hours',
              categories: ['0-4','4-8','8-12','12-16','16-20','20-24'],
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
        const localYesterday = async() => {
          try {
            const auth = localStorage.getItem("admin");
            let formData = new FormData();
            const config = {
              headers: {
                "content-type": "multipart/form-data",
                Authorization: `Bearer ${auth}`,
              },
            };
            let {data} = await axios.post(`${baseUrl}/yesterdaySettlement`, formData, config);
  

            this.setState({series:[{data:data.data.yesterdaySettlement}],options:{title:{text:data.data.total}}})
          } catch (error) {
            console.log(error);
          }
        }
        localYesterday()
      }
      render() {
        return (
          <div id="chart">
              <ReactApexChart options={this.state.options} series={this.state.series} type="area" height={200} />
          </div>
        );
    }
}

