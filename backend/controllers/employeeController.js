const { Employee } = require('../models/Employee');

exports.createEmployee = async (req, res) => {
  try {
    const { name, email, position } = req.body;
    const employee = await Employee.create({ name, email, position });
    return res.status(201).json(employee);
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ error: 'Email already exists' });
    }
    return res.status(400).json({ error: err.message });
  }
};

exports.getEmployees = async (req, res) => {
  try {
    const { q } = req.query; // optional search query on backend
    let where = {};
    if (q) {
      where = {
        name: { [require('sequelize').Op.like]: `%${q}%` }
      };
    }
    const employees = await Employee.findAll({ where, order: [['createdAt', 'DESC']] });
    return res.json(employees);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch employees' });
  }
};

exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (!employee) return res.status(404).json({ error: 'Employee not found' });
    return res.json(employee);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch employee' });
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const { name, email, position } = req.body;
    const employee = await Employee.findByPk(req.params.id);
    if (!employee) return res.status(404).json({ error: 'Employee not found' });
    await employee.update({ name, email, position });
    return res.json(employee);
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ error: 'Email already exists' });
    }
    return res.status(400).json({ error: err.message });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (!employee) return res.status(404).json({ error: 'Employee not found' });
    await employee.destroy();
    return res.status(204).send();
  } catch (err) {
    return res.status(500).json({ error: 'Failed to delete employee' });
  }
};

module.exports={
    createEmployee: exports.createEmployee,
    getAllEmployees: exports.getEmployees,
    getEmployeeById: exports.getEmployeeById,
    updateEmployee: exports.updateEmployee,
    deleteEmployee: exports.deleteEmployee
}