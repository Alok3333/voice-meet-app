import { useCallback, useEffect, useRef } from 'react';
import { useStateWithCallback } from './useStateWithCallback';

// const users = [
//   {
//     id: 1,
//     name: 'Rakesh k',
//   },
//   {
//     id: 2,
//     name: 'Jhon Doe',
//   },
// ];

export const useWebRTC = (roomId, user) => {
  const [clients, setClients] = useStateWithCallback([]);
  const audioElements = useRef({});
  const connections = useRef({});
  const localMediaStream = useRef(null);

  const addNewClients = useCallback(
    (newClient, cb) => {
      const lookingFor = clients.find((client) => client.id === newClient.id);

      if (lookingFor === undefined) {
        setClients((existingClients) => [...existingClients, newClient], cb);
      }
    },
    [clients, setClients]
  );

  // Capture media with computer
  useEffect(() => {
    const startCapture = async () => {
      localMediaStream.current = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
    };

    startCapture().then(() => {
      addNewClients(user, () => {
        const localElement = audioElements.current[user.id];
        if (localElement) {
          localElement.volume = 0;
          localElement.scrObject = localMediaStream.current;
        }

        // Socket emit Join socket.io
      });
    });
  }, []);

  const provideRef = (instance, userId) => {
    audioElements.current[userId] = instance;
  };

  return { clients, provideRef };
};
