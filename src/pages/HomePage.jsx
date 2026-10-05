import { useState } from "react";
import profilePic from "../../myphoto.jpeg";
import CaseStudy from "../components/CaseStudy";
import vendorchatDashboard from "../assets/projects/vendorchat-dashboard.png";
import bangaloreHomePrice from "../assets/projects/bangalore-home-price-1.png";
import airlineDashboardOne from "../assets/projects/airline-dashboard-1.png";
import airlineDashboardTwo from "../assets/projects/airline-dashboard-2.png";
import airlineDataikuPipeline from "../assets/projects/airline-dataiku-pipeline.png";
import airlineRatingDist from "../assets/projects/airline-rating-dist.png";
import airlineRecoByAirline from "../assets/projects/airline-reco-by-airline.png";

const skillLogos = {
  python: "https://cdn.simpleicons.org/python",
  mysql: "https://cdn.simpleicons.org/mysql",
  excel: "https://cdn.jsdelivr.net/npm/simple-icons@5/icons/microsoftexcel.svg",
  scikitlearn: "https://cdn.simpleicons.org/scikitlearn",
  opencv: "https://cdn.simpleicons.org/opencv",
  huggingface: "https://cdn.simpleicons.org/huggingface",
  langchain: "https://cdn.simpleicons.org/langchain",
  docker: "https://cdn.simpleicons.org/docker"
};

const skills = [
  { name: "Python and Python libraries", icon: skillLogos.python },
  { name: "Machine Learning", icon: skillLogos.scikitlearn },
  { name: "Computer Vision", icon: skillLogos.opencv },
  { name: "Gen AI", icon: skillLogos.huggingface },
  { name: "LLMs & RAG", icon: skillLogos.langchain },
  { name: "SQL and MySQL", icon: skillLogos.mysql },
  { name: "Power BI and Excel", icon: skillLogos.excel },
  { name: "Data science" },
  { name: "Data analytics" },
  { name: "Data visualization" },
  { name: "Docker", icon: skillLogos.docker }
];

