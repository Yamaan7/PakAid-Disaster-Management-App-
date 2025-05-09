import { useToast } from "@/hooks/use-toast";

// Types
export interface Location {
  lat: number;
  lng: number;
  region: string;
}

export interface RescueTeam {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  status: string;
  memberCount: number;
  deployedDate: string;
  location: string;
  isApproved: boolean;
  currentAssignment?: string;
}

export interface Disaster {
  id: string;
  title: string;
  description: string;
  fullContent: string;
  type: string;
  status: string;
  date: string;
  imageUrl: string;
  location: Location;
  donationTarget: number;
  donationCurrent: number;
  rescueTeam: RescueTeam;
  situationPoints: string[];
  immediateNeeds: string[];
}

export interface Assignment {
  id: string;
  disasterId: string;
  disasterName: string;
  description: string;
  assignedDate: string;
  completedDate?: string;
  progress: number;
  teamSize: number;
  duration: string;
}

export interface Resource {
  id: string;
  type: string;
  assignedTo: string;
  quantity: string;
  status: "Deployed" | "In Transit";
}

export interface Message {
  id: string;
  sender: {
    id: string;
    name: string;
    avatar?: string;
    isAdmin: boolean;
  };
  content: string;
  timestamp: Date;
}

// Mock data
const disastersData: Disaster[] = [
  {
    id: "disaster-1",
    title: "Devastating Floods in Sindh Province",
    description: "Unprecedented rainfall has caused severe flooding across southern Sindh province, displacing over 100,000 people and destroying critical infrastructure. Emergency teams are working to provide immediate assistance.",
    fullContent: "Unprecedented rainfall has caused severe flooding across southern Sindh province, displacing over 100,000 people and destroying critical infrastructure. Multiple districts including Badin, Thatta, and parts of Karachi are underwater after receiving 400% more rainfall than normal during this monsoon season.",
    type: "Flood",
    status: "Urgent",
    date: "September 15, 2023",
    imageUrl: "https://images.unsplash.com/photo-1631193816258-28b414276c2e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    location: {
      lat: 24.8607,
      lng: 67.0011,
      region: "Sindh"
    },
    donationTarget: 30000000,
    donationCurrent: 19500000,
    rescueTeam: {
      id: "team-1",
      name: "Sindh Emergency Response",
      description: "A specialized disaster management team with expertise in flood relief and evacuation operations. Currently working with local authorities to coordinate rescue missions and establish relief camps.",
      imageUrl: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
      status: "Active in Field",
      memberCount: 30,
      deployedDate: "Sep 15",
      location: "Karachi",
      isApproved: true,
      currentAssignment: "Flooding in Sindh Province"
    },
    situationPoints: [
      "Over 100,000 people displaced from their homes",
      "Critical infrastructure including roads, bridges and power stations damaged",
      "Clean water supplies contaminated in multiple districts",
      "Growing concern about waterborne diseases",
      "Agricultural lands submerged, threatening food security"
    ],
    immediateNeeds: [
      "Clean drinking water and water purification tablets",
      "Emergency shelter materials",
      "Food supplies and baby formula",
      "Medical supplies and mobile health units",
      "Hygiene kits to prevent disease outbreaks"
    ]
  },
  {
    id: "disaster-2",
    title: "Earthquake in Balochistan",
    description: "A 6.4 magnitude earthquake has struck remote areas of Balochistan province. Initial reports indicate damage to multiple villages and ongoing rescue operations.",
    fullContent: "A 6.4 magnitude earthquake has struck remote areas of Balochistan province. The quake's epicenter was located approximately 15km northwest of Quetta, affecting numerous villages in the surrounding area. Initial reports indicate significant damage to infrastructure and homes in at least 12 villages.",
    type: "Earthquake",
    status: "Urgent",
    date: "September 10, 2023",
    imageUrl: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    location: {
      lat: 28.4907,
      lng: 65.0959,
      region: "Balochistan"
    },
    donationTarget: 15000000,
    donationCurrent: 4500000,
    rescueTeam: {
      id: "team-2",
      name: "Quetta Relief Force",
      description: "A specialized team trained in earthquake response and search and rescue operations.",
      imageUrl: "https://images.unsplash.com/photo-1568739253582-afa48fbcea47?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
      status: "Active in Field",
      memberCount: 25,
      deployedDate: "Sep 10",
      location: "Quetta",
      isApproved: true
    },
    situationPoints: [
      "Estimated 5,000 people affected across 12 villages",
      "Roads blocked by landslides hampering rescue efforts",
      "Local hospitals overwhelmed with injured",
      "Many structures collapsed or severely damaged",
      "Aftershocks continuing to threaten stability of remaining structures"
    ],
    immediateNeeds: [
      "Search and rescue teams",
      "Emergency medical supplies",
      "Tents and emergency shelter",
      "Portable water systems",
      "Food and blankets"
    ]
  },
  {
    id: "disaster-3",
    title: "Landslide in Northern Areas",
    description: "Heavy monsoon rains triggered a massive landslide in Gilgit-Baltistan, cutting off several villages from aid. Emergency supplies are being airlifted to affected communities.",
    fullContent: "Heavy monsoon rains triggered a massive landslide in the remote mountainous region of Gilgit-Baltistan. The landslide has blocked the Karakoram Highway and cut off at least five villages from ground transportation. Local authorities report approximately 2,000 people are isolated and in need of supplies.",
    type: "Landslide",
    status: "Ongoing",
    date: "August 28, 2023",
    imageUrl: "https://images.unsplash.com/photo-1601314167099-232775b3d6fd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    location: {
      lat: 35.8880,
      lng: 74.4644,
      region: "Gilgit-Baltistan"
    },
    donationTarget: 8000000,
    donationCurrent: 3600000,
    rescueTeam: {
      id: "team-3",
      name: "Gilgit-Baltistan Mountain Rescue",
      description: "Specialized in high-altitude rescue operations and emergency response in mountainous terrain.",
      imageUrl: "https://images.unsplash.com/photo-1541976498525-7a61646c03f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
      status: "Active in Field",
      memberCount: 18,
      deployedDate: "Aug 28",
      location: "Gilgit",
      isApproved: true
    },
    situationPoints: [
      "Approximately 2,000 people isolated in five villages",
      "Karakoram Highway blocked at multiple points",
      "Communication networks partially down",
      "Risk of additional landslides remains high",
      "Cold temperatures pose risk to displaced persons"
    ],
    immediateNeeds: [
      "Helicopter airlifts of essential supplies",
      "Emergency communication equipment",
      "Food and water supplies",
      "Winter clothing and blankets",
      "Medical supplies for isolated clinics"
    ]
  },
  {
    id: "disaster-4",
    title: "Drought in Tharparkar",
    description: "Persistent drought conditions have severely affected Tharparkar district, causing crop failures and water shortages. Relief operations are focusing on water supply and food distribution.",
    fullContent: "Persistent drought conditions have severely affected Tharparkar district for the third consecutive year. The lack of rainfall has caused widespread crop failures, livestock deaths, and critical water shortages. Nearly 50,000 families are facing food insecurity and limited access to clean water.",
    type: "Drought",
    status: "Ongoing",
    date: "August 15, 2023",
    imageUrl: "https://images.unsplash.com/photo-1589206561596-70d69276dbe6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    location: {
      lat: 24.7136,
      lng: 70.2400,
      region: "Tharparkar"
    },
    donationTarget: 12000000,
    donationCurrent: 8400000,
    rescueTeam: {
      id: "team-4",
      name: "Thar Desert Relief Initiative",
      description: "Focused on drought relief, water management, and sustainable agriculture support in arid regions.",
      imageUrl: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
      status: "Active in Field",
      memberCount: 22,
      deployedDate: "Aug 15",
      location: "Mithi",
      isApproved: true
    },
    situationPoints: [
      "Over 50,000 families affected by food insecurity",
      "Water sources depleted or contaminated",
      "Livestock deaths impacting livelihood of farmers",
      "Children showing signs of malnutrition",
      "Local wells and reservoirs dried up"
    ],
    immediateNeeds: [
      "Water tankers and purification systems",
      "Food supplies and nutritional supplements",
      "Fodder for remaining livestock",
      "Medical support for malnourished children",
      "Seeds and agricultural support for next planting season"
    ]
  },
  // {
  //   id: "disaster-5",
  //   title: "Heatwave in Karachi",
  //   description: "Extreme temperatures in Karachi have resulted in dozens of heat-related casualties. Emergency cooling centers have been established throughout the city to provide relief.",
  //   fullContent: "Extreme temperatures reaching 48°C (118°F) have gripped Karachi for over a week, resulting in dozens of heat-related casualties and hospitalizations. The prolonged heatwave has caused power outages and water shortages throughout the city, exacerbating the humanitarian situation.",
  //   type: "Heatwave",
  //   status: "Past",
  //   date: "July 12, 2023",
  //   imageUrl: "https://images.unsplash.com/photo-1533416784636-1b606aa86bd9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  //   location: {
  //     lat: 24.8607,
  //     lng: 67.0011,
  //     region: "Karachi"
  //   },
  //   donationTarget: 5000000,
  //   donationCurrent: 5000000,
  //   rescueTeam: {
  //     id: "team-5",
  //     name: "Karachi Emergency Services",
  //     description: "Urban emergency response team specializing in coordinating city-wide crisis management.",
  //     imageUrl: "https://images.unsplash.com/photo-1537511446984-935f663eb1f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
  //     status: "Available",
  //     memberCount: 15,
  //     deployedDate: "Jul 12",
  //     location: "Karachi",
  //     isApproved: true
  //   },
  //   situationPoints: [
  //     "Temperatures consistently above 45°C for over a week",
  //     "At least 35 heat-related fatalities recorded",
  //     "Hundreds hospitalized with heat stroke",
  //     "Power outages affecting water supply and cooling",
  //     "Elderly and vulnerable populations at highest risk"
  //   ],
  //   immediateNeeds: [
  //     "Cooling centers in high-density areas",
  //     "Emergency medical response for heat stroke victims",
  //     "Water distribution points",
  //     "Power generators for critical facilities",
  //     "Outreach to vulnerable populations"
  //   ]
  // }
];

