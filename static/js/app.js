/* Declaring strict mode to write cleaner code */
"use strict";

///////// Declare Global Variables \\\\\\\\\\
var jsonPromise;
var data;
var IDs;
var metaData;
var samples;
var specifiedID;
var url;
var shortURL = "samples.json";
var longURL = "https://amberleebme.github.io/plotly-interactive-challenge/samples.json";
var demo;
var traceData;
var colorscale = "Blackbody";
var config = {responsive: true};

///////// Define Functions \\\\\\\\\\

/* function getData(): retrieves the data from JSON file */
function getData(){
  // If initial load of page, fetch promise and assign to jsonPromise
  if(jsonPromise === undefined){
    console.log("***Initial Data Load***");
    // if running app from server, use local url, else use full url
    if (window.location.href[0] !="f"){
      url = shortURL;
    } else {
      url = longURL;
    }
    console.log(`JSON URL: ${url}`)
    jsonPromise = d3.json(url);
    console.log(`Promise Fulfilled!`);
    return  jsonPromise.then(function(json){
      // Use jsonPromise to initialize declared arrays.
      IDs = json.names;
      metaData = json.metadata;
      samples = json.samples;
      data = {
        subjectIDs:IDs,
        metaData:metaData,
        samples:samples
      };
      console.log("Data ",data);
      return data;
    }).then(function(){
      demo = [
      metaData.map(item =>`ID: ${item.id}`),
      metaData.map(item =>`Ethnicity: ${item.ethnicity}`),
      metaData.map(item =>`Gender: ${item.gender}`),
      metaData.map(item =>`Age: ${item.age}`),
      metaData.map(item =>`Location: ${item.location}`),
      metaData.map(item =>`Belly Button Type: ${item.bbtype}`),
      metaData.map(item =>`Weekly Wash Freq: ${item.wfreq}`)
      ] 
    });
  }
}

/* function listIDs(idArray): populates dropdown with Test Subject IDs */
function listIDs(idArray){
  d3.select('select')
      .selectAll('option')
      .data(idArray)
      .enter()
      .append('option')
      .text(function(d){
        return d;
      });
  console.log(`Total SubjectIDs in Dropdown: ${idArray.length}`);
}
/* function optionChanged(varID): creates/updates visualizations based on selected Test Subject ID */
function optionChanged(varID){
  specifiedID =varID;
  let ind = IDs.indexOf(varID);

  // Demographics
  {
    d3.select("#demo-info").selectAll("h4").remove();
    var col;

    console.log("DEMO: ",demo);
    demo.forEach((item,i)=>{
      var text = item[ind];
      if(i<3){
        col = ".demo-col-first";
      } else if(i<5){
        col = ".demo-col-second";
      }else{
        col = ".demo-col-third";
      }
      d3.select(col)
          .append("h4")
          .text(text);
    });

  }
  // Bar Graph
  {
    var sample = [];
    var each;
    var barData = samples[ind];
    var layoutBar;
    for (each = 0; each < barData.sample_values.length; each++){
      var entry;
      entry = {
        id: `OTU ${barData.otu_ids[each]}`,
        label: barData.otu_labels[each],
        value: barData.sample_values[each],
        intID: barData.otu_ids[each]
      }
      sample.push(entry);
    }
    var sortedSample = sample.sort((a,b) => b.value - a.value);
    var slicedSample = sortedSample.slice(0,10);
    var reversedData = slicedSample.reverse();
    console.log(reversedData);
    layoutBar = {
      // title: `Top OTUs Found`,
      yaxis: {
        automargin: true,
        title: {
          text: 'Top OTUs Found',
          standoff: 20
        }
      },
      margin: {
        t: 40,
        pad: 5
      }
    };
    let color = reversedData.map(object => object.intID);
    console.log(color);
    let trace1 = {
      x: reversedData.map(object => object.value),
      y: reversedData.map(object => object.id),
      text: reversedData.map(object => object.label.split(';').join("<br>")),
      name: "OTUs",
      
      marker: {
        color: 
        `#4d4d4d`,
      },
      type: "bar",
      orientation: "h"
    };
    traceData = [trace1];
    Plotly.newPlot("bar",traceData, layoutBar, config);
  }
  // Bubble Chart
  {
    var desired_maximum_marker_size = 100;
    var sample2 = [];
    var each;
    var bubbleData = samples[ind];
    for (each =0; each < bubbleData.sample_values.length; each++){
      var entry;
      entry = {
        id: bubbleData.otu_ids[each],
        label: bubbleData.otu_labels[each],
        value: bubbleData.sample_values[each]
      }
      sample2.push(entry);
    }
    var size = sample2.map(object => object.value);
    console.log(sample2.map(object => object.id));
    let trace2 = {
      x: sample2.map(object => object.id),
      y: sample2.map(object => object.value),
      text:sample2.map(object => object.label.split(';').join("<br>")),
      mode: 'markers',
      marker:{
        color: sample2.map(d=>d.id),
        colorscale: colorscale,
        size: size,
        sizeref: 2 * Math.max(...size) / (desired_maximum_marker_size**2),
        sizemode: 'area',
        line: {
          width:1,
          color: "#E0E0E0"
        }
      },
      type: 'scatter'
    }
    traceData = [trace2];
    let layoutBubble = {
      title: `All OTUs Found in Subject ${specifiedID}`,
      xaxis: {
        title: {
          text: 'OTU ID #',
        }
      },
      yaxis: {
        title: {
          text: 'Relative Abundance of OTU',
        }
      }
    };
    
    Plotly.newPlot("bubble",traceData,layoutBubble, config);
  }
  // Gauge Chart
  {
    var data = [
      {
        domain: { x: [0, 1], y: [0, 1] },
        value: metaData[ind].wfreq,
        title: { text: `Weekly Wash Frequency`},
        type: "indicator",
        mode: "gauge+number",
        gauge: {
          axis: { 
            range: [null, 9],
            tick0: 0,
            dtick: 1
          },
          bar: {
            color: "#a0c8ff",
          }
        }
        
      }
    ];
    
    var layoutGauge = {
      margin: {
        l: 15,
        r: 15,
        b: 15,
        t: 0,
        pad: 10
      }
    };
    Plotly.newPlot('gauge', data, layoutGauge, config);
  }
}

///////// Execute Functions \\\\\\\\\\
getData().then(function(){
  listIDs(IDs);
}).then(function(){
  specifiedID = d3.selectAll("#selDataset").property("value");
  optionChanged(specifiedID);
}).then(function(){
  console.log("***Initial Data Load Complete***");
});
d3.select("#selDataset").on("change", function(){
  console.log("Changed to: ",this.value);
  optionChanged(this.value);
});
  
  