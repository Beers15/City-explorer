
# City Explorer 
### Netlify link: This app can be found [here](https://nervous-mclean-43f026.netlify.app/)

**Author**: Alexander Beers
**Version**: 1.4.2

## Overview

This application outputs various details on a location that a user enters in the search bar such as longitude, latitude, and a detailed map.

## Getting Started

To run the backend of this application please refer to the README for that portion of the application [here](https://github.com/Beers15/city-explorer-api/blob/main/README.md)
Clone repo and install necessary packages+dependencies by running 'npm i' command. Run 'npm start' command and open up application in browser at 'localhost:3000'. Must have valid API key from LocationIQ to run.

## Architecture

Axios, [LocationIQ API](https://locationiq.com/), React

![Data Flow Diagram](DataFlow.jpg)

## Change Log

08-23-2021 2:40pm - App can now successfully call API and extract lat, long, and name data on entered location. Basic Component layout finished.
08-23-2021 3:25pm - App now outputs the appropriate error message for failed API calls.
08-23-2021 6:15pm - App now displays a map along with the name and coordinate data.
08-24-2021 8:00pm - App now displays a weather forecast data. 
08-25-2021 5:15pm - App now displays movies related to the location that is entered by the user in a styled component.
08-26-2021 12:30pm - Break down weather and movies components into individual components. Refactor API requesting code. Redo layout of result cards.

## Credit and Collaborations

Ryan Emmans: Helped with data flow diagram and LocationIQ api use planning

### Name of feature: Locations - Allow user to enter the name of a location so that they can see the exact latitude and longitude of that location

Estimate of time needed to complete: 30m

Start time: 2:40

Finish time: 3:20

Actual time needed to complete: 40m

### Name of feature: Errors - Allow user to see clear messages if something goes wrong so that they know if I need to make any changes or try again in a different manner

Estimate of time needed to complete: 15m

Start time: 3:25

Finish time: 3:42

Actual time needed to complete: 17m

### Name of feature: Map - Allow the user to see a map of the city so that they can see the layout of the area.

Estimate of time needed to complete: 30m

Start time: 4:05

Finish time: 6:15

Actual time needed to complete: 2hrs 10m

### Name of feature: Weather - Allow the user to see weather forecast data whenever they enter a city in. Apply React Bootstrap styling to existing components.

Estimate of time needed to complete: 3hr 40m

Start time: 4:05

Finish time: 7:45

Actual time needed to complete: 2hrs 10m

### Name of feature: Movies - Get movies related to the entered city and display them to user in a styled component. Display feedback if none exist.

Estimate of time needed to complete: 3hr

Start time: 1:45

Finish time: 5:12

Actual time needed to complete: 3hrs 27m