const rescueTeamsData: RescueTeam[] = [
  {
    id: "team-1",
    name: "Sindh Emergency Response",
    description: "A specialized disaster management team with expertise in flood relief and evacuation operations.",
    imageUrl: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    status: "Active in Field",
    memberCount: 30,
    deployedDate: "Sep 15",
    location: "Karachi",
    isApproved: true,
    currentAssignment: "Flooding in Sindh Province"
  },
  {
    id: "team-2",
    name: "Quetta Relief Force",
    description: "A specialized team trained in earthquake response and search and rescue operations.",
    imageUrl: "https://images.unsplash.com/photo-1568739253582-afa48fbcea47?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    status: "Active in Field",
    memberCount: 25,
    deployedDate: "Sep 10",
    location: "Quetta",
    isApproved: true
  },
  {
    id: "team-3",
    name: "Gilgit-Baltistan Mountain Rescue",
    description: "Specialized in high-altitude rescue operations and emergency response in mountainous terrain.",
    imageUrl: "https://images.unsplash.com/photo-1541976498525-7a61646c03f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    status: "Active in Field",
    memberCount: 18,
    deployedDate: "Aug 28",
    location: "Gilgit",
    isApproved: true
  },
  {
    id: "team-4",
    name: "Thar Desert Relief Initiative",
    description: "Focused on drought relief, water management, and sustainable agriculture support in arid regions.",
    imageUrl: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    status: "Active in Field",
    memberCount: 22,
    deployedDate: "Aug 15",
    location: "Mithi",
    isApproved: true
  },
  {
    id: "team-5",
    name: "Karachi Emergency Services",
    description: "Urban emergency response team specializing in coordinating city-wide crisis management.",
    imageUrl: "https://images.unsplash.com/photo-1537511446984-935f663eb1f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    status: "Available",
    memberCount: 15,
    deployedDate: "Jul 12",
    location: "Karachi",
    isApproved: true
  },
  {
    id: "team-6",
    name: "Punjab Flood Response Unit",
    description: "Specializing in rapid deployment for flood response across Punjab province.",
    imageUrl: "https://images.unsplash.com/photo-1566753323558-f4e0952af115?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    status: "Available",
    memberCount: 28,
    deployedDate: "Jun 10",
    location: "Lahore",
    isApproved: false
  },
  {
    id: "team-7",
    name: "Islamabad Disaster Management Cell",
    description: "Government-affiliated team coordinating multi-agency disaster response.",
    imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    status: "Available",
    memberCount: 20,
    deployedDate: "May 5",
    location: "Islamabad",
    isApproved: true
  }
];

