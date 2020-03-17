exports.seed = async function(knex) {
  const testData = [
    {VIN: "DH13542HG39DJSI82", make:"Toyota", model:"Prius", mileage:"123456", transmission:"automatic", titleStatus:"clean"},
    {VIN: "WF26789CHKK086543", make:"Acura", model:"RSX", mileage:"234564", transmission:"automatic", titleStatus:"clean"},
    {VIN: "WGJ5890HHFD654467", make:"Toyota", model:"Tacoma", mileage:"345674", transmission:"manual", titleStatus:"salvage"},
  ];
  // Deletes (truncate) ALL existing entries and reset id back to 1
  await knex('cars').truncate()

  return knex('cars').insert(testData);
};
