import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function EditEmployeeModal({ employee, onClose, onSuccess }) {
  const [form, setForm] = useState({ name: '', email: '', position: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    if (employee) {
      setForm({
        name: employee.name,
        email: employee.email,
        position: employee.position
      });
    }
  }, [employee]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/employees/${employee.id}`, form);
      onSuccess();   // reload employees
      onClose();     // close modal
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update employee');
    }
  };

  if (!employee) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h3>Edit Employee</h3>
        <form onSubmit={handleSubmit}>
          <input name="name" value={form.name} onChange={handleChange} required />
          <input name="email" value={form.email} onChange={handleChange} required />
          <input name="position" value={form.position} onChange={handleChange} required />
          <div style={{ marginTop: '10px' }}>
            <button type="submit">Save</button>
            <button type="button" onClick={onClose} style={{ marginLeft: '10px' }}>Cancel</button>
          </div>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex',
    alignItems: 'center', justifyContent: 'center'
  },
  modal: {
    background: '#fff', padding: '20px', borderRadius: '8px',
    width: '300px', boxShadow: '0 2px 10px rgba(0,0,0,0.3)'
  }
};
