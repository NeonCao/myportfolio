import ProjectHero from '../components/ProjectHero';
import ProjectBackground from '../components/ProjectBackground';
import heroImg from '../assets/images/overtown/overtown_hero.png';

function TellingOvertownStories() {
  return (
    <div className="min-h-screen bg-base-200">
      <ProjectHero
        title="Telling Overtown Stories, Saying Their Names"
        image={heroImg}
      />
      <ProjectBackground
        variant="L"
        text="This immersive virtual exhibit reimagines three murals honoring Overtown’s Black history through interactive storytelling and virtual reality. Created by graduate students in the Department of Interactive Media in partnership with Miami Museum of Contemporary Art of the African Diaspora(Miami MoCAAD), the project transforms site-specific public art into an accessible digital experience that preserves and amplifies community narratives.

Through VR, users can explore each mural as a portal into Overtown’s cultural legacy, learning about the people, stories, and history behind the artwork. The project bridges art, technology, and education, supporting Miami MoCADD mission to engage audiences through innovative platforms while providing students with hands-on experience in collaborative, community-centered design."
      />
    </div>
  );
}

export default TellingOvertownStories;
