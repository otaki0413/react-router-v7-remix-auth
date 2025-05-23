import {
  LogOut,
  LucideSquareArrowOutUpRight,
  SettingsIcon,
} from "lucide-react";
import { useNavigate, useSubmit } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { useUser } from "~/hooks/use-user";
import { Button } from "./ui/button";

export function UserNav() {
  const user = useUser();
  const submit = useSubmit();
  const navigate = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="size-8 rounded-full">
          <Avatar className="size-8">
            <AvatarImage
              src={
                user?.avatarUrl
                  ? user?.avatarUrl
                  : `https://avatar.vercel.sh/${user?.displayName}`
              }
              alt={user?.displayName ?? "User avatar"}
            />
            <AvatarFallback className="font-bold text-xs uppercase">
              {user?.displayName?.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[160px]" forceMount>
        <DropdownMenuLabel className="flex min-w-0 flex-col">
          <span className="truncate font-semibold text-foreground text-sm">
            {user?.displayName ?? user?.email}
          </span>
          <span className="truncate font-normal text-muted-foreground text-xs">
            {user?.email}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => navigate("/")}>
            <LucideSquareArrowOutUpRight size={16} aria-hidden="true" />
            Home page
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate("/account")}>
            <SettingsIcon size={16} aria-hidden="true" />
            <span>Account</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => {
              setTimeout(() => {
                submit(null, { method: "POST", action: "/auth/logout" });
              }, 100);
            }}
          >
            <LogOut size={16} aria-hidden="true" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
