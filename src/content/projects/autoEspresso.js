import heroImg from '../../assets/images/espresso/Espresso_Hero.png';
import heroImg2 from '../../assets/images/espresso/Espresso_Hero_2.png';
import img2 from '../../assets/images/espresso/Espresso_Img2.png';
import img3 from '../../assets/images/espresso/Espresso_Img3.png';
import img4 from '../../assets/images/espresso/Espresso_Img4.png';
import img5 from '../../assets/images/espresso/Espresso_Img5.png';
import nespresso from '../../assets/images/espresso/Nepresso_1.png';
import detail1 from '../../assets/images/espresso/Espresso_Detail1.png';
import detail2 from '../../assets/images/espresso/Espresso_2_Detail_1.png';
import v2p2img1 from '../../assets/images/espresso/Espresso_V2_P2_img1.png';
import v2p2img2 from '../../assets/images/espresso/Espresso_V2_P2_img2.png';
import v2p2img3 from '../../assets/images/espresso/Espresso_V2_P2_img3.png';
import v2p2img4 from '../../assets/images/espresso/Espresso_V2_P2_img4.png';
import v2p3img1 from '../../assets/images/espresso/Espresso_V2_P3_img1.png';
import v2p3img2 from '../../assets/images/espresso/Espresso_V2_P3_img2.png';

