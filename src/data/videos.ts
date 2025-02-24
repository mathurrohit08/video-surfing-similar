
import { Video } from "@/types/video";

export const videos: Video[] = [
  {
    id: 1,
    thumbnail: "https://picsum.photos/seed/1/640/360",
    title: "Amazing Sunset Time-lapse in 4K",
    views: 1234567,
    createdAt: new Date("2024-03-01"),
    channelName: "Nature Channel",
    duration: "10:23",
    category: "All",
  },
  {
    id: 2,
    thumbnail: "https://picsum.photos/seed/2/640/360",
    title: "Learn Web Development in 30 Days",
    views: 892345,
    createdAt: new Date("2024-03-05"),
    channelName: "Tech Academy",
    duration: "15:45",
    category: "Education",
  },
  // Add more videos for each category
  {
    id: 3,
    thumbnail: "https://picsum.photos/seed/3/640/360",
    title: "Top 10 Travel Destinations 2024",
    views: 567890,
    createdAt: new Date("2024-03-08"),
    channelName: "Travel Guide",
    duration: "8:56",
    category: "Travel",
  },
  // Add videos for Music category
  {
    id: 4,
    thumbnail: "https://picsum.photos/seed/4/640/360",
    title: "New Pop Music Mix 2024",
    views: 789012,
    createdAt: new Date("2024-03-10"),
    channelName: "Music World",
    duration: "45:20",
    category: "Music",
  },
  // Add videos for Gaming category
  {
    id: 5,
    thumbnail: "https://picsum.photos/seed/5/640/360",
    title: "Minecraft Survival Guide",
    views: 234567,
    createdAt: new Date("2024-03-12"),
    channelName: "Gaming Pro",
    duration: "20:15",
    category: "Gaming",
  },
  // Add more videos as needed
];
