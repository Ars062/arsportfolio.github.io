function CaseStudy({ study }) {
  return (
    <div className="case-study">
      {study.note && <p className="case-note">{study.note}</p>}

      <div className="case-block">
        <h4>Overview</h4>
        {study.overview.map((paragraph) => (
          <p key={paragraph.slice(0, 32)}>{paragraph}</p>
        ))}
      </div>

      <div className="case-block">
        <h4>Dataset</h4>
        <ul className="fact-grid">
          {study.facts.map((fact) => (
            <li className="fact" key={fact.label}>
              <span className="fact-value">{fact.value}</span>
              <span className="fact-label">{fact.label}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="case-block">
        <h4>Dataiku Flow lineage</h4>
        {study.flowImage && (
          <figure className="case-shot">
            <img src={study.flowImage.src} alt={study.flowImage.alt} loading="lazy" />
            <figcaption>{study.flowImage.caption}</figcaption>
          </figure>
        )}
        <ol className="lineage">
          {study.lineage.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
        <p>{study.lineageNote}</p>
      </div>

      <div className="case-block">
        <h4>Cleaning, feature engineering and NLP</h4>
        <p>{study.featuresIntro}</p>
        <ul className="feature-list">
          {study.features.map((feature) => (
            <li key={feature.name}>
              <strong>{feature.name}</strong>
              <span>{feature.note}</span>
            </li>
          ))}
        </ul>
        <h5>{study.nlp.title}</h5>
        <p>{study.nlp.body}</p>
        <p className="case-note">{study.nlp.note}</p>
      </div>

      <div className="case-block">
        <h4>AutoML model comparison</h4>
        <p>{study.mlIntro}</p>
        <div className="case-table-wrap">
          <table className="case-table">
            <thead>
              <tr>
                <th>Model</th>
                <th>ROC AUC</th>
                <th>Accuracy</th>
                <th>Precision</th>
                <th>Recall</th>
                <th>F1</th>
              </tr>
            </thead>
            <tbody>
              {study.models.map((model) => (
                <tr key={model.name} className={model.selected ? "is-selected" : undefined}>
                  <td>{model.name}</td>
                  <td>{model.roc}</td>
                  <td>{model.accuracy}</td>
                  <td>{model.precision}</td>
                  <td>{model.recall}</td>
                  <td>{model.f1}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="case-note">{study.selectionNote}</p>

        <h5>Selected model — {study.finalModel.name}</h5>
        <p>{study.finalModel.config}</p>
        <ul className="metric-grid">
          {study.finalModel.metrics.map((metric) => (
            <li className="metric" key={metric.label}>
              <span className="metric-value">{metric.value}</span>
              <span className="metric-label">{metric.label}</span>
            </li>
          ))}
        </ul>
        <p className="case-note">{study.finalModel.note}</p>

        <h5>Classification threshold</h5>
        <p>{study.thresholdIntro}</p>
        <div className="case-table-wrap">
          <table className="case-table case-table-matrix">
            <thead>
              <tr>
                <th>Confusion matrix</th>
                <th>Predicted 0</th>
                <th>Predicted 1</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Actual 0</td>
                <td>{study.matrix.actual0[0]}</td>
                <td>{study.matrix.actual0[1]}</td>
              </tr>
              <tr>
                <td>Actual 1</td>
                <td>{study.matrix.actual1[0]}</td>
                <td>{study.matrix.actual1[1]}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="case-block">
        <h4>Feature importance</h4>
        <ol className="feature-rank">
          {study.importance.map((item) => (
            <li key={item.name}>{item.name}</li>
          ))}
        </ol>
        <p className="case-note">{study.importanceNote}</p>
      </div>

      <div className="case-block">
        <h4>Full-dataset scoring and the KPI layer</h4>
        <p>{study.scoring}</p>
        <div className="kpi-grid">
          {study.kpis.map((kpi) => (
            <div className="kpi-card" key={kpi.name}>
              <span className="kpi-name">{kpi.name}</span>
              <span className="kpi-group">Grouped by {kpi.groupBy}</span>
              <span className="kpi-metrics">{kpi.metrics}</span>
              <span className="kpi-purpose">{kpi.purpose}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="case-block">
        <h4>Dashboard visuals</h4>
        <div className="case-gallery">
          {study.gallery.map((image) => (
            <figure className="case-shot" key={image.src}>
              <img src={image.src} alt={image.alt} loading="lazy" />
              <figcaption>{image.caption}</figcaption>
            </figure>
          ))}
        </div>
        <ul className="feature-list">
          {study.dashboardVisuals.map((visual) => (
            <li key={visual.title}>
              <strong>{visual.title}</strong>
              <span>{visual.purpose}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="case-block">
        <h4>Business interpretation</h4>
        <div className="interp-grid">
          {study.interpretation.map((level) => (
            <div className="interp-card" key={level.level}>
              <span className="interp-level">{level.level}</span>
              <span className="interp-question">{level.question}</span>
              <span className="interp-body">{level.body}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="case-block">
        <h4>Limitations</h4>
        <ul className="case-list">
          {study.limitations.map((item) => (
            <li key={item.slice(0, 32)}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CaseStudy;
