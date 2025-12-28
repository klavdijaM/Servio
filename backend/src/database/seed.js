// inserts predefined data into the database using the schema

const db = require('./db'); // connect to database

const deliveryZones = [
    {name: 'Central', base_delivery_time: 20},
    {name: 'North', base_delivery_time: 30},
    {name: 'South', base_delivery_time: 40},
    {name: 'Industrial', base_delivery_time: 50},
]

const insertDeliveryZoneQuery =
    `INSERT INTO delivery_zones (name, base_delivery_time) -- inserts cols name and base_delivery_time into the row delivery_zones 
     VALUES (?, ?)`;

deliveryZones.forEach(zone => {
    db.run(
        insertDeliveryZoneQuery,
        [zone.name, zone.base_delivery_time],
        (err) => {
            if (err) {
                console.error('Failed to insert delivery zone', err);
            }
        });
});
console.log('Delivery zones seeded');


