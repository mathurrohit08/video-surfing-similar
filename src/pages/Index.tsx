
import { Categories } from "@/components/Categories";
import { videos } from "@/data/videos";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { Video } from "@/types/video";
import { Header } from "@/components/layout/Header";
import { MobileMenu } from "@/components/video/MobileMenu";
import { VideoGrid } from "@/components/video/VideoGrid";
import { UploadVideoDialog } from "@/components/video/UploadVideoDialog";

const Index = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q")?.toLowerCase() || "";
  const category = searchParams.get("category") || "All";
  const [localVideos, setLocalVideos] = useState<Video[]>([]);
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const allVideos = [...localVideos, ...videos];
  const filteredVideos = allVideos.filter((video) => {
    const matchesSearch = video.title.toLowerCase().includes(searchQuery) ||
                         video.channelName.toLowerCase().includes(searchQuery);
    const matchesCategory = category === "All" || video.category === category;
    return matchesSearch && matchesCategory;
  });

  const handleVideoUploaded = (newVideo: Video) => {
    setLocalVideos((prev) => [newVideo, ...prev]);
  };

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800 dark:from-slate-900 dark:to-slate-700 opacity-20"></div>
      
      <Header />

      <main className="container mx-auto px-2 sm:px-4 py-4 sm:py-6 animate-fade-in">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="w-full sm:w-auto">
            <div className="block sm:hidden">
              <MobileMenu />
            </div>
            <div className="hidden sm:block overflow-x-auto scrollbar-thin">
              <Categories />
            </div>
          </div>
          <Button
            className="group relative overflow-hidden w-full sm:w-auto"
            variant="default"
            onClick={() => setIsUploadOpen(true)}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 animate-gradient group-hover:bg-gradient-to-l transition-all duration-500">
              Add Video
            </span>
          </Button>
        </div>
        
        <VideoGrid videos={filteredVideos} />
      </main>

      <UploadVideoDialog
        isOpen={isUploadOpen}
        onOpenChange={setIsUploadOpen}
        onVideoUploaded={handleVideoUploaded}
        currentCategory={category}
      />
    </div>
  );
};

export default Index;
