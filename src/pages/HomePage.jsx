import { useState } from "react";
import profilePic from "../../myphoto.jpeg";
import CaseStudy from "../components/CaseStudy";
import SkillTopology from "../components/SkillTopology";
import { skillTopology } from "../data/skills";
import vendorchatDashboard from "../assets/projects/vendorchat-dashboard.png";
import bangaloreHomePrice from "../assets/projects/bangalore-home-price-1.png";
import airlineDashboardOne from "../assets/projects/airline-dashboard-1.png";
import airlineDashboardTwo from "../assets/projects/airline-dashboard-2.png";
import airlineDataikuPipeline from "../assets/projects/airline-dataiku-pipeline.png";
import airlineRatingDist from "../assets/projects/airline-rating-dist.png";
import airlineRecoByAirline from "../assets/projects/airline-reco-by-airline.png";
import aiTutorScreenshotOne from "../assets/projects/ai-tutor-session-1.png";
import aiTutorScreenshotTwo from "../assets/projects/ai-tutor-session-2.png";

const experience = [
  {
    company: "Yukin AI",
    url: "https://yukin.ai/",
    icon: "rocket-outline",
    role: "Data Scientist and AI Engineer",
    location: "Australia · Remote",
    date: "Nov 2025 — Present",
    summary:
      "Building and deploying production computer-vision, generative-AI and LLM systems on end-to-end multimodal pipelines.",
    projects: [
      {
        title: "Multimodal Multi-Sport Video Analytics Engine",
        description:
          "Architected a production-grade engine that turns full-length match footage into structured tactical insight end-to-end — detection, multi-object tracking, identity resolution, event detection and player statistics — supporting several sports through one extensible pipeline. Optimised for real-time GPU inference and delivered to a coaching dashboard through a service API.",
        tags: [
          "Python",
          "PyTorch",
          "Computer Vision",
          "Object Detection",
          "Multi-Object Tracking",
          "Segmentation",
          "OCR",
          "TensorRT",
          "CUDA",
          "Docker",
          "FastAPI",
          "PostgreSQL"
        ]
      },
      {
        title: "User Behaviour Analytics & Data Pipeline",
        description:
          "Built an analytics pipeline that unifies traffic and engagement signals, normalises and enriches them with session and geo context, and surfaces behavioural trends and anomalies through internal data services and dashboards.",
        tags: ["Python", "FastAPI", "MongoDB", "Data Analytics", "Anomaly Detection", "Data Visualisation"]
      }
    ]
  }
];

