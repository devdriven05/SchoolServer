# School Management API

This project implements a set of Node.js + Express.js APIs backed by MySQL to manage school data. Users can add schools and retrieve a list of nearby schools based on geolocation.

## 📌 Features

- Add a school with name, address, latitude, and longitude.
- Retrieve a list of schools sorted by proximity to user's location.
- Filter to only show schools within a 50km radius.
- Hosted on [Render](https://schoolserver-ozst.onrender.com).
- Integration support for geolocation APIs like OpenStreetMap or browser location services.

---

## 🚀 API Endpoints

### 1. Add School

- **URL:** `/addSchool`
- **Method:** `POST`
- **Payload:**

```json
{
  "name": "Delhi Public School",
  "address": "Banjara Hills, Hyderabad",
  "latitude": 17.4213,
  "longitude": 78.4483
}

GET https://schoolserver-ozst.onrender.com/listSchools?latitude=17.3850&longitude=78.4867



## Additional Features

### Integration with External Geolocation API

This project optionally uses an external geolocation API (such as OpenStreetMap’s Nominatim or similar services) to:

- Automatically fetch the user's current location based on IP or device GPS.
- Enhance location accuracy and provide additional nearby location details.

### Example Usage

- The frontend (or client) can use the external API to get the user’s latitude and longitude.
- This location data is then sent to the backend APIs (`/listSchools`) to fetch nearby schools.
- This integration improves user experience by automating location detection without manual input.

---

## How to Use Location API

You can fetch the user’s location on the client side using OpenStreetMap Nominatim API or the browser’s Geolocation API:

**Example using browser Geolocation API:**

```js
navigator.geolocation.getCurrentPosition((position) => {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  // Use these coordinates to call /listSchools
  fetch(`https://schoolserver-ozst.onrender.com/listSchools?latitude=${latitude}&longitude=${longitude}`)
    .then(res => res.json())
    .then(data => {
      console.log('Nearby schools:', data);
    });
});


Screenshot
![image](https://github.com/user-attachments/assets/28cd5756-38eb-4643-8c29-8c547f566a97)
