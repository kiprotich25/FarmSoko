import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";




export default function UserAvatar({ username }) {
  const initials = username?.trim()
    ? username.trim().split(" ").map(w => w.charAt(0).toUpperCase()).join("")
    : "U";

  return (
    <Avatar className="bg-azure text-black">
      <AvatarFallback>{initials}</AvatarFallback>
    </Avatar>
  );
}

