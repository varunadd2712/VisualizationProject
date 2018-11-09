
class GeographicalMapChart{

	constructor(){
		let divMapChart = d3.select("#geographical-map-chart").classed("twoThirdView",true)
		this.svgBounds = divMapChart.node().getBoundingClientRect();

    	this.svgWidth = 800;
    	this.svgHeight = 667;

	    //add the svg to the div
	    this.geoMapSVG = divMapChart.append("svg")
	    .attr("width", this.svgWidth)
	    .attr("height", this.svgHeight)
	    .attr("id", "GeoMapSVG");
	    
	    let legendHeight = 150;
        //add the svg to the div
        let legend = d3.select("#legend");

        // creates svg elements within the div
        this.legendSvg = legend.append("svg")
                            .attr("width",this.svgWidth)
                            .attr("height",legendHeight)
                            .attr("transform","translate(0,800)");
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


	update(data){

		let that = this
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

            // Set input domain for color scale based on the lowest and highest values in the data
            color.domain([
                d3.min(data_array, function (d) {
                    return d.value;
                }),
                d3.max(data_array, function (d) {
                    return d.value;
                })
            ]);


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
            d3.select("#mapLayer").selectAll("path")
                .data(json.features)
                .enter()
                .append("path")
                .transition()
                .duration(3000)
                // here we use the familiar d attribute again to define the path
                .attr("d", path)
                .style("fill", function (d) {
                	console.log(d.properties.value)
                    return color(d.properties.value);
                });
            
            let legendQuantile = d3.legendColor()
            .shapeWidth((that.svgWidth+1200)/12)
            .cells(5)
            .orient('horizontal')
            .labelFormat(d3.format('.1r'))
            .scale(color);

            that.legendSvg.attr("align","center")
            that.legendSvg.call(legendQuantile)
        };
        

        choropleth();
        
	}

	legend(colorScale){

		console.log(colorScale)
        var colorLegend = d3.legend.color()
        	.labelFormat(d3.format(".0f"))
        	.scale(colorScale)
        	.shapePadding(5)
        	.shapeWidth(50)
        	.shapeHeight(20)
        	.labelOffset(12);

      	this.geoMapSvg.append("g")
        .attr("transform", "translate(550, 400)")
        .call(colorLegend);
    }

};