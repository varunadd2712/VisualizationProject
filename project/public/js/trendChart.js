class TrendChart {

  constructor () {
    let divChart = d3.select("#trendchart").classed("fullView", true);

    this.svgBounds = divChart.node().getBoundingClientRect();

    this.svgWidth = 700;
    this.svgWidth2 = 900;
    this.svgHeight = 667;
    this.currentData = null;

    //add the svg to the div
    this.lineChartSvg = divChart.append("svg")
    .attr("width", this.svgWidth)
    .attr("height", this.svgHeight)
    .attr("id", "lineChartSvg");

    this.lineChartTextSvg = divChart.append("svg")
    .attr("width", this.svgWidth2)
    .attr("height", this.svgHeight)
    .attr("id", "lineChartTextSvg");
  }

  update() {

    this.lineChartTextSvg.selectAll("g").remove();
    let textBlock = this.lineChartTextSvg.append("g");

    textBlock.append("text")
    .attr("x", this.svgWidth2/2)
    .text("In this trend, we see ")
    .attr("y", 190)
    .attr("class", "yeartext")
    .style("font-size", "25px")
    .attr("opacity", 0)
    .transition()
    .duration(3000)
    .attr("opacity", 1);

    textBlock.append("text")
    .attr("x", this.svgWidth2/2)
    .text("there was a sharp dip in crime from 2008 to 2014,")
    .attr("y", 220)
    .attr("class", "yeartext")
    .style("font-size", "25px")
    .attr("opacity", 0)
    .transition()
    .duration(3000)
    .attr("opacity", 1);

    textBlock.append("text")
    .attr("x", this.svgWidth2/2)
    .text("after which it started to pick up.")
    .attr("y", 250)
    .attr("class", "yeartext")
    .style("font-size", "25px")
    .attr("opacity", 0)
    .transition()
    .duration(3000)
    .attr("opacity", 1);

    this.lineChartSvg.selectAll("g").remove();

    let yData = [9168, 7789, 7699, 7254, 6718, 6933, 6418, 6885, 7321];
    let xData = [2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016];

    let xScale = d3.scaleLinear()
        .domain([2007, 2016])
        .range([0, this.svgWidth-100])
        .nice();

    let yScale = d3.scaleLinear()
        .domain([6418, 9168])
        .range([this.svgHeight-10, 40])
        .nice();

    let xAxis = d3.axisBottom();
    xAxis.scale(xScale).tickFormat(d3.format("d"));;

    let yAxis = d3.axisLeft();
    yAxis.scale(yScale).tickFormat(d3.format("d"));;

    this.lineChartSvg.select(".yAxis").remove();
    this.lineChartSvg.select(".xAxis").remove();
    this.lineChartSvg.selectAll("text").remove();

    let xTranslate = this.svgHeight/2 + 300;


    let yAxisElement = this.lineChartSvg.insert("g",":first-child").classed("axis", true)
        .attr("transform", "translate(" + "" + 80 + "," + -30 + ")")
        .attr("class", "yAxis")
        .call(yAxis);

    let xAxisElement = this.lineChartSvg.insert("g",":first-child").classed("axis", true)
            .attr("transform", "translate(" + "" + 80 + "," + xTranslate  + ")")
            .attr("class", "xAxis")
            .call(xAxis);

    this.lineChartSvg.append("text")
            .attr("transform", "translate(" + 400 + " ," + (xTranslate + 30) + ")")
            .style("text-anchor", "middle")
            .attr("class", "axis-label")
            .text("YEAR");

    this.lineChartSvg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 10)
            .attr("x",-200)
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .attr("class", "axis-label")
            .text("Number of Crimes");

    let gElement = this.lineChartSvg.append("g").attr("transform", "translate(" + "" + 80 + "," + -30 + ")");

    let lineChartData = [];
    let counter = 0;

    xData.forEach(function(year){
          let val = yData[counter];
          counter++;
          lineChartData.push({"Year":year, "Value":val});
    });

    console.log(lineChartData);

    let valueline = d3.line()
              .x(function(d) { return xScale(d.Year); })
              .y(function(d) { return yScale(d.Value); });

    let pathValue = gElement.append("path")
              .attr("d", valueline(lineChartData))
              .attr("stroke", "red")
              .attr("stroke-width", 2)
              .attr("fill", " none");

    let totalLength = pathValue.node().getTotalLength();

    pathValue.attr("stroke-dasharray", totalLength + " " + totalLength)
              .attr("stroke-dashoffset", totalLength)
              .transition().duration(5000)
              .attr("stroke-dashoffset", 0);

    let newScatter = gElement.selectAll("circle").data(xData)
                      .enter()
                      .append("circle");

    newScatter.attr("cx", function(d, i) {
          return xScale(d);
        })
        .attr("cy", function(d, i) {
          return yScale(yData[i]);
        })
        .attr("r", function(d, i) {
          return 5;
        })
        .attr("class", function(d, i) {
          return "circleVal";
        });
  }


}
