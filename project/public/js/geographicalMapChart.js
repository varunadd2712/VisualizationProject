class GeographicalMapChart {

  /**
   * Constructor for the Year Chart
   * Pass objects of the other charts here.
   */
  constructor () {
    let divMapChart = d3.select("#geographical-map-chart").classed("twoThirdView", true);
    this.svgBounds = divMapChart.node().getBoundingClientRect();

    this.svgWidth = 600;
    this.svgHeight = 500;

    //add the svg to the div
    this.svg = divMapChart.append("svg")
        .attr("width", this.svgWidth)
        .attr("height", this.svgHeight)
  };
};
