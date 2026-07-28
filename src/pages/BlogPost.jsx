import { Link } from "react-router-dom";

function BlogPost() {
  return (
    <div className="blog-page">
      <nav className="blog-nav">
        <Link to="/" className="blog-back">&larr; Back to Portfolio</Link>
      </nav>

      <article className="blog-article">
        <h1>From 300 to 6,500 Labels: How We Built a Cricket Detection Dataset Without Labeling Everything by Hand</h1>

        <section>
          <h2>The Problem</h2>
          <p>
            Labeling objects in cricket videos is painfully slow. A single frame can have 3-6 players, 2 batsmen,
            an umpire, and sometimes fielders in the background. Doing this for thousands of frames? That's days
            of monotonous work.
          </p>
          <p>
            We had a goal: build a high-quality cricket detection dataset (~6,500 labeled frames) covering umpire,
            batsman, and fielder across multiple matches — without spending weeks on manual annotation.
          </p>
        </section>

        <section>
          <h2>The Solution: Iterative Active Learning</h2>
          <p>Instead of labeling everything manually, we used an iterative loop:</p>
          <pre className="blog-code">
GroundingDINO (zero-shot) → Verify 300 → Train v0
    → Auto-label 700 more → Verify → Train v1 (1K)
    → Auto-label 1K more → Verify → Train v2 (2K)
    → ... repeat until 6,500+</pre>
          <p>
            Each round, the model gets better at auto-labeling, so verification gets faster because fewer
            corrections are needed.
          </p>
        </section>

        <section>
          <h2>Step by Step</h2>

          <h3>Step 1: Grounding DINO — Zero-Shot Auto-Labeling (300 frames)</h3>
          <p>
            We selected 300 random frames from our cricket match footage and ran GroundingDINO with simple
            text prompts: <code>["umpire", "batsman", "fielder"]</code>. GroundingDINO can detect objects it was
            never trained on — it uses natural language understanding to find anything described in the prompt.
          </p>
          <p>
            This gave us a rough first pass of labels. Many boxes were slightly off, some objects were missed,
            but it was a starting point.
          </p>

          <h3>Step 2: Manual Verification (300 → 300 verified)</h3>
          <p>
            We built a PyQt6-based annotation GUI that loads each frame, shows the GroundingDINO predictions as
            colored boxes, and lets us:
          </p>
          <ul>
            <li>Press <strong>N/P</strong> to navigate frames</li>
            <li>Adjust misaligned boxes</li>
            <li>Delete false positives</li>
            <li>Add missed objects</li>
            <li>Press <strong>S</strong> to save verified labels</li>
          </ul>
          <p>After verification, we had our first <strong>300 high-quality labeled frames</strong>.</p>

          <h3>Step 3: Train v0 (300 labels)</h3>
          <p>
            We trained RF-DETR (a state-of-the-art transformer-based detector by Roboflow) on these 300 images.
            The result was weak — the model had only seen 300 examples — but it could now detect cricket objects
            better than GroundingDINO because it learned the specific visual patterns.
          </p>

          <h3>Step 4: Auto-Label 700 More with v0 → Verify → v1 (1K)</h3>
          <p>
            v0 auto-labeled 700 new frames. Since v0 already had some understanding of cricket, the predictions
            were better than GroundingDINO's. Verification went faster — fewer boxes to fix.
          </p>
          <p>After verifying, we had <strong>1,000 verified labels</strong>. We trained <strong>v1</strong>.</p>

          <h3>Step 5: Repeat → 2K, 3K, 3.6K, 5.2K, 6.5K</h3>
          <p>Each iteration:</p>
          <ol>
            <li>Train on all verified labels so far</li>
            <li>Auto-label new unverified frames</li>
            <li>Verify (gets faster each round as model improves)</li>
            <li>Retrain</li>
          </ol>

          <div className="blog-table-wrap">
            <table className="blog-table">
              <thead>
                <tr>
                  <th>Round</th>
                  <th>Verified Labels</th>
                  <th>Model mAP</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>v0</td><td>300</td><td>~0.40</td></tr>
                <tr><td>v1</td><td>1,000</td><td>~0.65</td></tr>
                <tr><td>v2</td><td>2,000</td><td>~0.75</td></tr>
                <tr><td>v3</td><td>3,000+</td><td>~0.80</td></tr>
                <tr><td>R4</td><td>3,600</td><td><strong>0.828</strong></td></tr>
                <tr><td>R5</td><td>5,200</td><td><strong>0.821</strong> (+blank handling)</td></tr>
                <tr><td>R6</td><td>6,500</td><td><strong>0.826</strong></td></tr>
              </tbody>
            </table>
          </div>

          <p>
            Video demo of the annotation tool in action:{' '}
            <a href="https://drive.google.com/file/d/1KiHPDI2LvU3RDNgq1TAYkqdxnPwGyPrC/view?usp=drive_link" target="_blank" rel="noreferrer">
              Google Drive link
            </a>
          </p>
        </section>

        <section>
          <h2>Technical Stack</h2>
          <div className="blog-table-wrap">
            <table className="blog-table">
              <thead>
                <tr>
                  <th>Component</th>
                  <th>Tool</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Zero-shot detection</td><td>GroundingDINO</td></tr>
                <tr><td>Detection model</td><td>RF-DETR (Roboflow)</td></tr>
                <tr><td>Annotation GUI</td><td>PyQt6 + custom Python</td></tr>
                <tr><td>Dataset format</td><td>YOLO (images + .txt labels + data.yaml)</td></tr>
                <tr><td>Training</td><td>RF-DETR Lightning trainer</td></tr>
                <tr><td>Hardware</td><td>RTX 4060 (6GB)</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2>Results</h2>
          <p>The final round6 model achieves:</p>
          <ul>
            <li><strong>mAP 50:95 = 0.826</strong></li>
            <li><strong>mAP 50 = 0.951</strong></li>
            <li><strong>F1 = 0.907</strong></li>
            <li>3 classes: umpire (AP 0.82), batsman (AP 0.84), fielder (AP 0.82)</li>
          </ul>
          <p>
            Side-by-side comparison of model predictions across rounds:{' '}
            <a href="https://drive.google.com/file/d/1KiHPDI2LvU3RDNgq1TAYkqdxnPwGyPrC/view?usp=drive_link" target="_blank" rel="noreferrer">
              Google Drive link
            </a>
          </p>
          <p>
            An important lesson: we added <strong>150 blank frames</strong> — frames with no players, umpire,
            or any relevant objects — into the training set with <strong>empty label files</strong> (no
            annotations at all). This teaches the model that when it sees a blank frame, the correct output is
            <strong>nothing</strong> — it should predict zero objects.
          </p>
          <p>
            Without this, the model tends to hallucinate — predicting a player or umpire even on empty grass
            or pitch shots because it's biased to always output something. Adding blank frames with empty
            labels eliminated those false positives while barely impacting mAP.
          </p>
        </section>

        <section>
          <h2>Key Takeaways</h2>
          <ol>
            <li><strong>You don't need to label everything manually.</strong> Start with 300 zero-shot labels and let the model help you label the rest.</li>
            <li><strong>Each round compounds.</strong> Better model → better auto-labels → faster verification → more data → better model.</li>
            <li><strong>Quality over quantity.</strong> 300 carefully verified labels beat 3,000 noisy ones.</li>
            <li><strong>Blanks matter.</strong> Add blank frames with <strong>empty label files</strong> so your model learns to predict nothing on empty frames — this kills false positives and stops hallucination.</li>
          </ol>
        </section>

        <p className="blog-footer">
          <em>Built with RF-DETR, GroundingDINO, PyQt6, and a lot of cricket footage.</em>
        </p>
      </article>
    </div>
  );
}

export default BlogPost;
