import React, { useState } from 'react';

const Room = () => {
  const [clients, setClients] = useState([
    {
      id: 1,
      name: 'Rakesh k',
    },
    {
      id: 2,
      name: 'Jhon Doe',
    },
  ]);
  return (
    <div>
      <h1>All Connected Clients</h1>
      {clients.map((client) => {
        return <div>
          <audio controls autoPlay></audio>
          <h4>{client.name}</h4>
        </div>;
      })}
    </div>
  );
};

export default Room;
