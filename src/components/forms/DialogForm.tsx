import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogTrigger,
} from "../overlay/Dialog";
import { Button } from "../base/Button";
import { CgProfile } from "react-icons/cg";
import { Input } from "../base/Input";

export const DialogForm = () => {
    const [open, setOpen] = useState(false);
    const handleSave = () => {
        console.log("Saved!");
        setOpen(false);
    };

    return (
        <div className="flex-center h-screen bg-slate-900">
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger variant="secondary">Edit Profile</DialogTrigger>

                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Personal Profile</DialogTitle>
                        <DialogDescription>
                            Update your personal information here. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="name" className="text-right text-sm text-slate-300">
                                Name
                            </label>
                            <Input id="name" defaultValue="Nguyen Van A" wrapperClassName="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="username" className="text-right text-sm text-slate-300">
                                Username
                            </label>
                            <Input
                                id="username"
                                defaultValue="@nguyenvana"
                                wrapperClassName="col-span-3"
                                icon={<CgProfile />}
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="ghost" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" onClick={handleSave}>
                            Save
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};
