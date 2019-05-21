# Tableau-twitch
## Tools
Node.js for scraping chat messages
Jupyter Notebook for processing chat messages and extracting emotes
Tableau for visualisation

## Datasets
* Twitch global & subscriber emotes
* Better Twitch TV emotes
* FrankerFace emotes

## Pipeline
* Connect to twitch channel
* Write chat messages to file
* Clean messages:
  * Remove non-standard characters
  * Tokenize and remove non-emote words
* Convert messages to bag of words
* Aggregate by time intervals (10sec, 5min, etc)
* Write aggregations to file (long & wide formats)
* Import aggregations to Tableau
  * Visualise as stacked bar chart over time
  * Show breakdown at each time interval

## Images
![](images/dashboard1.png?raw=true "Showing overall distribution")  
---  
![](images/dashboard2.png?raw=true "Showing distribution at a time interval")
