/* Declaring strict mode to help write cleaner code */
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
var keys;
var values;
var demo;
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
      console.log("JSON Keys: ",Object.keys(data));
      return data;
    }).then(function(){
      
      demo = [
      metaData.map(item =>`ID: ${item.id}`),
      metaData.map(item =>`Ethnicity: ${item.ethnicity}`),
      metaData.map(item =>`Gender: ${item.gender}`),
      metaData.map(item =>`Age: ${item.age}`),
      metaData.map(item =>`Location: ${item.location}`),
      metaData.map(item =>`BB Type: ${item.bbtype}`),
      metaData.map(item =>`W Freq: ${item.wfreq}`)
      ]
      
      
    });
  }//End If undefined
}

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


function optionChanged(varID){
  d3.select(".demo-info")
    .selectAll("h4")
    .remove()
  console.log("VarID: ",varID);
  var obj=[];
  let ind = IDs.indexOf(varID);
  console.log("Dem: ",demo);
  demo.forEach(function(item){
    obj.push(item[ind]);
  });
  console.log("Demographic Data: ",obj);
  d3.select(".demo-info")
    .selectAll('h4')
    .data(obj)
    .enter()
    .append('h4')
    .text(function(d){
      return d;
    });
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
// getData().then(function(){
//   console.log("Data: ", IDs);
// });
  d3.select("#selDataset").on("change", function(){
    console.log("Changed to: ",this.value);
    optionChanged(this.value);
  });