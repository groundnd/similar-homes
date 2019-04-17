const faker = require('faker');
const db = require('./index.js');
const Home = require('./Home.js');

const generatePhotoURL = (number) => {
  const urls = [];
  for (let i = 0; i < number; i += 1) {
    urls.push(`https://loremflickr.com/320/240/tokyo?lock=${i}`);
  }
  return urls;
}

const photos = generatePhotoURL(1000);

const randomRating = () => {
  const rating = ['2', '2.5', '3', '3.5', '4', '4.5', '5'];
  return rating[Math.ceil(Math.random() * 6)];
};

const randomType = () => {
  const homeType = ['Entire place', 'Private room', 'Hotel Room', 'Shared Room'];
  return `${homeType[Math.floor(Math.random() * 3)]} • ${faker.address.city()}`;
};

const randomDescriptor = () => {
  const homeDescriptor = ['Studio', 'Loft', 'Apartment', 'House', 'Home', 'Condo', 'Cabin', 'Sweet', 'Duplex', 'Town-Home', 'Villa', 'Vacation-House', 'Yurt', 'Bungaloo', 'Chalet', 'Penthouse', 'Terrace', 'Cottage'];
  let buzzWord = faker.company.bsAdjective().split('');
  buzzWord[0] = buzzWord[0].toUpperCase();
  buzzWord = buzzWord.join('');
  return `${buzzWord} ${homeDescriptor[Math.floor(Math.random() * 17)]} in ${faker.address.city()}`;
};

const createSampleHomes = (arr) => {
  const sampleData = arr.map((home) => {
    const homeData = {
      propertyAvail: randomType(),
      locationName: randomDescriptor(),
      photoUrl: urlPrefix + home,
      price: Math.floor(Math.random() * (1500 - 75)) + 75,
      rating: randomRating(),
      reviewCount: Math.floor(Math.random() * (1000 - 25)) + 25,
    };
    return homeData;
  });
  return sampleData;
};

const sampleHomes = createSampleHomes(photos);

const insertSampleData = () => {
  Home.bulkCreate(sampleHomes);
};

db.drop();

db.sync()
  .then(() => insertSampleData());
