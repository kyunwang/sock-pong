export const initialPlayersState = [];

export const playersReducer = (players, action) => {
  switch (action.type) {
    case 'addPlayer':
      return [...players, action.playerID];
    case 'removePlayer': {
      const playerIndex = players.indexOf(action.playerID);
      const newArray = [
        ...players.slice(0, playerIndex),
        ...players.slice(playerIndex + 1, players.length),
      ];
      return newArray;
    }
    default:
      throw new Error();
  }
};
