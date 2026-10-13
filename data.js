/**
 * DevFest 2026 Configuration & Data Store
 * Easily toggle sections on/off by setting showAgenda, showSpeakers, or showSponsors to true or false.
 * You can edit the arrays below with your 2026 data whenever you're ready!
 */
const devFestConfig = {
    year: "2026",
    edition: "DevFest Tripoli 2026",
    tagline: "GDG North Lebanon",
    dateDisplay: "October 17, 2026",
    locationDisplay: "BAU Tripoli",
    registrationUrl: "https://rsvp.gdglebanon.com/",
    contactEmail: "info@gdglebanon.com",

    // Visibility toggles: Set to true when you want to reveal the full content!
    showAgenda: true,           // Toggle agenda schedule / tracks
    showSpeakers: true,         // Toggle speakers grid
    showSponsors: false,        // Toggle sponsors grid
    showBadgeGenerator: true,   // Toggle badge generator
};

const devFestData = {
    sessions: [
        {
                "id": "reg-coffee-001",
                "title": "Registration & Welcome Coffee",
                "description": "Get your badge and enjoy some coffee before we start.",
                "format": "Networking",
                "level": "",
                "room": "Main Auditorium",
                "time": "08:30 AM - 09:30 AM",
                "tags": [],
                "isCommon": true,
                "targetAudience": "All Attendees"
        },
        {
                "id": "cf3d53f8-2f9b-456a-aab4-dfeb00f9df3f",
                "title": "Open Ceremony",
                "description": "By GDG and BAU",
                "format": "Keynote",
                "level": "Beginner",
                "room": "Main Auditorium",
                "time": "10:00 AM - 10:30 AM",
                "tags": [],
                "isCommon": true,
                "targetAudience": ""
        },
        {
                "id": "1361290",
                "title": "Soverign AI and Data in the region",
                "description": "Panel discussion featuring Krystel Mahfoud, Abdul Samih El-Charif, Rami Assoum, and Jonah Tabaa.",
                "format": "Panel",
                "level": "",
                "room": "Main Auditorium",
                "time": "10:35 AM - 11:15 AM",
                "tags": [
                        "Panel"
                ],
                "isCommon": false,
                "targetAudience": "All Attendees",
                "speakers": [
                        {
                                "id": "01e521c1-35e6-45f6-a54b-43a0a65483ba",
                                "name": "Krystel Mahfoud"
                        },
                        {
                                "id": "e1a21679-8ca7-4a65-88b0-8747f3bf796c",
                                "name": "Abdul Samih El-Charif"
                        },
                        {
                                "id": "bdc9dc4a-f2d4-42c9-b217-654418df2542",
                                "name": "Rami Assoum"
                        },
                        {
                                "id": "e98908ce-d5f6-4db7-873b-ebd3886e0f00",
                                "name": "Jonah Tabaa"
                        }
                ]
        },
        {
                "id": "1346716",
                "title": "Before Your AI Agent Touches Production: MCP, Handoff and Retry Lessons From Real Systems",
                "description": "Connecting an agent to your tools with MCP or function calling takes an afternoon. The hard part comes after: what it is allowed to read, what it is allowed to change, what happens when the same webhook arrives twice, and who is in charge when a person replies while the model is still generating.\n\nThis talk covers that layer using three systems I've worked on, each deployed and in use:\n\n- Read: a read-only MCP path into an internal operations platform I built at Achour Holding. Its credentials can't act as a logged-in user, its tools are bounded reads over a read model with no write statements, access scope is resolved before any query runs, and ambiguous identifiers are refused instead of guessed.\n- Act: Hader, a multi-tenant WhatsApp and voice AI platform with paying clients, where conversations create orders, bookings and payment links. Durable webhooks, tenant attribution, idempotent call and order operations, and deterministic validators around every action the model proposes.\n- Stop: human handoff as a state machine. A forward-only handset-reply timestamp, generation tokens and a final supersession check make sure a stale AI draft is never sent after a person has answered.\n- Stay truthful: in Alinia, a multilingual property search, the model proposes candidates and approved listing records decide what the user actually sees.\n\nIt ends with a short checklist to run before your own agent goes live. No client data or proprietary code: the talk is about the patterns, the race conditions and the tradeoffs.",
                "format": "Talk (40 minutes)",
                "level": "Intermediate Level",
                "room": "B1008",
                "time": "10:35 AM - 11:15 AM",
                "tags": [],
                "isCommon": false,
                "targetAudience": "Developers building with LLMs, agents, MCP or function calling; backend engineers connecting AI to messaging, voice, databases or CRMs; and students who want to see production AI engineering beyond tutorials. Assumes you have called an LLM API; no distributed-systems background required.",
                "speakerId": "d507dbd3-75aa-4447-9c15-17df889cc1a7",
                "speakers": [
                        {
                                "id": "d507dbd3-75aa-4447-9c15-17df889cc1a7",
                                "name": "Layth Ayache"
                        }
                ]
        },
        {
                "id": "1353182",
                "title": "When the target is an AI: breaking and defending LLM systems",
                "description": "AI introduces a new attack surface, and the model itself can become the target. Through a practical prompt injection demonstration, this talk explores how attackers manipulate LLM-powered applications, where malicious instructions can enter, and how guardrails and secure system design can help contain the damage.",
                "format": "Talk (40 minutes)",
                "level": "Beginner",
                "room": "Main Auditorium",
                "time": "11:20 AM - 11:55 AM",
                "tags": [],
                "isCommon": false,
                "targetAudience": "Univerity students and Tech employees",
                "speakerId": "7c7eef87-6e10-4fe7-80f0-d162fb4f01c9",
                "speakers": [
                        {
                                "id": "7c7eef87-6e10-4fe7-80f0-d162fb4f01c9",
                                "name": "Hadi Zeinaldeen"
                        }
                ]
        },
        {
                "id": "1348386",
                "title": "Steady in the Storm: Team Management for Uncertain Times.",
                "description": "This session explores how tech leads, managers, and developers can build teams that adapt quickly without burning out. Drawing on organizational development practice, it covers how to keep teams focused and connected when plans change, how to build psychological safety so people speak up early about risks, and how to turn setbacks into learning rather than blame. Attendees will leave with practical tools to strengthen team resilience, communicate clearly under pressure, and lead with steadiness when everything else is moving.",
                "format": "Talk (40 minutes)",
                "level": "Intermediate Level",
                "room": "B1008",
                "time": "11:20 AM - 11:55 AM",
                "tags": [],
                "isCommon": false,
                "targetAudience": "tech leads, engineering managers, and team leads who guide developers through change, as well as senior and mid-level developers stepping into leadership roles.",
                "speakerId": "b84432ec-f9df-4313-96ab-dbb6e0a97b37",
                "speakers": [
                        {
                                "id": "b84432ec-f9df-4313-96ab-dbb6e0a97b37",
                                "name": "Dr. Mariam El Saleh"
                        }
                ]
        },
        {
                "id": "1351098",
                "title": "Designing APIs and Docs for Agents, Not Humans",
                "description": "More and more API calls now come from AI agents, not developers. An agent reads your docs on every call, takes every word literally, and never asks on Slack. For an agent, your docs are the interface, and a vague sentence is a bug.\n\nWe follow one example: a support agent trying to refund an order. Step by step, with before and after examples, we fix the tool descriptions, names, errors and docs, see where MCP fits, and build an agent-safe refund with scoped tokens, idempotency keys and audit logs. You leave with a checklist and small changes you can make on Monday.",
                "format": "Talk (40 minutes)",
                "level": "Beginner",
                "room": "B1005",
                "time": "11:20 AM - 11:55 AM",
                "tags": [],
                "isCommon": false,
                "targetAudience": "Anyone",
                "speakerId": "4aa857c8-3ad6-46b5-a0a3-ef92db483a43",
                "speakers": [
                        {
                                "id": "4aa857c8-3ad6-46b5-a0a3-ef92db483a43",
                                "name": "Mhamad El Itawi"
                        }
                ]
        },
        {
                "id": "panel-1",
                "title": "Are Universities Still prepapring students for real jobs?",
                "description": "Details coming soon.",
                "format": "Panel",
                "level": "",
                "room": "Main Auditorium",
                "time": "12:05 PM - 12:40 PM",
                "tags": [
                        "Panel"
                ],
                "isCommon": false,
                "targetAudience": "All Attendees",
                "speakers": []
        },
        {
                "id": "1352144",
                "title": "Front End, Back End... What About the Business End?",
                "description": "KPIs? OKRs? Geeks, no more feeling like a stranger in the room. Let's talk the business side of tech.\n\nYou know the front end. You know the back end. But every app has a third side that nobody teaches developers: the business end.\n\nIt is the side where features get approved, delayed, or cut, and it speaks its own language: KPIs, OKRs, ROI, MVP, churn. In this session, we decode that language using real examples from apps you already know, with a few quick quiz moments to keep it fun.\n\nBy the end, you will understand what those terms mean, why they decide what happens to your code, and how to join the conversation with confidence.",
                "format": "Talk (40 minutes)",
                "level": "Beginner",
                "room": "B1008",
                "time": "12:05 PM - 12:40 PM",
                "tags": [],
                "isCommon": false,
                "targetAudience": "developers, students and startups owners",
                "speakerId": "d8b7c739-047a-463f-afa0-270fcdab38ce",
                "speakers": [
                        {
                                "id": "d8b7c739-047a-463f-afa0-270fcdab38ce",
                                "name": "Gardenia Homsi"
                        }
                ]
        },
        {
                "id": "1351755",
                "title": "AI can do it. But Should it?",
                "description": "AI Can Do It. But Should It? explores a question we often overlook in the AI era: just because AI can perform a task, does that mean we should use it? Through relatable real-world scenarios\u2014from writing, studying, and creating to coding and decision-making\u2014the talk invites the audience to think critically about when AI adds genuine value and when using it may be unnecessary, costly, or even counterproductive. The goal is not to be pro- or anti-AI, but to develop better AI judgment: knowing when to use AI, when to work with it, and when the smartest choice is simply to do it ourselves.",
                "format": "Talk (40 minutes)",
                "level": "Intermediate Level",
                "room": "B1005",
                "time": "12:05 PM - 12:40 PM",
                "tags": [],
                "isCommon": false,
                "targetAudience": "pre-graduate students as well as graduate students",
                "speakerId": "cb72b3d1-cfe4-49cc-b89f-85bbbd1fc364",
                "speakers": [
                        {
                                "id": "cb72b3d1-cfe4-49cc-b89f-85bbbd1fc364",
                                "name": "Amani Raad"
                        }
                ]
        },
        {
                "id": "1342660",
                "title": "How I Went From Earning $300 to $4,000+ as a Developer",
                "description": "I\u2019ll share the key decisions, skills, opportunities, and lessons that helped me grow my career and increase my value in the tech industry, from 300$ salary to 4000$ salary, including the mistakes I made along the way and what I would do differently today.",
                "format": "Talk (40 minutes)",
                "level": "Beginner",
                "room": "Main Auditorium",
                "time": "12:50 PM - 01:25 PM",
                "tags": [],
                "isCommon": false,
                "targetAudience": "Everybody interested in tech",
                "speakerId": "34d36b86-4ad7-4f07-9487-198ecc663198",
                "speakers": [
                        {
                                "id": "34d36b86-4ad7-4f07-9487-198ecc663198",
                                "name": "Sam Shouman"
                        }
                ]
        },
        {
                "id": "1352015",
                "title": "From Beginner to Cybersecurity Expert: A Practical Roadmap",
                "description": "This session provides a practical roadmap for anyone interested in starting a career in cybersecurity and progressing toward a high technical level. It covers the essential foundations to build, how to develop practical skills, and how to gradually progress toward advanced cybersecurity and offensive security.\n\nThe roadmap is based on practical experience in cybersecurity and penetration testing, combined with an academic background in cybersecurity from T\u00e9l\u00e9com Paris. It also draws on real-world security research, including vulnerability research recognized by Apple.",
                "format": "Talk (40 minutes)",
                "level": "Beginner",
                "room": "B1008",
                "time": "12:50 PM - 01:25 PM",
                "tags": [],
                "isCommon": false,
                "targetAudience": "Computer Science and IT students, recent graduates, cybersecurity students and professionals, as well as anyone interested in learning cybersecurity and developing practical skills in ethical hacking, penetration testing, and information security.",
                "speakerId": "c3346524-8c8b-45bb-9830-52f60228dfc3",
                "speakers": [
                        {
                                "id": "c3346524-8c8b-45bb-9830-52f60228dfc3",
                                "name": "Oussama Barbar"
                        }
                ]
        },
        {
                "id": "1360814",
                "title": "Operation Blackout: Observability Under Pressure with Grafana",
                "description": "This interactive workshop follows a simulated household through EDL cuts, generator rationing, and a switch to solar and batteries. Participants join from their phones, vote on decisions, and watch the results in Grafana.\nTogether, we\u2019ll build a dashboard panel and cost alert, investigate misleading sensor readings, and use metrics, logs, and traces to diagnose a real application failure. The focus is practical: detect problems, understand their causes, and verify recovery.",
                "format": "Workshop (60 to 90 minutes)",
                "level": "Intermediate Level",
                "room": "B1005",
                "time": "12:50 PM - 01:45 PM",
                "tags": [
                        "Workshop"
                ],
                "isCommon": false,
                "targetAudience": "Developers, DevOps engineers, and infrastructure engineers familiar with web applications. No prior Grafana experience required.",
                "speakerId": "d5c60999-eb9c-4245-9d0d-6409c5a27a0d",
                "speakers": [
                        {
                                "id": "d5c60999-eb9c-4245-9d0d-6409c5a27a0d",
                                "name": "Jaafar Nasrallah"
                        }
                ]
        },
        {
                "id": "1344241",
                "title": "From Chatbots to AI Agents: Making AI Take Action",
                "description": "We are moving from AI systems that simply generate answers to AI systems that can observe their environment, use tools, take actions, and verify the results.\n\nThis session introduces the practical difference between a traditional chatbot and an AI agent through a live, interactive demonstration. Instead of asking an AI, \u201cWhy is my network slow?\u201d and receiving a list of possible causes, we will give an AI agent a goal: \u201cThe network is slow. Find the problem and fix it.\u201d\n\nThe agent will observe a simulated network, inspect connected devices, identify an abnormal traffic source, use tools to investigate the problem, propose an action, request human approval, apply a corrective policy, and finally verify that the network has recovered.\n\nAlong the way, we will break down the architecture behind this behavior: the AI model as the reasoning engine, tools and APIs as the agent\u2019s capabilities, the environment in which it operates, the agent loop, and the guardrails needed when AI is allowed to take action.\n\nThe networking scenario is only the playground. The same principles can be applied to GitHub, databases, cloud infrastructure, IoT systems, DevOps pipelines, cybersecurity, and many other developer workflows.\n\nThe goal is to leave attendees with a practical mental model they can reuse when designing their own AI-powered applications: Goal \u2192 Observe \u2192 Reason \u2192 Use Tools \u2192 Act \u2192 Verify.",
                "format": "Talk (40 minutes)",
                "level": "Intermediate Level",
                "room": "B1008",
                "time": "01:30 PM - 02:05 PM",
                "tags": [],
                "isCommon": false,
                "targetAudience": "Developers, software engineers, AI/ML practitioners, DevOps and cloud engineers, IoT developers, computer science students, and technology professionals interested in practical applications of generative AI and AI agents. The session is designed for a mixed technical audience. No specialized knowledge of networking or machine learning is required; the network scenario is used to make the agent behavior concrete and easy to visualize.",
                "speakerId": "50839307-f276-4b21-bfba-f717d299047b",
                "speakers": [
                        {
                                "id": "50839307-f276-4b21-bfba-f717d299047b",
                                "name": "Rana Rahim"
                        }
                ]
        },
        {
                "id": "1361279",
                "title": "Leading Engineering Teams in the Age of AI Agents",
                "description": "Panel discussion on leading engineering teams, managing change, and adapting software workflows in the era of AI agents.",
                "format": "Panel",
                "level": "",
                "room": "Main Auditorium",
                "time": "01:35 PM - 02:10 PM",
                "tags": [
                        "Panel"
                ],
                "isCommon": false,
                "targetAudience": "Engineering leads, managers, developers, and tech enthusiasts.",
                "speakers": [
                        {
                                "id": "08589cfa-0867-493b-b32b-66882fb54314",
                                "name": "Elias Atik"
                        },
                        {
                                "id": "b72d1b60-bc88-4e2b-9988-c01bc7fab78e",
                                "name": "Abdullah Backhach"
                        },
                        {
                                "id": "0e86c17c-1e50-46bd-9d8f-0a232b2b0bbe",
                                "name": "Rayan Salhab"
                        },
                        {
                                "id": "16aaaca8-ac35-4cef-8503-bfdbe1d01945",
                                "name": "Mohamad Omar"
                        }
                ]
        },
        {
                "id": "workshop-gcloud-001",
                "title": "Ai agents on gcloud workshop",
                "description": "Hands-on workshop on building and deploying AI agents using Google Cloud.",
                "format": "Workshop (55 minutes)",
                "level": "Intermediate Level",
                "room": "B1005",
                "time": "02:00 PM - 02:55 PM",
                "tags": [
                        "Workshop",
                        "Google Cloud",
                        "AI"
                ],
                "isCommon": false,
                "targetAudience": "Developers and Cloud Practitioners",
                "speakers": []
        },
        {
                "id": "1345323",
                "title": "The Tree Shaped Software Engineer: T Shaped Is Not Enough, Grow Roots",
                "description": "The \"T shaped engineer\" is the standard career advice, but it skips the part that decides who survives the next tool cycle: what sits underneath. This talk introduces the Tree Shaped Engineer. The roots are the fundamentals (networking, data, how a request actually travels, what happens when things fail). They are invisible but they carry everything. The trunk is deep ownership of one real production system in one language. The branches are the frameworks, cloud services, and AI tools you grow on top, and they die and get replaced constantly. The tree survives because the trunk holds. We will look at what a thin-trunk, many-branch engineer looks like, how roots and trunk grow together rather than in phases, and how to tell where you are in your own growth.",
                "format": "Talk (40 minutes)",
                "level": "Beginner",
                "room": "Main Auditorium",
                "time": "02:10 PM - 02:45 PM",
                "tags": [],
                "isCommon": false,
                "targetAudience": "Junior developers, students, and career shifters who feel busy learning tools but stuck in growth. Working engineers who want a clearer path from framework user to engineer others trust with production. Hiring managers and team leads who want a better way to judge depth in candidates. No prerequisites beyond having built at least one small project.",
                "speakerId": "43c5a63b-7c5d-4ef8-ae57-b844e96c7142",
                "speakers": [
                        {
                                "id": "43c5a63b-7c5d-4ef8-ae57-b844e96c7142",
                                "name": "Sami Shames El Deen"
                        }
                ]
        },
        {
                "id": "1357242",
                "title": "\u201cFrom ERP to AI: How Technology Is Redefining the Modern Business\u201d",
                "description": "The presentation will focus on how technology is changing the way businesses operate, using Odoo ERP as a practical example to explain the connection between ERP, automation, data analytics, and Artificial Intelligence.",
                "format": "Talk (40 minutes)",
                "level": "Intermediate Level",
                "room": "B1008",
                "time": "02:10 PM - 02:45 PM",
                "tags": [],
                "isCommon": false,
                "targetAudience": "University students, academic professionals, business owners, managers, and representatives from different industries.",
                "speakerId": "ca0cf8af-8107-4c15-b138-b3f75e08fd08",
                "speakers": [
                        {
                                "id": "ca0cf8af-8107-4c15-b138-b3f75e08fd08",
                                "name": "Redwan Hasbini"
                        }
                ]
        },
        {
                "id": "1345310",
                "title": "Zero Hype: The Pragmatic Playbook for Early Career Engineers in the Age of AI",
                "description": "The tech landscape has fundamentally changed, and succeeding in the industry today requires much more than traditional milestones or a degree. Join this session to explore how to navigate your tech career in the post-AI era. We will break down what it means to deliver real value, build a personal brand and portfolio that stand out as an early career engineer, and leverage AI tools without sacrificing core technical depth. Walk away with actionable strategies to gain a competitive edge and build a resilient career path.",
                "format": "Talk (40 minutes)",
                "level": "Beginner",
                "room": "Main Auditorium",
                "time": "02:50 PM - 03:25 PM",
                "tags": [],
                "isCommon": false,
                "targetAudience": "\u200bStudents and recent graduates preparing to enter the tech job market. \u200bEarly-career engineers looking to navigate industry shifts, stand out to employers, and strategically grow their careers.",
                "speakerId": "0c3b5dee-1204-4660-88fd-38d29255378c",
                "speakers": [
                        {
                                "id": "0c3b5dee-1204-4660-88fd-38d29255378c",
                                "name": "Nour Shamaa"
                        }
                ]
        },
        {
                "id": "1353755",
                "title": "From Specs to Systems: Engineering the Agentic Enterprise",
                "description": "AI is changing software engineering faster than most engineering practices are adapting.\n\nThe current conversation is heavily focused on how AI can generate code, create applications faster, or power autonomous agents. But in real-world engineering environments, code is rarely the hardest problem. The harder problem is translating business intent into systems that are correct, governed, observable, secure, and able to evolve without losing their original meaning.\n\nAs implementation becomes increasingly assisted by AI, the engineering bottleneck moves upstream.\n\nThe critical questions become:\n\nWhat exactly are we asking the system to do?\n\nWhich decisions should be deterministic, and which genuinely require AI reasoning?\n\nWhat context and data should an agent be allowed to access?\n\nWhat actions should it be authorized to perform?\n\nHow do we verify its decisions?\n\nHow do we preserve state, traceability, governance, and accountability?\n\nAnd how do we prevent ambiguous requirements from becoming autonomous mistakes at machine speed?\n\nThis talk explores a shift from code-first engineering toward specification-driven, agentic system engineering.\n\nInstead of treating specifications as static documents that eventually become obsolete, the session explores how specifications can become the structured contract between human intent and machine execution: defining processes, decisions, constraints, policies, permissions, data requirements, expected outcomes, and verification rules.\n\nFrom there, the talk expands into the architecture of modern agentic systems.\n\nWe will explore why enterprise AI requires far more than an LLM and a tool call. Reliable agents need grounding, operational state, memory, permissions, deterministic safeguards, observability, and clear boundaries between probabilistic reasoning and traditional software logic.\n\nThe session will also examine the role of modern data platforms such as MongoDB in supporting the evolving agentic data layer: operational state, contextual data, documents, vectors, events, interaction history, execution traces, and auditability.\n\nA major theme of the talk is that not every problem should become an AI problem.\n\nRules that are known should remain deterministic. Structured decisions may belong in decision models. Repetitive activities may belong in automation. AI becomes most valuable where ambiguity, interpretation, contextual reasoning, or complex orchestration genuinely exist.\n\nThe talk also connects agentic architecture with business process engineering. Rather than inserting AI as another mandatory step inside an existing workflow, we will examine how processes themselves can be redesigned when agents can gather context, make bounded decisions, coordinate systems, and escalate only genuine exceptions to humans.\n\nUltimately, this session is about the changing role of the engineer.\n\nAs machines become increasingly capable of generating implementation, engineers will spend less time translating specifications manually into code and more time engineering the intent, constraints, architecture, data, policies, autonomy boundaries, and verification mechanisms that govern intelligent systems.\n\nThis is not a live-coding session and not another \"build an AI agent in 30 minutes\" presentation.\n\nIt is a systems-level discussion about what software engineering becomes when software can increasingly participate in building, operating, and evolving itself.",
                "format": "Talk (40 minutes)",
                "level": "Intermediate Level",
                "room": "B1008",
                "time": "02:50 PM - 03:25 PM",
                "tags": [],
                "isCommon": false,
                "targetAudience": "Engineers, Developers, Data Analysts, BAs, Cloud Engineers, Team Leaders",
                "speakerId": "d8008556-939e-4ba8-87b1-9cf2b76ac5c0",
                "speakers": [
                        {
                                "id": "d8008556-939e-4ba8-87b1-9cf2b76ac5c0",
                                "name": "Elie Hannouch"
                        }
                ]
        },
        {
                "id": "lunch-001",
                "title": "Lunch & Closing",
                "description": "End your day with a delicious lunch, closing remarks, and a chance to network with other attendees.",
                "format": "Networking",
                "level": "",
                "room": "Main Auditorium",
                "time": "03:25 PM - 04:00 PM",
                "tags": [],
                "isCommon": true,
                "targetAudience": ""
        }
],
    speakers: [
        {
                "id": "01e521c1-35e6-45f6-a54b-43a0a65483ba",
                "firstName": "Krystel",
                "lastName": "Mahfoud",
                "fullName": "Krystel Mahfoud",
                "tagLine": "AI Strategist | Media Host",
                "company": "",
                "bio": "Krystel Mahfoud is a globally minded entrepreneur, AI strategist, media executive, and professional moderator and MC with over 15 years of international experience across AI, digital transformation, innovation, and business strategy. As Founder & CEO of 961MANAGEMENT and FILS Tech, she leads strategic platforms connecting governments, corporations, investors, startups, and technology innovators across the MENA region and beyond. Krystel is the creator, host, and executive producer of Arabia AI, a pan-Arab television program dedicated to Artificial Intelligence, and a media host for technology and innovation talks. She regularly moderates and MCs high-level corporate conferences, summits, and executive forums... Fluent in Arabic, English, and French.",
                "profilePicture": "https://cdn.sessionize.com/image/6820-400o400o1-VWXiEjE4m66LrYE5SuyTgP.png",
                "socials": {}
        },
        {
                "id": "e1a21679-8ca7-4a65-88b0-8747f3bf796c",
                "firstName": "Abdul Samih",
                "lastName": "El-Charif",
                "fullName": "Abdul Samih El-Charif",
                "tagLine": "Treasurer; Founder, Managing Partner, & CEO",
                "company": "EDM Group (Engineering, Design, & Manufacturing S.A.L.)",
                "bio": "",
                "profilePicture": "https://cdn.sessionize.com/image/4563-400o400o1-9GWDV5gKUmpqwHDYg9QhWw.jpg",
                "socials": {}
        },
        {
                "id": "bdc9dc4a-f2d4-42c9-b217-654418df2542",
                "firstName": "Rami",
                "lastName": "Assoum",
                "fullName": "Rami Assoum",
                "tagLine": "Director at a Mobile Operator, Economic Advisor",
                "company": "",
                "bio": "",
                "profilePicture": "https://cdn.sessionize.com/image/8746-400o400o1-ntpQBAaTUrDApubkL3tXCR.jpg",
                "socials": {}
        },
        {
                "id": "e98908ce-d5f6-4db7-873b-ebd3886e0f00",
                "firstName": "Jonah",
                "lastName": "Tabaa",
                "fullName": "Jonah Tabaa",
                "tagLine": "",
                "company": "",
                "bio": "",
                "profilePicture": "https://cdn.sessionize.com/image/e042-400o400o1-fursfmPVVsnn4GDDHLTtZh.jpg",
                "socials": {}
        },
        {
                "id": "d507dbd3-75aa-4447-9c15-17df889cc1a7",
                "firstName": "Layth",
                "lastName": "Ayache",
                "fullName": "Layth Ayache",
                "tagLine": "Senior AI Systems & Web Engineer | Technical Lead at Achour Holding",
                "company": "Achour Holding",
                "bio": "Layth Ayache is a Senior AI Systems & Web Engineer and Technical Lead at Achour Holding in Beirut, where he builds and runs internal operations systems and a fleet of hotel and business websites. Before that, at Aligned Tech, he joined as an AI Systems Engineer and was promoted to Technical Lead, working on Hader, a multi-tenant WhatsApp and voice AI platform, and Alinia, a multilingual property-search product.\n\nHis work sits between models and operations: webhooks and integrations, retrieval checked against authoritative records, deployment and handover. He is the AI & ML lead of OmniSign, a Lebanese Sign Language recognition project that won First Prize in the Public Choice category at Lebanon's National FYP Demo Day 2025, and the author of PrivacyGuard, an open-source local video-masking pipeline. He holds a BE in Computer and Communications Engineering from Rafik Hariri University.",
                "profilePicture": "https://cdn.sessionize.com/image/5ce4-400o400o1-LQ5bnUXgaYvfjKfPEsozdz.jpg",
                "socials": {
                        "linkedin": "https://www.linkedin.com/in/laythayache",
                        "website": "https://www.achourholding.com/",
                        "blog": "https://laythayache.com"
                }
        },
        {
                "id": "7c7eef87-6e10-4fe7-80f0-d162fb4f01c9",
                "firstName": "Hadi",
                "lastName": "Zeinaldeen",
                "fullName": "Hadi Zeinaldeen",
                "tagLine": "Pentester & Researcher @ Semicolon Security",
                "company": "Semicolon Security",
                "bio": "\u25cf Pentester & Researcher @ Semicolon\n\u25cf Team lead @ Ethrocore.ai",
                "profilePicture": "https://cdn.sessionize.com/image/0a3a-400o400o1-BZdT6BGdQWGQEanGjvxT72.png",
                "socials": {
                        "linkedin": "https://www.linkedin.com/in/hdzd/",
                        "website": "https://semsec.org"
                }
        },
        {
                "id": "b84432ec-f9df-4313-96ab-dbb6e0a97b37",
                "firstName": "Dr. Mariam",
                "lastName": "El Saleh",
                "fullName": "Dr. Mariam El Saleh",
                "tagLine": "Lecturer | Management and HR Consultant",
                "company": "",
                "bio": "Dr. Mariam El Saleh is an HR and Organizational Development expert, consultant, trainer and university lecturer with more than 15 years of experience in Management and HR.\n\nShe holds a Doctorate in Business Administration (DBA), from (Magellan, IAE Lyon, University Jean Moulin Lyon 3). Her doctoral research examined how human resources strategies shape the quality of administrative services in higher education institutions.\n\nAs founder of Mariam El Saleh Consultancy, based in Tripoli, Lebanon, she advises organizations across diverse sectors, including education, higher and vocational education, healthcare, architecture, and security services. Her work bridges research and practice, turning evidence-based HR strategy into practical organizational change.",
                "profilePicture": "https://cdn.sessionize.com/image/f1a3-400o400o1-MkPLUraRAHxsCKAHKdmyiy.jpg",
                "socials": {
                        "linkedin": "https://www.linkedin.com/in/mariam-el-saleh",
                        "website": "-",
                        "instagram": "https://www.instagram.com/mariam.el.saleh?stkn=emUwNTIzZnZrZHU2&utm_source=qr",
                        "facebook": "https://www.facebook.com/share/1dXBRctxdY/?mibextid=wwXIfr"
                }
        },
        {
                "id": "4aa857c8-3ad6-46b5-a0a3-ef92db483a43",
                "firstName": "Mhamad",
                "lastName": "El Itawi",
                "fullName": "Mhamad El Itawi",
                "tagLine": "Tech lead and Senior Software Engineer",
                "company": "Lyxa",
                "bio": "Hi, I\u2019m Mhamad El-Itawi , a Tech Lead and Senior Software Engineer with over 8 years of experience building scalable systems, leading engineering teams, and driving digital transformation.\n\nI specialize in backend architecture, cloud infrastructure, Ai systems, DevOps practices, and legacy system modernization. Over the years, I\u2019ve led major cloud migrations, optimized backend systems for performance and cost-efficiency, and delivered impactful solutions across Europe and the Middle East. I\u2019m certified in Kubernetes and AWS, and hold an MBA in International Business  which helps me bridge the gap between technology and business strategy.\n\nAs a speaker, I focus on real-world lessons from the field, including:\n\n- Designing scalable, cloud-native architectures\n- Leading technical teams through change\n- Applying AI to create smarter systems\n- Transforming legacy codebases\n- Building efficient DevOps pipelines\n\nI\u2019m passionate about sharing knowledge, building communities, and helping teams deliver software that truly makes a difference. If you're organizing an event or panel around engineering, cloud, or leadership in tech I\u2019d love to connect.",
                "profilePicture": "https://cdn.sessionize.com/image/65f8-400o400o1-RdmRPqXwd4eSYev2puQGd1.jpg",
                "socials": {
                        "linkedin": "https://www.linkedin.com/in/mhamadelitawi/",
                        "website": "https://lyxa.ai",
                        "twitter": "https://x.com/mhamadelitawi",
                        "instagram": "https://www.instagram.com/shard.by.shard",
                        "blog": "https://mhamadelitawi.com/"
                }
        },
        {
                "id": "d8b7c739-047a-463f-afa0-270fcdab38ce",
                "firstName": "Gardenia",
                "lastName": "Homsi",
                "fullName": "Gardenia Homsi",
                "tagLine": "Tech Product Manager at Wakilni",
                "company": "Wakilni",
                "bio": "Gardenia Al Homsi is a Technical Product Manager at Wakilni, bringing over six years of experience across software development and product management. With a background in computer engineering and PMI-certified expertise in Agile methodologies, she specializes in digital transformation, cross-functional team leadership, and delivering scalable, business-driven technology solutions. Gardenia has worked with companies both locally and internationally on building in-house and SaaS products. She is known for her ability to create products that customers love while aligning with strategic business objectives.",
                "profilePicture": "https://cdn.sessionize.com/image/2de6-400o400o1-VHS7HAoRuxwbjTbo6oeEGh.jpg",
                "socials": {
                        "linkedin": "https://www.linkedin.com/in/gardenia-homsi",
                        "website": "https://wakilni.com/"
                }
        },
        {
                "id": "cb72b3d1-cfe4-49cc-b89f-85bbbd1fc364",
                "firstName": "Amani",
                "lastName": "Raad",
                "fullName": "Amani Raad",
                "tagLine": "Associate professor at the Lebanese University engineering faculty branch I",
                "company": "Lebanese University Engineering Faculty",
                "bio": "Amani RAAD obtained her PhD in Information Technology and Systems from the University of Technology of Compiegne in France. After graduation, she was a Research and teaching Assistant in the Heudyasic Laboratory in France. She has been a part-time Assistant Professor in the Electrical and Electronics Engineering Department, Lebanese University, engineering faculty. Since July 2014, she has been a full-time assistant professor at the same department. Her research interests include mainly Digital Signal Processing and Artificial Intelligence for several applications and mainly for predictive maintenance. She received the award of the distinguished professor from the Lebanese University in 2019.",
                "profilePicture": "https://cdn.sessionize.com/image/5db9-400o400o1-LDkgwk1duoPJdbHt8SXuCZ.jpg",
                "socials": {
                        "linkedin": "https://www.linkedin.com/in/amani-raad-60738384?utm_source=share_via&utm_content=profile&utm_medium=member_android",
                        "website": "http://www.ulfg.ul.edu.lb/"
                }
        },
        {
                "id": "34d36b86-4ad7-4f07-9487-198ecc663198",
                "firstName": "Sam",
                "lastName": "Shouman",
                "fullName": "Sam Shouman",
                "tagLine": "Senior Android Developer at FOO - Content Creator - Co-founder",
                "company": "Samdroid.mobi",
                "bio": "Senior Android Developer and content creator known as samDroid. Co-founder of Develeb, the tech community of Lebanon.",
                "profilePicture": "https://cdn.sessionize.com/image/3c75-400o400o1-Q1z8QAymNE1Fg8BjNWSyJ2.png",
                "socials": {
                        "linkedin": "https://www.linkedin.com/in/samshouman/",
                        "website": "https://Samdroid.mobi",
                        "instagram": "https://www.instagram.com/samdroid.mobi?igsh=MWZocXMwc2M1b2wwNQ==",
                        "facebook": "https://www.facebook.com/profile.php?id=61578403592243",
                        "blog": "https://Https://www.samdroid.mobi"
                }
        },
        {
                "id": "c3346524-8c8b-45bb-9830-52f60228dfc3",
                "firstName": "Oussama",
                "lastName": "Barbar",
                "fullName": "Oussama Barbar",
                "tagLine": "Foxvoid Academy",
                "company": "Foxvoid Academy",
                "bio": "Oussama Barbar is a Cybersecurity Engineer and graduate of T\u00e9l\u00e9com Paris, France, with a strong focus on offensive security, penetration testing, and bug bounty. He has been practicing bug bounty since 2023 and has discovered and responsibly reported security vulnerabilities to major companies, including Apple, where his work was officially recognized.\n\nHe is also the founder of FoxVoid Academy, a cybersecurity education platform focused on providing high-quality, practical cybersecurity education inspired by French academic and professional standards. Through his experience in both academia and the industry, Oussama aims to help the next generation of cybersecurity professionals develop the technical skills, mindset, and ethical approach needed to succeed.",
                "profilePicture": "https://cdn.sessionize.com/image/e567-400o400o1-N1p9da4gTFJJ4teVhGxa3w.jpg",
                "socials": {
                        "linkedin": "https://www.linkedin.com/in/oussama-barbar",
                        "website": "https://foxvoidacademy.com/"
                }
        },
        {
                "id": "d5c60999-eb9c-4245-9d0d-6409c5a27a0d",
                "firstName": "Jaafar",
                "lastName": "Nasrallah",
                "fullName": "Jaafar Nasrallah",
                "tagLine": "Senior DevOps Engineer",
                "company": "Clubspeed",
                "bio": "I\u2019m a Google-certified DevOps engineer with over 10 years of experience across systems administration, cloud infrastructure, CI/CD, and backend development. I\u2019m passionate about breaking down complex DevOps concepts into clear, hands-on learning experiences that empower others to build, automate, and deploy with confidence",
                "profilePicture": "https://cdn.sessionize.com/image/be2d-400o400o1-U6MN4u9SbdoadfDUA67hqt.jpg",
                "socials": {
                        "linkedin": "https://www.linkedin.com/in/jaafarnasrallah/",
                        "website": "https://clubspeed.com",
                        "instagram": "https://www.instagram.com/jaafar_nasrallah"
                },
                "email": "jaafar.nasrallah@hotmail.com"
        },
        {
                "id": "50839307-f276-4b21-bfba-f717d299047b",
                "firstName": "Rana",
                "lastName": "Rahim",
                "fullName": "Rana Rahim",
                "tagLine": "Professor of Computer Science & Networks at Lebanese University | AI, Networks & Emerging Technologies",
                "company": "Lebanese University",
                "bio": "Rana Rahim is a Full Professor of Computer Science and Networks at Lebanese University. Her academic and research work spans computer networks, distributed and multi-agent systems, AI, IoT, SDN, cloud networking, and 5G/6G technologies.\n\nShe has been teaching and conducting research in computer science and networking since 2009, with experience across Licence, Master, and doctoral education. She has supervised and co-supervised research projects and theses and has published extensively in the fields of intelligent networked systems and emerging networking technologies.\n\nHer current interests include AI-driven systems, multi-agent intelligence, network automation, and intelligent resource management. She is particularly interested in bridging research and practical technology education and in making emerging technologies understandable and useful to students, developers, and technology professionals.",
                "profilePicture": "https://cdn.sessionize.com/image/9058-400o400o1-fCuQ2PZmv5VHdCgZundc2H.jpg",
                "socials": {
                        "linkedin": "https://www.linkedin.com/in/rana-rahim-316297130/",
                        "website": "https://www.ul.edu.lb/"
                }
        },
        {
                "id": "08589cfa-0867-493b-b32b-66882fb54314",
                "firstName": "Elias",
                "lastName": "Atik",
                "fullName": "Elias Atik",
                "tagLine": "Co-founder and CEO of Webspot",
                "company": "Webspot",
                "bio": "Co-founder and CEO of Webspot, Lebanon\u2019s leading Generative AI solutions firm, Elias has spent more than a decade building and deploying end-to-end AI systems. A passionate instructor and speaker, he delivers practical AI education to both non-specialists and technical teams across sectors. He is driven by a mission to make AI accessible to every company, organization, and individual.",
                "profilePicture": "https://cdn.sessionize.com/image/b67f-400o400o1-XyMgi6y8LbUbBw5Mw5v32z.png",
                "socials": {
                        "linkedin": "https://linkedin.com/in/eliasatik",
                        "website": "https://webspot.me",
                        "instagram": "https://Instagram.com/elias.atik"
                },
                "email": "elieatik@gmail.com"
        },
        {
                "id": "b72d1b60-bc88-4e2b-9988-c01bc7fab78e",
                "firstName": "Abdullah",
                "lastName": "Backhach",
                "fullName": "Abdullah Backhach",
                "tagLine": "CTO & Co-Founder",
                "company": "Rovera",
                "bio": "",
                "profilePicture": "https://cdn.sessionize.com/image/5c5b-400o400o1-JsnRmi8AqRSswTZinjJ3gf.png",
                "socials": {
                        "linkedin": "https://www.linkedin.com/in/abdullahbakhach/"
                }
        },
        {
                "id": "0e86c17c-1e50-46bd-9d8f-0a232b2b0bbe",
                "firstName": "Rayan",
                "lastName": "Salhab",
                "fullName": "Rayan Salhab",
                "tagLine": "CTO",
                "company": "AIY Expert Solution",
                "bio": "I build businesses, systems, and teams around technology.\n\nWhat started as a passion for software development grew into a much broader journey of building products, leading execution, solving complex problems, and creating opportunities through technology. Over time, I moved naturally into roles that required not just technical depth, but vision, decision making, and the ability to turn moving parts into something coherent and scalable.\n\nToday, I work at the intersection of technology, AI, operations, and business growth. I am driven by the challenge of taking ambitious ideas and turning them into real outcomes through strong systems, sharp execution, and long term thinking.\n\nI have always been drawn to building. Building products, building structures, building teams, and building momentum. I enjoy seeing how ideas connect, where leverage exists, and how technology can be used not only to solve problems, but to open entirely new doors.\n\nMy approach is bold but grounded. I think big, move fast, stay hands on, and care deeply about quality, ownership, and impact. I believe the strongest ventures are built by people who can combine curiosity with discipline, vision with execution, and innovation with real world usefulness.\n\nI am always interested in meaningful conversations, ambitious ideas, and opportunities that sit at the edge of technology, business, and innovation.",
                "profilePicture": "https://cdn.sessionize.com/image/d060-400o400o1-Pzwjft4axGb8sqwa3bu4KP.png",
                "socials": {
                        "linkedin": "https://www.linkedin.com/in/rayan-salhab/"
                }
        },
        {
                "id": "16aaaca8-ac35-4cef-8503-bfdbe1d01945",
                "firstName": "Mohamad",
                "lastName": "Omar",
                "fullName": "Mohamad Omar",
                "tagLine": "AI & Technology Executive | GDG Organizer",
                "company": "Darb by Terra",
                "bio": "As Chief Technology Officer at Drive Terra, I lead technology and AI strategy across the group, building the intelligent platform behind the Middle East's battery-swapping infrastructure for electric delivery fleets. I'm focused on moving the platform from automated to agentic, designing AI systems that don't just predict but decide and act: autonomously balancing battery allocation across stations, optimizing routing and energy use in real time, and orchestrating fleet operations with minimal human intervention.\n \nI own the full technology stack, IoT swapping stations, battery management systems, the rider app, and a cloud platform increasingly driven by AI agents for forecasting, predictive maintenance, and energy optimization. My focus is turning operational data into autonomous, self-improving systems that scale sustainable mobility across the region. I work closely with leadership, partners, and investors to align this vision with the company's growth \u2014 and I'm driven by building both the agentic systems and the teams that make them real.",
                "profilePicture": "https://cdn.sessionize.com/image/c638-400o400o1-Yn9NWCxiFzPCboMTTw5KrY.png",
                "socials": {
                        "linkedin": "https://www.linkedin.com/in/mohammad0omar/"
                },
                "email": "mohamadomar30@gmail.com"
        },
        {
                "id": "43c5a63b-7c5d-4ef8-ae57-b844e96c7142",
                "firstName": "Sami",
                "lastName": "Shames El Deen",
                "fullName": "Sami Shames El Deen",
                "tagLine": "Founder & CEO of SE\u00b2, a software engineering accelerator with ~200 students. Teaches fundamentals first and creates Arabic developer content for 59K+ followers.",
                "company": "SE\u00b2 (Software Engineering Excellence S.A.R.L.)",
                "bio": "Sami is the Founder and CEO of SE\u00b2 (Software Engineering Excellence), a software engineering accelerator built around supervised, fundamentals-first training. As lead instructor, he mentors around 200 active students, from career shifters to working engineers, through 250 hours of hands-on training, code review, and real projects. He also creates Arabic-language software engineering content at @samish.dev for a MENA developer audience of 59K+ followers. He has spoken at AWS Community Day, and his talks focus on why lasting careers are built on fundamentals rather than tool-chasing.",
                "profilePicture": "https://cdn.sessionize.com/image/e013-400o400o1-nwCrMukznoW6TMdVtiKz8o.png",
                "socials": {
                        "linkedin": "https://www.linkedin.com/in/samish-dev/",
                        "website": "https://se2.dev",
                        "instagram": "https://www.instagram.com/samish.dev/"
                }
        },
        {
                "id": "ca0cf8af-8107-4c15-b138-b3f75e08fd08",
                "firstName": "Redwan",
                "lastName": "Hasbini",
                "fullName": "Redwan Hasbini",
                "tagLine": "EDM Senior Pre-Sales Consultant",
                "company": "EDM",
                "bio": "I hold a Bachelor\u2019s degree in Industrial Engineering and a Master\u2019s degree in Project Management from Beirut Arab University (BAU). My academic background, combined with my professional experience, has shaped my approach to understanding business operations, analyzing challenges, and identifying opportunities for improvement.\n\nI began my professional career as an HR Manager in 2021, a role I held until 2022, before transitioning into the ERP and software industry. I started as a Functional Consultant and have since progressed to my current role as a Senior Presales Consultant.\n\nThroughout my career, I have had the opportunity to work with companies across different industries, learning how each business operates, identifying its challenges, and understanding the processes that drive its success. These experiences have strengthened my ability to analyze business needs, challenge traditional ways of working, and develop innovative ideas that help organizations optimize their operations.\n\nI believe that effective digital transformation goes beyond implementing software. It requires a deep understanding of how a business operates, a clear vision of how its processes can be improved, and the ability to translate that vision into practical and sustainable solutions. My goal is to bridge the gap between business and technology, helping organizations rethink their operations, improve efficiency, and build better ways of working.",
                "profilePicture": "https://cdn.sessionize.com/image/63fc-400o400o1-hBRiwTzeqbrcdzdzovuwzi.jpg",
                "socials": {
                        "linkedin": "https://Redwan Hasbini",
                        "website": "https://edm-tech.com"
                }
        },
        {
                "id": "0c3b5dee-1204-4660-88fd-38d29255378c",
                "firstName": "Nour",
                "lastName": "Shamaa",
                "fullName": "Nour Shamaa",
                "tagLine": "Staff/Lead DevOps Engineer",
                "company": "Jumpcloud",
                "bio": "Nour AlShamaa is a Staff/Lead DevOps Engineer at JumpCloud with a rich background in building scalable platform infrastructure, driving automation, and modernizing cloud ecosystems. Throughout his career, Nour has spearheaded large-scale Kubernetes migrations, engineered Infrastructure-as-Code (IaC) solutions across AWS, Azure, and GCP, and delivered digital transformation initiatives for major enterprise environments.  \n\u200bHe holds the distinction of being the first Kubeastronaut in Lebanon, backed by top-tier industry credentials including Certified Kubernetes Security Specialist (CKS), Administrator (CKA), Application Developer (CKAD), AWS Certified Solutions Architect Associate, and Terraform Associate.  \n\u200bBeyond technical architecture, Nour focuses heavily on Developer Experience (DevEx), toil reduction, and engineering growth. He actively mentors engineers at all stages of their career, helping them bridge skill gaps, master modern DevOps practices, and build sustainable tech careers in the AI era.",
                "profilePicture": "https://cdn.sessionize.com/image/1cd9-400o400o1-JhimBuXDaiZHFdygomR3Du.jpg",
                "socials": {
                        "linkedin": "https://linkedin.com/in/nourshamaa",
                        "website": "https://Jumpcloud.com"
                }
        },
        {
                "id": "d8008556-939e-4ba8-87b1-9cf2b76ac5c0",
                "firstName": "Elie",
                "lastName": "Hannouch",
                "fullName": "Elie Hannouch",
                "tagLine": "Engineering Manager , Netways",
                "company": "Netways",
                "bio": "I work on the part of digital transformation that quietly decides whether a program succeeds or fails: the space between \ud835\uddee\ud835\uddfa\ud835\uddef\ud835\uddf6\ud835\uddf4\ud835\ude02\ud835\uddfc\ud835\ude02\ud835\ude00 \ud835\uddff\ud835\uddf2\ud835\uddfe\ud835\ude02\ud835\uddf6\ud835\uddff\ud835\uddf2\ud835\uddfa\ud835\uddf2\ud835\uddfb\ud835\ude01\ud835\ude00 \ud835\uddee\ud835\uddfb\ud835\uddf1 \ud835\ude00\ud835\uddf5\ud835\uddf6\ud835\uddfd\ud835\uddfd\ud835\uddf2\ud835\uddf1 \ud835\ude00\ud835\uddfc\ud835\uddf3\ud835\ude01\ud835\ude04\ud835\uddee\ud835\uddff\ud835\uddf2.\n \nMost government and enterprise programs don't fall apart in the build. They fall apart months earlier in messy requirements, lost context, and rework loops between consultants and clients. My work sits in that gap, across \ud835\uddfd\ud835\uddff\ud835\uddfc\ud835\uddf1\ud835\ude02\ud835\uddf0\ud835\ude01, \ud835\uddee\ud835\uddff\ud835\uddf0\ud835\uddf5\ud835\uddf6\ud835\ude01\ud835\uddf2\ud835\uddf0\ud835\ude01\ud835\ude02\ud835\uddff\ud835\uddf2, \ud835\uddee\ud835\uddfb\ud835\uddf1 \ud835\uddf2\ud835\uddfb\ud835\uddf4\ud835\uddf6\ud835\uddfb\ud835\uddf2\ud835\uddf2\ud835\uddff\ud835\uddf6\ud835\uddfb\ud835\uddf4 \ud835\uddf9\ud835\uddf2\ud835\uddee\ud835\uddf1\ud835\uddf2\ud835\uddff\ud835\ude00\ud835\uddf5\ud835\uddf6\ud835\uddfd.\n \nWhat I do, day to day:\n \n\u2192 Lead \ud835\uddfd\ud835\uddff\ud835\uddfc\ud835\uddf1\ud835\ude02\ud835\uddf0\ud835\ude01 \ud835\ude00\ud835\ude01\ud835\uddff\ud835\uddee\ud835\ude01\ud835\uddf2\ud835\uddf4\ud835\ude06 turning vague mandates into roadmaps teams can actually execute against. \n\n\u2192 Architect \ud835\uddfa\ud835\uddfc\ud835\uddf1\ud835\ude02\ud835\uddf9\ud835\uddee\ud835\uddff \ud835\uddfd\ud835\uddf9\ud835\uddee\ud835\ude01\ud835\uddf3\ud835\uddfc\ud835\uddff\ud835\uddfa\ud835\ude00 for highly regulated environments where the wrong design decision costs years. \n\n\u2192 Run \ud835\uddf2\ud835\uddfb\ud835\uddf4\ud835\uddf6\ud835\uddfb\ud835\uddf2\ud835\uddf2\ud835\uddff\ud835\uddf6\ud835\uddfb\ud835\uddf4 \ud835\ude01\ud835\uddf2\ud835\uddee\ud835\uddfa\ud835\ude00 that ship with an eye on technical debt, code quality, and the things that decide whether a system survives its second year.\n\n\u2192 Hold the line on \ud835\uddf1\ud835\uddf2\ud835\ude00\ud835\uddf6\ud835\uddf4\ud835\uddfb \ud835\uddfe\ud835\ude02\ud835\uddee\ud835\uddf9\ud835\uddf6\ud835\ude01\ud835\ude06. Brand systems, iconography, and UI polish are part of how I ship, not an afterthought.\n \nBeyond the work itself, I spend real time on \ud835\uddfd\ud835\uddf2\ud835\uddfc\ud835\uddfd\ud835\uddf9\ud835\uddf2 \ud835\uddee\ud835\uddfb\ud835\uddf1 \ud835\uddf0\ud835\uddfc\ud835\uddfa\ud835\uddfa\ud835\ude02\ud835\uddfb\ud835\uddf6\ud835\ude01\ud835\ude06 mentoring engineers and consultants moving into senior roles, building communities around the tools I believe in (MongoDB Champion, among others), running workshops, and writing for a craft I care about deeply.\n \nI care about how software \ud835\uddf9\ud835\uddfc\ud835\uddfc\ud835\uddf8\ud835\ude00, \ud835\ude00\ud835\uddf5\ud835\uddf6\ud835\uddfd\ud835\ude00, \ud835\uddee\ud835\uddfb\ud835\uddf1 \ud835\uddee\ud835\uddf4\ud835\uddf2\ud835\ude00. A system that's architecturally sound but visually careless is half a system. A product that ships fast but ages badly is worse than one that took longer. That's the standard I try to bring to every project.",
                "profilePicture": "https://cdn.sessionize.com/image/3fce-400o400o1-fpfNBVJTfeDqnjKWxDYqcL.jpg",
                "socials": {
                        "linkedin": "https://www.linkedin.com/in/elie-hannouch/",
                        "website": "https://netways.com/"
                }
        }
],
    schedule: {
        "timeSlots": [
                "08:30 AM - 09:30 AM",
                "10:00 AM - 10:30 AM",
                "10:35 AM - 11:15 AM",
                "11:20 AM - 11:55 AM",
                "12:05 PM - 12:40 PM",
                "12:50 PM - 01:25 PM",
                "12:50 PM - 01:45 PM",
                "01:30 PM - 02:05 PM",
                "01:35 PM - 02:10 PM",
                "02:00 PM - 02:55 PM",
                "02:10 PM - 02:45 PM",
                "02:50 PM - 03:25 PM",
                "03:25 PM - 04:00 PM"
        ],
        "auditoriums": [
                "Main Auditorium",
                "B1008",
                "B1005"
        ]
},
    sponsors: [
        {
            name: "Semicolon Security",
            logo: "https://res.cloudinary.com/startup-grind/image/upload/c_fill,dpr_2,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/events/semsec-logo_Mkjxdc3.png",
            tier: "Gold",
            url: "https://semsec.org/home/",
            description: "A Lebanese cybersecurity company and training academy focused on ethical hacking, security workshops, penetration testing services and educational programs.",
            socials: {
                website: "https://semsec.org/home/"
            }
        },
        {
            name: "DAS360",
            logo: "https://res.cloudinary.com/startup-grind/image/upload/c_fill,dpr_2,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/events/DAS360_onDF0iW.png",
            tier: "Gold",
            url: "https://das-360.net/",
            description: "Delivering 360\u00B0\nDAS 360 is a driven and data-focused digital marketing firm that specializes in crafting comprehensive online solutions to enhance the visibility and success of companies in GCC.",
            socials: {
                website: "https://das-360.net/"
            }
        },
        {
            name: "AIY Experts Solutions",
            logo: "https://res.cloudinary.com/startup-grind/image/upload/c_fill,dpr_2,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/events/Photo%2520from%2520%2540bed%2520%25283%2529-Photoroom_59T0KnY.png",
            tier: "Silver",
            url: "https://www.aiyexpertsolutions.com/",
            description: "AIY Expert Solutions is a 40+ member company with a vision to continuously gather talent, knowledge, and expertise to build a leading enterprise in various markets.\nThis talent, combined with expert-level practices, helped us create a specialized software that dominates the billion-dollar reselling industry and is used by tens of thousands of clients.\nIt’s been featured on CNBC, Yahoo Finance, Vice, The Globe, Forbes, and The Mail.",
            socials: {
                website: "https://www.aiyexpertsolutions.com/"
            }
        },
        {
            name: "Khwarizme",
            logo: "https://res.cloudinary.com/startup-grind/image/upload/c_fill,dpr_2,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/events/Logo%2520-%2520Khwarizme%2520%25281%2529-Photoroom_PCz8iEh.png",
            tier: "Bronze",
            url: "https://www.khwarizme.com/",
            description: "At Khwarizme LB, we believe in the power of knowledge, innovation, and community.\n\nOur mission is to empower youth and entrepreneurs through education and hands-on experiences.\n\nFrom training programs and workshops to venture building and mentorship, we create real opportunities.\n\nWe connect students, startups, and professionals to resources that help them grow and thrive.\n\nRooted in Lebanon yet open to the world, we aim to build solutions with lasting impact.",
            socials: {
                website: "https://www.khwarizme.com/"
            }
        },
        {
            name: "NavyBits",
            logo: "https://res.cloudinary.com/startup-grind/image/upload/c_fill,dpr_2,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/events/navyBits_logo_final_2048_QPkBhgA.png",
            tier: "Bronze",
            url: "https://www.navybits.com/",
            description: "At NavyBits, our mission goes beyond delivering technology, we are here to empower businesses, strengthen communities, and bring happiness to families. We believe that innovation should be simple, effective, and accessible to everyone.\nBy providing tools that streamline operations and drive growth, we help our clients achieve success while creating a positive impact that extends far beyond their businesses. Together, we\u2019re building a future where technology is the foundation of stronger, happier",
            socials: {
                website: "https://www.navybits.com/"
            }
        },
        {
            name: "Career Lab (Aveo)",
            logo: "https://res.cloudinary.com/startup-grind/image/upload/c_fill,dpr_2,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/events/careerLAB_white-modified_60sZtTa.png",
            tier: "Bronze",
            url: "https://www.careerlab.space/",
            description: "Experiment. Learn. Evolve. Level Up Your Career with Career Lab\n\nWhether you're just starting out, growing your career, or running a business. Career Lab helps you master the software, skills, and strategies to stay ahead in today\u2019s fast-changing world",
            socials: {
                website: "https://www.careerlab.space/"
            }
        },
        {
            name: "Netwatch",
            logo: "https://res.cloudinary.com/startup-grind/image/upload/c_fill,dpr_2,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/events/Netwatch-Logo_I7QlxVv.png",
            tier: "Bronze",
            url: "https://www.linkedin.com/company/netwatch-lb/about/",
            description: "NETWATCH is an IT Company was founded in 2007 in Tripoli, Lebanon, with over ten years of cumulative experience from its founding partners. The company is known for providing high-quality technical support services to businesses, as well as selling computers, laptops, accessories, surveillance systems, server systems, and cloud computing services. NETWATCH Technology always strives to meet the needs of its customers and achieve their complete satisfaction.\n\nThe company operates in four main area",
            socials: {
                linkedin: "https://www.linkedin.com/company/netwatch-lb/about/"
            }
        },
        {
            name: "Space Technology",
            logo: "https://res.cloudinary.com/startup-grind/image/upload/c_fill,dpr_2,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/events/space%2520technology%2520logo%2520%25281%2529-Photoroom_fZQh7Go.png",
            tier: "Bronze",
            url: "https://www.facebook.com/p/Space-Technology-100063717213064/",
            description: "Sales and maintenance of all computers and laptops, based in Tripoli",
            socials: {
                website: "https://www.facebook.com/p/Space-Technology-100063717213064/"
            }
        },
        {
            name: "Energy Plus",
            logo: "https://res.cloudinary.com/startup-grind/image/upload/c_fill,dpr_2,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/events/Energy%2520Drink%2520Logo%2520%25282%2529_hyBfsvW.png",
            tier: "Bronze",
            url: "https://www.instagram.com/energypluslb/?hl=en",
            description: "Lebanese Energy drink, Naturally Powered by Guarana",
            socials: {
                website: "https://www.instagram.com/energypluslb/?hl=en"
            }
        },
        {
            name: "Qabassat Computers",
            logo: "https://res.cloudinary.com/startup-grind/image/upload/c_fill,dpr_2,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/events/QabassatComputers_LRRTlLU.png",
            tier: "Bronze",
            url: "https://qabassat.computer/",
            description: "Qabassat is an online shopping platform offering computers, electronics, gadgets, toys, home and stationary accessories.",
            socials: {
                website: "https://qabassat.computer/"
            }
        },
        {
            name: "NIC Group (Network and IT Consultancy)",
            logo: "https://res.cloudinary.com/startup-grind/image/upload/c_fill,dpr_2,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/events/NIC-Photoroom_H2Lku2o.png",
            tier: "Bronze",
            url: "https://nicgroup.co",
            description: "NIC Group (Network and IT Consultancy) \n\nNIC Group is a leading IT consultancy firm specializing in network and IT services, including cybersecurity, network management, and IT infrastructure. Our expert developer teams can create any app, website, or solution tailored to your needs. With a focus on keeping your business connected, secure, and efficient, we deliver reliable, scalable, and secure IT solutions to help you achieve your business goals.",
            socials: {
                website: "https://nicgroup.co"
            }
        },
        {
            name: "Beirut Arab University",
            logo: "https://alefliban.org/wp-content/uploads/2015/02/BAU.gif",
            tier: "Host",
            url: "https://www.bau.edu.lb/",
            description: "Beirut Arab University is a private Lebanese higher education institution...",
            socials: {
                linkedin: "#",
                website: "https://www.bau.edu.lb/"
            }
        },
        {
            name: "Google For Developers",
            logo: "https://devfest25.gdglebanon.com/img/sponsors/googlefordevelopers.png", // Placeholder
            tier: "Main Supporter",
            url: "#",
            description: "Google's official developer platform offering APIs, SDKs, tools, documentation, training, and support for software developers worldwide.",
            socials: {
                linkedin: "#",
                website: "https://developers.google.com"
            }
        }
    ]
};
