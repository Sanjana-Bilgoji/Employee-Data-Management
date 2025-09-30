const request = require('supertest');
const express = require('express');
const employeeRoutes = require('../routes/employees');
const {sequelize, Employee} = require('../models/Employee');


const app=express();
app.use(express.json());
app.use('/api/employees', employeeRoutes);

beforeAll(async()=>{
    await sequelize.sync({force:true});
});

afterAll(async()=>{
    await sequelize.close();
});

describe('Employee API', ()=>{
    let id;

    test('Create a new employee', async()=>{
        const res=await request(app).post('/api/employees').send({
            name:'John Doe',
            email:'test@exa.com',
            position:'Developer'
        });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
        id=res.body.id;
    });
    test('Get all employees', async()=>{
    const res = await request(app).get('/api/employees');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0].email).toBeDefined();
  
    // expect(res.body.email).toBe('test@exa.com');
  });
  test('Update employee', async () => {
    const res = await request(app).put(`/api/employees/${id}`).send({
      name: 'Updated User',
      email: 'test@gmail.com',
      position: 'Senior Engineer'
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('Updated User');
  });

  test('Delete employee', async () => {
    const res = await request(app).delete(`/api/employees/${id}`);
    expect(res.statusCode).toBe(204);
  });
  test('Email uniqueness', async () => {
    await Employee.create({ name: 'Sanjana', email: 'sanjana@gmail.com', position: 'Software Engineer' });
    const res = await request(app).post('/api/employees').send({
      name: 'Sanjana', email: 'sanjana@gmail.com', position: 'Software Developer'
    });
    expect(res.statusCode).toBe(409);
    expect(res.body.error).toBe('Email already exists');
  });
});