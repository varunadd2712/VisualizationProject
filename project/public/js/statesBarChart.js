class StatesBarChart {

  /**
   * Constructor for the Year Chart
   * Pass objects of the other charts here.
   */
  constructor () {
    let divStateChart = d3.select("#states-bar-chart").classed("sideBar", true);
    this.svgBounds = divStateChart.node().getBoundingClientRect();

    this.svgWidth = 500;
    this.svgHeight = 1500;

    //add the svg to the div
    this.svg = divStateChart.append("svg")
        .attr("width", this.svgWidth)
        .attr("height", this.svgHeight)
  };
};