const airlineCaseStudy = {
  note:
    "Portfolio project built on public airline review data. It is not an internal Emirates system and does not represent or use any airline proprietary analysis.",
  overview: [
    "An end-to-end customer analytics solution built in Dataiku DSS that turns large-scale airline review data into actionable customer and business insight. It covers data cleaning and preparation, feature engineering, multilingual NLP sentiment analysis with BERT, binary classification through Dataiku AutoML, LightGBM model selection and evaluation, full-dataset scoring, and airline-level, cabin-level and sentiment KPI analytics surfaced on an interactive dashboard.",
    "The objective is to show how structured service ratings and unstructured written reviews can be turned into a practical customer-experience intelligence workflow that connects descriptive analytics, NLP and predictive modeling."
  ],
  factsTitle: "Dataset",
  facts: [
    { value: "129,455", label: "customer reviews" },
    { value: "117.5 MB", label: "raw source data" },
    { value: "40+", label: "engineered features" },
    { value: "20,088", label: "held-out test rows" },
    { value: "128,631", label: "scored records" },
    { value: "1,388", label: "airline-sentiment groups" }
  ],
  sections: [
    {
      title: "Dataiku Flow lineage",
      kind: "pipeline",
      image: {
        src: airlineDataikuPipeline,
        alt: "Dataiku pipeline flow for the airline customer intelligence project",
        caption: "Pipeline architecture - preparation, NLP, scoring, KPIs and dashboard kept as separate stages"
      },
      items: [
        "airline_reviews_raw",
        "airline_reviews_clean",
        "airline_reviews_features",
        "airline_reviews_nlp_input",
        "airline_reviews_nlp",
        "airline_reviews_sentiment",
        "airline_reviews_ml_ready",
        "airline_reviews_scoring_input",
        "airline_reviews_scored",
        "airline_reviews_kpi_base",
        "Business KPI datasets",
        "Dashboard"
      ],
      note:
        "Preparation, machine learning, scoring and business analytics are kept as separate datasets rather than mixed into one transformation, so each stage stays testable and reusable."
    },
    {
      title: "Feature engineering",
      kind: "definition",
      intro:
        "Beyond the original 22 columns, the pipeline engineered customer-experience features that carry the analytical and modelling signal:",
      items: [
        {
          name: "OverallScore",
          note: "the customer's overall rating and the single strongest predictor of recommendation behaviour."
        },
        {
          name: "AverageServiceRating",
          note: "aggregated service-rating measure covering seat, staff, food, ground service, entertainment and Wi-Fi."
        },
        {
          name: "ValueRating",
          note: "captures the customer's perception of value for money."
        },
        {
          name: "RatingGap",
          note: "relationship between overall and component-level ratings, exposing cases where detailed service scores disagree with the headline rating."
        },
        {
          name: "Review-derived features",
          note: "review length, word count, title availability, publication year and country availability indicators, all evaluated inside the ML workflow."
        }
      ]
    },
    {
      title: "NLP sentiment analysis - BERT Multilingual Uncased",
      kind: "prose",
      items: [
        "Unstructured review text was converted into structured sentiment using BERT Multilingual Uncased through the Dataiku LLM Mesh workflow. The NLP stage produced model-derived prediction and prediction_score fields, which were folded into the analytical and machine-learning datasets and mapped to a business-level Sentiment field of Positive, Neutral or Negative."
      ],
      note:
        "Long reviews were truncated through a dedicated NLP input field so inference stayed inside model token limits and behaved consistently across the whole dataset."
    },
    {
      title: "AutoML model comparison",
      kind: "table",
      intro:
        "Dataiku AutoML was run as a binary classification task with 79,912 training records, 20,088 test records, 44 of 51 available features selected and class weighting enabled. The recommendation target RecommendedFlag was derived from the source field as yes = 1 and no = 0, giving 6,086 negatives (60.9%) and 3,914 positives (39.1%).",
      columns: ["Model", "ROC AUC", "Accuracy", "Precision", "Recall", "F1"],
      rows: [
        ["Random Forest", "0.994", "0.964", "0.960", "0.953", "0.956"],
        ["Logistic Regression", "0.994", "0.963", "0.954", "0.959", "0.956"],
        ["LightGBM", "0.994", "0.964", "0.958", "0.957", "0.957"]
      ],
      highlight: 2,
      note:
        "LightGBM was selected for the highest F1 score while matching the best ROC AUC and accuracy. The three models are close together, so this is a marginal selection rather than a dramatic superiority."
    },
    {
      title: "Selected model - LightGBM",
      kind: "metrics",
      intro:
        "Gradient-boosted decision trees with roughly 37 estimators, 37 leaves, a learning rate near 0.106 and GBDT boosting, selected from a hyperparameter search across 24 configurations.",
      items: [
        { value: "0.994", label: "ROC AUC" },
        { value: "0.964", label: "Accuracy" },
        { value: "0.958", label: "Precision" },
        { value: "0.957", label: "Recall" },
        { value: "0.957", label: "F1 score" },
        { value: "0.992", label: "Average precision" }
      ],
      note:
        "ROC AUC of 0.994 measures ranking quality, not 99.4% accuracy. Accuracy measures classification correctness at a chosen threshold, which is why the threshold is reported separately."
    },
    {
      title: "Classification threshold",
      kind: "matrix",
      intro:
        "The default threshold was evaluated against the F1-optimal threshold of approximately 0.550, which was retained because it gave the best F1 on the held-out test set:",
      headers: ["Confusion matrix", "Predicted 0", "Predicted 1"],
      rows: [
        ["Actual 0", "11,310", "351"],
        ["Actual 1", "365", "8,062"]
      ],
      note: "Total test records: 20,088."
    },
    {
      title: "Feature importance",
      kind: "rank",
      items: [
        "OverallScore",
        "AverageServiceRating",
        "ValueRating",
        "Sentiment",
        "RatingGap",
        "prediction"
      ],
      note:
        "Overall experience plus service and value ratings dominate, which reads as: recommendation behaviour is strongly associated with the broader experience reflected in ratings and sentiment-derived signals. Feature importance is model contribution, not causal impact."
    },
    {
      title: "Full-dataset scoring",
      kind: "prose",
      items: [
        "LightGBM was deployed as the saved Dataiku model Predict RecommendedFlag (binary). A dedicated scoring-input dataset was created to prevent target leakage by removing RecommendedFlag and Recommended while keeping every predictive feature, then the full dataset was scored to produce airline_reviews_scored - 128,631 records and 51 columns carrying proba_0, proba_1 and the model prediction. A KPI base dataset was built from that output, and three aggregation datasets feed the dashboard."
      ]
    },
    {
      title: "KPI datasets",
      kind: "cards",
      items: [
        {
          name: "kpi_airline_performance",
          meta: "Grouped by AirlineName",
          note: "Average OverallScore, ValueRating, AverageServiceRating, BERT prediction_score, proba_1 and review count",
          body: "High-level airline comparison - which carriers show stronger overall experience and recommendation propensity."
        },
        {
          name: "kpi_airline_sentiment",
          meta: "Grouped by AirlineName and Sentiment",
          note: "count - 1,388 records, summed rather than averaged for the stacked bar chart",
          body: "Composition of Positive, Neutral and Negative sentiment per airline."
        },
        {
          name: "kpi_airline_cabin_performance",
          meta: "Grouped by CabinType and AirlineName",
          note: "Average OverallScore, ValueRating, AverageServiceRating and review count - 1,297 records",
          body: "Experience examined at the intersection of airline and cabin segment."
        }
      ]
    },
    {
      title: "Analysis outputs",
      kind: "images",
      items: [
        {
          src: airlineRatingDist,
          alt: "Distribution of overall airline review scores",
          caption: "Overall score distribution across the review population"
        },
        {
          src: airlineRecoByAirline,
          alt: "Recommendation rate by airline",
          caption: "Recommendation rate by airline"
        }
      ]
    },
    {
      title: "Dashboard visuals",
      kind: "definition",
      items: [
        { name: "Overall score by airline", note: "compare overall customer experience across carriers." },
        { name: "Recommendation probability by airline", note: "compare model-derived recommendation propensity across carriers." },
        { name: "Sentiment distribution by airline", note: "stacked Positive / Neutral / Negative counts per airline." },
        { name: "Overall score by airline and cabin type", note: "surface segment-specific differences hidden by airline-level averages." }
      ]
    },
    {
      title: "Business interpretation",
      kind: "cards",
      items: [
        {
          name: "Descriptive",
          meta: "What happened?",
          body: "Overall, service and value ratings, review volumes and sentiment distributions across airlines and cabins."
        },
        {
          name: "Predictive",
          meta: "What is likely to happen?",
          body: "The LightGBM model estimates recommendation propensity from structured customer-experience features plus NLP-derived sentiment signals."
        },
        {
          name: "Diagnostic",
          meta: "Where are the differences?",
          body: "Cabin-level and sentiment-level KPIs let an analyst localise the gap to a carrier, a cabin segment or a sentiment category."
        }
      ]
    },
    {
      title: "Limitations",
      kind: "list",
      items: [
        "Observational data - the analysis finds associations, not causal relationships.",
        "Historical review data from a self-selected reviewer population, which skews polarised and may not reflect current behaviour.",
        "NLP limitations - BERT predictions are sensitive to very long reviews, context, sarcasm, mixed sentiment and domain-specific language.",
        "Very high test metrics should be validated on genuinely future or external data before any production use.",
        "The model predicts recommendation behaviour; it does not show that changing a feature will cause a recommendation."
      ]
    }
  ]
};

