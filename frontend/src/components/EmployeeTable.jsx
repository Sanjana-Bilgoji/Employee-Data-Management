import React from 'react';

export default function EmployeeTable({ employees, onEdit, onDelete }) {
  if (employees.length === 0) {
    return <div className="empty">No employees found</div>;
  }

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Name</th><th>Email</th><th>Position</th><th style={{ textAlign: 'right' }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {employees.map(emp => (
          <tr key={emp.id}>
            <td>{emp.name}</td>
            <td>{emp.email}</td>
            <td>{emp.position}</td>
            <td>
              <div className="row-actions">
                <button className="button" onClick={() => onEdit(emp)}>Edit</button>
                <button className="button secondary" onClick={() => onDelete(emp.id)}>Delete</button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
