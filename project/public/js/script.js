document.getElementById("victimsChart").style.display = "none";
document.getElementById("treemap-chart").style.display = "none";
document.getElementById("geographical-map-chart").style.display = "none";
document.getElementById("states-bar-chart").style.display = "none";
document.getElementById("donut-chart").style.display = "none";

  let statesBarChart = new StatesBarChart();
  let geographicalMapChart = new GeographicalMapChart();
  let treemap = new Treemap();
  let donutChart = new DonutChart();

  let yearChart = new YearChart(statesBarChart, geographicalMapChart, treemap, donutChart);
  geographicalMapChart.drawMap()
  yearChart.update();

  function openDiv(evt, selectionName) {
    //Hide all divs initially.

    console.log(selectionName);
    document.getElementById("victimsChart").style.display = "none";
    document.getElementById("treemap-chart").style.display = "none";
    document.getElementById("geographical-map-chart").style.display = "none";
    document.getElementById("states-bar-chart").style.display = "none";
    document.getElementById("donut-chart").style.display = "none";

    if(selectionName === "Summary")
      document.getElementById("victimsChart").style.display = "block";
    else if (selectionName === "Map") {
      document.getElementById("geographical-map-chart").style.display = "block";
      document.getElementById("states-bar-chart").style.display = "block";
    }
    else if(selectionName === "Breakdown")
      document.getElementById("treemap-chart").style.display = "block";
    else if(selectionName === "StateCompare")
      document.getElementById("donut-chart").style.display = "block";
    /*
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
    */
}
