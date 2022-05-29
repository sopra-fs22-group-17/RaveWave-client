<h1 align="center">
  <br>
  <a href="https://github.com/soprafs22-group17"><img src="/ReadMePics/RaveWaveLogoDurchsichtig.png" alt="RaveWave" width="200"></a>
  <br>
  RaveWave-Client
  <br>
</h1>



## Introduction

By combining Kahoot with Spotify, RaveWave creates a competitive and fun music guessing game to play among friends. This is the
repository of the back-end part of our implementation, you'll find the front-end part [here](https://github.com/sopra-fs22-group-17/RaveWave-client).

## Technologies

The client is written in TypeScript using React. For styling Mantine components are used.

To establish a connection between the front- and backend REST is used. When further proceeding in the game (invite players), a stomp websocket connection gets established.

## High-level components

The [SelectGameMode](https://github.com/sopra-fs22-group-17/RaveWave-client/blob/master/src/components/views/SelectGameMode.tsx) view allows the users to choose a game mode, select the number of game rounds and select the playback duration. In addition, the user can choose from a variety of playlists. The game configuration is sent to the backend via the stomp websocket connection as soon as the host invites players to the game.

The different game mode views, namely [GuessSong](https://github.com/sopra-fs22-group-17/RaveWave-client/blob/master/src/components/views/GuessSong.tsx) , [GuessArtist](https://github.com/sopra-fs22-group-17/RaveWave-client/blob/master/src/components/views/GuessArtist.tsx), [GuesLyrics](https://github.com/sopra-fs22-group-17/RaveWave-client/blob/master/src/components/views/GuessLyrics.tsx) are the most important component of RaveWave. This is where the users can listen to music and can give their guesses. Again, the communication with the backend is done with stomp websockets.

Lastly, [PostRound](https://github.com/sopra-fs22-group-17/RaveWave-client/blob/master/src/components/views/PostRound.tsx) and [PostGame](https://github.com/sopra-fs22-group-17/RaveWave-client/blob/master/src/components/views/PostGame.tsx) are a central part of the frontend. PostRound displays the game results after every round and PostGame displays the results at the very end of the game.

The [GameController](https://github.com/sopra-fs22-group-17/RaveWave-client/blob/master/src/components/views/GameController.tsx) controls the game states as soon as the stomp websocket connection is established. The GameController subscribes as a listener and handles the different game states and decides which views are rendered.

## Launch & Deployment

- npm run dev

  Runs the app in the development mode.
  Open http://localhost:3000 to view it in the browser.

  The page will reload if you make edits.
  You will also see any lint errors in the console.

- npm run build

  Builds the app for production to the build folder.
  It correctly bundles React in production mode and optimizes the build for the best performance.

  The build is minified and the filenames include the hashes.
  Your app is ready to be deployed!

## Illustrations
<h1 align="center">
  <br>
  <a href="https://github.com/soprafs22-group17"><img src="/ReadMePics/a.png" alt="RaveWave" width="200"></a>
  <br>
  Landinghost - As a host you can log in or register.
  <br>
</h1>
<h1 align="center">
  <br>
  <a href="https://github.com/soprafs22-group17"><img src="/ReadMePics/b.png" alt="RaveWave" width="200"></a>
  <br>
  Selectgamemode - This is where the host can adjust game parameters.
  <br>
</h1>
<h1 align="center">
  <br>
  <a href="https://github.com/soprafs22-group17"><img src="/ReadMePics/c.png" alt="RaveWave" width="200"></a>
  <br>
  DisplayQR - The host displays a QR-code which other players can scan in order to join the lobby. 
  <br>
</h1>
<h1 align="center">
  <br>
  <a href="https://github.com/soprafs22-group17"><img src="/ReadMePics/d.png" alt="RaveWave" width="200"></a>
  <br>
  EndRound - A leaderboard is shown after each round.
  <br>
</h1>
<h1 align="center">
  <br>
  <a href="https://github.com/soprafs22-group17"><img src="/ReadMePics/e.png" alt="RaveWave" width="200"></a>
  <br>
  EndRound - A leaderboard is shown after each round.
  <br>
</h1>
<h1 align="center">
  <br>
  <a href="https://github.com/soprafs22-group17"><img src="/ReadMePics/f.png" alt="RaveWave" width="200"></a>
  <br>
  EndGame - A final leaderboard is shown after all game rounds are played.
  <br>
</h1>

## Roadmap

- New game mode: Guess the lyrics
- Global RaveWAver leaderboard
- Submit Quota Extension request (takes about six weeks)

## Authors and acknoledgment

SoPra Group 17 2022 consists of [Marco Leder](https://github.com/marcoleder), [Valentin Hollenstein](https://github.com/v4lentin1879),
[Dennys Huber](https://github.com/devnnys), [Sheena Lang](https://github.com/SheenaGit) and [Isabella Chesney](https://github.com/bellachesney).

We first want to thank our teaching assistant [Tarek Alakmeh](https://github.com/orgs/sopra-fs22-group-17/people/Taremeh) for his help during the
last semester, as well as our previous teaching assistant [Kyrill Hux](https://github.com/realChesta).
We also thank Spotify for providing such a well documented API and Kahoot for the inspiration. It has been a very
educational and challenging semester, and we are very thankful for this experience.

## License

GNU GPLv3
