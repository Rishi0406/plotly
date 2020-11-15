function graph(id_input) {
  d3.json("samples.json").then((data_json) => {
    var dataSamples = data_json.samples;
    var dataId = dataSamples.filter(x => x.id == id_input);
    var otu_ids = dataId[0].otu_ids;
    var otu_labels = dataId[0].otu_labels;
    var otu_values = dataId[0].sample_values;
    var yValues = otu_ids.slice(0, 10).map(x => "OTU" + x).reverse()
    var dataTrace = {
      x: otu_values.slice(0, 10).reverse(),     
      y: yValues,    
      text: otu_labels.slice(0, 10).reverse(),     
      type: "bar", 
      orientation: "h" 
    };
    var layout = {
      title: "Bacteria found"
    };
    var data = [dataTrace];
    Plotly.newPlot("bar", data, layout);

    var bubbleData = {
      x: otu_ids,
      y: otu_values,
      text: otu_labels,
      mode: "markers",
      marker: {
        size: otu_values,
        color: otu_ids,
        colorscale: "Earth"
      }
    }

    var bubbleLayout = {
      title: "Bacteria cultures per sample",
      margin: {
        t: 30
      },
      hovermode: "closest",
      xaxis: {
        title: "OTU Id"
      }
    }
    Plotly.newPlot("bubble", [bubbleData], bubbleLayout)
  });
};

function defaultfunction() {
  d3.json("samples.json").then((data) => {
    var names = data.names;
    names.forEach((name) => {
      d3.select("#selDataset").append("option").text(name).property("value", name);
    });
    graph(data.names[0]);
  });
};

function optionChanged(userInput) {
  graph(userInput);
  var panelBody = d3.select(".panel-body");
  panelBody.html("");
  demoInfo(userInput);
};

defaultfunction();

function demoInfo(idInput) {  
  d3.json("samples.json").then((data_json) => {    
      var metadata = data_json.metadata;
      var dataId = metadata.filter(x => x.id == idInput);
      var ResultId = dataId[0];
      htmlEntry = d3.select("#sample-metadata");
      Object.entries(ResultId).forEach(([key, value]) => {
        htmlEntry.append("p").text(`${key}:${value}`)    });
    });
  };

function defaultfunction() {
  d3.json("samples.json").then((data) => {
    var names = data.names;
    names.forEach((name) => {
      d3.select("#selDataset").append("option").text(name).property("value", name);    });
    graph(data.names[0]);
    demoInfo(data.names[0]);
  });
};