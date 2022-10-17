import React from "react";
import ReactApexChart from 'react-apexcharts';
import axios from "axios";
import baseUrl from "../../../config/baseUrl";

export default class CommissionsYesterday extends React.Component {
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

