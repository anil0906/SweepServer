(function (){
 window.mapping = [
      {
          operation: "authentication",
          url: "/public/authenticate",
          payload: {
              userName: "testuser",
              password: "testuser"
          }
      }, {
          operation: "createPlayer",
          url: "/public/createPlayer",
          payload: {
              userName: "testuser",
              password: "testuser",
              rePassword: "testuser",
              email: "test@test.com",
          }
      }, {
          operation: "createGame",
          url: "/secure/createGame",
          payload: {
              isTwoPlayerGame: true,
              isOpenToPublic: true
          }
      }, {
        operation: "joinGame",
        url: "/secure/joinGame",
        payload: {
            playerSeat: 2,
            gameId: "1234"
        }
      }, {
        operation: "findGame",
        payload: {
            filter: "ALL"
        }
      }
  ];

})();
