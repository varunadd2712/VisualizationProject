
class Treemap {

  /**
  * Constructor for the Year Chart
  * Pass objects of the other charts here.
  */
  constructor () {
    let divMapChart = d3.select("#treemap-chart").classed("fullview", true);
    let divAsterChart = d3.select("#aster-chart").classed("center", true);
    this.svgBounds = divMapChart.node().getBoundingClientRect();
    this.svgBounds = divAsterChart.node().getBoundingClientRect();

    this.currentData = null;
    this.svgWidth = 800;
    this.svgWidth2 = 800;
    this.svgHeight = 667;
    this.svgHeight2 = 100;

    this.treemapTextSvg = divMapChart.append("svg")
    .attr("width", this.svgWidth + this.svgWidth2)
    .attr("height", this.svgHeight2)
    .attr("id", "treemapTextSvg");



    this.treemapSVG = divMapChart.append("svg")
    .attr("width", this.svgWidth)
    .attr("height", this.svgHeight)
    .attr("id", "treemapSVG");
  };

  updateFromScript() {
    console.log("triggered update");
    this.update(this.currentData, this.year);
  }

  update2(yearValue) {

    let dataArray = [];
    dataArray.push("singleString");
    d3.select("#aster-chart").selectAll("svg").remove();

    let divAsterChartDiv = d3.select("#aster-chart").classed("center", true);

    this.treemapTextSvg2 = divAsterChartDiv.append("svg")
    .attr("width", this.svgWidth + this.svgWidth2)
    .attr("height", this.svgHeight2)
    .attr("id", "treemapTextSvg2");

    this.treemapTextSvg2.selectAll("g").remove();


    let dataEnteredG = this.treemapTextSvg2.selectAll("g").data(dataArray);
    dataEnteredG = dataEnteredG.enter().append("g");
    let textBlock = this.treemapTextSvg2.append("g");

    textBlock.append("text")
    .attr("x", this.svgWidth2/2 + this.svgWidth/2)
    .text("This chart represents the various types of crimes.")
    .attr("y", (this.svgHeight2/2)-30)
    .attr("class", "yeartext")
    .style("font-size", "25px")
    .attr("opacity", 0)
    .transition()
    .duration(3000)
    .attr("opacity", 1);

    textBlock.append("text")
    .attr("x", this.svgWidth2/2 + this.svgWidth/2)
    .text("Hover on the segments to see the magnitude of the crimes")
    .attr("y", (this.svgHeight2/2))
    .attr("class", "yeartext")
    .style("font-size", "25px")
    .attr("opacity", 0)
    .transition()
    .duration(3000)
    .attr("opacity", 1);

    textBlock.append("text")
    .attr("x", this.svgWidth2/2 + this.svgWidth/2)
    .text("Intimidation, Vandalism and Assault are the biggest Hate Crimes")
    .attr("y", (this.svgHeight2/2) + 45)
    .attr("class", "yeartext")
    .attr("fill", "black")
    .style("font-size", "25px")
    .attr("opacity", 0)
    .transition()
    .duration(3000)
    .attr("opacity", 1);


    let width2 = 500;
    let height2 = 500;
    let radius2 = Math.min(width2, height2) / 2;
    let innerRadius2 = 0.3 * radius2;

    let pie = d3.pie()
    .sort(null)
    .value(function(d) { return d.width; });

    var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([0, 0])
    .html(function(d) {
      return d.data.label + ": <span style='color:orangered'>" + d.data.score + "</span>";
    });

    let xAxis = d3.scaleLinear().domain([0, 2577]).range([0.2, 0.8]);

    let arc = d3.arc()
    .innerRadius(innerRadius2)
    .outerRadius(function (d) {
      return (radius2 - innerRadius2) * xAxis(d.data.score) + innerRadius2 + 10;
    });

    let outlineArc = d3.arc()
    .innerRadius(innerRadius2)
    .outerRadius(radius2);

     let divAsterChart = d3.select("#aster-chart");
    let svg = divAsterChart.append("svg")
    .attr("width", width2)
    .attr("height", height2)
    .append("g")
    .attr("transform", "translate(" + width2 / 2 + "," + height2 / 2 + ")");

    svg.call(tip);
    let fileString = "data/aster_data_" + yearValue + ".csv";
    d3.csv(fileString).then(data => {
      this.update4(data, svg, pie, arc, outlineArc, tip);

    });
  }

