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
    this.padding = 25;

    //add the svg to the div
    this.svg = divStateChart.append("svg")
        .attr("width", this.svgWidth + 2*this.padding)
        .attr("height", this.svgHeight + 2*this.padding)
  };
  update(data)
  {
        console.log(data);
        let array =[]
        for (let i =0;i< data.length;i++){
            array.push((data[i].TOTAL_OFFENSES*1000000)/data[i].POPULATION)
        }
        let min = d3.min(array);
        let max = d3.max(array);
        let spacing = this.svgHeight / data.length;
        //console.log(min);
        //console.log(max);
        //console.log(array);

        let xScale = d3.scaleLinear()
            .domain([min, max])
            .range([0, this.svgWidth])
            .nice();
        let xAxis = d3.axisTop();
        xAxis.scale(xScale);

        let yScale = d3.scaleLinear()
            .domain([0, 49])
            .range([0, this.svgHeight])
            .nice();
        let yAxis = d3.axisLeft()
                      .tickSize(0)
                      .tickValues([]);
        yAxis.scale(yScale);




        this.svg.selectAll("g").remove();
        let gRect = this.svg.append("g") .attr("transform", "translate(0,25)");


       let rect = gRect.selectAll(".bar")
            .data(data)
            .enter()
            .append("rect")
            //.classed("bar", true)
            // new: we add the padding via a tranform/translate
            .attr("transform", "translate(" + this.padding + "," + this.padding + ")")
            .attr("x",xScale(0))
            .attr("y", (d, i) => i * spacing + 5)
            .attr("width", d => xScale((d.TOTAL_OFFENSES * 1000000)/d.POPULATION))
            .attr("height", 20)
            .style("fill", "red");

       let stateName = gRect.selectAll("text")
                            .data(data)
                            .enter()
                            .append("text")
                            .attr("transform", "translate(" + this.padding + "," + this.padding + ")")
                            .attr("x",d=>xScale(((d.TOTAL_OFFENSES * 1000000)/d.POPULATION)+10))
                            .attr("y",(d, i) => i * spacing + 5)
                            .attr("dy","1.2em")
                            .text(function(d){
                                return d.STATE;
                            });

       let labelX = this.svg.append("text")
                         .attr("x", this.svgWidth/2-100)
                         .attr("y", 0)
                         .attr("dy","1.2em")
                         .text("Number of crimes per million of the population");

       let Xaxis=  this.svg.append("g")
        // css class for the axis
            //.classed("axis", true)
            // moving the axis to the right place
            .attr("transform", "translate(" + this.padding + "," + this.padding*2 + ")")
            .call(xAxis);

       let Yaxis=  this.svg.append("g")
        // css class for the axis
            //.classed("axis", true)
            // moving the axis to the right place
            .attr("transform", "translate(" + this.padding + "," + this.padding*2 + ")")
            .call(yAxis);


  };
};
