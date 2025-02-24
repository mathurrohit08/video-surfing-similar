
import { Card } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";

interface VideoCardProps {
  thumbnail: string;
  title: string;
  views: number;
  createdAt: Date;
  channelName: string;
  duration: string;
}

export const VideoCard = ({
  thumbnail,
  title,
  views,
  createdAt,
  channelName,
  duration,
}: VideoCardProps) => {
  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="relative aspect-video overflow-hidden">
        <img
          src={thumbnail}
          alt={title}
          className="object-cover w-full h-full transform transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-0.5 text-xs rounded">
          {duration}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-medium line-clamp-2 mb-1 group-hover:text-gray-700">
          {title}
        </h3>
        <p className="text-sm text-gray-600">{channelName}</p>
        <div className="text-xs text-gray-500 mt-1">
          {views.toLocaleString()} views •{" "}
          {formatDistanceToNow(createdAt, { addSuffix: true })}
        </div>
      </div>
    </Card>
  );
};
