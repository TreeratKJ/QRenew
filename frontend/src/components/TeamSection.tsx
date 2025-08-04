import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, GraduationCap } from "lucide-react";

const TeamSection = () => {
  const mentors = [
    {
      name: "Yousra Farhani",
      bio: "Quantum Machine Learning and Optimisation Researcher, Founder of Quantum Africa",
      role: "Mentor"
    },
    {
      name: "Dr. Expert Name",
      bio: "Expert on Quantum Machine Learning Research with extensive experience in optimization algorithms and quantum computing applications",
      role: "Quantum ML Expert"
    }
  ];

  const members = [
    {
      name: "Treerat Srivipat",
      bio: "PhD candidate and Sydney Quantum Academy scholar at the University of Technology Sydney, Australia. Research focuses on theoretical framework of digital quantum simulation.",
      country: "Australia",
      degree: "PhD in Quantum Technologies"
    },
    {
      name: "Ameer Syahiran Bin Azhan",
      bio: "Master's studies in Quantum Optics at Universiti Teknologi MARA, Malaysia. Research focused on generating entanglement and squeezed state from PT-symmetric system.",
      country: "Malaysia", 
      degree: "Master's in Quantum Optics"
    },
    {
      name: "Kamanouch Yaemsang",
      bio: "Master's degree in Mathematics at Karlsruhe Institute of Technology, Germany. Research in mathematical formulation of quantum algorithms and renewable energy investment strategies.",
      country: "Germany",
      degree: "Master's in Mathematics"
    },
    {
      name: "Muhammad Haikel Bin Yasin",
      bio: "Bachelor of Computing (Honours) in Computer Science at National University of Singapore, specializing in AI, simulation, optimization, and quantum-enhanced solutions.",
      country: "Singapore",
      degree: "Bachelor's in Computer Science"
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Meet Our
            <span className="bg-gradient-energy bg-clip-text text-transparent"> Team</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A diverse team of quantum researchers and engineers from across ASEAN, united by our vision for sustainable energy
          </p>
        </div>

        {/* Mentors Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8 text-foreground">Our Mentors</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {mentors.map((mentor, index) => (
              <Card key={index} className="bg-gradient-card border-0 shadow-quantum">
                <CardContent className="p-8 text-center">
                  <div className="w-24 h-24 bg-gradient-quantum rounded-full mx-auto mb-6 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">{mentor.name.split(' ').map(n => n[0]).join('')}</span>
                  </div>
                  <Badge variant="secondary" className="mb-4 bg-accent text-accent-foreground">
                    {mentor.role}
                  </Badge>
                  <h4 className="text-2xl font-bold text-foreground mb-4">{mentor.name}</h4>
                  <p className="text-muted-foreground leading-relaxed">{mentor.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Team Members */}
        <div>
          <h3 className="text-2xl font-bold text-center mb-12 text-foreground">Team Members</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {members.map((member, index) => (
              <Card key={index} className="bg-gradient-card border-0 shadow-elegant hover:shadow-energy transition-all duration-300 hover:scale-105">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-gradient-energy rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-lg font-bold text-white">{member.name.split(' ').map(n => n[0]).join('')}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-foreground mb-2">{member.name}</h4>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <Badge variant="outline" className="text-xs">
                          <MapPin className="w-3 h-3 mr-1" />
                          {member.country}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          <GraduationCap className="w-3 h-3 mr-1" />
                          {member.degree}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;