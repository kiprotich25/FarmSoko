import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

export default function UserAvatar({ name, imageUrl }) {
  const initials = name ? name.split(" ").map(w => w[0]).join("") : "U";
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
