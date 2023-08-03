const request = require('supertest')
const app = require('../configs/app');

describe('Sanity test', () => {
    test('1 should equal 1', () => {
        expect(1).toBe(1)
    });
});

describe('Drones endpoint', () => {
    test('Should have dummy data preloaded', async () => {
        const res = await request(app).get('/drones/state/availables');

        expect(res.headers['content-type']).toMatch(/json/);
        expect(res.statusCode).toEqual(200);
        expect(res.body.drones).toBeDefined();
        expect(res.body.drones.length).toBeGreaterThanOrEqual(4);
    });

    test('Should allow a new drone registration', async () => {
        const res = await request(app).post('/drones').send({
            'serial': '5',
            'model': 'Middleweight',
            'capacityLimit': 250,
            'battery': 35,
            'state': 'IDLE'
        });

        expect(res.headers['content-type']).toMatch(/json/);
        expect(res.statusCode).toEqual(201);
        expect(res.body.serial).toBeDefined();
        expect(res.body.model).toBeDefined();
        expect(res.body.capacityLimit).toBeDefined();
        expect(res.body.battery).toBeDefined();
        expect(res.body.state).toBeDefined();
        expect(res.body.medications).toBeDefined();
    });

    test('Should exists the new drone created', async () => {
        const res = await request(app).get('/drones/5');
        expect(res.headers['content-type']).toMatch(/json/);
        expect(res.statusCode).toEqual(200);
        expect(res.body.serial).toBeDefined();
        expect(res.body.serial).toEqual('5');
    });

    test('Should allow the load of the new drone created', async () => {
        const res = await request(app).post('/drones/5/load').send({
            'name': 'cp0-s',
            'weight': 30,
            'code': 'NEW',
            'image': 'fasdfasdfdhdfgnvdbcxgsdghdfhgjdftrserawefsdafdxcvsdfg'
        });
        
        expect(res.headers['content-type']).toMatch(/json/);
        expect(res.statusCode).toEqual(200);
        expect(res.body.medications).toBeDefined();
        expect(res.body.medications).toHaveLength(1);
    });

    test('Should have LOADED state and 1 medications', async () => {
        const res = await request(app).get('/drones/5');
        
        expect(res.headers['content-type']).toMatch(/json/);
        expect(res.statusCode).toEqual(200);
        expect(res.body.state).toBeDefined();
        expect(res.body.state).toBe('LOADED');
        expect(res.body.medications).toBeDefined();
        expect(res.body.medications).toHaveLength(1);
    });

    test('Should allow the read of the medications load', async () => {
        await request(app).post('/drones/5/load').send({
            'name': 'cp1-s',
            'weight': 50,
            'code': 'NEW',
            'image': 'fasdfasdfdhdfgnvdbcxgsdghdfhgjdftrserawefsdafdxcvsdfg'
        });
        const res = await request(app).get('/drones/5/load');
        
        expect(res.headers['content-type']).toMatch(/json/);
        expect(res.statusCode).toEqual(200);
        expect(res.body.medications).toBeDefined();
        expect(res.body.medications).toHaveLength(2);
    });

    test('Should allow the read of the battery of a drone', async () => {
        const res = await request(app).get('/drones/5');
        
        expect(res.headers['content-type']).toMatch(/json/);
        expect(res.statusCode).toEqual(200);
        expect(res.body.battery).toBeDefined();
        expect(res.body.battery).toEqual(35);
    });

    test('Should prevent any property against the drone value conditions', async () => {
        let res = await request(app).post('/drones').send({
            'serial': '5sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss',
            'model': 'Middleweight',
            'capacityLimit': 250,
            'battery': 35,
            'state': 'IDLE'
        });

        expect(res.headers['content-type']).toMatch(/json/);
        expect(res.statusCode).toEqual(400);
        console.log(res.body);

        res = await request(app).post('/drones').send({
            'serial': '6',
            'model': 'Middleweight2',
            'capacityLimit': 250,
            'battery': 35,
            'state': 'IDLE'
        });

        expect(res.headers['content-type']).toMatch(/json/);
        expect(res.statusCode).toEqual(400);
        console.log(res.body);

        res = await request(app).post('/drones').send({
            'serial': '6',
            'model': 'Middleweight',
            'capacityLimit': 600,
            'battery': 35,
            'state': 'IDLE'
        });

        expect(res.headers['content-type']).toMatch(/json/);
        expect(res.statusCode).toEqual(400);
        console.log(res.body);

        res = await request(app).post('/drones').send({
            'serial': '6',
            'model': 'Middleweight',
            'capacityLimit': 200,
            'battery': 35,
            'state': 'IDLE2'
        });

        expect(res.headers['content-type']).toMatch(/json/);
        expect(res.statusCode).toEqual(400);
        console.log(res.body);
    });

    test('Should prevent any property against the medication value conditions', async () => {
        let res = await request(app).post('/drones/5/load').send({
            'name': 'cp1-s*',
            'weight': 5,
            'code': 'NEW',
            'image': 'fasdfasdfdhdfgnvdbcxgsdghdfhgjdftrserawefsdafdxcvsdfg'
        });

        expect(res.headers['content-type']).toMatch(/json/);
        expect(res.statusCode).toEqual(400);
        console.log(res.body);

        res = await request(app).post('/drones/5/load').send({
            'name': 'cp1-s',
            'weight': 5,
            'code': 'NEWs',
            'image': 'fasdfasdfdhdfgnvdbcxgsdghdfhgjdftrserawefsdafdxcvsdfg'
        });

        expect(res.headers['content-type']).toMatch(/json/);
        expect(res.statusCode).toEqual(400);
        console.log(res.body);
    });

    test('Should prevent any a drone to be overloaded', async () => {
        let res = await request(app).post('/drones/5/load').send({
            'name': 'cp1-s',
            'weight': 500,
            'code': 'NEW',
            'image': 'fasdfasdfdhdfgnvdbcxgsdghdfhgjdftrserawefsdafdxcvsdfg'
        });

        expect(res.headers['content-type']).toMatch(/json/);
        expect(res.statusCode).toEqual(400);
        console.log(res.body);
    });

    test('Should prevent any a drone to be loaded if the battery is lower than 25%', async () => {
        await request(app).post('/drones').send({
            'serial': '9',
            'model': 'Middleweight',
            'capacityLimit': 250,
            'battery': 15,
            'state': 'IDLE'
        });

        let res = await request(app).post('/drones/9/load').send({
            'name': 'cp1-s',
            'weight': 105,
            'code': 'NEW',
            'image': 'fasdfasdfdhdfgnvdbcxgsdghdfhgjdftrserawefsdafdxcvsdfg'
        });

        expect(res.headers['content-type']).toMatch(/json/);
        expect(res.statusCode).toEqual(400);
        console.log(res.body);
    });
});