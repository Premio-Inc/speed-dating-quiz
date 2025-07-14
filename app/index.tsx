"use client";
import React, { useState, useRef, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Container,
    Button,
    Typography,
    RadioGroup,
    FormControlLabel,
    Radio,
    Box,
    TextField,
    Alert,
} from "@mui/material";
import { z } from "zod";
import { questions } from "./questions";

const QuizFormSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    company: z.string().min(1, "Company is required"),
    jobTitle: z.string().min(1, "Job title is required"),
    answers: z.array(z.string()).length(5),
});

type QuizFormSchemaType = z.infer<typeof QuizFormSchema>;

function getHubspotUTK(): string | null {
    const match = document.cookie.match(/(?:^|;\s*)hubspotutk=([^;]+)/);
    return match ? decodeURIComponent(match[1]) : null;
}

const solutionLabels = ["JCO", "RCO", "BCO"];

const solutionContainer = (value: "JCO" | "RCO" | "BCO" | null | string & {}): React.JSX.Element => {
    switch (value) {
        case "JCO":
            return <>JCO</>;
        case "RCO":
            return <>RCO</>;
        case "BCO":
            return <>BCO</>;
        default:
            return <></>;
    }
}

const QuizPage = () => {
    const [submitted, setSubmitted] = useState(false);
    const [solution, setSolution] = useState<string | null>(null);
    const [currentQuestion, setCurrentQuestion] = useState(-1);
    const [answers, setAnswers] = useState<string[]>(Array(5).fill(""));

    const [error, setError] = useState<string | null>(null);

    const methods = useForm<QuizFormSchemaType>({
        resolver: zodResolver(QuizFormSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            company: "",
            jobTitle: "",
            answers: Array(5).fill(""),
        },
    });

    const handleAnswerChange = (value: string) => {
        const updatedAnswers = [...answers];
        updatedAnswers[currentQuestion] = value;
        setAnswers(updatedAnswers);
        methods.setValue(`answers.${currentQuestion}`, value);
    };

    const sendToHubspot = async (data: QuizFormSchemaType, result: string) => {

        const formId = result === "JCO" ? "415f0b04-8b89-4e74-9304-73840d122728" : result === "RCO" ? "b5d4df2c-8b2c-4930-81cd-0c65e1772e77" : "b6ccd073-3b45-4ff9-8a14-5e5b41340604";

        const hubspotUTK = getHubspotUTK();
        const answer = data.answers.map((answer, index) => ({
            question: questions[index].question,
            answer: questions[index].options[parseInt(answer)].text,
        })).reduce((acc, curr) => `${acc}\n-${curr.question} \n    ${curr.answer}`, "Result: " + result + "\n");

        try {
            const sendData = await fetch(`https://api.hsforms.com/submissions/v3/integration/submit/2654016/${formId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    fields: [
                        { objectTypeId: "0-1", name: "firstname", value: data.firstName },
                        { objectTypeId: "0-1", name: "lastname", value: data.lastName },
                        { objectTypeId: "0-1", name: "email", value: data.email },
                        { objectTypeId: "0-2", name: "name", value: data.company },
                        { objectTypeId: "0-1", name: "jobtitle", value: data.jobTitle },
                        {
                            objectTypeId: "0-1",
                            name: "speed_dating_quiz_answers",
                            value: answer,
                        }
                    ],
                    "context": {
                        "hutk": hubspotUTK,
                        "pageUri": window.location.href,
                        "pageName": window.document.title,
                    }
                }),
            })
            if (!sendData.ok) {
                throw new Error("Failed to send data to HubSpot");
            }

            if (typeof window !== "undefined" && window?.self !== window?.top) {
                window.parent.postMessage({
                    type: "hsQuizFormCallback",
                    formId: formId,
                    data: {
                        ...data,
                        answers: data.answers.map((answer, index) => ({
                            question: questions[index].question,
                            answer: questions[index].options[parseInt(answer)].text,
                        })),
                        result: result
                    }
                }, "https://premioinc.com");
            }
            //setSolution(result);
        } catch (error) {
            console.error("Error sending data to HubSpot:", error);
            setError("Failed to submit the form. Please try again later.");
        }
    };

    const handleNext = async () => {
        if (currentQuestion === -1) {
            const valid = await methods.trigger([
                "firstName",
                "lastName",
                "email",
                "company",
                "jobTitle",
            ]);
            if (!valid) return;
            setCurrentQuestion(0);
        } else if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            const counts = [0, 0, 0];
            answers.forEach((ans, i) => {
                const solutionIndex = questions[i].options[parseInt(ans)].solution;
                counts[solutionIndex]++;
            });
            const maxIndex = counts.indexOf(Math.max(...counts));
            const finalSolution = solutionLabels[maxIndex];
            setSubmitted(true);
            const data = methods.getValues();
            await sendToHubspot({ ...data, answers }, finalSolution);
        }
    };

    const handlePrevious = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        } else if (currentQuestion === 0) {
            setCurrentQuestion(-1);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom className="mb-3">
                5 Questions and less than 1 minute to reveal your perfect match!
            </Typography>
            <Typography className="mb-3 border-b border-gray-300 pb-3">
                To find out which contestant is the best match for you, simply enter your information below.
            </Typography>
            {error && (
                <div className="space-y-3">
                    <Alert severity="error" onClose={() => setError(null)}>
                        {error}
                    </Alert>
                    <div className="text-center">
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={() => {
                                setSubmitted(false);
                                setSolution(null);
                                setCurrentQuestion(-1);
                                setAnswers(Array(5).fill(""));
                                methods.reset();
                                setError(null);
                            }}
                            sx={{ ml: 2 }}
                        >
                            Restart
                        </Button>
                    </div>
                </div>
            )}

            <FormProvider {...methods}>
                {!submitted ? (
                    <form>
                        {currentQuestion === -1 ? (
                            <Box display="flex" flexDirection="column" gap={2} mb={3}>
                                <TextField label="First Name" {...methods.register("firstName")} error={!!methods.formState.errors.firstName} helperText={methods.formState.errors.firstName?.message} />
                                <TextField label="Last Name" {...methods.register("lastName")} error={!!methods.formState.errors.lastName} helperText={methods.formState.errors.lastName?.message} />
                                <TextField label="Email" {...methods.register("email")} error={!!methods.formState.errors.email} helperText={methods.formState.errors.email?.message} />
                                <TextField label="Company" {...methods.register("company")} error={!!methods.formState.errors.company} helperText={methods.formState.errors.company?.message} />
                                <TextField label="Job Title" {...methods.register("jobTitle")} error={!!methods.formState.errors.jobTitle} helperText={methods.formState.errors.jobTitle?.message} />
                            </Box>
                        ) : (
                            <Box mb={3}>
                                <Typography variant="h6" gutterBottom>
                                    {questions[currentQuestion].question}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" gutterBottom>
                                    {questions[currentQuestion].description}
                                </Typography>
                                <RadioGroup
                                    value={answers[currentQuestion]}
                                    onChange={(e) => handleAnswerChange(e.target.value)}
                                >
                                    {questions[currentQuestion].options.map((option, idx) => (
                                        <FormControlLabel
                                            key={idx}
                                            value={idx.toString()}
                                            control={<Radio />}
                                            label={option.text}
                                        />
                                    ))}
                                </RadioGroup>
                            </Box>
                        )}
                        {currentQuestion >= 0 && (
                            <Button
                                variant="outlined"
                                onClick={handlePrevious}
                                sx={{ mr: 2 }}
                            >
                                Previous
                            </Button>
                        )}
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleNext}
                            disabled={
                                currentQuestion === -1
                                    ? false
                                    : !answers[currentQuestion]
                            }
                        >
                            {currentQuestion === -1
                                ? "Start Quiz"
                                : currentQuestion === questions.length - 1
                                    ? "Submit Quiz"
                                    : "Next"}
                        </Button>


                    </form>
                ) : (
                    <Box mt={4}>
                        <Typography variant="h5" gutterBottom>
                            {solutionContainer(solution)}
                        </Typography>
                    </Box>
                )}
            </FormProvider>
        </Container>
    );
};

export default QuizPage;
