import profilePic from "../myphoto.jpeg";

const skills = [
  "Python and Python libraries",
  "SQL and MySQL",
  "Power BI and Excel",
  "MATLAB",
  "Data analytics",
  "Data science",
  "Data visualization",
  "Gen AI",
  "Docker"
];

const works = [
  {
    title: "Third Eye cap/eyeglass for visually impaired (Ongoing)",
    link: ""
  },
  {
    title: "Arduino project: ETCE print",
    link: "https://www.tinkercad.com/things/bzi45nwTiya-etce-print"
  },
  {
    title: "Arduino project: PIR motion detection",
    link: "https://www.tinkercad.com/things/8hZtHveRXc0-pir"
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
          <a className="brand" href="#home" aria-label="Ars home">Ars</a>
          <div className="nav-links">
            <a href="#about">About</a>
            <a href="#experience">Experience</a>
            <a href="#skills">Skills</a>
            <a href="#work">Work</a>
            <a href="#contact">Contact</a>
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
              <span className="title-line">Data Scientist / Gen AI Developer</span>
            </h1>
            <p>
              Based in Kolkata, India. I work on data analysis, machine learning,
              and practical product interfaces.
            </p>
            <p>Open to roles: Data Analyst, Data Scientist, and GenAI Developer.</p>
            <a className="primary-btn" href="#contact">
              Hire Me
            </a>
          </div>
        </div>
      </header>

      <main>
        <section className="section section-about" id="about">
          <h2>About</h2>
          <p>
            I am an ambitious graduate in Electronics and Telecommunication
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
              <span key={skill} className="chip">
                {skill}
              </span>
            ))}
          </div>
        </section>

        <section className="section section-work" id="work">
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

export default App;
