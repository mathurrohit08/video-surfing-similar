
import { Categories } from "@/components/Categories";
import { SearchBar } from "@/components/SearchBar";
import { VideoCard } from "@/components/VideoCard";

// Mock data for demonstration
const videos = [
  {
    id: 1,
    thumbnail: "https://picsum.photos/seed/1/640/360",
    title: "Amazing Sunset Time-lapse in 4K",
    views: 1234567,
    createdAt: new Date("2024-03-01"),
    channelName: "Nature Channel",
    duration: "10:23",
  },
  {
    id: 2,
    thumbnail: "https://picsum.photos/seed/2/640/360",
    title: "Learn Web Development in 30 Days",
    views: 892345,
    createdAt: new Date("2024-03-05"),
    channelName: "Tech Academy",
    duration: "15:45",
  },
  {
    id: 3,
    thumbnail: "https://picsum.photos/seed/3/640/360",
    title: "Top 10 Travel Destinations 2024",
    views: 567890,
    createdAt: new Date("2024-03-08"),
    channelName: "Travel Guide",
    duration: "8:56",
  },
  // Add more mock videos as needed
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-4">
          <SearchBar />
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 animate-fade-in">
        <Categories />
        
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {videos.map((video) => (
            <VideoCard key={video.id} {...video} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Index;
