import { useState } from 'react';

export default function Create() {
  const [name, setName] = useState('');

  return (
    <div style={{ padding: '40px', background: 'white', minHeight: '100vh' }}>
      <h1>Create Page</h1>
      <input
        type="text"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <p>Name: {name}</p>
    </div>
  );
}
