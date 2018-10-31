class YearChart {

    /**
     * Constructor for the Year Chart
     * Pass objects of the other charts here.
     */
    constructor () {

        //Creating YearChart instance

        // Initializes the svg elements required for this chart
        this.margin = {top: 10, right: 20, bottom: 20, left: 50};
        let divyearChart = d3.select("#year-chart").classed("fullview", true);

        //fetch the svg bounds
        this.svgBounds = divyearChart.node().getBoundingClientRect();
        //this.svgWidth = this.svgBounds.width - this.margin.left - this.margin.right;
        this.svgWidth = 1500;
        this.svgHeight = 50;

        //add the svg to the div
        this.svg = divyearChart.append("svg")
            .attr("width", this.svgWidth)
            .attr("height", this.svgHeight)
    };

    /**
     * Creates a chart with circles representing each year, populates text content and other required elements for the Year Chart
     */
    update () {

        //Domain definition for global color scale
        let that = this;

        let xAxisScale = d3.scaleLinear().domain([2008, 2016]).range([20, this.svgWidth - 20]);
        let selectionLine = this.svg.append("line")
                              .attr("x1", 0)
                              .attr("y1", this.svgHeight/2)
                              .attr("x2", this.svgWidth)
                              .attr("y2", this.svgHeight/2)
                              .attr("class", "dashed");

        let selection = this.svg.selectAll("g");

        let yearData = [2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016];

        let gselection = selection.data(yearData).enter().append("g").attr("transform", d => {
          let y = this.svgHeight/2;
          let x = xAxisScale(parseInt(d));
          return "translate(" + x  + "," + y + ")";
        });


        gselection.append("circle")
        .attr("r", 10)
        .attr("class", "yearCircles")
        .on("mouseover", function() {
          d3.select(this).classed("highlighted",true);
        })
        .on("mouseout", function() {
          d3.select(this).classed("highlighted",false);
        })
        .on("click", function(d) {
          d3.selectAll("circle").classed("selected",false);
          d3.select(this).classed("selected",true);
        });

        gselection.append("text")
        .attr("x", 0)
        .text(d => d)
        .attr("y", 25)
        .attr("class", "yeartext")
        .style("font-size", "15px");
    };

};
