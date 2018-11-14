class DonutChart {


    constructor() {
    let divDonutChart = d3.select("#donut-chart").classed("sideBar", true);
    this.svgBounds = divDonutChart.node().getBoundingClientRect();

    this.svgWidth = 750;
    this.svgHeight = 1500;
    this.padding = 25;

    //add the svg to the div
    this.svg = divDonutChart.append("svg")
        .attr("width", this.svgWidth + 2*this.padding)
        .attr("height", this.svgHeight + 2*this.padding)

    };

    update(data) {
    console.log(data);



    };

};