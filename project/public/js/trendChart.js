class TrendChart {

  constructor () {
    let divChart = d3.select("#trendchart").classed("fullView", true);
    let divChart2 = d3.select("#newchart").classed("center", true);
    this.svgBounds = divChart.node().getBoundingClientRect();

    this.svgWidth = 700;
    this.svgWidth2 = 900;
    this.svgHeight = 667;
    this.svgHeight2 = 100;

    this.currentData = null;

    //add the svg to the div

    //add the svg to the div
    this.trendChartTextSvg = divChart.append("svg")
    .attr("width", this.svgWidth + this.svgWidth2)
    .attr("height", this.svgHeight2)
    .attr("id", "trendChartTextSvg");

    this.lineChartSvg = divChart.append("svg")
    .attr("width", this.svgWidth)
    .attr("height", this.svgHeight + 40)
    .attr("id", "lineChartSvg");

    this.vulnerableChartSvg = divChart.append("svg")
    .attr("width", this.svgWidth)
    .attr("height", this.svgHeight+900)
    .attr("id", "vulnerableChartSvg")
    .attr("class","sideBarVul")
    .style("overflow-y","scroll");

    this.lineChartTextSvg = divChart.append("svg")
    .attr("width", this.svgWidth2)
    .attr("height", this.svgHeight/5)
    .attr("id", "lineChartTextSvg");

    this.vulnerableTextSvg = divChart.append("svg")
    .attr("width", this.svgWidth2)
    .attr("height", this.svgHeight)
    .attr("id", "vulnerableTextSvg")
    .classed("sideBar",true);

    this.vulnerable2008 = [{group:"Anti-Black/African American", value:3413}, {group:"Anti-Jewish", value:1055}, {group:"Anti-Male Homosexual", value:948}];
    this.vulnerable2009 = [{group:"Anti-Black/African American", value:2724}, {group:"Anti-Jewish", value:964}, {group:"Anti-Male Homosexual", value:798}];
    this.vulnerable2010 = [{group:"Anti-Black/African American", value:2600}, {group:"Anti-Jewish", value:922}, {group:"Anti-Male Homosexual", value:851}];
    this.vulnerable2011 = [{group:"Anti-Black/African American", value:2494}, {group:"Anti-Jewish", value:820}, {group:"Anti-Hispanic", value:504}];
    this.vulnerable2012 = [{group:"Anti-Black/African American", value:2180}, {group:"Anti-Jewish", value:696}, {group:"Anti-White", value:739}];
    this.vulnerable2013 = [{group:"Anti-Black/African American", value:2263}, {group:"Anti-Jewish", value:849}, {group:"Anti-Male Homosexual", value:728}];
    this.vulnerable2014 = [{group:"Anti-Black/African American", value:1955}, {group:"Anti-White", value:701}, {group:"Anti-Male Homosexual", value:683}];
    this.vulnerable2015 = [{group:"Anti-Black/African American", value:2125}, {group:"Anti-White", value:734}, {group:"Anti-Male Homosexual", value:758}];
    this.vulnerable2016 = [{group:"Anti-Black/African American", value:2122}, {group:"Anti-White", value:876}, {group:"Anti-Jewish", value:834}];
  }

  dataFunction(yearValue, i) {

    let currentValue = {};
    let currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + i);
    currentValue.date = currentDate;
    currentValue.value = Math.random();
    currentValue.group = yearValue;

    return currentValue;

  }

  update2() {
    console.log("called");
    var width = 700;
    var height = 700;
    var start = 0;
    var end = 2.25;
    var numSpirals = 1.5;
    var margin = {top:50,bottom:50,left:50,right:50};

    let theta = function(r) {
      return numSpirals * Math.PI * r;
    };

    // used to assign nodes color by group
    let color = d3.scaleOrdinal(d3.schemeCategory10);

    let r = d3.min([width, height]) / 2 - 40;

    let radius = d3.scaleLinear()
    .domain([start, end])
    .range([40, r]);
    d3.select("#newchart").selectAll("svg").remove();
    d3.select("#newchart").selectAll("div").remove();
    let svg = d3.select("#newchart").append("svg")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.left + margin.right)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    let points = d3.range(start, end + 0.001, (end - start) / 1000);

    let spiral = d3.radialLine()
    .curve(d3.curveCardinal)
    .angle(theta)
    .radius(radius);

    let path = svg.append("path")
    .datum(points)
    .attr("id", "spiral")
    .attr("d", spiral)
    .style("fill", "none")
    .style("stroke", "steelblue");

    let spiralLength = path.node().getTotalLength(),
    N = 81,
    barWidth = (spiralLength / N) - 1;
    let someData = [];

    someData.push({race: "Anti-Black", value: 3413, group: 2008});
    someData.push({race: "Anti-White", value: 812, group: 2008});
    someData.push({race: "Anti-Jewish", value: 1055, group: 2008});
    someData.push({race: "Anti-Hispanic", value: 735, group: 2008});
    someData.push({race: "Anti-Islamic", value: 123, group: 2008});
    someData.push({race: "Anti-Homosexual", value: 948, group: 2008});
    someData.push({race: "Anti-Native", value: 59, group: 2008});
    someData.push({race: "Anti-Asian", value: 162, group: 2008});
    someData.push({race: "Anti-Disability", value: 85, group: 2008});
    someData.push({race: "Anti-Black", value: 2724, group: 2009});
    someData.push({race: "Anti-White", value: 652, group: 2009});
    someData.push({race: "Anti-Jewish", value: 964, group: 2009});
    someData.push({race: "Anti-Hispanic", value: 654, group: 2009});
    someData.push({race: "Anti-Islamic", value: 128, group: 2009});
    someData.push({race: "Anti-Homosexual", value: 798, group: 2009});
    someData.push({race: "Anti-Native", value: 84, group: 2009});
    someData.push({race: "Anti-Asian", value: 147, group: 2009});
    someData.push({race: "Anti-Disability", value: 97, group: 2009});
    someData.push({race: "Anti-Black", value: 2600, group: 2010});
    someData.push({race: "Anti-White", value: 679, group: 2010});
    someData.push({race: "Anti-Jewish", value: 922, group: 2010});
    someData.push({race: "Anti-Hispanic", value: 681, group: 2010});
    someData.push({race: "Anti-Islamic", value: 186, group: 2010});
    someData.push({race: "Anti-Homosexual", value: 851, group: 2010});
    someData.push({race: "Anti-Native", value: 45, group: 2010});
    someData.push({race: "Anti-Asian", value: 190, group: 2010});
    someData.push({race: "Anti-Disability", value: 46, group: 2010});
    someData.push({race: "Anti-Black", value: 2494, group: 2011});
    someData.push({race: "Anti-White", value: 577, group: 2011});
    someData.push({race: "Anti-Jewish", value: 820, group: 2011});
    someData.push({race: "Anti-Hispanic", value: 506, group: 2011});
    someData.push({race: "Anti-Islamic", value: 175, group: 2011});
    someData.push({race: "Anti-Homosexual", value: 871, group: 2011});
    someData.push({race: "Anti-Native", value: 67, group: 2011});
    someData.push({race: "Anti-Asian", value: 165, group: 2011});
    someData.push({race: "Anti-Disability", value: 58, group: 2011});
    someData.push({race: "Anti-Black", value: 2180, group: 2012});
    someData.push({race: "Anti-White", value: 739, group: 2012});
    someData.push({race: "Anti-Jewish", value: 696, group: 2012});
    someData.push({race: "Anti-Hispanic", value: 488, group: 2012});
    someData.push({race: "Anti-Islamic", value: 149, group: 2012});
    someData.push({race: "Anti-Homosexual", value: 720, group: 2012});
    someData.push({race: "Anti-Native", value: 109, group: 2012});
    someData.push({race: "Anti-Asian", value: 134, group: 2012});
    someData.push({race: "Anti-Disability", value: 102, group: 2012});
    someData.push({race: "Anti-Black", value: 2263, group: 2013});
    someData.push({race: "Anti-White", value: 728, group: 2013});
    someData.push({race: "Anti-Jewish", value: 689, group: 2013});
    someData.push({race: "Anti-Hispanic", value: 418, group: 2013});
    someData.push({race: "Anti-Islamic", value: 165, group: 2013});
    someData.push({race: "Anti-Homosexual", value: 849, group: 2013});
    someData.push({race: "Anti-Native", value: 149, group: 2013});
    someData.push({race: "Anti-Asian", value: 158, group: 2013});
    someData.push({race: "Anti-Disability", value: 92, group: 2013});
    someData.push({race: "Anti-Black", value: 1955, group: 2014});
    someData.push({race: "Anti-White", value: 701, group: 2014});
    someData.push({race: "Anti-Jewish", value: 635, group: 2014});
    someData.push({race: "Anti-Hispanic", value: 376, group: 2014});
    someData.push({race: "Anti-Islamic", value: 178, group: 2014});
    someData.push({race: "Anti-Homosexual", value: 683, group: 2014});
    someData.push({race: "Anti-Native", value: 146, group: 2014});
    someData.push({race: "Anti-Asian", value: 168, group: 2014});
    someData.push({race: "Anti-Disability", value: 95, group: 2014});
    someData.push({race: "Anti-Black", value: 2125, group: 2015});
    someData.push({race: "Anti-White", value: 734, group: 2015});
    someData.push({race: "Anti-Jewish", value: 695, group: 2015});
    someData.push({race: "Anti-Hispanic", value: 379, group: 2015});
    someData.push({race: "Anti-Islamic", value: 301, group: 2015});
    someData.push({race: "Anti-Homosexual", value: 758, group: 2015});
    someData.push({race: "Anti-Native", value: 143, group: 2015});
    someData.push({race: "Anti-Asian", value: 132, group: 2015});
    someData.push({race: "Anti-Disability", value: 88, group: 2015});
    someData.push({race: "Anti-Black", value: 2122, group: 2016});
    someData.push({race: "Anti-White", value: 876, group: 2016});
    someData.push({race: "Anti-Jewish", value: 834, group: 2016});
    someData.push({race: "Anti-Hispanic", value: 449, group: 2016});
    someData.push({race: "Anti-Islamic", value: 381, group: 2016});
    someData.push({race: "Anti-Homosexual", value: 765, group: 2016});
    someData.push({race: "Anti-Native", value: 170, group: 2016});
    someData.push({race: "Anti-Asian", value: 131, group: 2016});
    someData.push({race: "Anti-Disability", value: 76, group: 2016});


    for(let i = 0 ; i < N ; i++) {
      let currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + i);

      let currentJson = someData[i];
      currentJson.date = currentDate;
      someData[i] = currentJson;
    }

    console.log("here");
    console.log(someData);
    console.log("hereend");

    let timeScale = d3.scaleTime()
    .domain(d3.extent(someData, function(d){
      return d.date;
    }))
    .range([0, spiralLength]);

    // yScale for the bar height
    let yScale = d3.scaleLinear()
    .domain([0, d3.max(someData, function(d){
      return d.value;
    })])
    .range([0, (r / numSpirals) - 60]);

    svg.selectAll("rect")
    .data(someData)
    .enter()
    .append("rect")
    .attr("x", function(d,i){

      let linePer = timeScale(d.date),
      posOnLine = path.node().getPointAtLength(linePer),
      angleOnLine = path.node().getPointAtLength(linePer - barWidth);

      d.linePer = linePer; // % distance are on the spiral
      d.x = posOnLine.x; // x postion on the spiral
      d.y = posOnLine.y; // y position on the spiral

      d.a = (Math.atan2(angleOnLine.y, angleOnLine.x) * 180 / Math.PI) - 90; //angle at the spiral position

      return d.x;
    })
    .attr("y", function(d){
      return d.y;
    })
    .attr("width", function(d){
      return barWidth;
    })
    .attr("height", function(d){
      return yScale(d.value);
    })
    .style("fill", function(d){return color(d.group);})
    .style("stroke", "none")
    .attr("transform", function(d){
      return "rotate(" + d.a + "," + d.x  + "," + d.y + ")"; // rotate the bar
    }).attr("opacity", 0)
    .transition()
    .delay(function(d,i){ return i * 50 })
    .attr("opacity", 1);

    // add date labels
    let tF = d3.timeFormat("%Y"),
    firstInMonth = {};

    svg.selectAll("text")
    .data(someData)
    .enter()
    .append("text")
    .attr("dy", 10)
    .style("text-anchor", "start")
    .style("font", "10px arial")
    .append("textPath")
    // only add for the first of each month
    .filter(function(d){
      let sd = tF(d.date);
      if (d.race === "Anti-Black"){
        return true;
      }
      return false;
    })
    .text(function(d){
      return d.group;
    })
    // place text along spiral
    .attr("xlink:href", "#spiral")
    .style("fill", "grey")
    .attr("startOffset", function(d){
      return ((d.linePer / spiralLength) * 100) + "%";
    })


    let tooltip = d3.select("#newchart")
    .append('div')
    .attr('class', 'tooltip');

    tooltip.append('div')
    .attr('class', 'date');
    tooltip.append('div')
    .attr('class', 'value');

    svg.selectAll("rect")
    .on('mouseover', function(d) {

      tooltip.select('.date').html("Group: <b>" + d.race + "</b>");
      tooltip.select('.value').html("Number of Crimes: <b>" + Math.round(d.value*100)/100 + "<b>");

      d3.select(this)
      .style("fill","#FFFFFF")
      .style("stroke","#000000")
      .style("stroke-width","2px");

      tooltip.style('display', 'block');
      tooltip.style('opacity',2);

    })
    .on('mousemove', function(d) {
      tooltip.style('top', (d3.event.layerY + 10) + 'px')
      .style('left', (d3.event.layerX - 25) + 'px');
    })
    .on('mouseout', function(d) {
      d3.selectAll("rect")
      .style("fill", function(d){return color(d.group);})
      .style("stroke", "none")

      tooltip.style('display', 'none');
      tooltip.style('opacity',0);
    });

  }

  update() {
    this.update2();
    let dataArray = [];
    dataArray.push("singleString");
    this.trendChartTextSvg.selectAll("g").remove();
    let dataEnteredG = this.trendChartTextSvg.selectAll("g").data(dataArray);
    dataEnteredG = dataEnteredG.enter().append("g");
    let textBlock2 = this.trendChartTextSvg.append("g");

    textBlock2.append("text")
    .attr("x", this.svgWidth2/2 + this.svgWidth/2)
    .text("Below are the trends of the crimes across the years")
    .attr("y", (this.svgHeight2/2)-30)
    .attr("class", "yeartext")
    .style("font-size", "25px")
    .attr("opacity", 0)
    .transition()
    .duration(3000)
    .attr("opacity", 1);

    textBlock2.append("text")
    .attr("x", this.svgWidth2/2 + this.svgWidth/2)
    .text("Click on a point to know more details.")
    .attr("y", (this.svgHeight2/2))
    .attr("class", "yeartext")
    .attr("fill", "black")
    .style("font-size", "25px")
    .attr("opacity", 0)
    .transition()
    .duration(3000)
    .attr("opacity", 1);

    let that = this;
    this.lineChartTextSvg.selectAll("g").remove();
    let textBlock = this.lineChartTextSvg.append("g");

    textBlock.append("text")
    .attr("x", this.svgWidth2/2)
    .text("In this trend, we see ")
    .attr("y", 50)
    .attr("class", "yeartext")
    .style("font-size", "25px")
    .attr("opacity", 0)
    .transition()
    .duration(3000)
    .attr("opacity", 1);

    textBlock.append("text")
    .attr("x", this.svgWidth2/2)
    .text("there was a sharp dip in crime from 2008 to 2014,")
    .attr("y", 90)
    .attr("class", "yeartext")
    .style("font-size", "25px")
    .attr("opacity", 0)
    .transition()
    .duration(3000)
    .attr("opacity", 1);

    textBlock.append("text")
    .attr("x", this.svgWidth2/2)
    .text("after which it started to pick up.")
    .attr("y", 130)
    .attr("class", "yeartext")
    .style("font-size", "25px")
    .attr("opacity", 0)
    .transition()
    .duration(3000)
    .attr("opacity", 1);

    this.lineChartSvg.selectAll("g").remove();

    let yData = [9168, 7789, 7699, 7254, 6718, 6933, 6418, 6885, 7321];
    let xData = [2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016];

    let xScale = d3.scaleLinear()
    .domain([2007, 2016])
    .range([0, this.svgWidth-100])
    .nice();

    let yScale = d3.scaleLinear()
    .domain([6418, 9168])
    .range([this.svgHeight-10, 40])
    .nice();

    let xAxis = d3.axisBottom();
    xAxis.scale(xScale).tickFormat(d3.format("d"));;

    let yAxis = d3.axisLeft();
    yAxis.scale(yScale).tickFormat(d3.format("d"));;

    this.lineChartSvg.select(".yAxis").remove();
    this.lineChartSvg.select(".xAxis").remove();
    this.lineChartSvg.selectAll("text").remove();

    let xTranslate = this.svgHeight/2 + 300;


    let yAxisElement = this.lineChartSvg.insert("g",":first-child").classed("axis", true)
    .attr("transform", "translate(" + "" + 80 + "," + -30 + ")")
    .attr("class", "yAxis")
    .call(yAxis);

    let xAxisElement = this.lineChartSvg.insert("g",":first-child").classed("axis", true)
    .attr("transform", "translate(" + "" + 80 + "," + xTranslate  + ")")
    .attr("class", "xAxis")
    .call(xAxis);

    this.lineChartSvg.append("text")
    .attr("transform", "translate(" + 400 + " ," + (xTranslate + 30) + ")")
    .style("text-anchor", "middle")
    .attr("class", "axis-label")
    .text("YEAR");

    this.lineChartSvg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 10)
    .attr("x",-200)
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .attr("class", "axis-label")
    .text("Number of Crimes");

    let gElement = this.lineChartSvg.append("g").attr("transform", "translate(" + "" + 80 + "," + -30 + ")");

    let lineChartData = [];
    let counter = 0;

    xData.forEach(function(year){
      let val = yData[counter];
      counter++;
      lineChartData.push({"Year":year, "Value":val});
    });


    let valueline = d3.line()
    .x(function(d) { return xScale(d.Year); })
    .y(function(d) { return yScale(d.Value); });

    let pathValue = gElement.append("path")
    .attr("d", valueline(lineChartData))
    .attr("stroke", "red")
    .attr("stroke-width", 2)
    .attr("fill", " none");

    let totalLength = pathValue.node().getTotalLength();

    pathValue.attr("stroke-dasharray", totalLength + " " + totalLength)
    .attr("stroke-dashoffset", totalLength)
    .transition().duration(5000)
    .attr("stroke-dashoffset", 0);

    let newScatter = gElement.selectAll("circle").data(xData)
    .enter()
    .append("circle");

    newScatter.attr("cx", function(d, i) {
      return xScale(d);
    })
    .attr("cy", function(d, i) {
      return yScale(yData[i]);
    })
    .attr("r", function(d, i) {
      return 5;
    })
    .attr("class", function(d, i) {
      return "circleVal";
    }).on("click", function(d) {
      that.drawBarChart([d]);
    });

    let brush = d3.brush().extent([[0, 0],[this.svgWidth, this.svgHeight]]).on("brush end", brushed);
    this.lineChartSvg.append("g").attr("class", "brush").call(brush);
       that = this
       function brushed(){
         let [x1,y1] = d3.event.selection[0]
         let [x2,y2] = d3.event.selection[1]
         let selectedYears = []
         for(let i=0; i<=yData.length;++i){
            if(xScale(xData[i])>=x1 -80&& xScale(xData[i])<=x2-80){
                if(yScale(yData[i])>=y1+30&&yScale(yData[i])<=y2+30){
                    selectedYears.push(xData[i])
                }
            }
         }
         console.log(selectedYears)
         that.drawBarChart(selectedYears)
         // that.trendChart.update(selectedYears)

       }
  }


  drawBarChart(selectedyear) {


    let xScale = d3.scaleLinear()
      .domain([504, 3413])
      .range([0, this.svgWidth-100])
      .nice();

    let yScale = d3.scaleLinear()
      .domain([0, 35])
      .range([160, this.svgHeight+900])
      .nice();

    let xAxis = d3.axisBottom();
      xAxis.scale(xScale).tickFormat(d3.format("d"));

    let yAxis = d3.axisLeft();
      yAxis.scale(yScale).ticks(0);

      this.vulnerableChartSvg.select(".yAxis").remove();
      this.vulnerableChartSvg.select(".xAxis").remove();
      this.vulnerableChartSvg.selectAll("text").remove();

      this.vulnerableChartSvg.selectAll("g").remove();


      let xTranslate = 20;


      let yAxisElement = this.vulnerableChartSvg.insert("g",":first-child").classed("axis", true)
      .attr("transform", "translate(" + "" + 80 + "," + -150 + ")")
      .attr("class", "yAxis")
      .call(yAxis);

      let xAxisElement = this.vulnerableChartSvg.insert("g",":first-child").classed("axis", true)
      .attr("transform", "translate(" + "" + 80 + "," + xTranslate  + ")")
      .attr("class", "xAxis")
      .call(xAxis);

       this.vulnerableChartSvg.append("text")
          .attr("transform", "translate(" + 400 + " ," + (xTranslate - 5) + ")")
          .style("text-anchor", "middle")
          .attr("class", "axis-label")
          .text("Number of crimes");

        this.vulnerableChartSvg.append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 30)
          .attr("x",-300)
          .attr("dy", "1em")
          .style("text-anchor", "middle")
          .attr("class", "axis-label")
          .text("Vulnerable Group");

    let plotData;
    for(let i=0;i<selectedyear.length;++i){
        let year = selectedyear[i]
        if(year == 2008)
          plotData = this.vulnerable2008;

        else if(year == 2009)
          plotData = this.vulnerable2009;

        else if(year == 2010)
          plotData = this.vulnerable2010;

        else if(year == 2011)
          plotData = this.vulnerable2011;

        else if(year == 2012)
          plotData = this.vulnerable2012;

        else if(year == 2013)
          plotData = this.vulnerable2013;

        else if(year == 2014)
          plotData = this.vulnerable2014;

        else if(year == 2015)
          plotData = this.vulnerable2015;

        else if(year == 2016)
          plotData = this.vulnerable2016;

          let yTranslate = this.svgHeight - 30;

          let gElement = this.vulnerableChartSvg.append("g").attr("transform", "translate(" + "" + 80 + "," + (-30+i*150) + ")");

          let newScatter = gElement.selectAll("rect").data(plotData)
          .enter()
          .append("rect");

          newScatter.attr("x", function(d, i) {
            return 0;
          })
          .attr("y", function(d, i) {
            return yScale(i);
          })
          .attr("height", function(d, i) {
            return 20;
          }).attr("fill", function(d, i) {
            if(i == 0)
              return "red";
            if(i == 1)
              return "brown";
            if(i == 2)
              return "orange";
          }).attr("width", 0)
          .transition()
          .duration(4000)
          .attr("width", function(d, i) {
            return xScale(d.value);
          });

          gElement.selectAll("text")
                .data(plotData)
                .enter()
                .append("text")
                .attr("transform", "translate(" + "" + 80 + "," + -30 + ")")
                .attr("x", -70)
                .attr("y",(d, i) => yScale(i) + 5)
                .attr("dy","1.2em")
                .text(function(d){
                  return d.group;
                });

          this.vulnerableChartSvg.append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 70)
          .attr("x",-200 - i*150)
          .attr("class", "axis-label")
          .text(selectedyear[i]);

    }

    this.vulnerableTextSvg.selectAll("g").remove();
    let textBlock = this.vulnerableTextSvg.append("g");

    textBlock.append("text")
    .attr("x", this.svgWidth2/2)
    .text("We can see ")
    .attr("y", 50)
    .attr("class", "yeartext")
    .style("font-size", "25px")
    .attr("opacity", 0)
    .transition()
    .duration(3000)
    .attr("opacity", 1);

    textBlock.append("text")
    .attr("x", this.svgWidth2/2)
    .text("that African Americans, Jews ")
    .attr("y", 90)
    .attr("class", "yeartext")
    .style("font-size", "25px")
    .attr("opacity", 0)
    .transition()
    .duration(3000)
    .attr("opacity", 1);

    textBlock.append("text")
    .attr("x", this.svgWidth2/2)
    .text(" and Male homosexuals")
    .attr("y", 130)
    .attr("class", "yeartext")
    .style("font-size", "25px")
    .attr("opacity", 0)
    .transition()
    .duration(3000)
    .attr("opacity", 1);

    textBlock.append("text")
    .attr("x", this.svgWidth2/2)
    .text(" are the three most targeted groups")
    .attr("y", 170)
    .attr("class", "yeartext")
    .style("font-size", "25px")
    .attr("opacity", 0)
    .transition()
    .duration(3000)
    .attr("opacity", 1);

    textBlock.append("text")
    .attr("x", this.svgWidth2/2)
    .text(" across the years.")
    .attr("y", 210)
    .attr("class", "yeartext")
    .style("font-size", "25px")
    .attr("opacity", 0)
    .transition()
    .duration(3000)
    .attr("opacity", 1);

  }


}
