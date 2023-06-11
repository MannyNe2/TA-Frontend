import { faker } from '@faker-js/faker';
// import crypto from 'crypto';

export function getTransitRoutes({
  origin,
  destination,
  date,
  returnDate,
  passengers,
}) {
  let resultsCount = faker.datatype.number({
    min: 1,
    max: 5,
  }); // crypto.randomInt(0, 50);
  const routes = [];
  while (resultsCount-- > 0) {
    let tagsCount = faker.datatype.number({
      min: 0,
      max: 6,
    }); // crypto.randomInt(0, 6);
    const tags = [];
    while (tagsCount-- > 0) {
      tags.push(faker.word.adjective());
    }
    const capacity = faker.datatype.number({
      min: passengers,
      max: 50 + passengers,
    }); // crypto.randomInt(passengers, 50 + passengers);
    const booked_seats = faker.datatype.number({
      min: 0,
      max: capacity - passengers,
    }); // crypto.randomInt(0, capacity - passengers);
    const vehicle = {
      type: faker.vehicle.type(),
      // manufacturer: faker.vehicle.manufacturer(),
      // model: faker.vehicle.model(),
      transit_company: {
        logo: faker.image.abstract(640, 480, true),
        name: faker.company.name(),
      },
      capacity,
      booked_seats,
      tags,
    };

    const leaveDateInput = new Date(date);
    const leaveDateGen = faker.date.between(leaveDateInput, leaveDateInput);
    const returnDateInput = new Date(returnDate);
    const returnDateGen = faker.date.between(returnDateInput, returnDateInput);

    routes.push({
      id: faker.datatype.uuid(), // crypto.randomUUID(),
      origin,
      destination,
      vehicle,
      round_trip: !!returnDate,
      leave_date: leaveDateGen.toISOString(),
      return_date: returnDateGen.toISOString(),
      price: faker.commerce.price(500, 150000),
    });
  }
  return routes;
}
