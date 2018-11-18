class YearChart {

    /**
     * Constructor for the Year Chart
     * Pass objects of the other charts here.
     */
    constructor (statesBarChart, geographicalMapChart, treemap, donutChart, victimChart) {

        this.statesBarChart = statesBarChart;
        this.geographicalMapChart = geographicalMapChart;
        this.treemap = treemap;
        this.donutChart = donutChart;
        this.selectedYear = null;
        this.victimChart = victimChart;
        //Creating YearChart instance

        // Initializes the svg elements required for this chart
        let divyearChart = d3.select("#year-chart").classed("year-chart", true);

        this.svgBounds = divyearChart.node().getBoundingClientRect();

        this.svgWidth = 1620;
        this.svgHeight = 50;

        //add the svg to the div
        this.svg = divyearChart.append("svg")
            .attr("width", this.svgWidth)
            .attr("height", this.svgHeight)
    };

    getSelectedYear() {
      return this.selectedYear;
    }

    /**
     * Creates a chart with circles representing each year, populates text content and other required elements for the Year Chart
     */
    update () {

        //Domain definition for global color scale
        let that = this;
        let padding = 20;
        let xAxisScale = d3.scaleLinear().domain([2008, 2016]).range([20, this.svgWidth - 20 - padding]);
        let selectionLine = this.svg.append("line")
                              .attr("x1", 2 * padding)
                              .attr("y1", this.svgHeight/2)
                              .attr("x2", this.svgWidth - padding)
                              .attr("y2", this.svgHeight/2)
                              .attr("class", "dashed");

        let selection = this.svg.selectAll("g");

        let yearData = [2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016];

        let gselection = selection.data(yearData).enter().append("g").attr("transform", d => {
          let y = this.svgHeight/2;
          let x = xAxisScale(parseInt(d));
          x = x + padding;
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
          that.selectedYear = d;
          d3.selectAll("circle").classed("selected",false);
          d3.select(this).classed("selected",true);

          d3.csv("data/TotalOffenses_"+d+".csv").then(offenseResult => {
            that.statesBarChart.update(offenseResult)
            that.geographicalMapChart.update(offenseResult)
            d3.csv("data/Types2016.csv").then(typesResult =>{
              that.donutChart.update(typesResult,offenseResult);
          })
          })



          d3.csv("data/OffenseTypesFormatted_2016.csv").then(offenseTypes => {
            that.treemap.update(offenseTypes);
          })

          d3.csv("data/Victims_"+d+".csv").then(offenseTypesUnformatted => {
                that.victimChart.update(offenseTypesUnformatted);
            })
          });



        gselection.append("text")
        .attr("x", 0)
        .text(d => d)
        .attr("y", 25)
        .attr("class", "yeartext")
        .style("font-size", "15px");
    };

};
