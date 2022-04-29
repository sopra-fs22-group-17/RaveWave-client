import AppRouter from "components/routing/routers/AppRouter";

/**
 * Happy coding!
 * React Template by Lucas Pelloni
 * Overhauled by Kyrill Hux
 */
const App = () => {
    //     const [isConnected, setIsConnected] = useState(false);
    // const [messageHistory, setMessageHistory] = useState([]);
    // useEffect(() => {
    //     stompClient.connect(setIsConnected(true));
    // }, []);

    // if (!isConnected) {
    //     return null;
    // }

    // TO READ MESSAGES FROM CHANNEL
    // const handleClickOnSubscribeAndSubscribe = event => {
    //     const  = "/topic/lobbies/{lobbyId}";
    //     stompClient.subscribe(subscriptionEndPoint, function (message) {
    //         // called when the client receives a STOMP message from the server
    //         this._connected = true;
    //         if (message.body) {
    //             alert("got message with body " + message.body);
    //         } else {
    //             alert("got empty message");
    //         }
    //         setMessageHistory([...messageHistory, message]);
    //     });
    // }

    // Reading latestMessage  = messageHistory[messageHistory.length -1]

    // TO SEND MESSAGES TO ANY ENDPOINT
    // const handleClickOnSendAndSengMesssage = event => {
    //     const objectToSend = JSON.stringify(body ? body : {})
    //     const destination = "/app/lobbies/1/next-round"
    //     stompClient.send(destination, {}, objectToSend);
    // }

    return <AppRouter />;
};

export default App;
