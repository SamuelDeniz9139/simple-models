const models = require('../models');
const { Cat } = models;
const { Dog } = models;
const defaultCatData = {
  name: 'unknown',
  bedsOwned: 0,
};
const defaultDogData = {
  name: 'unknown',
  age: 0,
  breed: 'nobody cares',
};
let lastCat = new Cat(defaultCatData);
let lastDog = new Dog(defaultDogData);
const hostIndex = (req, res) => {
  res.render('index', {
    currentName: lastCat.name,
    title: 'Home',
    pageName: 'Home Page',
  });
};
const hostPage1 = async (req, res) => {
  try {
    const docs = await Cat.find({}).lean().exec();
    return res.render('page1', { cats: docs });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'failed to find cats' });
  }
};
const hostPage2 = (req, res) => {
  res.render('page2');
};
const hostPage3 = (req, res) => {
  res.render('page3');
};
const hostPage4 = (req, res) => {
  res.render('page4');
};
const getName = (req, res) => res.json({ name: lastCat.name });
const catName = async (req, res) => {
  if (!req.body.firstname || !req.body.lastname || !req.body.beds) {
    return res.status(400).json({ error: 'firstname, lastname and beds are all required' });
  }
  const catData = {
    name: `${req.body.firstname} ${req.body.lastname}`,
    bedsOwned: req.body.beds,
  };
  const newCat = new Cat(catData);
  try {
    await newCat.save();
    lastCat = newCat;
    return res.json({
      name: lastCat.name,
      beds: lastCat.bedsOwned,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'failed to create cat' });
  }
};
const dogName = async (req, res) => {
  if (!req.body.firstname||!req.body.lastname||!req.body.age||!req.body.breed) {
    return res.status(400).json({ error: 'names, breed, and age are all required' });
  }
  const dogData = {
    name: `${req.body.firstname} ${req.body.lastname}`,
    age: req.body.age,
    breed: req.body.breed,
  };
  const newDog = new Dog(dogData);
  try {
    await newDog.save();
    lastDog = newDog;
    return res.json({
      name: lastDog.name,
      age: lastDog.age,
      breed: lastDog.breed,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'failed to create dog' });
  }
};
const searchCat = async (req, res) => {
  if (!req.query.name) {
    return res.status(400).json({ error: 'Name is required to perform a search' });
  }
  try {
    const doc = await Cat.findOne({ name: req.query.name }).exec();
    if (doc){
      return res.json({ name: doc.name, beds: doc.bedsOwned });
    } else {
      return res.json({error:'No cats found.'});
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Something went wrong.' });
  }
};
const searchDog = async (req, res) => {
  if (!req.query.name) {
    return res.status(400).json({error: "Can't search without a name."});
  }
  try {
    const dod = await Dog.findOne({ name: req.query.name }).exec();
    if (dod){
      dod.age++;
      return res.json({ name: dod.name, age: dod.age, breed: dod.breed });
    } else {
      return res.json({ error: 'No doggos found' });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};
const updateCat = (req, res) => {
  lastCat.bedsOwned++;
  const savePromise = lastCat.save();
  savePromise.then(() => res.json({
    name: lastCat.name,
    beds: lastCat.bedsOwned,
  }));
  savePromise.catch((err) => {
    console.log(err);
    return res.status(500).json({ error: 'Something went wrong' });
  });
};
const notFound = (req, res) => {
  res.status(404).render('notFound', {
    page: req.url,
  });
};
module.exports = {
  index: hostIndex,
  page1: hostPage1,
  page2: hostPage2,
  page3: hostPage3,
  page4: hostPage4,
  getName,
  dogName,
  catName,
  updateCat,
  searchCat,
  searchDog,
  notFound,
};