class StatesBarChart {

  /**
   * Constructor for the Year Chart
   * Pass objects of the other charts here.
   */
  constructor (updateMapfunc) {
    let divStateChart = d3.select("#states-bar-chart").classed("sideBarChart", true);
    this.svgBounds = divStateChart.node().getBoundingClientRect();
    this.currentData = null;
    this.svgWidth = 750;
    this.svgHeight = 1500;
    this.padding = 25;
    this.updateMapfunc = updateMapfunc

    //add the svg to the div
    this.svg = divStateChart.append("svg")
        .attr("width", this.svgWidth + 2*this.padding)
        .attr("height", this.svgHeight + 2*this.padding)
  };

  updateFromScript() {
	   this.update(this.currentData);
	}

  update(data)
  {
        let that =this;
        let ndata =data;
        this.currentData = data;
        //console.log(data);
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
            .range([0, this.svgWidth-70])
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
            .attr("id",d=>d.STATE.split(' ').join(''))
            //.classed("bar", true)
            // new: we add the padding via a tranform/translate
            .attr("transform", "translate(" + this.padding + "," + this.padding + ")")
            .attr("x",xScale(0))
            .attr("y", (d, i) => i * spacing + 5)
            .attr("width", d => xScale((min)))
            .style("fill", "red")
            .transition().duration(3000)
            .attr("width", d => xScale((d.TOTAL_OFFENSES * 1000000)/d.POPULATION))
            .attr("height", 20)
            .style("fill", "red")


       let stateName = gRect.selectAll("text")
                            .data(data)
                            .enter()
                            .append("text")
                            .attr("transform", "translate(" + this.padding + "," + this.padding + ")")
                            .attr("x",d=>xScale(((d.TOTAL_OFFENSES * 1000000)/d.POPULATION)+2))
                            .attr("y",(d, i) => i * spacing)
                            .attr("dy","1.2em")
                            .text(function(d){
                                return d.STATE;
                            });

       let labelX = this.svg.append("text")
                         .attr("x", this.svgWidth/2-100)
                         .attr("y", 0)
                         .attr("dy","1.2em")
                         .text("Number of crimes per million of the population");
           var flag =0
           labelX.on("click",function(){
           if (data[0].STATE == "Alabama"){
           data = data.sort(function(a,b){
                    return xScale((b.TOTAL_OFFENSES * 1000000)/b.POPULATION) - xScale((a.TOTAL_OFFENSES * 1000000)/a.POPULATION);
                })
                flag =1
                that.update(data);}
           else{
           console.log("daifeownfownfonw");
           data = data.sort(function(a, b){
                  if(a.STATE < b.STATE) { return -1; }
                    if(a.STATE > b.STATE) { return 1; }
                    return 0;
})  
           that.update(data);
           }



            });

       let Xaxis=  this.svg.append("g")
        // css class for the axis
            //.classed("axis", true)
            // moving the axis to the right place
            .attr("transform", "translate(" + this.padding + "," + this.padding*2 + ")")
            .call(xAxis)
            ;

       let Yaxis=  this.svg.append("g")
        // css class for the axis
            //.classed("axis", true)
            // moving the axis to the right place
            .attr("transform", "translate(" + this.padding + "," + this.padding*2 + ")")
            .call(yAxis);

        this.svg.selectAll("rect").on("mouseover",function(d){
          that.svg.select("rect#"+d.STATE.split(' ').join('')).style("fill","#8b0000");
          let crimes = (d.TOTAL_OFFENSES * 1000000)/d.POPULATION
          that.updateMapfunc(d.STATE,crimes)
      });
      
        this.svg.selectAll("rect").on("mouseout",function(d){
          console.log("Hello")
          that.svg.selectAll("rect").style("fill","red") 
          that.updateMapfunc("Remove",0)
      });

  };

  updateLinks(stateName,flag){
    if(stateName=="Remove"){
        this.svg.selectAll("rect").style("fill","red")  
    }
    else{
        this.svg.select("rect#"+stateName.split(' ').join('')).style("fill","#8b0000")
    }
  }
};
