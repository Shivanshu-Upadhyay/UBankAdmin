import React from "react";
import ReactApexChart from 'react-apexcharts';
import axios from "axios";
import baseUrl from "../../config/baseUrl";

export default class TransactionsWeekly extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        
          series: [{
            name: 'Deposits',
              data: [31, 40, 28, 51, 42, 109, 100],
              color: '#b34700'
            }, {
              name: 'Payouts',
              data: [11, 100, 45, 32, 34, 52, 41],
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

