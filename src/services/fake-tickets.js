import { faker } from '@faker-js/faker';
import { useTicketSearchStore } from 'src/stores/ticket-search';

const store = useTicketSearchStore();
// import crypto from 'crypto';

export function getTransitRoutes({
  origin,
  destination,
  date,
  returnDate,
  passengers,
}) {
  /*   let resultsCount = faker.datatype.number({
    min: 1,
    max: 5,
  }); // crypto.randomInt(0, 50); */

  let resultsCount = store.results.length;

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

    const leaveDateGen = new Date(date);
    const leaveDateDiff = new Date(date);
    const returnDateFinal = returnDate
      ? returnDate
      : leaveDateDiff.setDate(leaveDateDiff.getDate() + 5);
    const returnDateInput = new Date(returnDateFinal);
    const returnDateGen = faker.date.between(leaveDateGen, returnDateInput);

    console.log();

    routes.push({
      id: store.results[resultsCount].id, // crypto.randomUUID(),
      origin: store.results[resultsCount].start_location,
      destination: store.results[resultsCount].destination,
      vehicle: {
        type: store.results[resultsCount].buses_available.car_type,
        transit_company: {
          logo: faker.image.abstract(640, 480, true),
          name: store.results[resultsCount].buses_available.provider
            .provider_name,
        },
        capacity: store.results[resultsCount].buses_available.seat_size,
        booked_seats: store.results[resultsCount].seats_left,
        tags: store.results[resultsCount].buses_available.accomodations,
      },
      round_trip: !!returnDate,
      leave_date: leaveDateGen.toISOString(),
      return_date: returnDateGen.toISOString(),
      price: Number(store.results[resultsCount].price.slice(1)),
    });
  }
  return routes;
}
