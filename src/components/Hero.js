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
          Better Choices helps users discover healthier fast food options and make informed food decisions.
        </p>
      </div>
    </section>
  );
}

export default Hero;
