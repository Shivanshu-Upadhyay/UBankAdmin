import React from "react";
import ReactApexChart from 'react-apexcharts';
import axios from "axios";
import baseUrl from "../../config/baseUrl";

export default class MonthlyDeposit extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        
          series: [{
            name: 'Deposit',
              data: [47, 45, 74, 32, 56, 31, 44, 33, 45, 19, 44, 65, 47, 45, 74, 32, 56, 31, 44, 33, 45, 19, 44, 65, 47, 45, 74, 32, 56, 31, 44],
              color: '#b34700'
            }, {
              name: 'Payouts',
              data: [11, 32, 45, 32, 34, 52, 41, 11, 32, 45, 32, 34, 52, 41, 11, 32, 45, 32, 34, 52, 41, 11, 32, 45, 32, 34, 52, 41, 50, 45, 60],
              color: '#ff751a'
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
            tooltip: {
              x: {
                format: 'dd/MM/yy HH:mm'
              },
            },
          },
        };
      }
      render() {
        return (
          <div id="chart">
              <ReactApexChart options={this.state.options} series={this.state.series} type="area" height={200} />
          </div>
        );
    }
}

