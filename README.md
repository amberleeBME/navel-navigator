# [Navel Navigator](https://amberleebme.github.io/plotly-interactive-challenge/): An Interactive Dashboard

## Overview
The [Navel Navigator](https://amberleebme.github.io/navel-navigator) is an interactive dashboard that allows users to explore the microbial diversity of human navels.
The data comes from the [Belly Button Biodiversity](http://robdunnlab.com/projects/belly-button-biodiversity/) project carried out by The Public Science Lab at North Carolina State University.

## Dashboard Components
![Dashboard Screenshot](/static/images/NavelNav-Screenshot.svg)

The following interactive components are powered by D3.js and Plotly:
1. A dropdown menu to select a test subject/sample. 
2. A display of the selected test subject's demographic information.
3. A bubble chart that displays the relative abundance of each [operational taxonomic unit (OTU)](https://en.wikipedia.org/wiki/Operational_taxonomic_unit) found in the sample. 
4. A horizontal bar chart of the top 10 OTUs found in the sample.
5. A gauge chart displaying the weekly washing frequency of the test subject.
