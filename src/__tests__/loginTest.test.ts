import * as service from "../services/loginService.js";
import * as route from "../routes/loginRoute.js";
import {describe} from "node:test";
import request from 'supertest';
import app from '../app.js';

describe('Login Service Tests', () => {
    app.use(route.default);
    it('Test findUser function', async () => {
        const result = await service.findUser('testUser', 'testPassword');
        expect(result).toBeTruthy();
    });

});

describe('Login Route Tests', () => {
    app.use(route.default);
    test('GET /login endpoint', async () => {
        const response = await request(app).get('/login');
        expect(response.status).toBe(200);
    });

});