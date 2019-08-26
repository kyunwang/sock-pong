import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import { initSocket } from '../../socket/socket';
import { detectMobile } from '../../../../general/helpers';

const socketURL = '192.168.1.8:7000';
// const socketURL = '192.168.1.14:7000';

const AppContextData = {
  global: {
    isMobile: detectMobile(),
  },
};

const SocketContextData = {
  initSocket: () => {},
  socket: null,
};

const GameContextData = {
  playerID: null,
  audienceCount: 0,
  players: [], // viewer only left, right?
  roomID: null,
};

export const AppContext = createContext(AppContextData);
export const SocketContext = createContext(SocketContextData);
export const GameContext = createContext(GameContextData);

// Multiple contexts to keep re-rendering fast
export const AppContextProvider = props => {
  const [socket, setSocket] = useState(null);
  const [roomID, setRoomID] = useState(null);
  const [playerID, setPlayerID] = useState(null);
  const [players, setPlayers] = useState([]);

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
      <GameContext.Provider
        value={{
          roomID,
          setRoomID,
          playerID,
          setPlayerID,
          players,
          setPlayers,
        }}
      >
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
