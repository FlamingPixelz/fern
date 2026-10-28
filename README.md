# React Prototype

<p align="center">
<img width="427" height="240" alt="Screenshot 2026-10-29 at 02 21 40" src="https://github.com/user-attachments/assets/a7082604-ca00-4bec-aa5a-b37f424a1ee3" />
<img width="427" height="240" alt="Screenshot 2026-10-29 at 02 11 25" src="https://github.com/user-attachments/assets/92057c9b-06eb-407b-bd9f-4db2a1798158" />
</p>

** This Project was initially for an assignment for Interactive Systems Design at Adelaide University, with three other contributors. I have since decided to extend from the original prototype and develop it into a full application.

Everyone who has ever owned indoor plants know how easy it is to forget them or overwater them. This simple web application provides an easy way to keep a healthy schedule for your beloved plants and tell you when you need to water them. Pretty simple, right?

## Features

- Add new plants by giving it a name, specifying the species, its location, its pot size, and the last time you watered it
- A watering schedule is automatically set based on the species and pot size, or add a custom schedule
- Edit details and customise schedule of an existing plant, or delete it
- Plants that need to be watered today are displayed in the top list, and can be checked off with the press of a button
- Simple UI that displays how many days before your plants need watering, and how well you have looked after your plant

## How to Run

To run the project on any platform, the following steps can be taken:

1. Ensure that [Node.js](https://nodejs.org/en) is installed on your system.
2. Download the repository from github with the `Download ZIP` button, or from [this link](https://github.com/Aureliona1/ISD-Assignment-2/archive/refs/heads/main.zip).
3. Unzip the repository somewhere and open a terminal in the `app` directory.
4. Install the app's dependencies with `npm install`.
5. Run the app with `npm start`. It should automatically open a browser to the dashboard page. Alternatively, the app runs on port 3000 if nothing else is, so it can be navigated to with the address [http://localhost:3000](http://localhost:3000).


## Prototyping

This project implements the main "dashboard" screen as described by the wireframe design [here](./Wireframe/597916405-8e834179-d3d5-4b74-b023-38e36c835a50.png).

## Planned Features

The current prototype is quite lacking in features. I plan to:
- Add a database so user data is persistent
- Add the water logging feature for each plant, as designed in the wireframe
- Convert the project into a desktop application using Electron, since this app is meant to be simple and not need to be online / have login features
- Redesign the UI to a pixel art aesthetic

