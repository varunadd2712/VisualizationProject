
class GeographicalMapChart{

	constructor(updateLinksBar){
		let divMapChart = d3.select("#geographical-map-chart").classed("twoThirdView",true)
		let maptextChart = d3.select('#map-text-chart').classed("fullView", true);
		this.svgBounds = divMapChart.node().getBoundingClientRect();
		this.svgBounds2 = maptextChart.node().getBoundingClientRect();
        this.updateLinksBar = updateLinksBar

    	this.svgWidth = 800;
			this.svgWidth2 = 800;
    	this.svgHeight = 667;
			this.currentData = null;
			this.svgHeight2 = 100;

			    //add the svg to the div
			this.maptextChartSvg = maptextChart.append("svg")
			.attr("width", this.svgWidth + this.svgWidth2)
			.attr("height", this.svgHeight2)
			.attr("id", "maptextChartSvg");

	    //add the svg to the div
	    this.geoMapSVG = divMapChart.append("svg")
	    .attr("width", this.svgWidth)
	    .attr("height", this.svgHeight)
	    .attr("id", "GeoMapSVG");

	    let infobox = d3.select("#infobox");
	    this.infosvg = infobox.append("svg")
	    					.attr("width",this.svgWidth/2)
                            .attr("height",75)
                            .attr("transform","translate(0,0)");

	    let legendHeight = 150;
        //add the svg to the div
        let legend = d3.select("#geographical-map-chart").append("div")
        // creates svg elements within the div
        this.legendSvg = legend.append("svg")
                            .attr("width",this.svgWidth)
                            .attr("height",legendHeight)
                            .attr("transform","translate(0,0)");



	};

	drawMap(){

		let that = this
		async function usMap() {
            // In order to convert lat / lon (spherical!) coordinates to fit in the 2D
            // coordinate system of our screen, we need to create a projection function:
            let projection = d3.geoAlbersUsa() // a USA-specific projection (that deals with Hawaii / Alaska)
                .translate([that.svgWidth / 2, that.svgHeight / 2]) // this centers the map in our SVG element
                .scale([900]); // this specifies how much to zoom

            // This converts the projected lat/lon coordinates into an SVG path string
            let path = d3.geoPath().projection(projection);

            // Load in GeoJSON data
            let json = await d3.json("us-states.json");

            // Bind data and create one path per GeoJSON feature
            that.geoMapSVG.append("g").attr("id","mapLayer")
            d3.select("#mapLayer").selectAll("path")
                .data(json.features)
                .enter()
                .append("path")
                .transition()
                .duration(3000)
                // here we use the familiar d attribute again to define the path
                .attr("d", path);

            // let graticule = d3.geoGraticule();
            // d3.select("#mapLayer").append('path').datum(graticule).attr('class', "grat").attr('d', path).attr('fill', 'none');
        };

        usMap();
	};


	tooltip_render(tooltip_data) {
        let text =tooltip_data.state ;
        text +=  "Crime per million: " + tooltip_data.crimes;
        return text;
    }



	updateFromScript() {
	   this.update(this.currentData);
	}