const assignmentsData: Assignment[] = [
  {
    id: "assignment-1",
    disasterId: "disaster-1",
    disasterName: "Flooding in Sindh Province",
    description: "Multiple districts including Badin, Thatta, and parts of Karachi affected by severe flooding.",
    assignedDate: "Sep 15, 2023",
    progress: 35,
    teamSize: 30,
    duration: "2-3 Weeks"
  },
  // {
  //   id: "assignment-2",
  //   disasterId: "disaster-5",
  //   disasterName: "Heatwave in Karachi",
  //   description: "Extreme temperatures in Karachi led to dozens of heat-related casualties. Team established cooling centers.",
  //   assignedDate: "Jul 12, 2023",
  //   completedDate: "Jul 30, 2023",
  //   progress: 100,
  //   teamSize: 15,
  //   duration: "2 Weeks"
  // }
];

const resourcesData: Resource[] = [
  {
    id: "resource-1",
    type: "Rescue Boats",
    assignedTo: "Flooding in Sindh",
    quantity: "12",
    status: "Deployed"
  },
  {
    id: "resource-2",
    type: "Medical Supplies",
    assignedTo: "Flooding in Sindh",
    quantity: "20 kits",
    status: "Deployed"
  },
  {
    id: "resource-3",
    type: "Water Purification",
    assignedTo: "Flooding in Sindh",
    quantity: "5 units",
    status: "In Transit"
  }
];

