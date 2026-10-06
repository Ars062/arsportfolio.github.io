function SectionBlock({ section }) {
  const keyOf = (value) => (typeof value === "string" ? value : JSON.stringify(value));

  if (section.kind === "pipeline") {
    return (
      <div className="case-block">
        <h4>{section.title}</h4>
        {section.image && (
          <figure className="case-shot">
            <img src={section.image.src} alt={section.image.alt} loading="lazy" />
            <figcaption>{section.image.caption}</figcaption>
          </figure>
        )}
        <ol className="lineage">
          {section.items.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
        {section.note && <p>{section.note}</p>}
      </div>
    );
  }

  if (section.kind === "definition") {
    return (
      <div className="case-block">
        <h4>{section.title}</h4>
        {section.intro && <p>{section.intro}</p>}
        <ul className="feature-list">
          {section.items.map((item) => (
            <li key={item.name}>
              <strong>{item.name}</strong>
              <span>{item.note}</span>
            </li>
          ))}
        </ul>
        {section.note && <p className="case-note">{section.note}</p>}
      </div>
    );
  }

  if (section.kind === "cards") {
    return (
      <div className="case-block">
        <h4>{section.title}</h4>
        {section.intro && <p>{section.intro}</p>}
        <div className="kpi-grid">
          {section.items.map((item) => (
            <div className="kpi-card" key={item.name}>
              <span className="kpi-name">{item.name}</span>
              {item.meta && <span className="kpi-group">{item.meta}</span>}
              {item.note && <span className="kpi-metrics">{item.note}</span>}
              {item.body && <span className="kpi-purpose">{item.body}</span>}
            </div>
          ))}
        </div>
        {section.note && <p className="case-note">{section.note}</p>}
      </div>
    );
  }

  if (section.kind === "metrics") {
    return (
      <div className="case-block">
        <h4>{section.title}</h4>
        {section.intro && <p>{section.intro}</p>}
        <ul className="metric-grid">
          {section.items.map((item) => (
            <li className="metric" key={item.label}>
              <span className="metric-value">{item.value}</span>
              <span className="metric-label">{item.label}</span>
            </li>
          ))}
        </ul>
        {section.note && <p className="case-note">{section.note}</p>}
      </div>
    );
  }

  if (section.kind === "table") {
    return (
      <div className="case-block">
        <h4>{section.title}</h4>
        {section.intro && <p>{section.intro}</p>}
        <div className="case-table-wrap">
          <table className="case-table">
            <thead>
              <tr>
                {section.columns.map((column) => (
                  <th key={column}>{column}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.rows.map((row, index) => (
                <tr key={row[0]} className={index === section.highlight ? "is-selected" : undefined}>
                  {row.map((cell, cellIndex) => (
                    <td key={`${row[0]}-${cellIndex}`}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {section.note && <p className="case-note">{section.note}</p>}
      </div>
    );
  }

  if (section.kind === "matrix") {
    return (
      <div className="case-block">
        <h4>{section.title}</h4>
        <p>{section.intro}</p>
        <div className="case-table-wrap">
          <table className="case-table case-table-matrix">
            <thead>
              <tr>
                {section.headers.map((header) => (
                  <th key={header}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.rows.map((row) => (
                <tr key={row[0]}>
                  {row.map((cell, cellIndex) => (
                    <td key={`${row[0]}-${cellIndex}`}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {section.note && <p className="case-note">{section.note}</p>}
      </div>
    );
  }

  if (section.kind === "images") {
    return (
      <div className="case-block">
        <h4>{section.title}</h4>
        <div className="case-gallery">
          {section.items.map((image) => (
            <figure className="case-shot" key={image.src}>
              <img src={image.src} alt={image.alt} loading="lazy" />
              <figcaption>{image.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    );
  }

  if (section.kind === "list") {
    return (
      <div className="case-block">
        <h4>{section.title}</h4>
        {section.intro && <p>{section.intro}</p>}
        <ul className="case-list">
          {section.items.map((item) => (
            <li key={keyOf(item).slice(0, 32)}>{item}</li>
          ))}
        </ul>
        {section.note && <p className="case-note">{section.note}</p>}
      </div>
    );
  }

  if (section.kind === "rank") {
    return (
      <div className="case-block">
        <h4>{section.title}</h4>
        <ol className="feature-rank">
          {section.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
        {section.note && <p className="case-note">{section.note}</p>}
      </div>
    );
  }

  return (
    <div className="case-block">
      <h4>{section.title}</h4>
      {section.intro && <p>{section.intro}</p>}
      {section.items.map((item) => (
        <p key={keyOf(item).slice(0, 32)}>{item}</p>
      ))}
      {section.heading && <h5>{section.heading}</h5>}
      {section.closing && <p>{section.closing}</p>}
      {section.note && <p className="case-note">{section.note}</p>}
    </div>
  );
}

function CaseStudy({ study }) {
  return (
    <div className="case-study">
      {study.note && <p className="case-note">{study.note}</p>}

      {study.demo && (
        <div className="case-block">
          <h4>{study.demo.title}</h4>
          <div className="video-embed">
            <iframe
              src={study.demo.src}
              width="100%"
              height="420"
              allow="autoplay"
              allowFullScreen
              title={study.demo.title}
            />
          </div>
          <p>{study.demo.caption}</p>
        </div>
      )}

      {study.overview && (
        <div className="case-block">
          <h4>Overview</h4>
          {study.overview.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
        </div>
      )}

      {study.facts && (
        <div className="case-block">
          <h4>{study.factsTitle || "At a glance"}</h4>
          <ul className="fact-grid">
            {study.facts.map((fact) => (
              <li className="fact" key={fact.label}>
                <span className="fact-value">{fact.value}</span>
                <span className="fact-label">{fact.label}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {study.gallery && (
        <div className="case-block">
          <h4>{study.galleryTitle || "Screenshots"}</h4>
          <div className="case-gallery">
            {study.gallery.map((image) => (
              <figure className="case-shot" key={image.src}>
                <img src={image.src} alt={image.alt} loading="lazy" />
                <figcaption>{image.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      )}

      {(study.sections || []).map((section) => (
        <SectionBlock section={section} key={section.title} />
      ))}
    </div>
  );
}

export default CaseStudy;
