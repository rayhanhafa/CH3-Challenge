const fs = require('fs');
const router = require("../routes/carRoutes");

//read file json
const cars = JSON.parse(fs.readFileSync(`${__dirname}/../data/cars.json`));

//default routes ('/')
const defaultRouter = (req, res, next) => {
    res.status(200).json({
        Status: "Success",
        Message: "Ping Succesfully",
        requestAt: req.requestTime,
    });
};

// get list cars ('/cars')
const getCars = (req, res, next) => {
    res.status(200).json({
        Status: "Success",
        Message: "Menampilkan List Cars",
        requestAt: req.requestTime,
        totalData: cars.lenght,
        data: {
            cars,
        },
    });
};

// get car by id ('/cars/:id')
const getCarById = (req, res, next) => {
    const id = req.params.id;

    //mencari spesifik data by id
    const car = cars.find((c) => c.id === id);

    //jika id tidak ada
    if (!car) {
        return res.status(404).json({
            Status: "Fail",
            Message: `Car dengan ID : ${id} tidak ada`,
            requestAt: req.requestTime,
        })
    }

    res.status(200).json({
        Status: "Success",
        Message: "Menampilkan Car by Id",
        requestAt: req.requestTime,
        data: {
            car,
        },
    });
};

// post new car ('/cars')
const createCar = (req, res, next) => {
    const newCar = req.body;

    cars.push(newCar);

    fs.writeFile(`${__dirname}/data/cars.json`, JSON.stringify(cars), (err) => {
        res.status(201).json({
            Status: "Success",
            Message: "Data car berhasil di tambah",
            requestAt: req.requestTime,
            data: {
                car: newCar,
            },
        });
    });
};

// put update car ('/cars/:id')
const updateCar = (req, res, next) => {
    const id = req.params.id

    //mencari spesifik data by id
    const car = cars.find((c) => c.id === id);
    const carIndex = cars.findIndex((c) => c.id === id);

    //jika id tidak ada
    if (!car) {
        return res.status(404).json({
            Status: "Fail",
            Message: `Car dengan ID : ${id} tidak ada`,
            requestAt: req.requestTime,
        })
    }

    //update data sesuai request body
    cars[carIndex] = { ...cars[carIndex], ...req.body };

    //update di dokumen json
    fs.writeFile(`${__dirname}/data/cars.json`, JSON.stringify(cars), (err) => {
        res.status(200).json({
            Status: "Success",
            Message: "Data car berhasil di update",
            requestAt: req.requestTime,
        });
    });
}

// delete data car ('/cars/:id')
const deleteCar = (req, res, next) => {
    const id = req.params.id

    //mencari spesifik data by id
    const car = cars.find((c) => c.id === id);
    const carIndex = cars.findIndex((c) => c.id === id);

    //jika id tidak ada
    if (!car) {
        return res.status(404).json({
            Status: "Fail",
            Message: `Car dengan ID : ${id} tidak ada`,
            requestAt: req.requestTime,
        })
    }

    //update data sesuai request body
    cars.splice(carIndex, 1);

    //update di dokumen json
    fs.writeFile(`${__dirname}/data/cars.json`, JSON.stringify(cars), (err) => {
        res.status(200).json({
            Status: "Success",
            Message: "Data car berhasil di delete",
            requestAt: req.requestTime,
        });
    });
}

module.exports = {
    defaultRouter,
    getCars,
    getCarById,
    createCar,
    updateCar,
    deleteCar
}