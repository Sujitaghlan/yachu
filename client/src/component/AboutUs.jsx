import aboutUsContent from "../constant/aboutUsContent";
import womanImg from "../assets/woman.png";
import founderImg from "../assets/founder.png";

function AboutUs() {
  return (
    <div className="w-full bg-white font-paragraph">
      {/* About Section */}
      <section className="bg-secondary px-6 md:px-20 py-12 text-tertiary">
        <h1 className="text-heading font-headline mb-4">{aboutUsContent.about.title}</h1>
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          <p className="text-paragraph md:w-3/4 leading-relaxed">
            {aboutUsContent.about.text}
          </p>
          <img src={womanImg} alt="Yachu product" className="w-60 rounded-md" />
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-white px-6 md:px-20 py-12">
        <div className="flex flex-col md:flex-row items-center gap-10">
          <img src={womanImg} alt="Yachu product" className="w-72 rounded-md" />
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-tertiary">{aboutUsContent.mission.title}</h2>
            <p className="text-paragraph leading-relaxed whitespace-pre-line">
              {aboutUsContent.mission.text}
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="bg-white px-6 md:px-20 py-12">
        <div className="flex flex-col md:flex-row-reverse items-center gap-10">
          <img src={womanImg} alt="Yachu product" className="w-72 rounded-md" />
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-tertiary">{aboutUsContent.story.title}</h2>
            <p className="text-paragraph leading-relaxed whitespace-pre-line">
              {aboutUsContent.story.text}
            </p>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="bg-secondary px-6 md:px-20 py-12 text-tertiary">
        <div className="flex flex-col md:flex-row items-center gap-10">
          <img src={founderImg} alt="Founder" className="w-80 rounded-md" />
          <div>
            <h2 className="text-2xl font-semibold mb-4">{aboutUsContent.founder.title}</h2>
            <p className="text-paragraph leading-relaxed whitespace-pre-line">
              {aboutUsContent.founder.text}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;
