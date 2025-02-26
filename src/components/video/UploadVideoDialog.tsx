
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
import { toast } from "sonner";
import { Video } from "@/types/video";

interface UploadVideoDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onVideoUploaded: (video: Video) => void;
  currentCategory: string;
}

export const UploadVideoDialog = ({ isOpen, onOpenChange, onVideoUploaded, currentCategory }: UploadVideoDialogProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [title, setTitle] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('video/')) {
      setSelectedFile(file);
      setTitle(file.name.replace(/\.[^/.]+$/, ""));
    } else {
      toast.error("Please upload a video file");
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

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
      category: currentCategory === "All" ? "Technology" : currentCategory,
    };

    onVideoUploaded(newVideo);
    onOpenChange(false);
    setSelectedFile(null);
    setTitle("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
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
  );
};