const aiTutorCaseStudy = {
  note:
    "Entirely my own project - designed, built and operated by me. Scope: the AI_TUTOR repository, branch musetalk (voice + MuseTalk avatar), on top of the multimodal base branch.",
  demo: {
    title: "Demo",
    src: "https://drive.google.com/file/d/1AiXMoh9QQso1103kstF6THqbEEcF8G3V/preview",
    caption: "Walkthrough of a live voice session with the lip-synced tutor."
  },
  overview: [
    "\"Build an AI tutor you can talk to\" sounds like a weekend of API calls until you see what it actually requires. A single spoken question has to travel microphone, WebRTC, voice-activity detection, speech-to-text, a knowledge-grounded LLM, text-to-speech, a lip-synced face and back to the browser - all inside a few seconds, while a knowledge graph and a 528-document FAISS index keep the answer honest instead of letting the model improvise.",
    "The naive version is five independent services glued with HTTP, and it fails in five independent ways. I built one continuous frame pipeline with strict stage ownership instead: audio enters as raw PCM frames, every processor consumes, transforms or passes frames, and the avatar is the last processor before the transport rather than a separate rendering daemon. The second decision was that the text path and the voice path must share one brain - a tutor that answers differently when you type than when you speak is not a tutor, it is two demos."
  ],
  factsTitle: "Stack and measured numbers",
  facts: [
    { value: "528", label: "documents in the FAISS index" },
    { value: "48 kHz", label: "microphone input over WebRTC" },
    { value: "14.9 fps", label: "MuseTalk generation on RTX 4060" },
    { value: "25 fps", label: "paced avatar video output" },
    { value: "1024x768", label: "teacher stream resolution" },
    { value: "0 lost", label: "WebRTC packets in a verified session" }
  ],
  sections: [
    {
      title: "Architecture: how a question actually flows",
      kind: "pipeline",
      items: [
        "Browser mic -> WebRTC",
        "LiveKitInputTransport (48 kHz PCM)",
        "Silero VAD - confidence + volume gates",
        "faster-whisper STT - base, int8, CPU",
        "TutorProcessor - FAISS 528 docs + Neo4j KG",
        "Groq openai/gpt-oss-120b",
        "Piper TTS - en_US-lessac-medium, 22050 Hz",
        "MuseTalkEngine - CUDA fp16 lip-sync",
        "transport.output() -> browser video + audio"
      ],
      note:
        "One pipeline, two entry modes for the answer: TutorProcessor first calls the LLM in-process, and falls back to the backend /api/chat if that throws. The browser text chat hits the same ask_tutor(), so typing and speaking produce the same answer. The greeting fires one second after the first participant joins, and each new transcription cancels the previous in-flight answer task so the tutor never talks over itself."
    },
    {
      title: "Measured, not estimated",
      kind: "metrics",
      items: [
        { value: "528", label: "RAG documents" },
        { value: "14.9 fps", label: "MuseTalk generation" },
        { value: "178/178", label: "frames for a 7.14 s render" },
        { value: "0.70", label: "frame-motion index" },
        { value: "1.6 s", label: "Whisper cold load" },
        { value: "0 lost", label: "packets, jitter 0" }
      ],
      note:
        "Everything here was measured by running it: the offline MuseTalk harness, faulthandler logs, headless-Chrome screenshots and ffprobe on the actual recorded file. Claims read from the code rather than runtime are labelled as such."
    },
    {
      title: "Key design decisions",
      kind: "definition",
      intro:
        "These are the decisions that made the pipeline hold together:",
      items: [
        {
          name: "One frame pipeline",
          note: "audio enters as raw PCM and every processor consumes, transforms or passes frames; the avatar is the last processor before the transport, not a separate rendering daemon."
        },
        {
          name: "One brain for both paths",
          note: "the browser chat and the voice agent both call ask_tutor() - Neo4j knowledge-graph hops plus FAISS hybrid retrieval on Groq - so the answers cannot diverge."
        },
        {
          name: "Two engines, one contract",
          note: "MuseTalkEngine does GPU neural lip-sync; PuppetEngine is a CPU fallback, because a tutor that stops teaching when CUDA fails is worse than one that looks cheap."
        },
        {
          name: "Never cut the answer",
          note: "audio beyond the last video frame is flushed as one final frame, so a renderer shortfall cannot truncate a student mid-sentence."
        },
        {
          name: "Debuggability is a feature",
          note: "every stage prints a marker - [vad], [tts], [tutor] Q -> A, [avatar] emit engine=musetalk - so a dead session is a two-minute diagnosis from the log alone."
        }
      ]
    },
    {
      title: "The bugs that actually mattered",
      kind: "cards",
      intro: "This is where the engineering time went:",
      items: [
        {
          name: "Two-gate voice-activity bug",
          meta: "works in the test, dead for humans",
          body: "pipecat's stock min_volume of 0.6 is a near-shout threshold, so every human session was rejected while injected full-scale test audio sailed through. Lowered to min_volume=0.1 and added a throttled [vad] debug line so thresholds are observable instead of superstitious."
        },
        {
          name: "The bug that blacked out the teacher",
          meta: "419 one-frame micro-emissions",
          body: "STT's audio_passthrough=True default forwarded every 68 ms mic frame downstream, and the avatar treats any audio frame as a new utterance - cancelling its render each time. One keyword, audio_passthrough=False, disconnected the microphone from the video renderer."
        },
        {
          name: "free(): invalid pointer",
          meta: "glibc SIGABRT, no traceback",
          body: "faulthandler pointed at import triton inside a worker thread re-entering the dynamic loader, but only in the full agent context. Fix: import triton on line 1 of agent.py, before torch or transformers can touch it."
        },
        {
          name: "Two exactly-300-second deaths",
          meta: "same symptom, different causes",
          body: "PipelineTask idle_timeout_secs=300 killed a silent student at five minutes, and a wrong env var name (LIVEKIT_EMPTY_TIMEOUT vs LIVEKIT_ROOM_EMPTY_TIMEOUT) emptied LiveKit's room at exactly the same mark. The second was only visible in the server log."
        },
        {
          name: "Instrumentation became the outage",
          meta: "4,232 exceptions",
          body: "A debug line formatting a numpy volume as :.3f threw on every audio chunk, killed VAD and destabilised the video too. Debug output is now defensively coerced by default."
        },
        {
          name: "Stale readiness marker",
          meta: "model.bin complete, session still blind",
          body: "A zero-byte .incomplete debris file from an interrupted download passed the readiness check and put the agent in lecture mode. Readiness now verifies the artefact, not the process that fetched it."
        }
      ]
    },
    {
      title: "Verification, honestly stated",
      kind: "prose",
      items: [
        "Verified by running it end to end: VAD fires on real speech, Whisper transcribes, the tutor answers, Piper pushes audio, MuseTalk emits video_frames=92, and the browser received 5,961 inbound packets with 0 lost and jitter 0. The offline harness rendered 178/178 frames for 7.14 s of speech, and all seven weight files were verified against exact expected byte sizes.",
        "Read from the code rather than runtime-verified: frame-flow semantics, VAD gate logic, engine selection and fallback, pts pacing and the tail-audio flush.",
        "Known broken: recording video works (59 MB VP8 file that plays fine) but the mixed recording audio comes out silent - confirmed on the actual output file with ffprobe, and documented in the README rather than quietly claimed as working. There is no automated test suite; verification is log markers, offline harnesses and screenshots."
      ],
      note:
        "A write-up that pretends the known-broken parts work is worthless, so the honest status ships with the code."
    },
    {
      title: "Limitations and what I would fix next",
      kind: "list",
      items: [
        "Recording audio - the AudioContext mix of remote and local tracks needs per-source gain work or direct capture of the tab's audio stream.",
        "No tests, no CI - pts pacing, audio_chunks frame math, engine selection and the RAG contract are exactly where a small pytest suite belongs.",
        "Operations are hand-rolled - a shell keep-alive loop, a bracket-pkill rule and manual env prefixes rather than systemd or a compose file.",
        "STT/VAD tuning is global - one VADParams for every microphone, with no adaptive noise floor for quiet headsets.",
        "End-to-end latency is never logged as a clean question-to-first-audio percentile, even though stage-level facts are known.",
        "Subtitles for the teacher's answer are designed but not built, and the puppet fallback keeps the tutor teaching rather than looking like a person."
      ]
    }
  ]
};

