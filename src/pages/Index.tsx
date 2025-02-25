
import { Categories } from "@/components/Categories";
import { SearchBar } from "@/components/SearchBar";
import { VideoCard } from "@/components/VideoCard";
import { videos } from "@/data/videos";
import { useSearchParams } from "react-router-dom";
import { UserNav } from "@/components/UserNav";
import { Button } from "@/components/ui/button";
import { PlusCircle, Upload } from "lucide-react";
import { useState, useCallback, useRef } from "react";
import { Video } from "@/types/video";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Index = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q")?.toLowerCase() || "";
  const category = searchParams.get("category") || "All";
  const [localVideos, setLocalVideos] = useState<Video[]>([]);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [title, setTitle] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('video/')) {
      setSelectedFile(file);
      setTitle(file.name.replace(/\.[^/.]+$/, ""));
    } else {
      toast.error("Please upload a video file");
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setTitle(file.name.replace(/\.[^/.]+$/, ""));
    }
  };

  const handleTitleClick = () => {
    if (!selectedFile && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleUpload = () => {
    if (!selectedFile) {
      toast.error("Please select a video file");
      return;
    }

    if (!title.trim()) {
      toast.error("Please provide a title for the video");
      return;
    }

    const thumbnailUrl = URL.createObjectURL(selectedFile);
    const newVideo: Video = {
      id: Date.now(),
      thumbnail: thumbnailUrl,
      title: title.trim(),
      views: 0,
      createdAt: new Date(),
      channelName: "Your Channel",
      duration: "0:00",
      category: category === "All" ? "Technology" : category,
    };

    setLocalVideos((prev) => [newVideo, ...prev]);
    toast.success("Video uploaded successfully!");
    setIsUploadOpen(false);
    setSelectedFile(null);
    setTitle("");
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
        <div className="container mx-auto px-2 sm:px-4 py-2 sm:py-4">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            <h1 className="heading-responsive font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 animate-gradient truncate">
              VideoShare
            </h1>
            <div className="flex-1 max-w-2xl">
              <SearchBar />
            </div>
            <UserNav />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-2 sm:px-4 py-4 sm:py-6 animate-fade-in">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="w-full sm:w-auto overflow-x-auto scrollbar-thin">
            <Categories />
          </div>
          <Button
            className="group relative overflow-hidden w-full sm:w-auto"
            variant="default"
            onClick={() => setIsUploadOpen(true)}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 animate-gradient group-hover:bg-gradient-to-l transition-all duration-500 text-responsive">
              Add Video
            </span>
          </Button>
        </div>
        
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredVideos.map((video) => (
            <VideoCard key={video.id} {...video} />
          ))}
        </div>
      </main>

      <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
        <DialogContent className="sm:max-w-[425px] mx-2 sm:mx-auto">
          <DialogHeader>
            <DialogTitle className="text-responsive">Upload Video</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title" className="text-responsive">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter video title"
                onClick={handleTitleClick}
                className="text-responsive"
              />
            </div>
            <div
              className={`border-2 border-dashed rounded-lg p-4 sm:p-8 text-center cursor-pointer transition-colors ${
                isDragging ? "border-purple-500 bg-purple-50" : "border-gray-300"
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="flex flex-col items-center gap-2">
                <Upload className="h-6 w-6 sm:h-8 sm:w-8 text-gray-400" />
                <p className="text-responsive text-gray-600">
                  {selectedFile ? selectedFile.name : "Drag & drop your video or click to browse"}
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="video/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>
            </div>
            <Button 
              onClick={handleUpload} 
              className="w-full text-responsive"
              disabled={!selectedFile || !title.trim()}
            >
              Upload Video
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;

