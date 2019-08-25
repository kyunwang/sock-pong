import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import { initSocket } from '../../general/socket';
import { detectMobile } from '../../../../helpers';

const socketURL = '192.168.1.8:7000';
// const socketURL = '192.168.1.14:7000';

const AppContextData = {
  global: {
    isMobile: detectMobile(),
  },
};

const SocketContextData = {
  socket: null,
  initSocket: () => {},
};

const GameContextData = {
  roomID: null,
  audienceCount: 0,
  players: {}, // left, right?
};

export const AppContext = createContext(AppContextData);
export const SocketContext = createContext(SocketContextData);
export const GameContext = createContext(GameContextData);

// Multiple contexts to keep re-rendering fast
export const AppContextProvider = props => {
  const [socket, setSocket] = useState(null);

  const [roomID, setRoomID] = useState(null);

  const assignSocket = () => {
    const connectedSocket = initSocket({
      url: socketURL,
      config: {
        transports: ['websocket', 'xhr-polling'],
      },
    });
    setSocket(connectedSocket);
    return connectedSocket;
  };

  return (
    // <AppContext.Provider>
    <SocketContext.Provider value={{ socket, assignSocket }}>
      <GameContext.Provider value={{ roomID, setRoomID }}>
        {props.children}
      </GameContext.Provider>
    </SocketContext.Provider>
    // </AppContext.Provider>
  );
};

AppContextProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
AppContextProvider.defaultProps = {};

export default AppContextProvider;
// export { AppContextProvider, AppContext, SocketContext, GameContext };
