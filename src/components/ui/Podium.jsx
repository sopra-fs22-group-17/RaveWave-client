import PodiumStep from "./PodiumStep";

export default function Podium({ players }) {
    players = players.slice(0, 3);
    const podium = [2, 0, 1].reduce((podiumOrder, position) => [...podiumOrder, players[position]], []).filter(Boolean);
    return (
        <div
            style={{
                alignContent: "flex-end",
                alignItems: "flex-end",
                display: "grid",
                gap: ".5rem",
                gridAutoFlow: "column dense",
                justifyContent: "center",
                justifyItems: "center",
                height: 175,
                marginTop: "2rem",
                marginBottom: "20px",
            }}
        >
            {podium.map((player) => (
                <PodiumStep key={player.playerId} podium={podium} player={player} />
            ))}
        </div>
    );
}
