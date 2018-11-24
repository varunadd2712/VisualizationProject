
class Treemap {

  /**
  * Constructor for the Year Chart
  * Pass objects of the other charts here.
  */
  constructor () {
    let divMapChart = d3.select("#treemap-chart").classed("fullview", true);
    this.svgBounds = divMapChart.node().getBoundingClientRect();
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
    this.update(this.currentData);
  }

  update(data)
  {

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


  };
};