	update(data) {

		let that = this
		that.currentData = data;

		let dataArray = [];
    dataArray.push("singleString");
    this.maptextChartSvg.selectAll("g").remove();
    let dataEnteredG = this.maptextChartSvg.selectAll("g").data(dataArray);
    dataEnteredG = dataEnteredG.enter().append("g");
    let textBlock = this.maptextChartSvg.append("g");

    textBlock.append("text")
    .attr("x", this.svgWidth2/2 + this.svgWidth/2)
    .text("This chart shows the geographical distribution of the crimes")
    .attr("y", (this.svgHeight2/2)-30)
    .attr("class", "yeartext")
    .style("font-size", "25px")
    .attr("opacity", 0)
    .transition()
    .duration(3000)
    .attr("opacity", 1);

    textBlock.append("text")
    .attr("x", this.svgWidth2/2 + this.svgWidth/2)
    .text("Hover on a state to know more of its details for that year")
    .attr("y", (this.svgHeight2/2))
    .attr("class", "yeartext")
    .attr("fill", "black")
    .style("font-size", "25px")
    .attr("opacity", 0)
    .transition()
    .duration(3000)
    .attr("opacity", 1);

		async function choropleth() {

            let projection = d3.geoAlbersUsa()
                .translate([that.svgWidth / 2, that.svgHeight / 2])
                .scale([900]);

            let path = d3.geoPath().projection(projection);

            // Define a quantized scale to sort data values into buckets of color
            let color = d3.scaleLinear().range(["#ffe6e6","#cc0000"]);


            // Load in GeoJSON data
            let json = await d3.json("us-states.json");

            let data_array =[]
        	for (let i =0;i< data.length;i++){
        		let temp_dict={}
            	temp_dict["State"] = data[i]["STATE"]
            	temp_dict["value"] = ((data[i].TOTAL_OFFENSES*1000000)/data[i].POPULATION)
            	data_array.push(temp_dict)
        	}

        	let minData= d3.min(data_array, function (d) {return d.value;})
        	let maxData= d3.max(data_array, function (d) {return d.value;})
            // Set input domain for color scale based on the lowest and highest values in the data
            color.domain([minData,maxData]);


            let dataLookup = {};
            data_array.forEach(function (stateRow) {
                // d3.csv will read the values as strings; we need to convert them to floats
                dataLookup[stateRow.State] = parseFloat(stateRow.value);
            });

            // Now we add the data values to the geometry for every state
            json.features.forEach(function (feature) {
                feature.properties.value = dataLookup[feature.properties.name];
                if(feature.properties.value == undefined){
                	feature.properties.value = d3.min(data_array, function (d) {return d.value;})
                }
            });

            // Bind data and create one path per GeoJSON feature
            d3.select("#mapLayer").remove()
            that.geoMapSVG.append("g").attr("id","mapLayer")

            let allstates =d3.select("#mapLayer").selectAll("path")
                .data(json.features)
                .enter()
                .append("path")
                .attr("id", d=>d.properties.name.split(' ').join(''))
                .style("fill","white")
                .transition()
                .duration(3000)
                // here we use the familiar d attribute again to define the path
                .attr("d", path)
                .style("fill", function (d) {
                    return color(d.properties.value);
                })
                .style("stroke","white")
                .style("stroke-width", 1);

            // let legendQuantile = d3.legendColor()
            // .shapeWidth((that.svgWidth+1200)/12)
            // .cells(5)
            // .orient('horizontal')
            // .labelFormat(d3.format('.1r'))
            // .scale(color);

            // that.legendSvg.attr("align","center")
            // that.legendSvg.call(legendQuantile)

            that.legendSvg.selectAll('*').remove();

	        // append gradient bar
	        var gradient = that.legendSvg.append('defs')
	            .append('linearGradient')
	            .attr('id', 'gradient')

	        gradient.append('stop')
                .attr('offset', '0')
                .attr('stop-color',"#ffe6e6");

            gradient.append('stop')
                .attr('class', 'stop-right')
                .attr('offset', '1')
                .attr('stop-color',"#cc0000");



	        that.legendSvg.append('rect')
	            .attr('x1', 0)
	            .attr('y1', 0)
	            .attr('width', that.svgWidth/2)
	            .attr('height', 10)
	            .attr("transform","translate(200,0)")
	            .style('fill', 'url(#gradient)');

	        // create a scale and axis for the legend
	        var legendScale = d3.scaleLinear().domain([minData-minData%100,maxData+(100-maxData%100)]).range([0,that.svgWidth/2])

	        var legendAxis = d3.axisBottom().scale(legendScale).ticks(5);

	        that.legendSvg.append("g")
	            .attr("class", "legend axis")
	            .attr("transform", function(d, i) {  return "translate("+(200)+",15 )"; })
	            .call(legendAxis)

            let updbar = that.updateLinksBar
	          that.geoMapSVG.select("#mapLayer").selectAll("path").on("mouseover",function(d){
	    		let tooltip_data = {"state":d.properties.name,"crimes":d3.format('.2f')(d.properties.value)}
	    		that.infosvg.append("text").attr("x",0).attr("y",50).html(d.properties.name)
	    		that.infosvg.append("text").attr("x",0).attr("y",75).html("Crime per million: " + tooltip_data["crimes"])
	    		d3.select(this).style("stroke","white").style("stroke-width",4)
                updbar(tooltip_data.state)
	    	})
	          that.geoMapSVG.select("#mapLayer").selectAll("path").on("mouseout",function(d){
	          	that.infosvg.selectAll("text").remove()
	          	d3.select(this).style("stroke","white")
                .style("stroke-width", 1);
                updbar("Remove")
	          })

        };

        choropleth();


	}

    updateLinks(stateName,crimes,flag){
        if(stateName=="Remove"){
            this.geoMapSVG.selectAll("path").style("stroke","white").style("stroke-width", 1);
            this.infosvg.selectAll("text").remove()
        }
        else{
            this.geoMapSVG.select("path#"+stateName.split(' ').join('')).style("stroke","white").style("stroke-width",4)
            let paths = this.geoMapSVG.select("path#"+stateName)
            this.infosvg.append("text").attr("x",0).attr("y",50).html(stateName)
            this.infosvg.append("text").attr("x",0).attr("y",75).html("Crime per million: " + crimes)
            
        }

    }



};
