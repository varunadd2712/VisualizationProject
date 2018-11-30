document.getElementById("victimsChart").style.display = "none";
document.getElementById("genderChart").style.display = "none";
document.getElementById("religionChart").style.display = "none";
document.getElementById("treemap-chart").style.display = "none";
document.getElementById("geographical-map-chart").style.display = "none";
document.getElementById("states-bar-chart").style.display = "none";
document.getElementById("chart").style.display = "none";
document.getElementById("trendchart").style.display = "block";
document.getElementById("newchart").style.display = "block";
document.getElementById("map-text-chart").style.display = "none";
document.getElementById("dropdownDiv").style.display = "none";
document.getElementById("donutAndDropdown").style.display = "none";
document.getElementById("victimsChart").style.display = "none";
document.getElementById("genderChart").style.display = "none";
document.getElementById("religionChart").style.display = "none";
document.getElementById("year-chart").style.display = "none";
document.getElementById("newchartText").style.display = "block";


flag_map=true
flag_bar=true

function updateLinksMap(stateName,crimes){
  geographicalMapChart.updateLinks(stateName,crimes,flag_map)
  if(flag_map==true) flag_map==false
  else flag_map==true
}

function updateLinksBar(stateName){
  statesBarChart.updateLinks(stateName,flag_bar)
  if(flag_bar==true) flag_bar==false
  else flag_bar==true
}

let statesBarChart = new StatesBarChart(updateLinksMap);
let geographicalMapChart = new GeographicalMapChart(updateLinksBar);

let treemap = new Treemap();
let donutChart = new DonutChart();
let victimChart = new VictimChart();
let trendChart = new TrendChart();
trendChart.update();

var stateOfScroll = 0;
var isStateShown = 0;
var isStateComparisionShown = 0;
var isTrendChartShown = 0;
var isTreeMapShown = 0;

let yearChart = new YearChart(statesBarChart, geographicalMapChart, treemap, donutChart, victimChart);
geographicalMapChart.drawMap()
yearChart.update();

