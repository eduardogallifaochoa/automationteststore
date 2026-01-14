// test-data/guestDataFactory.js
export function buildGuestData(overrides = {}) {
  return {
    firstName: 'qatesterwindows',
    lastName: 'qatesterwindowstwo',
    email: `qatester${Date.now()}@gmail.com`, // unique per run
    address1: 'qatester1401',
    countryId: '138', // Mexico
    zoneId: '2159',   // Tamaulipas
    city: 'Ciudad Madero',
    postcode: '89514',
    ...overrides, // allow per-test changes
  };
}
