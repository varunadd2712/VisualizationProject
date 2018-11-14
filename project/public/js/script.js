  let statesBarChart = new StatesBarChart();
  let geographicalMapChart = new GeographicalMapChart();
  let treemap = new Treemap();
  let donutChart = new DonutChart();

  let yearChart = new YearChart(statesBarChart, geographicalMapChart, treemap, donutChart);
  geographicalMapChart.drawMap()
  yearChart.update();

