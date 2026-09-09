import { CHINESE, ENGLISH } from '../i18n/LanguageContext';
import universityOfMiamiLogo from '../assets/images/index_Page/Logo_UniversityofMiami.png';
import kingSoftCloudLogo from '../assets/images/index_Page/Logo_KingSoftCloud.png';
import bjupiLogo from '../assets/images/index_Page/Logo_BJUPI.png';

export const homeHistoryByLanguage = {
  [ENGLISH]: {
    educationHistory: [
      {
        period: 'Aug 2024 - Dec 2025',
        title: 'Master of Science in Experience and Information Design',
        organization: 'University of Miami',
        logo: universityOfMiamiLogo,
        logoAlt: 'University of Miami logo',
        description:
          'Focused on user research, AI, and Mixed Reality, Learning and Development applications that prioritize user needs and the best practices of AI and Mixed Reality’s integration.',
        relatedWork: [
          { label: 'UM Campus Xplorer', to: '/projects/um-campus-xplorer' },
          { label: 'Espresso Helper', to: '/projects/auto-espresso' },
          { label: 'Project About Myself', to: '/projects/about-myself' },
          { label: 'Telling Overtown Stories', to: '/projects/telling-overtown-stories' },
          { label: 'AR Calorie Visualizer', to: '/projects/ar-calorie-visualizer' },
          { label: 'Stellar Life Cycle', to: '/projects/the-stellar-life-cycle' },
          { label: 'Periodic Table of Mixology', to: '/projects/periodic-table-of-mixology' },
        ],
      },
      {
        period: 'Aug 2018 - May 2022',
        title: 'Bachelor of Science in Computer Science',
        organization: 'University of Miami',
        logo: universityOfMiamiLogo,
        logoAlt: 'University of Miami logo',
        description:
          'Getting into the world of coding, learning programming languages like C#, Java, Python and Swift, exploring the fundatmentals of software development, and learning differnet algorthimes and data structures.',
        relatedWork: [],
      },
    ],
    workHistory: [
      {
        period: 'May 2025 - Feb 2026',
        title: 'Unity Developer',
        organization: 'The VESL Lab (University of Miami)',
        logo: universityOfMiamiLogo,
        logoAlt: 'University of Miami logo',
        lanePreference: 0,
        description:
          'Deliver consistent C# scripts and algorithms to support the Unity project of the University, as well as Design ideas and UX ideas. Using best practices of Virtual Reality, AI and Database Integration to create a seamless experience for both teacher and students.',
        relatedWork: [{ label: 'Memory Garden', to: '/projects/memory-graden' }],
      },
      {
        period: 'Sep 2025 - Jan 2026',
        title: 'Research Assistant',
        organization: 'University of Miami',
        logo: universityOfMiamiLogo,
        logoAlt: 'University of Miami logo',
        lanePreference: 1,
        description:
          'Research and help utilize new technologies in Unity to recreate a video clip into a 3D, immersive, dreamlike storytelling experience.',
        relatedWork: [
          { label: 'Note-Taking Study', to: '/projects/design-student-note-taking' },
          { label: 'UM Card Sorting', to: '/projects/um-card-sorting-study' },
          { label: 'Interactive Piggy Bank', to: '/projects/interactive-piggy-bank' },
        ],
      },
      {
        period: 'Nov 2023 - Aug 2024',
        title: 'AI Algorithm developer Intern',
        organization: 'KingSoft Cloud',
        logo: kingSoftCloudLogo,
        logoAlt: 'KingSoft Cloud logo',
        description:
          'Develop an OCR and AI Algorithm for PDF recognition, also implement an API to use LLM to help find specific topics and related texts in various document types, and successfully integrate that function into the Financial Report Reviewing Tool developed by the company',
        relatedWork: [],
      },
      {
        period: 'Jun 2021 - Aug 2021',
        title: 'Software Engineer Intern',
        organization: 'Beijing Universal Prosperity Company',
        logo: bjupiLogo,
        logoAlt: 'Beijing Universal Prosperity Company logo',
        description:
          'Analyzed and developed technical and functional specifications for the Database and backend of qualification exam services serving up to thousands of employees using MySQL, Tomcat, Spring Boot, React, Java and SQL.',
        relatedWork: [],
      },
    ],
  },
  [CHINESE]: {
    educationHistory: [
      {
        period: 'Aug 2024 - Dec 2025',
        displayPeriod: '2024年8月 - 2025年12月',
        title: '体验与信息设计理学硕士',
        organization: '迈阿密大学',
        logo: universityOfMiamiLogo,
        logoAlt: '迈阿密大学标志',
        description:
          '专注于用户研究、AI、混合现实以及学习与发展类应用，强调以用户需求为核心，并探索 AI 与混合现实整合的最佳实践。',
        relatedWork: [
          { label: 'UM 校园探索器', to: '/projects/um-campus-xplorer' },
          { label: 'Espresso Helper', to: '/projects/auto-espresso' },
          { label: '关于我自己', to: '/projects/about-myself' },
          { label: '讲述 Overtown 故事', to: '/projects/telling-overtown-stories' },
          { label: 'AR 卡路里可视化', to: '/projects/ar-calorie-visualizer' },
          { label: '恒星生命周期', to: '/projects/the-stellar-life-cycle' },
          { label: '调酒周期表', to: '/projects/periodic-table-of-mixology' },
        ],
      },
      {
        period: 'Aug 2018 - May 2022',
        displayPeriod: '2018年8月 - 2022年5月',
        title: '计算机科学理学学士',
        organization: '迈阿密大学',
        logo: universityOfMiamiLogo,
        logoAlt: '迈阿密大学标志',
        description:
          '进入编程世界，学习 C#、Java、Python 和 Swift 等语言，探索软件开发基础，以及不同算法和数据结构。',
        relatedWork: [],
      },
    ],
    workHistory: [
      {
        period: 'May 2025 - Feb 2026',
        displayPeriod: '2025年5月 - 2026年2月',
        title: 'Unity 开发者',
        organization: 'VESL 实验室（迈阿密大学）',
        logo: universityOfMiamiLogo,
        logoAlt: '迈阿密大学标志',
        lanePreference: 0,
        description:
          '为大学的 Unity 项目交付稳定的 C# 脚本和算法，同时参与用户体验的设计与实现。构建结合虚拟现实、AI 集成数据库与实时信息收集的复杂应用，游戏化学生的学习体验并让教师的工作负担减少了85%。',
        relatedWork: [{ label: 'Memory Garden', to: '/projects/memory-graden' }],
      },
      {
        period: 'Sep 2025 - Jan 2026',
        displayPeriod: '2025年9月 - 2026年1月',
        title: '研究助理',
        organization: '迈阿密大学',
        logo: universityOfMiamiLogo,
        logoAlt: '迈阿密大学标志',
        lanePreference: 1,
        description:
          '研究并协助在 Unity 中应用新技术，将一段视频片段重构为 3D、沉浸式、梦境般的叙事体验。',
        relatedWork: [
          { label: '设计学生笔记研究', to: '/projects/design-student-note-taking' },
          { label: 'UM 卡片分类研究', to: '/projects/um-card-sorting-study' },
          { label: '互动存钱罐', to: '/projects/interactive-piggy-bank' },
        ],
      },
      {
        period: 'Nov 2023 - Aug 2024',
        displayPeriod: '2023年11月 - 2024年8月',
        title: 'AI 算法开发实习生',
        organization: '金山云',
        logo: kingSoftCloudLogo,
        logoAlt: '金山云标志',
        description:
          '开发用于 PDF 识别的 OCR 与 AI 算法，并实现调用大语言模型的 API，用于在多种文档类型中查找特定主题与相关文本，最终成功整合进公司的财报审阅工具。',
        relatedWork: [],
      },
      {
        period: 'Jun 2021 - Aug 2021',
        displayPeriod: '2021年6月 - 2021年8月',
        title: '软件工程实习生',
        organization: '北京环宇锦盛有限公司',
        logo: bjupiLogo,
        logoAlt: '北京环宇锦盛有限公司标志',
        description:
          '为服务数千名员工的资格考试系统分析并开发数据库与后端的技术和功能规格，技术栈包括 MySQL、Tomcat、Spring Boot、React、Java 以及 SQL。',
        relatedWork: [],
      },
    ],
  },
};

export default homeHistoryByLanguage;