const airlineCaseStudy = {
  note:
    "Portfolio project built on public airline review data. It is not an internal Emirates system and does not represent or use any airline proprietary analysis.",
  overview: [
    "An end-to-end customer analytics solution built in Dataiku DSS that turns large-scale airline review data into actionable customer and business insight. It covers data cleaning and preparation, feature engineering, multilingual NLP sentiment analysis with BERT, binary classification through Dataiku AutoML, LightGBM model selection and evaluation, full-dataset scoring, and airline-level, cabin-level and sentiment KPI analytics surfaced on an interactive dashboard.",
    "The objective is to show how structured service ratings and unstructured written reviews can be turned into a practical customer-experience intelligence workflow that connects descriptive analytics, NLP and predictive modeling."
  ],
  facts: [
    { value: "129,455", label: "customer reviews" },
    { value: "117.5 MB", label: "raw source data" },
    { value: "40+", label: "engineered features" },
    { value: "20,088", label: "held-out test rows" },
    { value: "128,631", label: "scored records" },
    { value: "1,388", label: "airline-sentiment groups" }
  ],
  flowImage: {
    src: airlineDataikuPipeline,
    alt: "Dataiku pipeline flow for the airline customer intelligence project",
    caption: "Pipeline architecture - preparation, NLP, scoring, KPIs and dashboard kept as separate stages"
  },
  lineage: [
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
  lineageNote:
    "Preparation, machine learning, scoring and business analytics are kept as separate datasets rather than mixed into one transformation, so each stage stays testable and reusable.",
  featuresIntro:
    "Beyond the original 22 columns, the pipeline engineered customer-experience features that carry the analytical and modelling signal:",
  features: [
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
  ],
  nlp: {
    title: "NLP sentiment analysis - BERT Multilingual Uncased",
    body:
      "Unstructured review text was converted into structured sentiment using BERT Multilingual Uncased through the Dataiku LLM Mesh workflow. The NLP stage produced model-derived prediction and prediction_score fields, which were folded into the analytical and machine-learning datasets and mapped to a business-level Sentiment field of Positive, Neutral or Negative.",
    note:
      "Long reviews were truncated through a dedicated NLP input field so inference stayed inside model token limits and behaved consistently across the whole dataset."
  },
  mlIntro:
    "Dataiku AutoML was run as a binary classification task with 79,912 training records, 20,088 test records, 44 of 51 available features selected and class weighting enabled. The recommendation target RecommendedFlag was derived from the source field as yes = 1 and no = 0, giving 6,086 negatives (60.9%) and 3,914 positives (39.1%).",
  models: [
    { name: "Random Forest", roc: "0.994", accuracy: "0.964", precision: "0.960", recall: "0.953", f1: "0.956" },
    { name: "Logistic Regression", roc: "0.994", accuracy: "0.963", precision: "0.954", recall: "0.959", f1: "0.956" },
    { name: "LightGBM", roc: "0.994", accuracy: "0.964", precision: "0.958", recall: "0.957", f1: "0.957", selected: true }
  ],
  selectionNote:
    "LightGBM was selected for the highest F1 score while matching the best ROC AUC and accuracy. The three models are close together, so this is a marginal selection rather than a dramatic superiority.",
  finalModel: {
    name: "LightGBM",
    config:
      "Gradient-boosted decision trees with roughly 37 estimators, 37 leaves, a learning rate near 0.106 and GBDT boosting, selected from a hyperparameter search across 24 configurations.",
    metrics: [
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
  thresholdIntro:
    "The default threshold was evaluated against the F1-optimal threshold of approximately 0.550, which was retained because it gave the best F1 on the held-out test set:",
  matrix: {
    actual0: ["11,310", "351"],
    actual1: ["365", "8,062"]
  },
  importance: [
    "OverallScore",
    "AverageServiceRating",
    "ValueRating",
    "Sentiment",
    "RatingGap",
    "prediction"
  ],
  importanceNote:
    "Overall experience plus service and value ratings dominate, which reads as: recommendation behaviour is strongly associated with the broader experience reflected in ratings and sentiment-derived signals. Feature importance is model contribution, not causal impact.",
  scoring:
    "LightGBM was deployed as the saved Dataiku model Predict RecommendedFlag (binary). A dedicated scoring-input dataset was created to prevent target leakage by removing RecommendedFlag and Recommended while keeping every predictive feature, then the full dataset was scored to produce airline_reviews_scored - 128,631 records and 51 columns carrying proba_0, proba_1 and the model prediction. A KPI base dataset was built from that output, and three aggregation datasets feed the dashboard.",
  kpis: [
    {
      name: "kpi_airline_performance",
      groupBy: "AirlineName",
      metrics: "Average OverallScore, ValueRating, AverageServiceRating, BERT prediction_score, proba_1 and review count",
      purpose: "High-level airline comparison - which carriers show stronger overall experience and recommendation propensity."
    },
    {
      name: "kpi_airline_sentiment",
      groupBy: "AirlineName and Sentiment",
      metrics: "count - 1,388 records, summed rather than averaged for the stacked bar chart",
      purpose: "Composition of Positive, Neutral and Negative sentiment per airline."
    },
    {
      name: "kpi_airline_cabin_performance",
      groupBy: "CabinType and AirlineName",
      metrics: "Average OverallScore, ValueRating, AverageServiceRating and review count - 1,297 records",
      purpose: "Experience examined at the intersection of airline and cabin segment."
    }
  ],
  gallery: [
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
  ],
  dashboardVisuals: [
    { title: "Overall score by airline", purpose: "compare overall customer experience across carriers." },
    { title: "Recommendation probability by airline", purpose: "compare model-derived recommendation propensity across carriers." },
    { title: "Sentiment distribution by airline", purpose: "stacked Positive / Neutral / Negative counts per airline." },
    { title: "Overall score by airline and cabin type", purpose: "surface segment-specific differences hidden by airline-level averages." }
  ],
  interpretation: [
    {
      level: "Descriptive",
      question: "What happened?",
      body: "Overall, service and value ratings, review volumes and sentiment distributions across airlines and cabins."
    },
    {
      level: "Predictive",
      question: "What is likely to happen?",
      body: "The LightGBM model estimates recommendation propensity from structured customer-experience features plus NLP-derived sentiment signals."
    },
    {
      level: "Diagnostic",
      question: "Where are the differences?",
      body: "Cabin-level and sentiment-level KPIs let an analyst localise the gap to a carrier, a cabin segment or a sentiment category."
    }
  ],
  limitations: [
    "Observational data - the analysis finds associations, not causal relationships.",
    "Historical review data from a self-selected reviewer population, which skews polarised and may not reflect current behaviour.",
    "NLP limitations - BERT predictions are sensitive to very long reviews, context, sarcasm, mixed sentiment and domain-specific language.",
    "Very high test metrics should be validated on genuinely future or external data before any production use.",
    "The model predicts recommendation behaviour; it does not show that changing a feature will cause a recommendation."
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
    github: "https://github.com/Ars062/house-price-predication",
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
            <a className="primary-btn calendly-btn" href="https://calendly.com/arsiddique10762/30min" target="_blank" rel="noopener noreferrer">
              <ion-icon name="calendar-outline"></ion-icon> Book a Call
            </a>
          </div>
        </div>
      </header>

      <main>
        <section className="section section-about" id="about">
          <h2>About</h2>
          <p>
            AI Engineer with a strong foundation in Data Science and Computer Vision, specializing in Generative AI,
            and LLM-based systems. Hands-on experience building end-to-end
            multimodal pipelines involving ASR, RAG, and real-time video analytics.
          </p>
          <p>
            Proficient in Python and SQL, with experience in deploying GPU-accelerated AI
            solutions using Docker and cloud platforms. Graduate from Jadavpur University.
          </p>
        </section>

        <section className="section section-experience" id="experience">
          <h2>Experience</h2>
          <div className="exp-block">
            <div className="exp-company">
              <a href="https://yukin.ai/" target="_blank" rel="noreferrer" className="company-link">
                <ion-icon name="rocket-outline" class="company-icon"></ion-icon>
                Yukin AI
              </a>
            </div>
            <div className="exp-role">Data Scientist and AI Engineer</div>
            <div className="exp-location">Australia, Remote</div>
            <div className="exp-date">Nov&rsquo;2025 &mdash; Present</div>
          </div>
        </section>

        <section className="section section-skills" id="skills">
          <h2>Skills</h2>
          <div className="chip-grid">
            {skills.map((skill) => (
              <span key={skill.name} className="chip">
                {skill.icon && (
                  <img src={skill.icon} alt="" className="chip-icon" loading="lazy" />
                )}
                {skill.name}
              </span>
            ))}
          </div>
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
                  <a
                    className="project-link"
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <ion-icon name="logo-github"></ion-icon> View on GitHub
                  </a>
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
            (~6,500 labeled frames) covering umpire, batsman, and fielder — without spending weeks on manual annotation.
          </p>

          <h4>The Solution: Iterative Active Learning</h4>
          <p>Instead of labeling everything manually, we used an iterative loop:</p>
          <pre className="blog-code">
GroundingDINO (zero-shot) → Verify 300 → Train R1
    → Auto-label 700 more → Verify → Train R2 (1K)
    → Auto-label 1K more → Verify → Train R3 (2K)
    → ... repeat until R6 (6,500+)</pre>

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
            output nothing on empty frames — eliminating false positives and hallucination.
          </p>

          <h4>Key Takeaways</h4>
          <ol>
            <li>Start with 300 zero-shot labels and let the model help you label the rest.</li>
            <li>Better model → better auto-labels → faster verification → more data → better model.</li>
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
              <a className="primary-btn calendly-btn" href="https://calendly.com/arsiddique10762/30min" target="_blank" rel="noopener noreferrer">
                <ion-icon name="calendar-outline"></ion-icon> Book a Call
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