  update4(data, svg, pie, arc, outlineArc, tip) {

    data.forEach(function(d) {
      d.id     =  d.id;
      d.order  = +d.order;
      d.color  =  d.color;
      d.weight = +d.weight;
      d.score  = +d.score;
      d.width  = +d.weight;
      d.label  =  d.label;
      d.total = d.total;
    })

    let outerPath = svg.selectAll(".outlineArc")
    .data(pie(data))
    .enter().append("path")
    .attr("fill", "white")
    .attr("stroke", "gray")
    .attr("class", "outlineArc")
    .attr("d", outlineArc)
    .attr("opacity", 0)
    .transition()
    .delay(function(d,i){ return i * 200 })
    .attr("opacity", 1);

    let path = svg.selectAll(".solidArc")
    .data(pie(data))
    .enter().append("path")
    .attr("fill", function(d) { return d.data.color; })
    .attr("class", "solidArc")
    .attr("stroke", "gray")
    .attr("d", arc)
    .on('mouseover', tip.show)
    .on('mouseout', tip.hide)
    .attr("opacity", 0)
    .transition()
    .delay(function(d,i){ return i * 400 })
    .attr("opacity", 1);
;


    // calculate the weighted mean score
    let score = data[0].total;
    console.log(data);

    svg.append("svg:text")
    .attr("class", "aster-score")
    .attr("dy", ".35em")
    .attr("text-anchor", "middle") // text-align: right
    .text(Math.round(score));
  }

  update(data, year)
  {

    console.log("year value");
    this.year = year;
    console.log(year);
    this.update2(year);
    /*
    console.log("triggered treemap");
    this.currentData = data;
    let dataArray = [];
    dataArray.push("singleString");
    this.treemapTextSvg.selectAll("g").remove();
    let dataEnteredG = this.treemapTextSvg.selectAll("g").data(dataArray);
    dataEnteredG = dataEnteredG.enter().append("g");
    let textBlock = this.treemapTextSvg.append("g");

    textBlock.append("text")
    .attr("x", this.svgWidth2/2 + this.svgWidth/2)
    .text("Below is the split up of the crimes that occured")
    .attr("y", (this.svgHeight2/2)-30)
    .attr("class", "yeartext")
    .style("font-size", "25px")
    .attr("opacity", 0)
    .transition()
    .duration(3000)
    .attr("opacity", 1);

    textBlock.append("text")
    .attr("x", this.svgWidth2/2 + this.svgWidth/2)
    .text("The size is an indication of the percentage")
    .attr("y", (this.svgHeight2/2))
    .attr("class", "yeartext")
    .attr("fill", "black")
    .style("font-size", "25px")
    .attr("opacity", 0)
    .transition()
    .duration(3000)
    .attr("opacity", 1);

    let root = d3.stratify()
    .id(d => d.id)
    .parentId(d => d.parentId)
    (data)
    .sum(d => d.size)
    .sort((a, b) => a.height - b.height || a.value - b.value);;

    let color = d3.scaleOrdinal(d3.schemeSet3);

    let treemap = d3.treemap()
    .size([this.svgWidth, this.svgHeight])
    .round(true)
    .padding(1);



    treemap(root);

    this.treemapSVG.selectAll("g").remove();

    let cell = this.treemapSVG.selectAll("rect")
    .data(root.leaves())
    .enter().append("g")
    .attr("transform", d => "translate(" + d.x0 + "," + d.y0 + ")");


    cell.append("rect")
    .attr("width", 0)
    .attr("height", d => d.y1 - d.y0)
    .transition()
    .duration(3000)
    .attr("width", d => d.x1 - d.x0)
    .attr("fill", d =>  {
      let a = d.ancestors();
      return color(a[a.length - 2].id);
    });

    let label = cell.append("text");

    label.append("tspan")
    .attr("x", d=>d.x1/2 - d.x0/2)
    .attr("y", d=>d.y1/2 - d.y0/2)
    .text(function(d) {
      if(d.id.length <= 8 && (d.x1 - d.x0) > 40 && (d.y1 - d.y0) > 40)
      return d.id;
      else if(d.id.length <= 15 && (d.x1 - d.x0) > 80 && (d.y1 - d.y0) > 40)
      return d.id;
    }).attr("text-anchor","middle")
    .attr("fill", "black")
    .attr("opacity", 0)
    .transition()
    .duration(4000)
    .attr("opacity", 1);

    label.append("tspan")
    .attr("x", d=>d.x1/2 - d.x0/2)
    .attr("y", d=>d.y1/2 - d.y0/2 + 20)
    .text(function(d) {
      if(d.id.length <= 8 && (d.x1 - d.x0) > 40 && (d.y1 - d.y0) > 40)
      return d.value;
      else if(d.id.length <= 15 && (d.x1 - d.x0) > 80 && (d.y1 - d.y0) > 40)
      return d.value;
    }).attr("text-anchor","middle")
    .attr("fill", "black")
    .attr("opacity", 0)
    .transition()
    .duration(4000)
    .attr("opacity", 1);

    cell.append("title")
    .text(d => d.id + " - " + d.value );

*/
  };
};
