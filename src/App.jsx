import logo from "../LOGOARS.png";

const skills = [
  "Python and Python libraries",
  "SQL and MySQL",
  "Power BI and Excel",
  "MATLAB",
  "Data analytics",
  "Data science",
  "Data visualization",
  "LLM and GenAI",
  "Frontend development"
];

const works = [
  {
    title: "Arduino project: ETCE print",
    link: "https://www.tinkercad.com/things/bzi45nwTiya-etce-print"
  },
  {
    title: "Arduino project: PIR motion detection",
    link: "https://www.tinkercad.com/things/8hZtHveRXc0-pir"
  },
  {
    title: "Ongoing project: Third Eye cap/eyeglass for visually impaired",
    link: ""
  },
  {
    title: "SIH 2024",
    link: "https://drive.google.com/file/d/1_qI_GKv-b6xBuGz59Sa3EbrJW9QWwHk_/view?usp=sharing"
  },
  {
    title: "ICDMAI Hackathon 2024",
    link: "https://drive.google.com/file/d/1iWVXtWh8f45Wsm7EjwuaXLDElIK1QUt-/view?usp=sharing"
  },
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

function App() {
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
          <a className="brand" href="#home" aria-label="Ars Siddique home">
            <img className="brand-logo" src={logo} alt="Ars Siddique logo" />
            <span>Ars Siddique</span>
          </a>
          <div className="nav-links">
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#work">Work</a>
            <a href="#contact">Contact</a>
          </div>
        </nav>

        <div className="hero-content">
          <p className="eyebrow">Greetings and warm regards</p>
          <h1>Data Scientist and Frontend Developer</h1>
          <p>
            I am Siddique, based in Kolkata, India. I work on data analysis, machine learning,
            and practical product interfaces.
          </p>
          <a className="primary-btn" href="#contact">
            Hire Me
          </a>
        </div>
      </header>

      <main>
        <section className="section" id="about">
          <h2>About</h2>
          <p>
            I am an ambitious final-year undergraduate in Electronics and Telecommunication
            Engineering at Jadavpur University. My foundation includes digital and analog
            electronics, signal processing, communication systems, microprocessors, and control
            engineering.
          </p>
          <p>
            I use Python, MATLAB, Excel, SQL, Power BI, HTML, and CSS to solve real problems. I
            am especially interested in IoT, Arduino, Raspberry Pi, and projects where data and
            user experience meet.
          </p>
        </section>

        <section className="section" id="skills">
          <h2>Skills</h2>
          <div className="chip-grid">
            {skills.map((skill) => (
              <span key={skill} className="chip">
                {skill}
              </span>
            ))}
          </div>
        </section>

        <section className="section" id="work">
          <h2>My Work</h2>
          <ul className="work-list">
            {works.map((work) => (
              <li key={work.title}>
                {work.link ? (
                  <a href={work.link} target="_blank" rel="noreferrer">
                    {work.title}
                  </a>
                ) : (
                  <span>{work.title}</span>
                )}
              </li>
            ))}
          </ul>
        </section>

        <section className="section" id="contact">
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
              <button type="button" onClick={handleWhatsApp}>
                Send via WhatsApp
              </button>
              <button type="submit">Send via Email</button>
            </div>

            <p id="submitMessage" className="submit-message" />
          </form>

          <div className="social-row">
            <a href="https://www.linkedin.com/in/ars062/" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a href="https://github.com/Ars062" target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a
              href="https://www.instagram.com/eccedentesiast_ars/"
              target="_blank"
              rel="noreferrer"
            >
              Instagram
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
