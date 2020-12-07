import dayjs from "dayjs";
import {TRIP_TYPES, getRandomInteger, getRandomBoolean, CITY_DATA, PHOTO_DATA, HOURS_IN_DAY,
  MINUTES_IN_HOUR, MIN_PRICE, MAX_PRICE, DESCRIPTIONS_DATA, SERVISES} from "../const.js";


const generateTripType = () => {
  const randomIndex = getRandomInteger(0, TRIP_TYPES.length - 1);

  return TRIP_TYPES[randomIndex];
};

const generateDestination = () => {
  const randomIndex = getRandomInteger(0, CITY_DATA.length - 1);

  return CITY_DATA[randomIndex];
};


const getPhotoPath = () => `${PHOTO_DATA}${getRandomInteger(0, 10)}`;


const getRandomPhotos = () => {
  const emptyPhotos = new Array(getRandomInteger(0, 10)).fill(undefined).map(getPhotoPath);

  return emptyPhotos.filter((item, index) => emptyPhotos.indexOf(item) === index);
};


const calculateDifferenceTime = (begin, end) => {
  const hours = end.diff(begin, `hour`) % HOURS_IN_DAY;
  const minutes = end.diff(begin, `minute`) % MINUTES_IN_HOUR;

  return `${hours > 0 ? `${hours}H ${minutes}M` : `${minutes}M` }`;
};


const generateTime = () => {
  const daysGap = getRandomInteger(-7, 7);
  const hoursGap = getRandomInteger(0, 48);
  const minutesGap = getRandomInteger(0, 60);
  const days = dayjs().add(daysGap, `day`);
  const beginTime = dayjs().add(hoursGap, `hour`);
  const endTime = beginTime.add(hoursGap, `hour`).add(minutesGap, `minute`);

  return {
    day: days,
    begin: beginTime,
    end: endTime,
    difference: calculateDifferenceTime(beginTime, endTime),
  };
};


const generatePrice = () => getRandomInteger(MIN_PRICE, MAX_PRICE);


const getDescriptions = () => {
  const arrDescription = `${DESCRIPTIONS_DATA}`.split(`.`);

  return arrDescription[getRandomInteger(0, 12)];
};


const getRandomDescriptions = () => {
  const emptyArrOfDescriptions = new Array(getRandomInteger(0, 5)).fill(undefined).map(getDescriptions);

  return emptyArrOfDescriptions.filter((item, index) => emptyArrOfDescriptions.indexOf(item) === index);
};


const getServices = () =>{
  let servicesCopy = [...SERVISES];

  return servicesCopy[getRandomInteger(0, servicesCopy.length - 1)];
};


const getRandomServices = () => {
  const arrEmptyServices = new Array(getRandomInteger(0, 5)).fill(undefined).map(getServices);

  return arrEmptyServices.filter((item, index) => arrEmptyServices.indexOf(item) === index);
};


const getSumCost = (obj) => Object.values(obj.map(((it) => it.price))).reduce((a, b) => a + b, 0);


const getTripDates = (dates) => {
  const tripStartDate = dates[0].time.begin.format(`DD MMM`);
  const tripEndDate = dates[dates.length - 1].time.end.format(`DD MMM`);

  return `${tripStartDate} - ${tripEndDate}`;
};

const getTripRoute = (places) => {
  const newSetOfcities = [...new Set(places)];
  const cities = newSetOfcities.map((place) => place.destination);

  return `${cities[0]} — ${cities[1]} — ${cities[2]}`;
};


const generateTripPoint = () => {

  return {
    tripType: generateTripType(),
    destination: generateDestination(),
    time: generateTime(),
    price: generatePrice(),
    photos: getRandomPhotos(),
    offers: getRandomServices(),
    isFavorite: getRandomBoolean(),
    descriptions: getRandomDescriptions(),
  };
};


export {getSumCost, getTripDates, getTripRoute, generateTripPoint};