const projects = [
  {
    title: "VendorChat",
    subtitle: "Vendor sales analytics with an AI SQL chatbot",
    description:
      "Ingested 15M+ vendor transactions into SQLite, built a Power BI dashboard for profit, ROI, margin and stock turnover, then wired a LangChain + Groq agent that answers plain-English questions using FAISS few-shot SQL retrieval.",
    tags: ["Python", "LangChain", "Groq LLM", "FAISS", "Streamlit", "SQLite", "Power BI"],
    github: "https://github.com/Ars062/VendorChat",
    images: [
      {
        src: vendorchatDashboard,
        alt: "Vendor sales performance dashboard",
        caption: "Vendor sales performance dashboard"
      }
    ]
  },
  {
    title: "Bangalore Home Price Predictor",
    subtitle: "Regression model with an investment risk engine",
    description:
      "Linear regression on 7,253 cleaned Bengaluru listings (CV R2 0.849) served through a Flask API and browser UI, with a rule-based risk engine that flags overpricing, location risk and ROI on a candidate property.",
    tags: ["Python", "scikit-learn", "Flask", "Pandas", "Regression", "Risk engine"],
    github: "https://github.com/Ars062/Real-Estate-Prediction-Investment-Risk-Analytics",
    demoLink: {
      href: "https://drive.google.com/file/d/12pGAufd9-9NH9LOzVIzQ3PdseM4OdhXK/view?usp=drive_link",
      label: "Watch demo"
    },
    images: [
      {
        src: bangaloreHomePrice,
        alt: "Bangalore home price predictor web application",
        caption: "Price estimate and risk report in the web app"
      }
    ]
  },
  {
    title: "Airline Customer Intelligence",
    subtitle: "End-to-end customer analytics, BERT sentiment and recommendation prediction",
    description:
      "End-to-end Dataiku DSS solution over 129K+ public airline reviews: multilingual BERT sentiment, AutoML with LightGBM recommendation prediction, full-dataset scoring and airline, cabin and sentiment KPI dashboards.",
    tags: ["Dataiku DSS", "BERT", "LightGBM", "Python", "SQL", "AutoML", "Dashboards"],
    github: "https://github.com/Ars062/Airline_Customer_Intelligence",
    images: [
      {
        src: airlineDashboardOne,
        alt: "Airline customer intelligence dashboard",
        caption: "Overall customer score by airline"
      },
      {
        src: airlineDashboardTwo,
        alt: "Sentiment distribution dashboard by airline",
        caption: "Sentiment distribution by airline"
      }
    ],
    caseStudy: airlineCaseStudy
  },
  {
    title: "AI Tutor",
    subtitle: "Real-time voice tutor with a neural lip-synced avatar",
    description:
      "Browser voice tutoring on a single Pipecat frame pipeline: LiveKit WebRTC, faster-whisper STT, Piper TTS and MuseTalk neural lip-sync on CUDA, with a Neo4j + FAISS RAG brain on Groq behind one ask_tutor() call for both typed and spoken questions.",
    tags: ["Pipecat", "LiveKit WebRTC", "MuseTalk", "faster-whisper", "Piper TTS", "Neo4j + FAISS", "Groq LLM", "FastAPI", "React"],
    github: "https://github.com/Ars062/AI_TUTOR",
    demoLink: {
      href: "https://drive.google.com/file/d/1AiXMoh9QQso1103kstF6THqbEEcF8G3V/view?usp=drive_link",
      label: "Watch demo"
    },
    images: [
      {
        src: aiTutorScreenshotOne,
        alt: "AI Tutor live voice session with the lip-synced teacher",
        caption: "Live voice session with the lip-synced teacher"
      },
      {
        src: aiTutorScreenshotTwo,
        alt: "AI Tutor browser session layout",
        caption: "Meet-style room, control bar and record pill"
      }
    ],
    caseStudy: aiTutorCaseStudy
  }
];

