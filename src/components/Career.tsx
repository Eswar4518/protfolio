import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>MCA</h4>
                <h5>Chandigarh University</h5>
              </div>
              <h3>2024</h3>
            </div>
            <p>Developed Python-based applications including a virtual assistant, disease prediction system, and data analytics projects for intelligent data processing.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>MCA</h4>
                <h5>Chandigarh University</h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              Built Python applications such as a voice-enabled virtual assistant, healthcare disease prediction system, and data analytics projects using machine learning and deep learning algorithms for real-world problem solving.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>MCA</h4>
                <h5>Chandigarh University</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
                            Built multiple applications integrating AI/ML models, data analytics, and Retrieval-Augmented Generation (RAG). Developed intelligent systems for data-driven insights and designed user-centric interfaces using Figma.

            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
