import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Phone, ShieldAlert, HandHeart, Clock, BookOpen } from "lucide-react";

const About = () => {
  return (
    <div className="container mx-auto pt-24 px-4 pb-12">
      <div className="pt-4">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold font-heading text-neutral-dark mb-4">About PakAid</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connecting communities, rescue teams, and donors to provide effective disaster relief across Pakistan.
          </p>
        </div>
        
        <Card className="mb-12">
          <CardContent className="p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold font-heading text-neutral-dark mb-4">Our Mission</h2>
                <p className="text-gray-700 mb-4">
                  PakAid was established with a vision to revolutionize the way Pakistan responds to natural disasters.
                  Our mission is to create a transparent, efficient, and coordinated disaster management system that connects
                  those in need with those who can help.
                </p>
                <p className="text-gray-700 mb-4">
                  We believe that by leveraging technology and community participation, we can minimize the impact of disasters 
                  and save more lives. Our platform brings together government agencies, NGOs, rescue teams, and individual donors
                  in a unified effort to respond to crises effectively.
                </p>
                <div className="mt-6">
                  <h3 className="text-xl font-bold font-heading text-neutral-dark mb-3">Core Values</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <div className="bg-primary/10 p-2 rounded-full mr-3 mt-1">
                        <ShieldAlert className="text-primary h-5 w-5" />
                      </div>
                      <div>
                        <span className="font-medium">Rapid Response</span>
                        <p className="text-sm text-gray-600">Time is critical in disaster situations. We prioritize speed and efficiency.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-secondary/10 p-2 rounded-full mr-3 mt-1">
                        <HandHeart className="text-secondary h-5 w-5" />
                      </div>
                      <div>
                        <span className="font-medium">Compassion</span>
                        <p className="text-sm text-gray-600">We approach every situation with empathy and care for those affected.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-accent/10 p-2 rounded-full mr-3 mt-1">
                        <Users className="text-accent h-5 w-5" />
                      </div>
                      <div>
                        <span className="font-medium">Community First</span>
                        <p className="text-sm text-gray-600">We believe in empowering local communities to be part of the solution.</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1590228947498-5f58817b3836?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Disaster relief volunteers" 
                  className="w-full h-auto rounded-lg shadow-md mb-6"
                />
                <h2 className="text-2xl font-bold font-heading text-neutral-dark mb-4">Impact Statistics</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-neutral-light p-4 rounded-lg text-center">
                    <div className="text-3xl font-bold text-primary mb-1">50+</div>
                    <div className="text-sm text-gray-600">Disasters Responded</div>
                  </div>
                  <div className="bg-neutral-light p-4 rounded-lg text-center">
                    <div className="text-3xl font-bold text-secondary mb-1">200k+</div>
                    <div className="text-sm text-gray-600">People Helped</div>
                  </div>
                  <div className="bg-neutral-light p-4 rounded-lg text-center">
                    <div className="text-3xl font-bold text-accent mb-1">₨100M+</div>
                    <div className="text-sm text-gray-600">Funds Raised</div>
                  </div>
                  <div className="bg-neutral-light p-4 rounded-lg text-center">
                    <div className="text-3xl font-bold text-success mb-1">20+</div>
                    <div className="text-sm text-gray-600">Rescue Teams</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Tabs defaultValue="how-it-works" className="w-full mb-12">
          <TabsList className="w-full grid grid-cols-1 md:grid-cols-3 h-auto">
            <TabsTrigger value="how-it-works">How It Works</TabsTrigger>
            <TabsTrigger value="team">Our Team</TabsTrigger>
            <TabsTrigger value="partners">Partners & Affiliations</TabsTrigger>
          </TabsList>
          
          <TabsContent value="how-it-works" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold font-heading text-neutral-dark mb-6 text-center">How PakAid Works</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-lg border border-gray-200 text-center">
                    <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <BookOpen className="text-primary h-8 w-8" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">1. Disaster Reporting</h3>
                    <p className="text-gray-600 text-sm">
                      When a disaster occurs, our team verifies information from multiple sources and creates a detailed report on our platform.
                    </p>
                  </div>
                  <div className="bg-white p-6 rounded-lg border border-gray-200 text-center">
                    <div className="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="text-secondary h-8 w-8" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">2. Rescue Team Mobilization</h3>
                    <p className="text-gray-600 text-sm">
                      Rescue teams use our platform to coordinate their response, accessing real-time information and allocating resources efficiently.
                    </p>
                  </div>
                  <div className="bg-white p-6 rounded-lg border border-gray-200 text-center">
                    <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <HandHeart className="text-accent h-8 w-8" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">3. Community Support</h3>
                    <p className="text-gray-600 text-sm">
                      Donors can contribute directly to specific disaster relief efforts, tracking exactly how their funds are being utilized.
                    </p>
                  </div>
                </div>
                <div className="mt-8 p-6 bg-neutral-light rounded-lg">
                  <h3 className="text-xl font-bold mb-4 text-center">For Communities in Need</h3>
                  <p className="text-gray-700 mb-4 text-center">
                    If you are in a disaster-affected area, here's how PakAid can help:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start">
                      <div className="bg-white p-2 rounded-full mr-3 mt-1">
                        <Phone className="text-primary h-5 w-5" />
                      </div>
                      <div>
                        <span className="font-medium">Emergency Contact</span>
                        <p className="text-sm text-gray-600">Call our 24/7 hotline at +92-51-1234567 for immediate assistance.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-white p-2 rounded-full mr-3 mt-1">
                        <Clock className="text-primary h-5 w-5" />
                      </div>
                      <div>
                        <span className="font-medium">Request Support</span>
                        <p className="text-sm text-gray-600">Fill out our emergency form to request specific aid for your community.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="team" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold font-heading text-neutral-dark mb-6 text-center">Meet Our Team</h2>
                <p className="text-center text-gray-600 mb-8 max-w-3xl mx-auto">
                  Our diverse team brings together expertise in disaster management, technology, and humanitarian aid to create
                  an effective platform for disaster response in Pakistan.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {
                      name: "Amina Khan",
                      role: "Founder & Executive Director",
                      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
                    },
                    {
                      name: "Dr. Faraz Ahmed",
                      role: "Head of Disaster Response",
                      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
                    },
                    {
                      name: "Sana Malik",
                      role: "Technology Director",
                      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
                    },
                    {
                      name: "Hassan Raza",
                      role: "Operations Manager",
                      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
                    },
                    {
                      name: "Ayesha Siddique",
                      role: "Community Outreach",
                      image: "https://images.unsplash.com/photo-1601412436009-d964bd02edbc?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
                    },
                    {
                      name: "Tariq Mahmood",
                      role: "Financial Director",
                      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
                    }
                  ].map((member, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg border border-gray-200 flex flex-col items-center text-center">
                      <img 
                        src={member.image} 
                        alt={member.name} 
                        className="w-24 h-24 rounded-full object-cover border-4 border-neutral-light mb-4"
                      />
                      <h3 className="text-lg font-bold mb-1">{member.name}</h3>
                      <p className="text-sm text-gray-600">{member.role}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="partners" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold font-heading text-neutral-dark mb-6 text-center">Our Partners</h2>
                <p className="text-center text-gray-600 mb-8 max-w-3xl mx-auto">
                  We collaborate with government agencies, NGOs, and private organizations to strengthen our disaster response capabilities.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {["Pakistan Red Crescent", "NDMA Pakistan", "UNICEF Pakistan", "WHO Pakistan", 
                    "Edhi Foundation", "AKAH Pakistan", "IRC", "USAID"].map((partner, index) => (
                    <div key={index} className="bg-neutral-light p-4 rounded-lg text-center h-24 flex items-center justify-center">
                      <span className="font-medium text-neutral-dark">{partner}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8 p-6 bg-primary/5 rounded-lg">
                  <h3 className="text-xl font-bold mb-4 text-center">Become a Partner</h3>
                  <p className="text-gray-700 mb-4 text-center">
                    We're always looking for organizations that share our mission to join forces with us.
                    If you're interested in partnering with PakAid, please contact us at partners@pakaid.org.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="bg-neutral-light p-8 rounded-lg text-center">
          <h2 className="text-2xl font-bold font-heading text-neutral-dark mb-4">Get Involved</h2>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Whether you're a rescue professional, a donor, or someone who wants to volunteer,
            there are many ways to contribute to our mission.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <a 
              href="/login" 
              className="bg-primary hover:bg-red-600 text-white font-medium py-3 px-4 rounded-md transition flex flex-col items-center"
            >
              <HandHeart className="mb-2" size={24} />
              <span>Donate</span>
            </a>
            <a 
              href="/signup" 
              className="bg-secondary hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-md transition flex flex-col items-center"
            >
              <Users className="mb-2" size={24} />
              <span>Volunteer</span>
            </a>
            <a 
              href="/signup" 
              className="bg-accent hover:bg-yellow-600 text-white font-medium py-3 px-4 rounded-md transition flex flex-col items-center"
            >
              <ShieldAlert className="mb-2" size={24} />
              <span>Join Rescue Team</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
