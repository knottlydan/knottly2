import { AppConfigPublic } from "./types";

export const appConfig: AppConfigPublic = {
  projectName: "Knottly",
  projectSlug: "knottly",
  keywords: [
    "Weddin Planner",
    "Wedding",
    "Organiser",
  ],
  description:
    "Knottly is Your personal AI wedding assistant that actually listens – share your dreams, budget, and style in your own words, and watch perfect vendor matches appear.",
  legal: {
    address: {
      street: "Socio Tower 2",
      city: "Dubai",
      state: "Dubai Hills",
      postalCode: "00000",
      country: "UAE",
    },
    email: "dan@knottly.ai",
    phone: "+971 58 296 0215",
  },
  social: {
    twitter: "https://twitter.com/knottlyai",
    instagram: "https://instagram.com/knottlyai",
    linkedin: "https://linkedin.com/in/danproc/",
    facebook: "https://facebook.com/knottlyai",
    youtube: "https://youtube.com/knottlyai",
  },
  email: {
    senderName: "Knottly",
    senderEmail: "dan@knottly.ai",
  },
  auth: {
    enablePasswordAuth: false, // Set to true to enable password authentication
  },
};
