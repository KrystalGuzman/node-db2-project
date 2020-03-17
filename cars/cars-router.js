const express = require('express');
const db = require("../data/connection.js");

const router = express.Router();

router.get('/', (req, res) => {
  db('cars')
  .then(cars => {
    res.json(cars); 
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to retrieve cars' });
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  db('cars').where({ id }).first()
  .then(car => {
    if (response)
            { res.status(200).json({ car }); }
        else
            { res.status(404).json({message: "No account with id " + req.params.id + " found."});
        }
  }) 
  .catch (err => {
    res.status(500).json({ message: 'Failed to retrieve car' });
  });
});

router.post('/', (req, res) => {
  const carData = req.body;
  db('cars').insert(carData)
  .then(ids => {
    db('cars').where({ id: ids[0] })
    .then(newCarEntry => {
      res.status(201).json(newCarEntry);
    });
  })
  .catch (err => {
    console.log('POST error', err);
    res.status(500).json({ message: "Failed to store data" });
  });
});

router.put("/:id", (req, res) => {

    db("cars")
    .where({id: req.params.id})
    .update(req.body)
        .then(numberUpdated => {
            console.log("PUT /api/cars/:id response:", numberUpdated);

            if (numberUpdated > 0)
                { res.status(200).json({ message: 'record updated successfully'}); }
            else
                { res.status(404).json({message: "No car with ID " + req.params.id + " found."}); }
        })
        .catch(error => {
            console.log("PUT /api/cars/:id error:", error);
            res.status(500).json({message: "Couldn't PUT to /api/cars/:id"});
        })
});


router.delete("/:id", (req, res) => {

    db("cars")
    .where({id: req.params.id})
    .del()
        .then(numberDeleted => {
            console.log("DELETE /api/cars/:id response:", numberDeleted);

            if (numberDeleted > 0)
                { res.status(200).json({ message: 'record deleted successfully'}); }
            else
                { res.status(404).json({message: "No car with ID " + req.params.id + " found."}); }
        })
        .catch(error => {
            console.log("DELETE /api/cars/:id error:", error);
            res.status(500).json({message: "Couldn't DELETE at /api/cars/:id"});
        })
});

module.exports = router;