function openDiv(evt, selectionName) {
    //Hide all divs initially.
    tablinks = document.getElementsByClassName("tablinks");

    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    evt.path["0"].className += " active";

    noneAll();

     if(selectionName === "Summary") {
       document.getElementById("year-chart").style.display = "none";
       document.getElementById("newchartText").style.display = "block";
       document.getElementById("newchart").style.display = "block";
       document.getElementById("trendchart").style.display = "block";
       trendChart.update();
     }

    else if (selectionName === "Map") {
      document.getElementById("map-text-chart").style.display = "block";
      document.getElementById("year-chart").style.display = "block";
      document.getElementById("geographical-map-chart").style.display = "block";
      document.getElementById("states-bar-chart").style.display = "block";
      geographicalMapChart.updateFromScript();
      statesBarChart.updateFromScript();
    }

    else if(selectionName === "Breakdown") {
      document.getElementById("year-chart").style.display = "block";
      document.getElementById("treemap-chart").style.display = "block";
      treemap.updateFromScript();
    }

    else if(selectionName === "StateCompare") {
      document.getElementById("year-chart").style.display = "block";
      unfade(document.getElementById("dropdownDiv"));
      unfade(document.getElementById("donutAndDropdown"));
      unfade(document.getElementById("chart"));

      document.getElementById("dropdownDiv").style.display = "block";
      document.getElementById("donutAndDropdown").style.display = "block";
      document.getElementById("chart").style.display = "block";
    }


    else if(selectionName === "VictimChart") {
      document.getElementById("year-chart").style.display = "block";
      document.getElementById("victimsChart").style.display = "block";
      document.getElementById("genderChart").style.display = "block";
      document.getElementById("religionChart").style.display = "block";
      victimChart.updateFromScript();
    }
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
/*
let myScrollFunc = function() {

  var y = window.scrollY;
  //console.log(y);
  let windowEnd = document.body.offsetHeight - window.innerHeight + 10;

  if(stateOfScroll == 0 && y >= windowEnd) {

    console.log("first block");
    document.getElementById("trendchart").style.display = "none";

    document.getElementById("victimsChart").style.display = "none";
    document.getElementById("genderChart").style.display = "none";
    document.getElementById("religionChart").style.display = "none";

    document.getElementById("map-text-chart").style.display = "block";

    document.getElementById("geographical-map-chart").style.display = "block";
    document.getElementById("states-bar-chart").style.display = "block";
    geographicalMapChart.updateFromScript();
    statesBarChart.updateFromScript();

    document.getElementById("dropdownDiv").style.display = "block";
    document.getElementById("donutAndDropdown").style.display = "block";
    document.getElementById("chart").style.display = "block";

    //window.scrollTo(0, 0); // values are x,y-offset
    stateOfScroll = 2;
    window.removeEventListener('scroll', myScrollFunc);
    scrollToTop();
    window.addEventListener("scroll", myScrollFunc);
  }

  else if(stateOfScroll == 2 && y >= windowEnd) {

    console.log("third block");


    document.getElementById("map-text-chart").style.display = "none";

    document.getElementById("geographical-map-chart").style.display = "none";
    document.getElementById("states-bar-chart").style.display = "none";
    document.getElementById("dropdownDiv").style.display = "none";
    document.getElementById("donutAndDropdown").style.display = "none";
    document.getElementById("chart").style.display = "none";
    document.getElementById("treemap-chart").style.display = "block";
    treemap.updateFromScript();

    //window.scrollTo(0, 0); // values are x,y-offset
    stateOfScroll = 3;
    scrollToTop();
    window.addEventListener("scroll", myScrollFunc);
  }

  else if(stateOfScroll == 3 && y >= windowEnd) {

    console.log("fourth block");
    document.getElementById("treemap-chart").style.display = "none";
    document.getElementById("trendchart").style.display = "block";
    document.getElementById("newchart").style.display = "block";

    trendChart.update();

    //window.scrollTo(0, 0); // values are x,y-offset
    stateOfScroll = 4;
    window.removeEventListener('scroll', myScrollFunc);
    scrollToTop();
    window.addEventListener("scroll", myScrollFunc);
  }

  else if(stateOfScroll == 4 && y >= windowEnd) {

    console.log("fifth block");


    document.getElementById("trendchart").style.display = "none";
    document.getElementById("newchart").style.display = "none";

    document.getElementById("victimsChart").style.display = "block";
    document.getElementById("genderChart").style.display = "block";
    document.getElementById("religionChart").style.display = "block";

    //window.scrollTo(0, 0); // values are x,y-offset
    stateOfScroll = 0;
    victimChart.updateFromScript();
    window.removeEventListener('scroll', myScrollFunc);
    scrollToTop();
    window.addEventListener("scroll", myScrollFunc);
  }
}

const scrollToTop = () => {
  const c = document.documentElement.scrollTop || document.body.scrollTop;

  window.removeEventListener('scroll', myScrollFunc);
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 20);
  } else {
    window.addEventListener("scroll", myScrollFunc);
  }
};
*/

function noneAll() {
  document.getElementById("victimsChart").style.display = "none";
  document.getElementById("genderChart").style.display = "none";
  document.getElementById("religionChart").style.display = "none";
  document.getElementById("treemap-chart").style.display = "none";
  document.getElementById("geographical-map-chart").style.display = "none";
  document.getElementById("states-bar-chart").style.display = "none";
  document.getElementById("chart").style.display = "none";
  document.getElementById("trendchart").style.display = "none";
  document.getElementById("newchart").style.display = "none";
  document.getElementById("map-text-chart").style.display = "none";
  document.getElementById("dropdownDiv").style.display = "none";
  document.getElementById("donutAndDropdown").style.display = "none";
  document.getElementById("victimsChart").style.display = "none";
  document.getElementById("genderChart").style.display = "none";
  document.getElementById("religionChart").style.display = "none"
  document.getElementById("newchartText").style.display = "none";
}

function unfade(element) {
    var op = 0.1;  // initial opacity
    element.style.display = 'block';
    var timer = setInterval(function () {
        if (op >= 1){
            clearInterval(timer);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1;
    }, 50);
}
//window.addEventListener("scroll", myScrollFunc);
/*$(window).scroll(function() {
console.log("calling");
if($(window).scrollTop() + $(window).height() == $(document).height()) {
alert("bottom!");
}
});*/
