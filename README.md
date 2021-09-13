# Cesium Flight Tracker

To run the demo:

1. Clone and open this repository.
2. Install NPM using `npm install`
3. Install Cesium using `npm install cesium`
4. `npm run`
5. `npm start`

My demo uses an aircraft model that can be found here:
https://www.cgtrader.com/items/662998/download-page

Feel free to use your own model :grinning:

To update the aircraft model, upload the new model to Cesium ion and edit this line of code in `flight.js`:

`const airplaneUri = await Cesium.IonResource.fromAssetId(YOUR_ASSET_ID_HERE);`

Here are some images:
![flight_tracker_1](https://user-images.githubusercontent.com/39531367/121040358-b019bb00-c766-11eb-91cd-9f69171a7d28.gif)

![flight_tracker_3](https://user-images.githubusercontent.com/39531367/121040505-cde72000-c766-11eb-9e4c-58ab0d4d61ed.png)

Here is the guide from Cesium
https://cesium.com/docs/tutorials/build-a-flight-tracker/

`CloudCollection` was recently added to the CesiumJS API. I would love to enhance this demo by adding clouds.

https://cesium.com/learn/cesiumjs/ref-doc/CloudCollection.html?classFilter=cloud

If you are seeing this and feel particularly ambitions, please submit a pull request ;)
