import React, { useEffect, useState } from 'react';

const validate = ({ name, email, position }) => {
  const errors = {};
  if (!name || name.trim().length < 2) errors.name = 'Name must be at least 2 characters';
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Enter a valid email';
  if (!position || position.trim().length < 2) errors.position = 'Position must be at least 2 characters';
  return errors;
};

export default function EmployeeForm({ initial, onCancel, onSubmit }) {
  const [form, setForm] = useState({ name: '', email: '', position: '' });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');

  useEffect(() => {
    if (initial) setForm({ name: initial.name, email: initial.email, position: initial.position });
  }, [initial]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    try {
      await onSubmit(form);
    } catch (err) {
      setServerError(err?.response?.data?.error || 'Something went wrong');
    }
  };

  return (
    <div className="modal-backdrop" onClick={onCancel}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3 style={{ marginTop: 0 }}>{initial ? 'Edit Employee' : 'Add Employee'}</h3>

        {serverError && <div className="error" style={{ marginBottom: 8 }}>{serverError}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input className="input" name="name" value={form.name} onChange={handleChange} />
            {errors.name && <div className="error">{errors.name}</div>}
          </div>

          <div className="form-group">
            <label>Email</label>
            <input className="input" name="email" value={form.email} onChange={handleChange} />
            {errors.email && <div className="error">{errors.email}</div>}
          </div>

          <div className="form-group">
            <label>Position</label>
            <input className="input" name="position" value={form.position} onChange={handleChange} />
            {errors.position && <div className="error">{errors.position}</div>}
          </div>

          <div className="footer">
            <button type="button" className="button secondary" onClick={onCancel}>Cancel</button>
            <button type="submit" className="button">{initial ? 'Save' : 'Create'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
