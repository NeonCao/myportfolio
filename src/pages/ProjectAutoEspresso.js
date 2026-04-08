import ProjectHero from '../components/ProjectHero';
import BuildStep from '../components/BuildStep';

import heroImg from '../assets/images/espresso/Espresso_Hero.png';
import img2 from '../assets/images/espresso/Espresso_Img2.png';
import img3 from '../assets/images/espresso/Espresso_Img3.png';
import img4 from '../assets/images/espresso/Espresso_Img4.png';
import img5 from '../assets/images/espresso/Espresso_Img5.png';
import imgHero2 from '../assets/images/espresso/Espresso_Hero.png';
import nespresso from '../assets/images/espresso/Nepresso_1.png';

const quickLinks = [
  { label: 'Design Process', title: 'You have been working so hard... why not take a short break and have a cup of latte?', href: '#build-process', img: img2 },
  { label: 'Demo Video', title: 'Video Link', href: '#demo', img: imgHero2 },
  { label: 'Code', title: 'Link to CircuitPython code', href: '#code', img: img2 },
];

function ProjectAutoEspresso() {
  return (
    <div className="min-h-screen bg-base-200">

      {/* Hero */}
      <ProjectHero title="Project Lifehack — Espresso Helper" image={heroImg} />

      {/* Intro */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-4xl font-bold mb-4">Project Lifehack — Espresso Helper</h1>
          <p className="text-base-content/70 leading-relaxed mb-6">
            I drink a lot of coffee in my daily life. However, all of them look similar and taste similar —
            which is nondeviant since they are made from exactly the same ingredient. Why not make some
            change so they come with more variety?
          </p>
          <div className="flex gap-4 flex-wrap">
            <a href="https://youtube.com/watch?v=QYC5_dHZU3c" target="_blank" rel="noreferrer" className="btn btn-outline">View Demo Video</a>
          </div>
        </div>
        <img src={heroImg} alt="Espresso Helper" className="rounded-box w-full object-cover" />
      </div>

      {/* Quick Jump */}
      <div className="bg-base-100">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold mb-8">Quick Jump</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {quickLinks.map((item) => (
              <a key={item.label} href={item.href} className="card bg-base-200 shadow hover:shadow-lg transition-shadow">
                <figure><img src={item.img} alt={item.title} className="w-full h-48 object-cover" /></figure>
                <div className="card-body">
                  <div className="badge badge-neutral mb-2">{item.label}</div>
                  <h3 className="card-title text-base">{item.title}</h3>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Build Process */}
      <div id="build-process" className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold pt-16 mb-2">Build Process</h2>

        <BuildStep
          number={1}
          title="Ideas"
          text={`The idea came from my daily habit of making lattes and having to manually add milk and sugar every time. Since I drink lattes almost exclusively, I wanted a way to automate that repetitive step. My initial concept was a fully automatic helper that used a water-level sensor inside the mug — once the coffee reached a set height, it would dispense milk and add sugar automatically.\n\nHowever, during refinement I found that building a reliable sugar-dispensing mechanism was too complex, so I simplified the design. The updated version now automatically adds milk and instead shows how much sugar to add through a small light or screen indicator. The system also adjusts its behavior based on the time of day — offering a sugar-free espresso-style latte in the morning, a balanced one in the afternoon, and a sweeter, milkier version at night.`}
          images={[{ src: nespresso, caption: 'The Nespresso Inissia Espresso machine that I daily use' }]}
        />

        <BuildStep
          number={2}
          title="Espresso Machine, Assemble!"
          text={`During assembly, I discovered that the milk pump required a 12V power supply, which couldn't be provided directly by the microcontroller. To solve this, I added a MOSFET circuit to safely control the pump while drawing power from an external 12V source. Since multiple components relied on the 5V and GND pins, I also soldered a separate power and ground cable to reduce the number of clip connections to the board.\n\nTo organize the hardware, I 3D-printed several structural parts — including mounts to hold the pump and electronics in place, a small indicator plate explaining how to interpret the sugar-level light, and a tiny basket for storing sugar packets.`}
          images={[
            { src: img2, caption: 'All 3D printed parts that I made' },
            { src: img3, caption: 'Soldered 5V/GND Cable for better cable management' },
          ]}
          imageLeft
        />

        <BuildStep
          number={3}
          title="Improvement"
          text={`While assembling the system, I realized that fetching real-time data from the microcontroller would require a Wi-Fi module and a set of complex network packages. To simplify the design, I replaced the time-based logic with a light sensor approach. The system now interprets ambient light levels to estimate the time of day — dim morning light triggers a mild, low-sugar latte; bright midday light suggests a balanced cup; and near-dark conditions signal nighttime, prompting a sweeter latte.\n\nSince I had some extra time, I also added a sound feedback system. After the latte is finished, the machine plays short pre-recorded voice lines that guide the user on how much sugar to add and gently remind them to relax and enjoy their coffee.`}
          images={[{ src: img4, caption: 'Light Sensor / Sugar Level Indicator and Info Plate' }]}
        />

        <BuildStep
          number={4}
          title="Working Prototype / Future Plan"
          text={`The current prototype successfully automates milk dispensing and provides sugar recommendations based on ambient light levels. The system's components are all functional, and the audio feedback adds a pleasant, guided experience for the user.\n\nFor the next stage, I plan to enclose and organize all cables for a cleaner, safer appearance and to add a dedicated sugar-dispensing mechanism. Additionally, based on my professor's feedback, I may explore integrating an independent real-time module, which would allow the system to determine the exact time of day and eventually replace the light sensor with a more accurate time-based control.`}
          images={[
            { src: imgHero2, caption: 'Working Prototype' },
            { src: img5, caption: 'Realtime Module for Arduino' },
          ]}
          imageLeft
        />
      </div>

      {/* Demo Video */}
      <div id="demo" className="bg-base-100 mt-16">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold mb-8">Demo Video</h2>
          <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
            <iframe
              src="https://www.youtube.com/embed/QYC5_dHZU3c?rel=0&controls=1"
              title="Project Espresso - Demo Video"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="absolute inset-0 w-full h-full rounded-box"
            />
          </div>
        </div>
      </div>

      {/* Code Link */}
      <div id="code" className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-4">Code</h2>
        <a
          href="https://github.com/NeonCao/CIM_683/blob/main/Espresso_Code.py"
          target="_blank"
          rel="noreferrer"
          className="link link-primary break-all"
        >
          https://github.com/NeonCao/CIM_683/blob/main/Espresso_Code.py
        </a>
      </div>

    </div>
  );
}

export default ProjectAutoEspresso;
