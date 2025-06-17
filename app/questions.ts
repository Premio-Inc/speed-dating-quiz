export type QuestionOptions = {
    text: string;
    description?: string;
    solution: number;
}

export type Question = {
    id: number;
    question: string;
    description?: string;
    options: QuestionOptions[];
}

export const questions: Question[] = [
    {
        id: 1,
        question: "Let's get specific — what kind of environment are you committed to? ",
        description: "Choose the environment your edge solution must withstand. ",
        options: [
            {
                text: "Mobile, Vehicle-Based",
                description: " Use cases: In-vehicles, AGV/AMRs, mobile equipment",
                solution: 0
            }, {
                text: " Remote, Harsh Environments",
                description: "Use cases: Outdoor enclosures, factory floors, high-risk sites",
                solution: 1
            }, {
                text: "Standard Industrial Use ",
                description: " Use cases: Control panels, kiosks",
                solution: 2
            },
        ],
    },
    {
        id: 2,
        question: "How much processing power do you need to bring to the table?",
        description: " Elaborate on processing demands and capabilities of your application. ",
        options: [
            {
                text: "Lite",
                description: " Basic data collection and telemetry analysis.",
                solution: 2
            }, {
                text: "Mid-Range",
                description: " AI vision systems, sensor fusion, lightweight autonomous systems.",
                solution: 0
            }, {
                text: "High-Performance ",
                description: "Multimodal AI inferencing, high-bandwidth sensor fusion, autonomy training.",
                solution: 1,
            }

        ],
    },
    {
        id: 3,
        question: "What kind of AI spark are you looking for in your application?",
        description: "Identify whether your deployment workload requires additional acceleration.",
        options: [
            {
                text: "Mid to high-performance AI inferencing or training",
                description: "I require a dedicated GPU accelerator to streamline intensive AI workloads.",
                solution: 1,
            }, {
                text: "None",
                description: "I am not utilizing AI in this deployment, and integrated graphics are sufficient",
                solution: 2,
            }, {
                text: "Lite to mid-range AI inferencing ",
                description: "I need an AI accelerator that balances edge AI performance and power efficiency.",
                solution: 0,
            }
        ],
    },
    {
        id: 4,
        question: "How much physical space do you have for the system? ",
        description: "Evaluate where the edge solution will be integrated.",
        options: [
            {
                text: "Extremely Compact ",
                description: "Installing into an AGV or NEMA enclosure.",
                solution: 0,
            }, {
                text: "Moderate Space",
                description: "Enough room to be integrated into kiosks or control panels.",
                solution: 2,
            }, {
                text: "No Constraints ",
                description: " Ample space for performance-driven hardware.",
                solution: 1,
            }
        ],
    },
    {
        id: 5,
        question: "How many “connections” are you looking to make? ",
        description: "Determine the number of IoT devices and sensors needed to connect. ",
        options: [
            {
                text: "Less than 4 basic IoT devices ",
                description: "Only requiring standard connectivity on board for basic data collection.",
                solution: 2,
            }, {
                text: "Around 4 to 8 high-fidelity and/or basic IoT devices  ",
                description: "Flexibility for multi-sensor fusion and consolidating diverse data types.",
                solution: 1,
            }, {
                text: "Around 4 to 8 specialized IoT devices such as GMSL ",
                description: "Utilizing the latest sensor technologies for autonomous and complex AI workloads. ",
                solution: 0,
            }
        ],
    },
];