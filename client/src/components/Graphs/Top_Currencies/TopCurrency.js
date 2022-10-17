import React from "react";
import ReactApexChart from 'react-apexcharts';
import axios from "axios";
import baseUrl from "../../config/baseUrl";

export default class TopCurrency extends React.Component {
    constructor(props) {
        super(props);
            this.state = {
                series: [90, 67, 61, 40, 20, 54, 48, 71],
                options: {
                    chart: {
                        width: 380,
                        type: 'polarArea'
                    },
                    colors: ["#e65c00", "#993d00", "#662900", "#ff6600", "#ff751a", "#ff944d", "#ffb380", "#ffe0cc"],
                    labels: ["INR (&#8377;)", "CNY (&#x5143;)", "USD  (&#x24;)", "THB (&#3647;)", "VND (&#8363;)", "PHP (&#x20B1;)", "MYR (Ꮢᴍ)", "IDR (Rp)"],
                    fill: {
                        opacity: 1
                    },
                    stroke: {
                        width: 3,
                        colors: ["#fff"],
                    },
                    yaxis: {
                        show: false
                    },
                    legend: {
                        position: 'right'
                    },
                    plotOptions: {
                        polarArea: {
                        rings: {
                            strokeWidth: 0
                        },
                        spokes: {
                            strokeWidth: 0
                        },
                        }
                    },
                },
            };
        }
        render() {
            return (
            <div id="chart">
                <ReactApexChart options={this.state.options} series={this.state.series} type="polarArea" width={400} />
            </div>
            );
        }
    }

