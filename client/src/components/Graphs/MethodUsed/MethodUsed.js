import React from "react";
import ReactApexChart from 'react-apexcharts';
import axios from "axios";
import baseUrl from "../../config/baseUrl";

export default class MethodUsed extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            series: [20, 50, 30],
            chartOptions: {
                labels: ['APM', 'e-Wallets', 'Cards'],
            },
            options: {
                chart: {
                    type: 'donut',
                },
                colors: ["#803300", "#e65c00", "#ff944d"],
                plotOptions: {
                    pie: {
                        donut: {
                            labels: {
                                show: true,
                                total: {
                                    showAlways: true,
                                    show: true
                                }
                            }
                        }
                    }
                },
                dataLabels: {
                    enabled: false
                },
                labels: ['APM', 'e-Wallets', 'Cards'],
                legend: {
                    position: 'right'
                },
            }
        };
      }
      render() {
        return (
          <div id="chart">
              <ReactApexChart options={this.state.options} series={this.state.series} type="donut" height={250} />
          </div>
        );
    }
}

