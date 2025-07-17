import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

export default function UserAvatar({ username, imageUrl }) {
  const initials = username ? username.split(" ").map(w => w[0]).join("") : "U";
  return (
    <Avatar>
      {imageUrl ? (
        <AvatarImage src={imageUrl} />
      ) : (
        <AvatarFallback>{initials}</AvatarFallback>
      )}
    </Avatar>
  );
}
