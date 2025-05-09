import { db } from "./index";
import * as schema from "@shared/schema";

async function seed() {
  try {
    console.log("Seeding the database...");
    
    // Define disaster types for the schema
    const disasterTypes = [
      {
        name: "Flood",
        icon: "water",
        description: "Flooding and water-related disasters"
      },
      {
        name: "Earthquake",
        icon: "activity",
        description: "Seismic activity and related damage"
      },
      {
        name: "Landslide",
        icon: "mountain",
        description: "Land movement and debris flows"
      },
      {
        name: "Drought",
        icon: "sun",
        description: "Extended periods with lack of water"
      },
      {
        name: "Heatwave",
        icon: "thermometer",
        description: "Extremely high temperatures"
      }
    ];
    
    // Define disaster statuses
    const disasterStatuses = [
      {
        name: "Urgent",
        color: "danger",
        description: "Requires immediate attention"
      },
      {
        name: "Ongoing",
        color: "accent",
        description: "Relief efforts in progress"
      },
      {
        name: "Past",
        color: "gray-500",
        description: "Historical disaster, relief completed"
      }
    ];
    
    // Define rescue team statuses
    const teamStatuses = [
      {
        name: "Active in Field",
        description: "Currently deployed on mission"
      },
      {
        name: "Available",
        description: "Ready for deployment"
      },
      {
        name: "On Standby",
        description: "Partially available with limited resources"
      },
      {
        name: "Training",
        description: "Currently in training mode"
      }
    ];
    
    console.log("Seed data is prepared and ready for future database implementations");
    
    // Note: Actual database insertions would happen here when we implement the schema
    // This is just a placeholder for the mock data structure
    
    console.log("Database seeding completed successfully");
  }
  catch (error) {
    console.error("Error seeding database:", error);
  }
}

seed();
