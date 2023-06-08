import { useState } from 'react';

export const useWebRTC = () => {
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

  return { clients };
};