const content = {
  hero: {
    title: 'Project Lifehack — Espresso Helper',
    image: heroImg,
  },
  intro: {
    heading: 'Project Lifehack — Espresso Helper',
    description:
      'I drink a lot of coffee in my daily life. However, all of them look similar and taste similar — which is nondeviant since they are made from exactly the same ingredient. Why not make some change so they come with more variety?',
    image: heroImg,
    imageAlt: 'Espresso Helper',
    demoVideoUrl: 'https://youtube.com/watch?v=QYC5_dHZU3c',
    demoVideoLabel: 'View Demo Video',
  },
  quickJump: {
    heading: 'Quick Jump',
    links: [
      { label: 'Build Process', title: 'How the machine was designed and assembled', href: '#build-process', img: img2 },
      { label: 'Demo Video', title: 'Watch the V1 prototype in action', href: '#demo', img: heroImg },
      { label: 'Version 2', title: 'See what was improved in the refined version', href: '#v2', img: heroImg2 },
    ],
  },
  buildProcess: {
    heading: 'Build Process',
    steps: [
      {
        number: 1,
        title: 'Ideas',
        text: `The idea came from my daily habit of making lattes and having to manually add milk and sugar every time. Since I drink lattes almost exclusively, I wanted a way to automate that repetitive step. My initial concept was a fully automatic helper that used a water-level sensor inside the mug — once the coffee reached a set height, it would dispense milk and add sugar automatically.\n\nHowever, during refinement I found that building a reliable sugar-dispensing mechanism was too complex, so I simplified the design. The updated version now automatically adds milk and instead shows how much sugar to add through a small light or screen indicator. The system also adjusts its behavior based on the time of day — offering a sugar-free espresso-style latte in the morning, a balanced one in the afternoon, and a sweeter, milkier version at night.`,
        images: [{ src: nespresso, caption: 'The Nespresso Inissia Espresso machine that I daily use' }],
      },
      {
        number: 2,
        title: 'Espresso Machine, Assemble!',
        text: `During assembly, I discovered that the milk pump required a 12V power supply, which couldn't be provided directly by the microcontroller. To solve this, I added a MOSFET circuit to safely control the pump while drawing power from an external 12V source. Since multiple components relied on the 5V and GND pins, I also soldered a separate power and ground cable to reduce the number of clip connections to the board.\n\nTo organize the hardware, I 3D-printed several structural parts — including mounts to hold the pump and electronics in place, a small indicator plate explaining how to interpret the sugar-level light, and a tiny basket for storing sugar packets.`,
        images: [
          { src: img2, caption: 'All 3D printed parts that I made' },
          { src: img3, caption: 'Soldered 5V/GND Cable for better cable management' },
        ],
        imageLeft: true,
      },
      {
        number: 3,
        title: 'Improvement',
        text: `While assembling the system, I realized that fetching real-time data from the microcontroller would require a Wi-Fi module and a set of complex network packages. To simplify the design, I replaced the time-based logic with a light sensor approach. The system now interprets ambient light levels to estimate the time of day — dim morning light triggers a mild, low-sugar latte; bright midday light suggests a balanced cup; and near-dark conditions signal nighttime, prompting a sweeter latte.\n\nSince I had some extra time, I also added a sound feedback system. After the latte is finished, the machine plays short pre-recorded voice lines that guide the user on how much sugar to add and gently remind them to relax and enjoy their coffee.`,
        images: [{ src: img4, caption: 'Light Sensor / Sugar Level Indicator and Info Plate' }],
      },
      {
        number: 4,
        title: 'Working Prototype / Future Plan',
        text: `The current prototype successfully automates milk dispensing and provides sugar recommendations based on ambient light levels. The system's components are all functional, and the audio feedback adds a pleasant, guided experience for the user.\n\nFor the next stage, I plan to enclose and organize all cables for a cleaner, safer appearance and to add a dedicated sugar-dispensing mechanism. Additionally, based on my professor's feedback, I may explore integrating an independent real-time module, which would allow the system to determine the exact time of day and eventually replace the light sensor with a more accurate time-based control.`,
        images: [
          { src: heroImg, caption: 'Working Prototype' },
          { src: img5, caption: 'Realtime Module for Arduino' },
        ],
        imageLeft: true,
      },
    ],
  },
  v2: {
    dividerLabel: 'Version 2 — Refined',
    heading: 'Espresso Helper — Ver 2',
    description: 'Previous design contained a bunch of excessive design decisions, so I changed it to make it more user-friendly.',
    demoUrl: 'https://www.youtube.com/shorts/7ZJGDpsL6N4',
    demoLabel: 'View New Demo',
    image: heroImg2,
    imageAlt: 'Espresso Helper V2',
  },
  userflowDiagram: {
    heading: 'Diagram of Userflow',
    image: detail1,
    alt: 'Userflow Diagram',
  },
  whatChanged: {
    heading: 'What Have Changed?',
    steps: [
      {
        number: 1,
        title: 'What Needed to Be Improved',
        text: `Unclear Audio Output\n• The speaker audio is not very clear, especially in noisy environments.\n• The sound may also disturb nearby people, making the design less suitable for shared spaces.\n\nNon-Intuitive Light Indication\n• The LED or light-based sugar indicator is not straightforward for users to interpret.\n• It requires users to look at an instruction plate, reducing usability.\n\nMaintenance Issue with Submerged Sensor\n• The liquid-level sensor inside the cup needs frequent cleaning due to milk and coffee residue.\n• This increases maintenance requirements and makes daily use less convenient.\n\nLimited Time Detection Method\n• The light sensor can misread time of day in indoor environments or inconsistent lighting.\n• This limits the reliability of sugar-level and milk-ratio recommendations.`,
        images: [{ src: detail2, caption: 'V1 issues overview' }],
      },
      {
        number: 2,
        title: 'What Have Changed... Almost Everything',
        text: `Replace Audio and Light Indicators with an OLED Screen\n• Provide direct on-screen sugar and beverage instructions for clearer communication.\n• Remove reliance on spoken audio to avoid disturbing others.\n\nReplace Submerged Sensor with LiDAR Distance Measurement\n• Avoid direct contact with liquid, eliminating the cleaning and maintenance issue.\n• Support a wide variety of cup sizes since the measurement is taken from above.\n\nAdd a Real-Time Clock (RTC) Module\n• Provide accurate, consistent time data independent of ambient lighting conditions.\n• Ensure sugar/milk recommendations remain correct in any environment.\n\nUnify Additive Dispensing Using Liquid Cream\n• Replace sugar packets with a sweetened cream, allowing both milk and sweetness to be dispensed through a single pump.\n• Remove the biggest mechanical limitation from Version 1.`,
        images: [
          { src: v2p2img1, caption: 'SSD1306 OLED Screen for better information display' },
          { src: v2p2img2, caption: 'VL53L0X for contactless coffee detection' },
          { src: v2p2img3, caption: 'RTC module for reliable time reading' },
          { src: v2p2img4, caption: 'Replace Milk with Starbucks® Creamer to avoid the need of sugar dispensing' },
        ],
        imageLeft: true,
      },
      {
        number: 3,
        title: 'Coding Improvements',
        text: `1. Adding OLED code for fun greetings.\n\n2. Adding list for better stability.`,
        images: [
          { src: v2p3img1, caption: '' },
          { src: v2p3img2, caption: '' },
        ],
      },
    ],
  },
  demoVideos: {
    heading: 'Demo Videos',
    videos: [
      {
        label: 'Version 1',
        title: 'Project Espresso - Demo Video',
        embedUrl: 'https://www.youtube.com/embed/QYC5_dHZU3c?rel=0&controls=1',
        codeLabel: 'V1 Code: ',
        codeHref: 'https://github.com/NeonCao/CIM_683/blob/main/Espresso_Code.py',
        codeLinkText: 'github.com — Espresso_Code.py',
      },
      {
        label: 'Version 2',
        title: 'Espresso Helper V2 Demo',
        embedUrl: 'https://www.youtube.com/embed/7ZJGDpsL6N4',
        codeLabel: 'V2 Code: ',
        codeHref: 'https://github.com/NeonCao/CIM_683/blob/main/Espresso_Code_V2.py',
        codeLinkText: 'github.com — Espresso_Code_V2.py',
      },
    ],
  },
};

export default content;
