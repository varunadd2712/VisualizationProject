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
    .attr("height", this.svgHeight + 40)
    .attr("id", "lineChartSvg");

    this.lineChartTextSvg = divChart.append("svg")
    .attr("width", this.svgWidth2)
    .attr("height", this.svgHeight)
    .attr("id", "lineChartTextSvg");

    this.vulnerableChartSvg = divChart.append("svg")
    .attr("width", this.svgWidth)
    .attr("height", this.svgHeight)
    .attr("id", "vulnerableChartSvg");

    this.vulnerableTextSvg = divChart.append("svg")
    .attr("width", this.svgWidth2)
    .attr("height", this.svgHeight)
    .attr("id", "vulnerableTextSvg");

    this.vulnerable2008 = [{group:"Anti-Black/African American", value:3413}, {group:"Anti-Jewish", value:1055}, {group:"Anti-Male Homosexual", value:948}];
    this.vulnerable2009 = [{group:"Anti-Black/African American", value:2724}, {group:"Anti-Jewish", value:964}, {group:"Anti-Male Homosexual", value:798}];
    this.vulnerable2010 = [{group:"Anti-Black/African American", value:2600}, {group:"Anti-Jewish", value:922}, {group:"Anti-Male Homosexual", value:851}];
    this.vulnerable2011 = [{group:"Anti-Black/African American", value:2494}, {group:"Anti-Jewish", value:820}, {group:"Anti-Hispanic", value:504}];
    this.vulnerable2012 = [{group:"Anti-Black/African American", value:2180}, {group:"Anti-Jewish", value:696}, {group:"Anti-White", value:739}];
    this.vulnerable2013 = [{group:"Anti-Black/African American", value:2263}, {group:"Anti-Jewish", value:849}, {group:"Anti-Male Homosexual", value:728}];
    this.vulnerable2014 = [{group:"Anti-Black/African American", value:1955}, {group:"Anti-White", value:701}, {group:"Anti-Male Homosexual", value:683}];
    this.vulnerable2015 = [{group:"Anti-Black/African American", value:2125}, {group:"Anti-White", value:734}, {group:"Anti-Male Homosexual", value:758}];
    this.vulnerable2016 = [{group:"Anti-Black/African American", value:2122}, {group:"Anti-White", value:876}, {group:"Anti-Jewish", value:834}];
  }

  update() {
    let that = this;
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
    }).on("click", function(d) {
      that.drawBarChart(d);
    });
  }

  drawBarChart(year) {
    console.log(year);

    let plotData;

    if(year == 2008)
      plotData = this.vulnerable2008;

    else if(year == 2009)
      plotData = this.vulnerable2009;

    else if(year == 2010)
      plotData = this.vulnerable2010;

    else if(year == 2011)
      plotData = this.vulnerable2011;

    else if(year == 2012)
      plotData = this.vulnerable2012;

    else if(year == 2013)
      plotData = this.vulnerable2013;

    else if(year == 2014)
      plotData = this.vulnerable2014;

    else if(year == 2015)
      plotData = this.vulnerable2015;

    else if(year == 2016)
      plotData = this.vulnerable2016;


    let xScale = d3.scaleLinear()
      .domain([504, 3413])
      .range([0, this.svgWidth-100])
      .nice();

    let yScale = d3.scaleLinear()
      .domain([0, 10])
      .range([160, this.svgHeight-10])
      .nice();

    let xAxis = d3.axisBottom();
      xAxis.scale(xScale).tickFormat(d3.format("d"));

    let yAxis = d3.axisLeft();
      yAxis.scale(yScale).ticks(0);

      this.vulnerableChartSvg.select(".yAxis").remove();
      this.vulnerableChartSvg.select(".xAxis").remove();
      this.vulnerableChartSvg.selectAll("text").remove();

      this.vulnerableChartSvg.selectAll("g").remove();

      let xTranslate = 20;


      let yAxisElement = this.vulnerableChartSvg.insert("g",":first-child").classed("axis", true)
      .attr("transform", "translate(" + "" + 80 + "," + -150 + ")")
      .attr("class", "yAxis")
      .call(yAxis);

      let xAxisElement = this.vulnerableChartSvg.insert("g",":first-child").classed("axis", true)
      .attr("transform", "translate(" + "" + 80 + "," + xTranslate  + ")")
      .attr("class", "xAxis")
      .call(xAxis);

      this.vulnerableChartSvg.append("text")
      .attr("transform", "translate(" + 400 + " ," + (xTranslate - 5) + ")")
      .style("text-anchor", "middle")
      .attr("class", "axis-label")
      .text("Number of crimes");

      this.vulnerableChartSvg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 30)
      .attr("x",-300)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .attr("class", "axis-label")
      .text("Vulnerable Group");

      let yTranslate = this.svgHeight - 30;

      let gElement = this.vulnerableChartSvg.append("g").attr("transform", "translate(" + "" + 80 + "," + -30 + ")");

      let newScatter = gElement.selectAll("rect").data(plotData)
      .enter()
      .append("rect");

      newScatter.attr("x", function(d, i) {
        return 0;
      })
      .attr("y", function(d, i) {
        return yScale(i);
      })
      .attr("height", function(d, i) {
        return 20;
      }).attr("fill", function(d, i) {
        if(i == 0)
          return "red";
        if(i == 1)
          return "brown";
        if(i == 2)
          return "orange";
      }).attr("width", 0)
      .transition()
      .duration(4000)
      .attr("width", function(d, i) {
        return xScale(d.value);
      });

      gElement.selectAll("text")
            .data(plotData)
            .enter()
            .append("text")
            .attr("transform", "translate(" + "" + 80 + "," + -30 + ")")
            .attr("x", -70)
            .attr("y",(d, i) => yScale(i) + 5)
            .attr("dy","1.2em")
            .text(function(d){
              return d.group;
            });



    this.vulnerableTextSvg.selectAll("g").remove();
    let textBlock = this.vulnerableTextSvg.append("g");

    textBlock.append("text")
    .attr("x", this.svgWidth2/2)
    .text("We can see ")
    .attr("y", 190)
    .attr("class", "yeartext")
    .style("font-size", "25px")
    .attr("opacity", 0)
    .transition()
    .duration(3000)
    .attr("opacity", 1);

    textBlock.append("text")
    .attr("x", this.svgWidth2/2)
    .text("that African Americans, Jews ")
    .attr("y", 220)
    .attr("class", "yeartext")
    .style("font-size", "25px")
    .attr("opacity", 0)
    .transition()
    .duration(3000)
    .attr("opacity", 1);

    textBlock.append("text")
    .attr("x", this.svgWidth2/2)
    .text(" and Male homosexuals")
    .attr("y", 250)
    .attr("class", "yeartext")
    .style("font-size", "25px")
    .attr("opacity", 0)
    .transition()
    .duration(3000)
    .attr("opacity", 1);

    textBlock.append("text")
    .attr("x", this.svgWidth2/2)
    .text(" are the three most targeted groups")
    .attr("y", 280)
    .attr("class", "yeartext")
    .style("font-size", "25px")
    .attr("opacity", 0)
    .transition()
    .duration(3000)
    .attr("opacity", 1);

    textBlock.append("text")
    .attr("x", this.svgWidth2/2)
    .text(" across the years.")
    .attr("y", 310)
    .attr("class", "yeartext")
    .style("font-size", "25px")
    .attr("opacity", 0)
    .transition()
    .duration(3000)
    .attr("opacity", 1);

  }


}
