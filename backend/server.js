const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const {sequelize} = require('./models/Employee');
const employeeRoutes = require('./routes/employees');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api/employees', employeeRoutes);

sequelize.sync().then(() => {
     console.log('Database Started');
    try{
        const port = process.env.PORT || 5000;
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    
    }catch(e){
        console.error('Unable to start the server:', e);
        }
    });
