import ProjectHero from '../components/ProjectHero';
import ResearchInsightCard from '../components/ResearchInsightCard';
import TextRichStepImageFocused from '../components/TextRichStepImageFocused';
import TextRichStepImageFocusedExpandable from '../components/TextRichStepImageFocusedExpandable';

import heroImage from '../assets/images/five-star-host/five-star-host-hero.png';
import introImage_Client from '../assets/images/five-star-host/img_ourClient.png';
import introImage_Problem from '../assets/images/five-star-host/img_theProblem.png';
import introImage_UserGroup from '../assets/images/five-star-host/img_userGroup.png';
import introImage_Collaboration from '../assets/images/five-star-host/img_ourTeam.png';
import resImg1 from '../assets/images/five-star-host/res_img1.png';
import resImg2 from '../assets/images/five-star-host/res_img2.png';
import resImg3 from '../assets/images/five-star-host/res_img3.png';
import resImg4 from '../assets/images/five-star-host/res_img4.png';
import resImg5 from '../assets/images/five-star-host/res_img5.png';
import resImg6 from '../assets/images/five-star-host/res_img6.png';

const intro = [
  {
    summary:
      'A property management company is shifting from basic renting to broader services and scaling operations, but its current website cannot support or communicate this expanded direction, requiring a platform that engages users and enables seamless interactions.',
    image: introImage_Client,
    alt: 'Our Client',
    eyebrow: 'Our Client',
    accent: 'primary',
  },
  {
    summary:
      'The client’s website has major usability issues: a cluttered, poorly organized layout, unclear page structures, and unfocused content that make navigation difficult. Inconsistent design and color schemes further create an unprofessional, uninviting experience.',
    image: introImage_Problem,
    alt: 'The Problem',
    eyebrow: 'The Problem',
    accent: 'secondary',
  },
  {
    summary:
      'Primary users are property owners seeking hassle-free rental management. They want a streamlined solution that removes tasks like screening, leasing, maintenance, and rent collection, while prioritizing convenience, efficiency, and clear service benefits.',
    image: introImage_UserGroup,
    alt: 'User Group',
    eyebrow: 'User Group',
    accent: 'accent',
  },
  {
    summary:
      'A team of three classmates completed a 1.5-month redesign of a property management website, quickly establishing collaboration. I redesigned key pages, built a component library, supported Figma, and ensured design consistency to deliver a cohesive, user-friendly result aligned with evolving needs.',
    image: introImage_Collaboration,
    alt: 'Our Team & My Role',
    eyebrow: 'Our Team & My Role',
    accent: 'primary',
  },
];

const redesignSteps = [
  {
    number: '1',
    title: 'Research',
    intro:
      'During research, we analyzed competitor sites—especially Airbnb—using usability and visual testing. We found successful platforms favor minimalist design and step-by-step flows to reduce complexity, guiding our approach to create a more efficient, user-friendly experience.',
    sections: [
      {
        heading: 'Research Methodology: Site-by-Site Analysis',
        body: 'Key Findings:',
      },
    ],
    bullets: [
      'Minimalist Design: A less-is-more approach to avoid overwhelming users with information.',
      'Step-by-Step Guidance: Clear and concise guidance to simplify user journeys and reduce friction.',
      'Consistent Design Language: A unified visual style to enhance brand recognition and professionalism.',
    ],
    images: [
      { src: resImg1, alt: 'Research finding 1' },
      { src: resImg2, alt: 'Research finding 2' },
      { src: resImg3, alt: 'Research finding 3' },
      { src: resImg4, alt: 'Research finding 4' },
      { src: resImg5, alt: 'Research finding 5' },
    ],
    imageLeft: true,
  },
  {
    number: '2',
    title: 'Low-Fidelity Wireframing',
    intro:
      'Based on our research insights, we created low-fidelity wireframes to explore layout and structure. We focused on simplifying navigation, improving content hierarchy, and enhancing visual consistency to create a more intuitive user experience.',
    images: [
      { src: resImg6, alt: 'Low-fidelity wireframe' },
    ],
    imageLeft: false,
  },
  {
    number: '3',
    title: 'High-Fidelity Prototyping',
    intro:
      'The high-fidelity prototype was developed directly from the low-fidelity wireframes, refining the overall structure with detailed, fully realized components. It enhances visual hierarchy, interaction clarity, and design consistency while preserving the original layout decisions. Additionally, existing images from the client’s old website were reused and integrated, ensuring visual continuity while elevating the overall presentation.',
    sections: [
      {
        heading: 'Research Methodology: Site-by-Site Analysis',
        body: 'Key Findings:',
      },
    ],
    bullets: [
      'Minimalist Design: A less-is-more approach to avoid overwhelming users with information.',
      'Step-by-Step Guidance: Clear and concise guidance to simplify user journeys and reduce friction.',
      'Consistent Design Language: A unified visual style to enhance brand recognition and professionalism.',
    ],
    images: [
      { src: resImg1, alt: 'Research finding 1' },
      { src: resImg2, alt: 'Research finding 2' },
      { src: resImg3, alt: 'Research finding 3' },
      { src: resImg4, alt: 'Research finding 4' },
      { src: resImg5, alt: 'Research finding 5' },
    ],
    imageLeft: true,
  },
];

function FiveStarHostRedesign() {
  return (
    <main>
      <ProjectHero title="Case Study: 5-Star Host web page redesign" image={heroImage} />

      <section id="findings" className="bg-base-100">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.35em] text-base-content/50">Project Overview</p>
            <h2 className="mt-3 text-4xl font-bold">What is the problem we are trying to solve?</h2>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {intro.map((intro) => (
              <ResearchInsightCard key={intro.eyebrow} {...intro} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-base-100">
        <div className="max-w-6xl mx-auto px-6">
          {redesignSteps.map((step) => (
            step.number === '1' ? (
              <TextRichStepImageFocused key={step.number} {...step} />
            ) : (
              <TextRichStepImageFocusedExpandable key={step.number} {...step} />
            )
          ))}
        </div>
      </section>
    </main>
  );
}

export default FiveStarHostRedesign;
