// var subjectIDs;

// Read JSON file
const url="./samples.json";
const dataPromise =d3.json(url);
console.log("Data Promise", dataPromise);


d3.json(url).then(function(data){
  // subjectIDs = Object.values(json.names);
  // data = json.metadata;
  console.log(data);

});

// Create an array of each subject's ID number
// var subjects = Object.values(data.names);
