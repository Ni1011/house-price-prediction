import { Typography, makeStyles } from "@material-ui/core";
import React, { useState } from "react";

const useStyles = makeStyles(() => ({
  title: {
    color: "#BB86FC",
    fontFamily: "Source Sans Pro",
    fontWeight: "bold",
  },
  section: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: 500,
    padding: 20,
  },
  inputBox: {
    position: "relative",
    // width: 550,
    // padding: 2,
  },
  input: {
    width: "100%",
    background: "#14161a",
    color: "#fff",
    borderColor: "#BB86FC",
    letterSpacing: "0.1rem",
    padding: "10px 0 5px",
    borderRadius: 7,
    borderWidth: 2,
    outline: "none",
  },
}));

const Prediction = () => {
  const classes = useStyles();

  const [prediction, setPrediction] = useState(null);
  const [formData, setFormData] = useState({
    Builder: "1",
    Dealer: "0",
    Owner: "0",
    UNDER_CONSTRUCTION: "",
    RERA: "",
    BHK_NO: "",
    SQUARE_FT: "",
    READY_TO_MOVE: "",
    RESALE: "",
    LONGITUDE: "",
    LATITUDE: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      Builder: parseInt(formData.Builder) || 0,
      Dealer: parseInt(formData.Dealer) || 0,
      Owner: parseInt(formData.Owner) || 0,
      UNDER_CONSTRUCTION: parseInt(formData.UNDER_CONSTRUCTION) || 0,
      RERA: parseInt(formData.RERA) || 0,
      BHK_NO: parseInt(formData.BHK_NO) || 0,
      SQUARE_FT: parseFloat(formData.SQUARE_FT) || 0,
      READY_TO_MOVE: parseInt(formData.READY_TO_MOVE) || 0,
      RESALE: parseInt(formData.RESALE) || 0,
      LONGITUDE: parseFloat(formData.LONGITUDE) || 0,
      LATITUDE: parseFloat(formData.LATITUDE) || 0,

      // Builder: 1,
      // Dealer: 0,
      // Owner: 0,
      // UNDER_CONSTRUCTION: 0,
      // RERA: 0,
      // BHK_NO: 2,
      // SQUARE_FT: 1300.0,
      // READY_TO_MOVE: 1,
      // RESALE: 1,
      // LONGITUDE: 13.0,
      // LATITUDE: 77.5,
    };
    console.log(data);
    const response = await fetch("http://localhost:8000/house", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    setPrediction(result.prediction);
    console.log("Result", result);
  };

  const handleChange = async (event) => {
    const { name, value } = event.target;
    if (name === "address") {
      // const value = "malad";
      // const response = await fetch(`https://geocode.maps.co/search?q=${value}`);
      // const data = await response.json();

      // const location = data.results[0];
      // console.log("location", location[0]);
      // console.log("hello");

      const GeoCode = (value) => `https://geocode.maps.co/search?q=${value}`;
      // const { data } = await axios.get(GeoCode(value));
      const response = await fetch(GeoCode(value));
      const data = await response.json();
      const location = data[0];
      // console.log("location", location);
      setFormData({
        ...formData,
        [name]: value,
        LONGITUDE: location?.lon,
        LATITUDE: location?.lat,
      });
      // console.log(
      //   `Latitude: ${formData.LATITUDE}, Longitude: ${formData.LONGITUDE}`
      // );
    } else if (name === "PostedBy") {
      setFormData({
        ...formData,
        Builder: name === "PostedBy" && value === "Builder" ? 1 : 0,
        Dealer: name === "PostedBy" && value === "Dealer" ? 1 : 0,
        Owner: name === "PostedBy" && value === "Owner" ? 1 : 0,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  return (
    <div>
      <Typography className={classes.title} variant="h3" align="center">
        House Price Prediction
      </Typography>

      <div className={classes.section}>
        <form className={classes.form} onSubmit={handleSubmit}>
          <label htmlFor="PostedBy">Posted By:</label>
          <select
            name="PostedBy"
            value={formData.PostedBy}
            onChange={handleChange}
            className={classes.input}
          >
            <option value="Builder">Builder</option>
            <option value="Dealer">Dealer</option>
            <option value="Owner">Owner</option>
          </select>

          <label htmlFor="UNDER_CONSTRUCTION">Under Construction:</label>
          <select
            name="UNDER_CONSTRUCTION"
            value={formData.UNDER_CONSTRUCTION}
            onChange={handleChange}
            className={classes.input}
          >
            <option value="0">No</option>
            <option value="1">Yes</option>
          </select>

          <label htmlFor="RERA">RERA:</label>
          <select
            name="RERA"
            value={formData.RERA}
            onChange={handleChange}
            className={classes.input}
          >
            <option value="0">No</option>
            <option value="1">Yes</option>
          </select>

          <label htmlFor="BHK_NO">BHK Number:</label>
          <input
            type="text"
            name="BHK_NO"
            defaultValue={formData.BHK_NO}
            // value={formData.BHK_NO}
            onChange={handleChange}
            className={classes.input}
          />

          <label htmlFor="SQUARE_FT">Square Footage:</label>
          <input
            type="text"
            name="SQUARE_FT"
            defaultValue={formData.SQUARE_FT}
            onChange={handleChange}
            className={classes.input}
          />

          <label htmlFor="READY_TO_MOVE">Ready to Move:</label>
          <select
            name="READY_TO_MOVE"
            value={formData.READY_TO_MOVE}
            onChange={handleChange}
            className={classes.input}
          >
            <option value="0">No</option>
            <option value="1">Yes</option>
          </select>

          <label htmlFor="RESALE">Resale:</label>
          <select
            name="RESALE"
            value={formData.RESALE}
            onChange={handleChange}
            className={classes.input}
          >
            <option value="0">No</option>
            <option value="1">Yes</option>
          </select>

          <label htmlFor="address">Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className={classes.input}
          />

          <button
            type="submit"
            style={{
              fontSize: 20,
              fontWeight: "bold",
              cursor: "pointer",
              transition: "all 0.6s ease-in-out",
              borderRadius: 10,
              backgroundColor: "#BB86FC",
              padding: 5,
              marginTop: 10,
            }}
          >
            Predict
          </button>
        </form>
      </div>

      {prediction && (
        <div className={classes.section}>
          <h3>Prediction: </h3>
          <h3
            style={{
              color: "#BB86FC",
              fontFamily: "Source Sans Pro",
            }}
          >
            {prediction.toFixed(2)} Lakhs
          </h3>
        </div>
      )}
    </div>
  );
};

export default Prediction;
