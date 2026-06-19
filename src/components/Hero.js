/*
  --- COMPONENT: Hero ---
  The hero section introduces the project.
  This is a "presentational" component — it only displays content,
  no logic or data fetching needed.
*/

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="container hero-content">
        <h2>Better Choices</h2>
        <p className="subtitle">Helping you make healthier decisions one meal at a time.</p>
        <p>
          Many people lead busy lives and do not always have the luxury of cooking meals at home. <strong>Better Choices</strong> has been created to help people make healthier decisions when fast food is the most practical and somtimes the <strong>ONLY</strong> option. By providing nutrition information, meal comparisons, and food tracking tools, <strong>Better Choices</strong> empowers users to choose the best available option for their lifestyle and health goals.
        </p>
      </div>
    </section>
  );
}

export default Hero;
