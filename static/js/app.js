// var subjectIDs;

// Read JSON file
// const url="https://amberleebme.github.io/plotly-interactive-challenge/samples.json";
const url="samples.json";

function init(){
  d3.json(url).then(function(data){
  console.log("Sample.json: ",data);
  let subjectIDs = data.names;
  let metaData = data.metadata;
  console.log(metaData);
  let samples = data.samples[0];
  listIDs(subjectIDs);

  first = d3.selectAll("#selDataset");
  selection = first.property("value");
  
  selectDemo(metaData, selection);

  });
}

function listIDs(idArray){
  console.log("Subject IDs: ",idArray);
  d3.select('select')
    .selectAll('option')
    .data(idArray)
    .enter()
    .append('option')
    .text(function(d){ return d;});
}


function selectID(meta){
  return meta.id === parseInt(this);
}

function optionChanged(selection){
  selectDemo(metaData, selection);
  return selection;
}
function selectDemo(var1,var2){
  
  subject = var1.filter(selectID,var2)[0];
  console.log(subject);
  return var1.filter(selectID,var2);
  
}
init();
d3.selectAll("#selDataset").on("change", optionChanged);