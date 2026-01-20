import { Avatar, AvatarFallback, AvatarImage } from "../data-display/Avatar"
import { DropdownMenu, 
    DropdownMenuTrigger, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuLabel, 
    DropdownMenuSeparator
 } from "../overlay/DropdownMenu"
import { CgProfile, CgLogOut, CgCreditCard } from "react-icons/cg";

export const DropdownMenuForm = () => {
  return (
    <DropdownMenu>
        <DropdownMenuTrigger>
            <Avatar size="md" className="cursor-pointer hover:ring-2 hover:ring-accent transition-all">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            
            <DropdownMenuItem onClick={() => console.log("Profile")}>
                <CgProfile className="mr-2 h-4 w-4" />
                <span>Profile</span>
            </DropdownMenuItem>
            
            <DropdownMenuItem>
                <CgCreditCard className="mr-2 h-4 w-4" />
                <span>Payment</span>
            </DropdownMenuItem>
            
            <DropdownMenuSeparator />
            
            <DropdownMenuItem className="text-red-400 focus:text-red-400 focus:bg-red-900/20">
                <CgLogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}