const events = [
  {
    title: "SIH 2024",
    link: "https://drive.google.com/file/d/1_qI_GKv-b6xBuGz59Sa3EbrJW9QWwHk_/view?usp=sharing"
  },
  {
    title: "ICDMAI Hackathon 2024",
    link: "https://drive.google.com/file/d/1iWVXtWh8f45Wsm7EjwuaXLDElIK1QUt-/view?usp=sharing"
  }
];

const certifications = [
  {
    title: "Certificate: Python",
    link: "https://drive.google.com/file/d/1iTnlHkLWSiPUrHIgXhwk04WJ03nsgtwH/view?usp=sharing"
  },
  {
    title: "Certificate: Frontend development",
    link: "https://drive.google.com/file/d/1SftL5x_mLwKzdGAHWcffBYdpuM3X2h4l/view"
  },
  {
    title: "Certificate: Data science",
    link: "https://drive.google.com/file/d/1QbyQFNMjKHK23JqGarF__jwVsuj5scWN/view"
  },
  {
    title: "Certificate: Applied data science with Python",
    link: "https://drive.google.com/file/d/1rQTeymEabYVGVP_8L3zSu6uy65l6chGG/view"
  }
];

function scrollTo(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

function HomePage() {
  const [openCase, setOpenCase] = useState(null);

  const toggleCase = (title) => {
    setOpenCase((current) => (current === title ? null : title));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const submitMessage = document.getElementById("submitMessage");

    try {
      const response = await fetch("https://formsubmit.co/ajax/arsiddique10762@gmail.com", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json"
        }
      });

      if (response.ok) {
        form.reset();
        submitMessage.textContent = "Thanks for reaching out. I will get back to you soon.";
        submitMessage.dataset.status = "success";
      } else {
        submitMessage.textContent = "Something went wrong while sending your message.";
        submitMessage.dataset.status = "error";
      }
    } catch (error) {
      submitMessage.textContent = "Network error. Please try again.";
      submitMessage.dataset.status = "error";
    }
  };

  const handleWhatsApp = () => {
    const name = document.getElementById("name")?.value.trim();
    const email = document.getElementById("email")?.value.trim();
    const phone = document.getElementById("phone")?.value.trim();
    const message = document.getElementById("message")?.value.trim();

    if (!name || !email || !phone || !message) {
      alert("Please fill all fields before sending a WhatsApp message.");
      return;
    }

    const whatsappNumber = "919883557734";
    const fullMessage = `Hi, I am ${name}. Email: ${email}. Phone: ${phone}. Message: ${message}`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(fullMessage)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="page">
      <header className="hero" id="home">
        <nav className="navbar">
          <a className="brand" href="#home" onClick={(e) => { e.preventDefault(); scrollTo("home"); }} aria-label="Ars home">Ars</a>
          <div className="nav-links">
            <a href="#about" onClick={(e) => { e.preventDefault(); scrollTo("about"); }}>About</a>
            <a href="#experience" onClick={(e) => { e.preventDefault(); scrollTo("experience"); }}>Experience</a>
            <a href="#skills" onClick={(e) => { e.preventDefault(); scrollTo("skills"); }}>Skills</a>
            <a href="#work" onClick={(e) => { e.preventDefault(); scrollTo("work"); }}>Work</a>
            <a href="#blog" onClick={(e) => { e.preventDefault(); scrollTo("blog"); }}>Blog</a>
            <a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo("contact"); }}>Contact</a>
          </div>
        </nav>

        <div className="hero-content">
          <div className="hero-left">
            <div className="hero-photo">
              <img src={profilePic} alt="Abdur Rahaman Siddique" />
            </div>
          </div>
          <div className="hero-right">
            <p className="eyebrow">Greetings and warm regards</p>
            <h1>
              I'm<br />
              <span className="full-name">ABDUR RAHAMAN SIDDIQUE</span><br />
              <span className="title-line">AI Engineer / Computer Vision Engineer / Data Scientist</span>
            </h1>
            <p>
              Based in Kolkata, India. I work on data analysis, machine learning,
              and practical product interfaces.
            </p>
            <p>Open to roles: AI Engineer, Computer Vision Engineer, Data Scientist, and Data Analyst.</p>
            <a className="primary-btn" href="#contact" onClick={(e) => { e.preventDefault(); scrollTo("contact"); }}>
              Hire Me
            </a>
            <a className="primary-btn calendly-btn" href="https://calendly.com/ars062/30min" target="_blank" rel="noopener noreferrer">
              <ion-icon name="calendar-outline"></ion-icon> Book a 1:1 Call
            </a>
          </div>
        </div>
      </header>

      <main>
        <section className="section section-about" id="about">
          <h2>Who am I?</h2>
          <p>
            AI Engineer with hands-on experience in Machine Learning, Generative AI, Computer Vision,
            Large Language Models (LLMs), and Data Analytics — with around a year of industry experience
            designing and developing end-to-end AI solutions, including multimodal pipelines,
            Retrieval-Augmented Generation (RAG) systems, AI agents, and real-time video analytics.
          </p>
          <p>
            Currently working remotely with an Australia-based AI company, contributing to the
            development of scalable, production-ready AI systems. My work spans the complete AI
            lifecycle — from data annotation and model training to GPU-accelerated inference, backend
            integration, cloud deployment, and performance optimization.
          </p>
          <p>
            I have built AI applications using Python, SQL, PyTorch, TensorFlow, LangChain, OpenCV,
            FastAPI, Docker, and RunPod, with experience in deploying intelligent systems powered by
            LLMs, Computer Vision, and modern AI frameworks. My projects include multimodal sports
            video analytics, LLM-to-SQL agents, RAG-based question-answering systems, AI tutoring
            platforms, user behavior analytics, and interactive data visualization dashboards.
          </p>
          <p>
            I enjoy solving complex real-world problems by combining AI, data, and software
            engineering to create practical, scalable solutions — and I&rsquo;m open to relocation
            for the right opportunity.
          </p>
        </section>

        <section className="section section-experience" id="experience">
          <h2>Experience</h2>
          {experience.map((job) => (
            <div className="exp-block" key={job.company}>
              <div className="exp-head">
                <div className="exp-company">
                  {job.url ? (
                    <a href={job.url} target="_blank" rel="noreferrer" className="company-link">
                      <ion-icon name={job.icon} class="company-icon"></ion-icon>
                      {job.company}
                    </a>
                  ) : (
                    <span className="company-link">
                      <ion-icon name={job.icon} class="company-icon"></ion-icon>
                      {job.company}
                    </span>
                  )}
                </div>
                <div className="exp-date">{job.date}</div>
              </div>
              <div className="exp-role">{job.role}</div>
              <div className="exp-location">{job.location}</div>
              <p className="exp-summary">{job.summary}</p>
              <div className="exp-projects">
                {job.projects.map((project) => (
                  <article className="exp-project" key={project.title}>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div className="project-tags">
                      {project.tags.map((tag) => (
                        <span className="tag-chip" key={tag}>{tag}</span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </section>

        <section className="section section-skills" id="skills">
          <h2>Skills</h2>
          <SkillTopology data={skillTopology} />
        </section>

        <section className="section section-work" id="work">
          <h2>My Work</h2>

          <div className="project-grid">
            {projects.map((project) => (
              <article className="project-card" key={project.title}>
                <div className="project-gallery">
                  {project.images.map((image) => (
                    <figure className="project-shot" key={image.src}>
                      <img src={image.src} alt={image.alt} loading="lazy" />
                      <figcaption>{image.caption}</figcaption>
                    </figure>
                  ))}
                </div>
                <div className="project-body">
                  <h3>{project.title}</h3>
                  <p className="project-subtitle">{project.subtitle}</p>
                  <p className="project-desc">{project.description}</p>
                  <div className="project-tags">
                    {project.tags.map((tag) => (
                      <span className="tag-chip" key={tag}>{tag}</span>
                    ))}
                  </div>
                  <div className="project-actions">
                    <a
                      className="project-link"
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <ion-icon name="logo-github"></ion-icon> View on GitHub
                    </a>
                    {project.demoLink && (
                      <a
                        className="project-link project-link-demo"
                        href={project.demoLink.href}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <ion-icon name="play-circle-outline"></ion-icon> {project.demoLink.label}
                      </a>
                    )}
                  </div>
                  {project.caseStudy && (
                    <button
                      type="button"
                      className="project-toggle"
                      onClick={() => toggleCase(project.title)}
                      aria-expanded={openCase === project.title}
                    >
                      <ion-icon name={openCase === project.title ? "chevron-up-outline" : "chevron-down-outline"}></ion-icon>
                      {openCase === project.title ? "Hide case study" : "Read case study"}
                    </button>
                  )}
                </div>
                {project.caseStudy && openCase === project.title && (
                  <CaseStudy study={project.caseStudy} />
                )}
              </article>
            ))}
          </div>

          <h3 className="work-subheading">Hackathons</h3>
          <ul className="work-list">
            {events.map((event) => (
              <li key={event.title}>
                <a href={event.link} target="_blank" rel="noreferrer">
                  {event.title}
                </a>
              </li>
            ))}
          </ul>

          <h3 className="work-subheading">Certifications</h3>
          <ul className="work-list">
            {certifications.map((certificate) => (
              <li key={certificate.title}>
                <a href={certificate.link} target="_blank" rel="noreferrer">
                  {certificate.title}
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section className="section section-blog" id="blog">
          <h2>Blog</h2>
          <h3>From 300 to 6,500 Labels: How We Built a Cricket Detection Dataset Without Labeling Everything by Hand</h3>

          <h4>The Problem</h4>
          <p>
            Labeling objects in cricket videos is painfully slow. We had a goal: build a high-quality cricket detection dataset
            (~6,500 labeled frames) covering umpire, batsman, and fielder â€” without spending weeks on manual annotation.
          </p>

          <h4>The Solution: Iterative Active Learning</h4>
          <p>Instead of labeling everything manually, we used an iterative loop:</p>
          <pre className="blog-code">
GroundingDINO (zero-shot) â†’ Verify 300 â†’ Train R1
    â†’ Auto-label 700 more â†’ Verify â†’ Train R2 (1K)
    â†’ Auto-label 1K more â†’ Verify â†’ Train R3 (2K)
    â†’ ... repeat until R6 (6,500+)</pre>

          <h4>Results</h4>
          <ul>
            <li><strong>mAP 50:95 = 0.826</strong></li>
            <li><strong>mAP 50 = 0.951</strong></li>
            <li><strong>F1 = 0.907</strong></li>
          </ul>

          <div className="blog-table-wrap">
            <table className="blog-table">
              <thead>
                <tr><th>Round</th><th>Labels</th><th>mAP</th></tr>
              </thead>
              <tbody>
                <tr><td>R1</td><td>300</td><td>~0.40</td></tr>
                <tr><td>R2</td><td>1,000</td><td>~0.65</td></tr>
                <tr><td>R3</td><td>2,000</td><td>~0.75</td></tr>
                <tr><td>R4</td><td>3,600</td><td><strong>0.828</strong></td></tr>
                <tr><td>R5</td><td>5,200</td><td><strong>0.821</strong> (+blank handling)</td></tr>
                <tr><td>R6</td><td>6,500</td><td><strong>0.826</strong></td></tr>
              </tbody>
            </table>
          </div>

          <p>
            Video demo of the annotation tool in action:
          </p>
          <div className="video-embed">
            <iframe
              src="https://drive.google.com/file/d/1KiHPDI2LvU3RDNgq1TAYkqdxnPwGyPrC/preview"
              width="100%"
              height="400"
              allow="autoplay"
              allowFullScreen
              title="Annotation tool demo"
            />
          </div>

          <h4>Handling Blank Frames</h4>
          <p>
            We added <strong>150 blank frames</strong> with <strong>empty label files</strong> so the model learns to
            output nothing on empty frames â€” eliminating false positives and hallucination.
          </p>

          <h4>Key Takeaways</h4>
          <ol>
            <li>Start with 300 zero-shot labels and let the model help you label the rest.</li>
            <li>Better model â†’ better auto-labels â†’ faster verification â†’ more data â†’ better model.</li>
            <li>300 carefully verified labels beat 3,000 noisy ones.</li>
            <li>Add blank frames with empty labels to kill false positives.</li>
          </ol>

          <p className="blog-footer">
            <em>Built with RF-DETR, GroundingDINO, PyQt6, and a lot of cricket footage.</em>
          </p>
        </section>

        <section className="section section-contact" id="contact">
          <h2>Contact</h2>
          <form className="contact-form" onSubmit={handleSubmit}>
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_template" value="box" />
            <input type="hidden" name="_subject" value="New Message from Portfolio" />

            <label htmlFor="name">Name</label>
            <input id="name" name="name" type="text" required />

            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" required />

            <label htmlFor="phone">Phone</label>
            <input id="phone" name="phone" type="tel" required />

            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows="5" required />

            <div className="button-row">
              <a className="primary-btn calendly-btn" href="https://calendly.com/ars062/30min" target="_blank" rel="noopener noreferrer">
                <ion-icon name="calendar-outline"></ion-icon> Book a 1:1 Call
              </a>
              <button type="button" onClick={handleWhatsApp}>
                <ion-icon name="logo-whatsapp"></ion-icon> WhatsApp
              </button>
              <button type="submit">
                <ion-icon name="mail-outline"></ion-icon> Email
              </button>
            </div>

            <p id="submitMessage" className="submit-message" />
          </form>

          <div className="social-row">
            <a href="https://www.linkedin.com/in/ars062/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <ion-icon name="logo-linkedin"></ion-icon>
            </a>
            <a href="https://github.com/Ars062" target="_blank" rel="noreferrer" aria-label="GitHub">
              <ion-icon name="logo-github"></ion-icon>
            </a>
            <a href="https://www.instagram.com/eccedentesiast_ars/" target="_blank" rel="noreferrer" aria-label="Instagram">
              <ion-icon name="logo-instagram"></ion-icon>
            </a>
            <a href="https://m.facebook.com/abdur.rahaman.siddique.2025/" target="_blank" rel="noreferrer" aria-label="Facebook">
              <ion-icon name="logo-facebook"></ion-icon>
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}

export default HomePage;
