import  React, { useEffect, useState } from 'react';
import axios from 'axios';
import SearchBar from '../components/SearchBar';
import EmployeeTable from '../components/EmployeeTable';
import EmployeeForm from '../components/EmployeeForm';
// import EditEmployeeModal from '../components/EditEmployeeModal';

export default function Home() {
  const [employees, setEmployees] = useState([]);
  const [query, setQuery] = useState('');
  const [editing, setEditing] = useState(null); // employee to edit
  const [open, setOpen] = useState(false); // modal visibility

  const load = async () => {
    const res = await axios.get('/api/employees', { params: { q: query || undefined } });
    setEmployees(res.data);
  };

  useEffect(() => { load(); }, [query]);

  const onCreate = async (payload) => {
    await axios.post('/api/employees', payload);
    setOpen(false);
    await load();
  };

  const onUpdate = async (id, payload) => {
    await axios.put(`/api/employees/${id}`, payload);
    setOpen(false);
    setEditing(null);
    await load();
  };

  const onDelete = async (id) => {
    await axios.delete(`/api/employees/${id}`);
    await load();
  };

  return (
    <div className="container">
      <div className="header">
        <div className="title">Employee Data Management</div>
        <button className="button" onClick={() => { setEditing(null); setOpen(true); }}>
          Add Employee
        </button>
      </div>

      <SearchBar value={query} onChange={setQuery} />

      <EmployeeTable
        employees={employees}
        onEdit={(emp) => { setEditing(emp); setOpen(true); }}
        onDelete={onDelete}
      />

      {open && (
        <EmployeeForm
          initial={editing}
          onCancel={() => { setOpen(false); setEditing(null); }}
          onSubmit={(data) => editing ? onUpdate(editing.id, data) : onCreate(data)}
        />
        
      )}
      
    </div>
  );
}
