const faker = require('faker');
const fs = require('fs');
const writer = fs.createWriteStream('./dbSEED.txt');
const sample = require('./samplephotos');

const randomPhoto = () => {
  const urlPrefix = 'https://s3-us-west-1.amazonaws.com/fec-project-abodely-carousel/';
  return urlPrefix + sample.homePhotos[Math.ceil(Math.random() * 93)];
}

const generateCities = (number) => {
  const cities = [];
  for (let i = 0; i < number; i += 1) {
    cities.push(faker.address.city());
  }
  return cities;
};

const cities = generateCities(1000);

const randomCity = () => {
  return cities[Math.ceil(Math.random() * 999)];
}

const randomRating = () => {
  const rating = ['2', '2.5', '3', '3.5', '4', '4.5', '5'];
  return rating[Math.ceil(Math.random() * 6)];
};

const randomType = (cityName) => {
  const homeType = ['Entire place', 'Private room', 'Hotel Room', 'Shared Room'];
  return `${homeType[Math.floor(Math.random() * 3)]} • ${cityName}`;
};

const randomDescriptor = (cityName) => {
  const homeDescriptor = ['Studio', 'Loft', 'Apartment', 'House', 'Home', 'Condo', 'Cabin', 'Suite', 'Duplex', 'Town-Home', 'Villa', 'Vacation-House', 'Yurt', 'Bungaloo', 'Chalet', 'Penthouse', 'Terrace', 'Cottage'];
  let buzzWord = faker.company.bsAdjective().split('');
  buzzWord[0] = buzzWord[0].toUpperCase();
  buzzWord = buzzWord.join('');
  return `${buzzWord} ${homeDescriptor[Math.floor(Math.random() * 17)]} in ${cityName}`;
};

const createSampleHomes = () => {
  const date = new Date();
  const cityName = randomCity();
  const homeData = {
    city: cityName,
    createdAt: date.toISOString(),
    locationName: randomDescriptor(cityName),
    photoUrl: randomPhoto(),
    price: Math.floor(Math.random() * (1500 - 75)) + 75,
    propertyAvail: randomType(cityName),
    rating: randomRating(),
    reviewCount: Math.floor(Math.random() * (1000 - 25)) + 25,
    updatedAt: date.toISOString(),
  }
  return homeData;
};

const writeTenMillionTimes = (writer, encoding, callback) => {
  let i = 10000000;
  write();
  function write() {
    let ok = true;
    do {
      let home = createSampleHomes();
      let homeData = `${i},${Object.values(home).join(',')}` + '\n';
      i--;
      if (i === 0) {
        writer.write(homeData, encoding, callback);
      } else {
        ok = writer.write(homeData, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  }
}

writeTenMillionTimes(writer, 'utf8', () => console.log('done'));