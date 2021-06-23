const { Router } = require("express");
const { Activity, Country } = require("../db");
const { v4: uuidv4 } = require("uuid");
const router = Router();

process.on('unhandledRejection', (err, p) => {
  console.log("");
});

router.post("/", async (req, res) => {
  const { name, difficulty, duration, season, countries } = req.body;
  console.log(req.body);
  if (!name || !difficulty || !duration || !season || !countries) {
    res.status(404).send("Not enough data provided");
  } else {
    try {
      await Activity.create({
        name,
        difficulty,
        duration,
        season,
        countries
      })
      .then(
        activity => {
            console.log(countries);
            if (Array.isArray(countries)){
              console.log("is array!")
              for (country of countries){
                console.log(country);
                activity.addCountry(countries);
              }
            }else{
              console.log("Is a string")
              activity.addCountry(countries);
              console.log(activity)
            }
            return activity;
          }
      )
      .then(
        activity => {
            const result = Activity.findOne({
              where: { id: activity.id },
              include: [Country]
            });
            return result;
          }
      )
     .then(
        activity => {
            res.send(activity);
          }
     )
    } catch (err) {
      console.log("ERRORRRRR", err);
    }
  }
});

router.get("/", async (req, res) => {
  if (req.query.name) {
    try {
      const result = await Activity.findAll({
        where: { name: req.query.name },
        include: [Country]
      });
      res.send(result);
    } catch {
      console.log("That activity doesn't exist");
    }
  } else {
    const findActivity = await Activity.findAll({
      include: [Country]
    });
    if (findActivity.length > 0) {
      res.send(findActivity);
    } else {
      res.send([]);
    }
  }
});

module.exports = router;