const messagesData: Message[] = [
  {
    id: "msg-1",
    sender: {
      id: "admin-1",
      name: "Admin",
      isAdmin: true
    },
    content: "Welcome to the Sindh Emergency Response team chat. Use this channel for coordination and updates.",
    timestamp: new Date("2023-09-15T09:00:00")
  },
  {
    id: "msg-2",
    sender: {
      id: "team-lead",
      name: "Team Lead",
      avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
      isAdmin: false
    },
    content: "Teams A and B have been deployed to Badin district. Initial assessment shows severe flooding in at least 12 villages.",
    timestamp: new Date("2023-09-15T10:15:00")
  },
  {
    id: "msg-3",
    sender: {
      id: "member-1",
      name: "Rescue Officer",
      isAdmin: false
    },
    content: "We need additional boats for evacuation in Thatta area. Roads are completely submerged.",
    timestamp: new Date("2023-09-15T11:30:00")
  },
  {
    id: "msg-4",
    sender: {
      id: "admin-1",
      name: "Admin",
      isAdmin: true
    },
    content: "Additional resources approved. 5 more boats and emergency supplies will be dispatched within 3 hours.",
    timestamp: new Date("2023-09-15T12:45:00")
  },
  {
    id: "msg-5",
    sender: {
      id: "medical-lead",
      name: "Medical Officer",
      isAdmin: false
    },
    content: "Setting up medical camp in Badin. Seeing cases of water-borne diseases and need additional antibiotics.",
    timestamp: new Date("2023-09-15T14:20:00")
  }
];

// API mock functions
export const fetchDisasters = async (): Promise<Disaster[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return disastersData;
};

export const fetchDisasterById = async (id: string): Promise<Disaster | null> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  const disaster = disastersData.find(d => d.id === id);
  return disaster || null;
};

