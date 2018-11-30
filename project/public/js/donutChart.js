class DonutChart {


    constructor() {
    let divDonutChart = d3.select("#chart");
    let donutAndDropdown = d3.select("#donutAndDropdown").classed("sideBarLeft", true);
    let dropdownDiv = d3.select("#dropdownDiv").classed("sideBarLeft", true);
    this.svgBounds = divDonutChart.node().getBoundingClientRect();

    this.svgWidth = 750;
    this.svgHeight = 1500;
    this.padding = 25;

    //add the svg to the div
    /*this.svg = divDonutChart.append("svg")
        .attr("width", this.svgWidth + 2*this.padding)
        .attr("height", this.svgHeight + 2*this.padding)*/

    this.donutSVG = donutAndDropdown.append("svg").attr("width",750).attr("height",250);
    };

    prepareDonut(blueState,redState,data,data_pop){
    	console.log(data_pop)
    	let sum=0
  		let prop_blue =0
  		let prop_red =0
  		for(let i=0;i<data_pop.length;++i){
  			sum += parseInt(data_pop[i]["TOTAL_OFFENSES"])/parseInt(data_pop[i]["POPULATION"])
  			if(data_pop[i]["STATE"]== blueState)
  				prop_blue = data_pop[i]["TOTAL_OFFENSES"]/parseInt(data_pop[i]["POPULATION"])
  			if(data_pop[i]["STATE"]== redState)
  				prop_red = data_pop[i]["TOTAL_OFFENSES"]/parseInt(data_pop[i]["POPULATION"])
  		}

  		prop_blue = prop_blue/sum
  		prop_red = prop_red/sum



    	let text1 = Math.round(prop_blue * 100) + '%'
    	let text2 = Math.round(prop_red * 100) + '%'
    	let data1 = [prop_blue, 1 - prop_blue]
    	let data2 = [prop_red, 1 - prop_red]

    	let width = 200
	    let height = 100
	    let anglesRange = 0.5 * Math.PI
	    let radis = Math.min(width, 2 * height) / 2
	    var thickness = 100
	    // Utility
	//     var colors = d3.scale.category10();
	    var colors1 = ["#5EBBF8", "#F5F5F5"]
	    var colors2 = ["#CC0000", "#F5F5F5"]

	    var pies = d3.pie()
	    	.value( d => d)
	    	.sort(null)
	    	.startAngle( anglesRange * -1)
	    	.endAngle( anglesRange)

			var arc = d3.arc()
	    	.outerRadius(radis)
	    	.innerRadius(radis/2)

	    var pies2 = d3.pie()
	    	.value( d => d)
	    	.sort(null)
	    	.startAngle( anglesRange * -1)
	    	.endAngle( anglesRange)

			var arc = d3.arc()
	    	.outerRadius(radis)
	    	.innerRadius(radis/2)

	    let translation = (x, y) => `translate(${x}, ${y})`



	    // Feel free to change or delete any of the code you see in this editor!
	   	this.donutSVG.selectAll("g").remove()
	    let svg = this.donutSVG
	    	//.attr("class", "half-donut")
			.append("g")
	    	.attr("transform", translation(width / 2, height))

	    let svg2 = this.donutSVG
	    	//.attr("class", "half-donut")
			.append("g")
	    	.attr("transform", translation(width / 2 +250, height))


	    svg.selectAll("path")
	    	.data(pies(data1))
	    	.enter()
	    	.append("path")
	    	.attr("fill", (d, i) => colors1[i])
	    	.attr("d", arc)


		svg.append("text")
	    	.text( d => text1)
	    	.attr("dy", "0rem")
	    	.attr("dx", "-1rem")
	    	.attr("class", "label")
	    svg.append("text")
	    	.text(blueState)
	    	.attr("dy", "2rem")
	    	.attr("class", "label")
	    	.attr("text-anchor","middle")

	    svg2.selectAll("path")
	    	.data(pies(data2))
	    	.enter()
	    	.append("path")
	    	.transition()
	    	.duration(3000)
	    	.attr("fill", (d, i) => colors2[i])
	    	.attr("d", arc)
	    svg2.append("text")
	    	.text(redState)
	    	.attr("dy", "2rem")
	    	.attr("class", "label")
	    	.attr("text-anchor","middle")


		svg2.append("text")
	    	.text( d => text2)
	    	.attr("dy", "0rem")
	    	.attr("dx", "-1rem")
	    	.attr("class", "label")
	    	//.attr("transform",translation(250, 0)
    	}

    spiderchart(d) {
      d3.select("#shalin").remove();
      let mycfg = {
      w: this.svgWidth,
      h: this.svgHeight,
      maxValue: 0.6,
      levels: 6,
      ExtraWidthX: 300
    }

    let RadarChart = {
    draw: function(id, d, options){
    let cfg = {
  	 radius: 5,
  	 w: this.svgWidth,
  	 h: this.svgHeight,
  	 factor: 1,
  	 factorLegend: .85,
  	 levels: 3,
  	 maxValue: 0,
  	 radians: 2 * Math.PI,
  	 opacityArea: 0.5,
  	 ToRight: 5,
  	 TranslateX: 80,
  	 TranslateY: 30,
  	 ExtraWidthX: 100,
  	 ExtraWidthY: 100,
  	 color: ["5ebbf8","cc0000"]
  	};

  	if('undefined' !== typeof options){
  	  for(let i in options){
  		if('undefined' !== typeof options[i]){
  		  cfg[i] = options[i];
  		}
  	  }
  	}
  	cfg.maxValue = Math.max(cfg.maxValue, d3.max(d, function(i){return d3.max(i.map(function(o){return o.value;}))}));
  	let allAxis = (d[0].map(function(i, j){return i.axis}));
  	let total = allAxis.length;
  	let radius = cfg.factor*Math.min(cfg.w/2, cfg.h/2);
  	let Format = d3.format('%','03d');

  	let g = d3.select(id)
  			.append("svg")
        .attr("id", "shalin")
  			.attr("width", cfg.w+cfg.ExtraWidthX)
  			.attr("height", cfg.h+cfg.ExtraWidthY)
  			.append("g")
  			.attr("transform", "translate(" + cfg.TranslateX + "," + cfg.TranslateY + ")");
  			;

  	let tooltip;

  	//Circular segments
  	for(let j=0; j<cfg.levels-1; j++){
  	  let levelFactor = cfg.factor*radius*((j+1)/cfg.levels);
  	  g.selectAll(".levels")
  	   .data(allAxis)
  	   .enter()
  	   .append("svg:line")
  	   .attr("x1", function(d, i){return levelFactor*(1-cfg.factor*Math.sin(i*cfg.radians/total));})
  	   .attr("y1", function(d, i){return levelFactor*(1-cfg.factor*Math.cos(i*cfg.radians/total));})
  	   .attr("x2", function(d, i){return levelFactor*(1-cfg.factor*Math.sin((i+1)*cfg.radians/total));})
  	   .attr("y2", function(d, i){return levelFactor*(1-cfg.factor*Math.cos((i+1)*cfg.radians/total));})
  	   .attr("class", "line")
  	   .style("stroke", "grey")
  	   .style("stroke-opacity", "0.75")
  	   .style("stroke-width", "0.3px")
  	   .attr("transform", "translate(" + (cfg.w/2-levelFactor) + ", " + (cfg.h/2-levelFactor) + ")");
  	}

  	//Text indicating at what % each level is
  	for(let j=0; j<cfg.levels; j++){
  	  let levelFactor = cfg.factor*radius*((j+1)/cfg.levels);
  	  g.selectAll(".levels")
  	   .data([1]) //dummy data
  	   .enter()
  	   .append("svg:text")
  	   .attr("x", function(d){return levelFactor*(1-cfg.factor*Math.sin(0));})
  	   .attr("y", function(d){return levelFactor*(1-cfg.factor*Math.cos(0));})
  	   .attr("class", "legend")
  	   .style("font-family", "sans-serif")
  	   .style("font-size", "15px")
  	   .attr("transform", "translate(" + (cfg.w/2-levelFactor + cfg.ToRight) + ", " + (cfg.h/2-levelFactor) + ")")
  	   .attr("fill", "#737373")
  	   .text(Format((j+1)*cfg.maxValue/cfg.levels));
  	}

  	let series = 0;

  	let axis = g.selectAll(".axis")
  			.data(allAxis)
  			.enter()
  			.append("g")
  			.attr("class", "axis");

  	axis.append("line")
  		.attr("x1", cfg.w/2)
  		.attr("y1", cfg.h/2)
  		.attr("x2", function(d, i){return cfg.w/2*(1-cfg.factor*Math.sin(i*cfg.radians/total));})
  		.attr("y2", function(d, i){return cfg.h/2*(1-cfg.factor*Math.cos(i*cfg.radians/total));})
  		.attr("class", "line")
  		.style("stroke", "grey")
  		.style("stroke-width", "1px");

  	axis.append("text")
  		.attr("class", "legend")
  		.text(function(d){return d})
  		.style("font-family", "sans-serif")
  		.style("font-size", "15px")
  		.attr("text-anchor", "middle")
  		.attr("dy", "1.5em")
  		.attr("transform", function(d, i){return "translate(0, -10)"})
  		.attr("x", function(d, i){return cfg.w/2*(1-cfg.factorLegend*Math.sin(i*cfg.radians/total))-60*Math.sin(i*cfg.radians/total);})
  		.attr("y", function(d, i){return cfg.h/2*(1-Math.cos(i*cfg.radians/total))-20*Math.cos(i*cfg.radians/total);});


  	d.forEach(function(y, x){
  	  let dataValues = [];
  	  g.selectAll(".nodes")
  		.data(y, function(j, i){
  		  dataValues.push([
  			cfg.w/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.sin(i*cfg.radians/total)),
  			cfg.h/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.cos(i*cfg.radians/total))
  		  ]);
  		});
  	  dataValues.push(dataValues[0]);
  	  g.selectAll(".area")
  					 .data([dataValues])
  					 .enter()
  					 .append("polygon")
  					 .attr("class", "radar-chart-serie"+series)
  					 .style("stroke-width", "2px")
  					 .style("stroke", cfg.color[series])
  					 .attr("points",function(d) {
  						 var str="";
  						 for(var pti=0;pti<d.length;pti++){
  							 str=str+d[pti][0]+","+d[pti][1]+" ";
  						 }
  						 return str;
  					  })
  					 .style("fill", function(j, i){return cfg.color[series]})
  					 .style("fill-opacity", cfg.opacityArea)
  					 .on('mouseover', function (d){
  										let z = "polygon."+d3.select(this).attr("class");
  										g.selectAll("polygon")
  										 .transition(200)
  										 .style("fill-opacity", 0.1);
  										g.selectAll(z)
  										 .transition(200)
  										 .style("fill-opacity", .7);
  									  })
  					 .on('mouseout', function(){
  										g.selectAll("polygon")
  										 .transition(200)
  										 .style("fill-opacity", cfg.opacityArea);
  					 });
  	  series++;
  	});
  	 series=0;


  	d.forEach(function(y, x){
  	  g.selectAll(".nodes")
  		.data(y).enter()
  		.append("svg:circle")
  		.attr("class", "radar-chart-serie"+series)
  		.attr('r', cfg.radius)
  		.attr("alt", function(j){return Math.max(j.value, 0)})
  		.attr("cx", function(j, i){
  		  let dataValues=[];
  		  dataValues.push([
  			cfg.w/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.sin(i*cfg.radians/total)),
  			cfg.h/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.cos(i*cfg.radians/total))
  		]);
  		return cfg.w/2*(1-(Math.max(j.value, 0)/cfg.maxValue)*cfg.factor*Math.sin(i*cfg.radians/total));
  		})
  		.attr("cy", function(j, i){
  		  return cfg.h/2*(1-(Math.max(j.value, 0)/cfg.maxValue)*cfg.factor*Math.cos(i*cfg.radians/total));
  		})
  		.attr("data-id", function(j){return j.axis})
  		.style("fill", cfg.color[series]).style("fill-opacity", .9)
  		.on('mouseover', function (d){
  					let newX =  parseFloat(d3.select(this).attr('cx')) - 10;
  					let newY =  parseFloat(d3.select(this).attr('cy')) - 5;

  					 tooltip
  						.attr('x', newX)
  						.attr('y', newY)
  						.text(Format(d.value))
  						.transition(200)
  						.style('opacity', 1);

  					let z = "polygon."+d3.select(this).attr("class");
  					g.selectAll("polygon")
  						.transition(200)
  						.style("fill-opacity", 0.1);
  					g.selectAll(z)
  						.transition(200)
  						.style("fill-opacity", .7);
  				  })
  		.on('mouseout', function(){
  					tooltip
  						.transition(200)
  						.style('opacity', 0);
  					g.selectAll("polygon")
  						.transition(200)
  						.style("fill-opacity", cfg.opacityArea);
  				  })
  		.append("svg:title")
  		.text(function(j){return Math.max(j.value, 0)});

  	  series++;
  	});
  	//Tooltip
  	 tooltip = g.append('text')
  			   .style('opacity', 0)
  			   .style('font-family', 'sans-serif')
  			   .style('font-size', '13px');
    }
  };

  RadarChart.draw("#chart", d, mycfg);


    }

    update(data,data2) {
    //console.log(data["California"]);
    d3.select("#dropdownDiv").selectAll("select").remove()


   //let colorscale = d3.scale.category10();
   let states=[]
   for(let i=0;i<data2.length;++i){
   	states.push(data2[i]["STATE"])
   }

   let blueState = "California"
   let redState = "Utah"
   let d = [];
   d.push(data[blueState]);
   d.push(data[redState]);
   this.spiderchart(d);

   let that =this
   this.prepareDonut(blueState,redState,data,data2);
   let dropdownChange = function() {
                    var newCereal = d3.select(this).property('value')
                    blueState = newCereal
                	that.prepareDonut(blueState,redState,data,data2);
                  d[0] = data[blueState];
                  that.spiderchart(d);
                };
   let dropdownChange2 = function() {
                    var newCereal = d3.select(this).property('value')
                    redState = newCereal
                	that.prepareDonut(blueState,redState,data,data2);
                d[1] = data[redState];
                that.spiderchart(d);
              };

   //let textdrop1 = d3.select("#chart").append("text").text("State 1:")
   let dropdown = d3.select("#dropdownDiv").insert("select","svg").on("change", dropdownChange).attr("class","dropbtn");
   let dropdown2 = d3.select("#dropdownDiv").insert("select","svg").on("change", dropdownChange2).attr("class","dropbtn2");

    dropdown.selectAll("option")
            .data(states)
            .enter().append("option")
            .attr("value", function (d) { return d; })
            .property("selected",function(d){return d === "California";})
            .text(function (d) {
            return d[0].toUpperCase() + d.slice(1,d.length); // capitalize 1st letter
            });

    dropdown2.selectAll("option")
            .data(states)
            .enter().append("option")
            .attr("value", function (d) { return d; })
            .property("selected",function(d){return d === "Utah";})
            .text(function (d) {
            return d[0].toUpperCase() + d.slice(1,d.length); // capitalize 1st letter
            });

//Call function to draw the Radar chart
//Will expect that data is in %'s
};

};
