class VictimChart {
  /**
  * Constructor for the Year Chart
  * Pass objects of the other charts here.
  */
  constructor () {
    let victimChart = d3.select("#victimsChart").classed("fullView", true);

    this.svgBounds = victimChart.node().getBoundingClientRect();

    this.svgWidth = 700;
    this.svgWidth2 = 900;
    this.svgHeight = 667;
    this.svgHeight2 = 100;
    this.unformattedData = null;

    //add the svg to the div
    this.victimChartTextSVG = victimChart.append("svg")
    .attr("width", this.svgWidth + this.svgWidth2)
    .attr("height", this.svgHeight2)
    .attr("id", "victimChartTextSVG");

    this.totalVictimsSVG = victimChart.append("svg")
    .attr("width", this.svgWidth)
    .attr("height", this.svgHeight + 100)
    .attr("id", "totalVictimsSVG");

    this.totalVictimsTextSVG = victimChart.append("svg")
    .attr("width", this.svgWidth2)
    .attr("height", this.svgHeight)
    .attr("id", "totalVictimsTextSVG");


    let genderChart = d3.select("#genderChart").classed("fullView", true);
    this.svgBounds = genderChart.node().getBoundingClientRect();

    //add the svg to the div
    this.genderVictimsSVG = genderChart.append("svg")
    .attr("width", this.svgWidth)
    .attr("height", this.svgHeight - 200)
    .attr("id", "genderVictimsSVG");

    this.genderVictimsTextSVG = genderChart.append("svg")
    .attr("width", this.svgWidth2)
    .attr("height", this.svgHeight - 200)
    .attr("id", "genderVictimsTextSVG");


    let religionChart = d3.select("#religionChart").classed("fullView", true);
    this.svgBounds = religionChart.node().getBoundingClientRect();


    //add the svg to the div
    this.religionVictimsSVG = religionChart.append("svg")
    .attr("width", this.svgWidth)
    .attr("height", this.svgHeight - 300)
    .attr("id", "religionVictimsSVG");

    this.religionVictimsTextSVG = religionChart.append("svg")
    .attr("width", this.svgWidth2)
    .attr("height", this.svgHeight - 300)
    .attr("id", "religionVictimsTextSVG");
  };

  generateArrayOfVictimData(numberOfCirclesRequired) {

    let victimData = [];
    while(numberOfCirclesRequired > 0) {
      victimData.push(1);
      numberOfCirclesRequired--;
    }

    return victimData;
  }

  updateFromScript() {
    this.update(this.unformattedData);
  }

  update(unformattedData)
  {
    this.unformattedData = unformattedData;

    let dataArray = [];
    dataArray.push("singleString");
    this.victimChartTextSVG.selectAll("g").remove();
    let dataEnteredG = this.victimChartTextSVG.selectAll("g").data(dataArray);
    dataEnteredG = dataEnteredG.enter().append("g");
    let textBlock = this.victimChartTextSVG.append("g");

    textBlock.append("text")
    .attr("x", this.svgWidth2/2 + this.svgWidth/2)
    .text("This chart depicts statistics on the victims of the crime")
    .attr("y", (this.svgHeight2/2)-30)
    .attr("class", "yeartext")
    .style("font-size", "25px")
    .attr("opacity", 0)
    .transition()
    .duration(3000)
    .attr("opacity", 1);

    textBlock.append("text")
    .attr("x", this.svgWidth2/2 + this.svgWidth/2)
    .text("Most of the crimes across the years were Anti-Race and Anti-Religion")
    .attr("y", (this.svgHeight2/2))
    .attr("class", "yeartext")
    .attr("fill", "black")
    .style("font-size", "25px")
    .attr("opacity", 0)
    .transition()
    .duration(3000)
    .attr("opacity", 1);

    this.triggerVictimData(unformattedData[0].Victims, this.totalVictimsSVG, this.totalVictimsTextSVG, "data/Person.png", "hate");
    this.triggerVictimData(unformattedData[2].Victims, this.genderVictimsSVG, this.genderVictimsTextSVG, "data/Race.png", "racial");
    this.triggerVictimData(unformattedData[8].Victims, this.religionVictimsSVG, this.religionVictimsTextSVG, "data/Religion.png", "anti-religion");

  };

  triggerVictimData(victimString, figureSVG, figureText, imgScript, stringText) {
    victimString = victimString.replace(/,/g, "");


    let numberOfCirclesRequired = (parseInt(victimString))/50;
    let numberOfCirclesPerRow = 14;
    let maxNumberOfRows = 12;
    numberOfCirclesRequired = Math.round(numberOfCirclesRequired);


    let xAxis = d3.scaleLinear().domain([0, numberOfCirclesPerRow]).range([10, this.svgWidth]);
    let yAxis = d3.scaleLinear().domain([0, maxNumberOfRows]).range([10, this.svgHeight - 10]);

    let victimData = this.generateArrayOfVictimData(numberOfCirclesRequired);

    figureSVG.selectAll("g").remove();

    figureSVG.selectAll("rect").remove();

    let circleCell = figureSVG.selectAll("g").data(victimData).enter().append("g")
          .attr("transform", function(d, i) {
            let xPosition = xAxis(i%numberOfCirclesPerRow);
            let yPosition = yAxis(Math.trunc(i/numberOfCirclesPerRow));
            return "translate(" + xPosition + "," + yPosition + ")";
          });

    //circleCell.append("circle").attr("r", 10).attr("fill", "red");
    circleCell.append("svg:image")
      .attr("class", "twitter-pic")
      .attr("xlink:href", imgScript)
      .attr("width", 40)
      .attr("height", 40)
      .attr("opacity", 0)
      .transition()
      .delay(function(d,i){ return i * 50 })
      .attr("opacity", 1);

    let dataArray = [];
    dataArray.push(victimString);
    figureText.selectAll("g").remove();
    let dataEnteredG = figureText.selectAll("g").data(dataArray);
    dataEnteredG = dataEnteredG.enter().append("g");
    let textBlock = figureText.append("g");

    textBlock.append("text")
    .attr("x", this.svgWidth2/2)
    .text("Each symbol on the left represents 50 people")
    .attr("y", 170)
    .attr("class", "yeartext")
    .style("font-size", "25px")
    .attr("opacity", 0)
    .transition()
    .duration(3000)
    .attr("opacity", 1);

    textBlock.append("text")
    .attr("x", this.svgWidth2/2)
    .text("Total victims of " + stringText + " crime")
    .attr("y", 220)
    .attr("class", "yeartext")
    .style("font-size", "25px")
    .attr("opacity", 0)
    .transition()
    .duration(3000)
    .attr("opacity", 1);

    textBlock.append("text")
    .attr("x", this.svgWidth2/2)
    .text("this year")
    .attr("y", 250)
    .attr("class", "yeartext")
    .style("font-size", "25px")
    .attr("opacity", 0)
    .transition()
    .duration(3000)
    .attr("opacity", 1);

    dataEnteredG.append("text")
    .attr("x", this.svgWidth2/2)
    .text(0)
    .attr("y", 280)
    .attr("class", "yeartext")
    .style("font-size", "25px");

    var format = d3.format(",d");

    dataEnteredG.select("text")
    .transition()
    .duration(5000)
    .on("start", function repeat() {
      d3.active(this)
          .tween("text", function() {
            var that = d3.select(this),
                i = d3.interpolateNumber(that.text().replace(/,/g, ""), victimString);
            return function(t) { that.text(format(i(t))); };
          })
        .transition()
          .delay(1500)
          .on("start", repeat);
    });
  }
};
