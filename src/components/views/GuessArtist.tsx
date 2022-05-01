import {Box, Center, Container, Grid, Stack, Text, UnstyledButton} from "@mantine/core";
import {FC, useState} from "react";
import {IGuessOption, IGuessQuestion} from "../../api/@def";
import {IGameController} from "./GameController";
import {SpotifyPlayer} from "./SpotifyPlayer";
import {Link} from "react-router-dom";

export interface IGuessArtistProps {
    controller: IGameController;
    question: IGuessQuestion;
}

export const GuessArtist: FC<IGuessArtistProps> = ({controller, question}) => {
    // const [question, setQuestion] = useState();
    const imageSize = 200;
    const [answered, setAnswered] = useState(false);

    if (!question) return null;
    const sendAnswer = (selection: IGuessOption) => {
        setAnswered(true);
        controller.answer(question as any, selection.answerId);
    };

    return (
        <Container size={500}>
            <Stack align="center">
                <h1>Guess the Artist</h1>
                <Grid gutter={40} justify="center">
                    {question.options.map((option, i) => {
                        return (
                            <Grid.Col key={i} span={6}>
                                <Center>
                                    <UnstyledButton component={Link} to="/postround">
                                        <Box
                                            style={{
                                                backgroundImage: `url(${option.artistLogo})`,
                                                opacity: answered ? 0.5 : 1,
                                                cursor: answered ? "default" : "pointer",
                                                border: "1px solid white",
                                            }}
                                            sx={{
                                                width: imageSize,
                                                height: imageSize,
                                                borderRadius: 10,
                                                backgroundRepeat: "no-repeat",
                                                backgroundSize: "cover",
                                                backgroundPosition: "center",
                                            }}
                                        >
                                            <Stack align="center" justify="center" sx={{height: "100%"}}>
                                                <Text sx={{
                                                    fontSize: 30,
                                                    fontWeight: 700,
                                                    color: "orange",
                                                    textShadow: "1px 2px #00000063"
                                                }}>{option.answer}</Text>
                                            </Stack>
                                        </Box>
                                    </UnstyledButton>
                                </Center>
                            </Grid.Col>
                        );
                    })}
                </Grid>

            </Stack>
            <SpotifyPlayer url={question.previewURL} duration={question.playDuration || 20}/>
        </Container>
    );
};
