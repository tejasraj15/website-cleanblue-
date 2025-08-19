import { Microscope, Atom, Shield } from "lucide-react";

export default function TechnologySection() {
  const technologies = [
    {
      icon: Microscope,
      title: "Nanobubble Infusion",
      description: "Revolutionary technology that infuses water with stable nanobubbles for enhanced oxygenation and improved cellular hydration.",
      color: "bg-primary-blue"
    },
    {
      icon: Atom,
      title: "Molecular Enhancement",
      description: "Advanced filtration process that preserves essential minerals while removing impurities at the molecular level.",
      color: "bg-accent-teal"
    },
    {
      icon: Shield,
      title: "Quality Assurance",
      description: "Rigorous testing and quality control ensures every bottle meets the highest standards of purity and safety.",
      color: "bg-primary-blue"
    }
  ];

  return (
    <section id="technology" className="py-20 bg-white" data-testid="technology-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-deep-gray mb-4" data-testid="text-technology-title">
            Advanced Nanobubble Technology
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto" data-testid="text-technology-description">
            Our patented nanobubble infusion technology delivers oxygen-rich hydration at the cellular level, 
            with nanobubbles 2,500 times smaller than a grain of salt.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1576086213369-97a306d36557?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
              alt="Advanced water purification technology in laboratory setting" 
              className="rounded-2xl shadow-lg w-full"
              data-testid="img-technology-lab"
            />
          </div>
          
          <div className="space-y-6">
            {technologies.map((tech, index) => {
              const IconComponent = tech.icon;
              return (
                <div key={index} className="bg-light-blue p-6 rounded-xl" data-testid={`card-technology-${index}`}>
                  <div className="flex items-center space-x-3 mb-3">
                    <div className={`w-10 h-10 ${tech.color} rounded-lg flex items-center justify-center`}>
                      <IconComponent className="text-white h-5 w-5" />
                    </div>
                    <h3 className="text-xl font-bold text-deep-gray" data-testid={`text-technology-title-${index}`}>
                      {tech.title}
                    </h3>
                  </div>
                  <p className="text-gray-600" data-testid={`text-technology-description-${index}`}>
                    {tech.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