export const updateDisasterDonation = async (id: string, amount: number): Promise<void> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));

  const disaster = disastersData.find(d => d.id === id);
  if (disaster) {
    // Update the donation amount
    disaster.donationCurrent = Math.min(disaster.donationTarget, disaster.donationCurrent + amount);
  }
};

export const fetchRescueTeams = async (): Promise<RescueTeam[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return rescueTeamsData;
};

export const updateRescueTeamStatus = async (teamId: string, isApproved: boolean): Promise<void> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));

  const team = rescueTeamsData.find(t => t.id === teamId);
  if (team) {
    team.isApproved = isApproved;
  }
};

export const fetchTeamAssignments = async (teamId: string): Promise<Assignment[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  return assignmentsData;
};

export const fetchTeamResources = async (teamId: string): Promise<Resource[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  return resourcesData;
};

export const fetchChatMessages = async (teamId: string): Promise<Message[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  return messagesData;
};

export const updateAssignmentProgress = async (assignmentId: string): Promise<void> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));

  const assignment = assignmentsData.find(a => a.id === assignmentId);
  if (assignment && assignment.progress < 100) {
    // Increment progress by 10%
    assignment.progress = Math.min(100, assignment.progress + 10);

    // If reached 100%, set completion date
    if (assignment.progress === 100) {
      assignment.completedDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    }
  }
};

export const updateResourceStatus = async (resourceId: string): Promise<void> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));

  const resource = resourcesData.find(r => r.id === resourceId);
  if (resource) {
    // Toggle status between "In Transit" and "Deployed"
    resource.status = resource.status === "In Transit" ? "Deployed" : "In Transit";
  }
};

export const addDisaster = async (disasterData: any): Promise<void> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Create a new disaster object
  const newDisaster: Disaster = {
    id: `disaster-${disastersData.length + 1}`,
    title: disasterData.name,
    description: disasterData.description,
    fullContent: disasterData.description,
    type: disasterData.type.charAt(0).toUpperCase() + disasterData.type.slice(1),
    status: disasterData.status.charAt(0).toUpperCase() + disasterData.status.slice(1),
    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    imageUrl: disasterData.imageUrl || "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    location: {
      lat: parseFloat(disasterData.latitude),
      lng: parseFloat(disasterData.longitude),
      region: "Pakistan"
    },
    donationTarget: parseInt(disasterData.donationTarget) || 5000000,
    donationCurrent: 0,
    rescueTeam: rescueTeamsData[0], // Default to first team
    situationPoints: [
      "Situation assessment in progress",
      "Relief teams being mobilized",
      "Extent of damage being evaluated"
    ],
    immediateNeeds: [
      "Emergency supplies",
      "Medical assistance",
      "Evacuation support"
    ]
  };

  // Add to the disasters array
  disastersData.push(newDisaster);
};

export const updateDisaster = async (disasterId: string, disasterData: any): Promise<void> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));

  const disaster = disastersData.find(d => d.id === disasterId);
  if (disaster) {
    // Update the disaster properties
    disaster.title = disasterData.name;
    disaster.description = disasterData.description;
    disaster.fullContent = disasterData.description;
    disaster.type = disasterData.type.charAt(0).toUpperCase() + disasterData.type.slice(1);
    disaster.status = disasterData.status.charAt(0).toUpperCase() + disasterData.status.slice(1);
    disaster.location.lat = parseFloat(disasterData.latitude);
    disaster.location.lng = parseFloat(disasterData.longitude);

    if (disasterData.imageUrl) {
      disaster.imageUrl = disasterData.imageUrl;
    }

    if (disasterData.donationTarget) {
      disaster.donationTarget = parseInt(disasterData.donationTarget);
    }
  }
};

export const deleteDisaster = async (disasterId: string): Promise<void> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Find the index of the disaster to remove
  const index = disastersData.findIndex(d => d.id === disasterId);
  if (index !== -1) {
    // Remove the disaster from the array
    disastersData.splice(index, 1);
  }
};
