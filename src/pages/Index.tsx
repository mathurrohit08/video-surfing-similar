
import { Categories } from "@/components/Categories";
import { SearchBar } from "@/components/SearchBar";
import { VideoCard } from "@/components/VideoCard";
import { videos } from "@/data/videos";
import { useSearchParams } from "react-router-dom";
import { UserNav } from "@/components/UserNav";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { Video } from "@/types/video";
import { toast } from "sonner";

const Index = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q")?.toLowerCase() || "";
  const category = searchParams.get("category") || "All";
  const [localVideos, setLocalVideos] = useState<Video[]>([]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Create a local URL for the uploaded video thumbnail
    const thumbnailUrl = URL.createObjectURL(file);

    // Create a new video object
    const newVideo: Video = {
      id: Date.now(),
      thumbnail: thumbnailUrl,
      title: file.name.replace(/\.[^/.]+$/, ""),
      views: 0,
      createdAt: new Date(),
      channelName: "Your Channel",
      duration: "0:00", // You would need to calculate this from the actual video
      category: category === "All" ? "Technology" : category,
    };

    setLocalVideos((prev) => [newVideo, ...prev]);
    toast.success("Video uploaded successfully!");
  };

  const allVideos = [...localVideos, ...videos];
  const filteredVideos = allVideos.filter((video) => {
    const matchesSearch = video.title.toLowerCase().includes(searchQuery) ||
                         video.channelName.toLowerCase().includes(searchQuery);
    const matchesCategory = category === "All" || video.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 animate-gradient">
              VideoShare
            </h1>
            <div className="flex-1 max-w-2xl">
              <SearchBar />
            </div>
            <UserNav />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 animate-fade-in">
        <div className="flex justify-between items-center mb-6">
          <Categories />
          <div className="relative">
            <input
              type="file"
              accept="video/*"
              onChange={handleFileUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              aria-label="Upload video"
            />
            <Button
              className="group relative overflow-hidden"
              variant="default"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 animate-gradient group-hover:bg-gradient-to-l transition-all duration-500">
                Add Video
              </span>
            </Button>
          </div>
        </div>
        
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredVideos.map((video) => (
            <VideoCard key={video.id} {...video} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Index;
