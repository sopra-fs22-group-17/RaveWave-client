import { motion } from "framer-motion";

export default function PodiumStep({ podium, player }) {
    const offset = podium.length - player.position;
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                placeContent: "center",
            }}
        >
            <motion.div
                style={{
                    alignSelf: "center",
                    marginBottom: ".25rem",
                }}
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: { opacity: 0 },
                    visible: {
                        opacity: 1,
                        transition: {
                            delay: offset / 1.5 + 1,
                            duration: 0.75,
                        },
                    },
                }}
            >
                <img
                    src={`${player.profilePicture}`}
                    alt=""
                    style={{
                        borderRadius: 9999,
                        height: "4rem",
                        overflow: "hidden",
                        width: "4rem",
                    }}
                />
            </motion.div>
            <motion.div
                style={{
                    backgroundColor: "#2F9E44",
                    borderColor: "#2F9E44",
                    borderTopLeftRadius: ".5rem",
                    borderTopRightRadius: ".5rem",
                    display: "flex",
                    filter: `opacity(${0.2 + offset / podium.length})`,
                    marginBottom: -1,
                    placeContent: "center",
                    width: "6rem",
                }}
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: { height: 0, opacity: 0 },
                    visible: {
                        height: 150 * (offset / podium.length),
                        opacity: 1,
                        transition: {
                            delay: offset / 1.5,
                            duration: 2,
                            ease: "backInOut",
                        },
                    },
                }}
            >
                <span style={{ alignSelf: "flex-end", color: "white", marginBottom: "0.6em" }}>{player.position + 1}</span>
            </motion.div>
        </div>
    );
}
