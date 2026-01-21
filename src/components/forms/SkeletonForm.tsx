import { SkeletonAvatar, SkeletonButton, SkeletonCard, SkeletonTable, SkeletonText } from "../feedback/Skeleton";
import { Typography } from "../base/Typography";

export const SkeletonForm = () => {
    return (
        <div className="flex flex-col gap-6 p-6 max-w-2xl mx-auto">
            <div className="flex items-center gap-4">
                <SkeletonAvatar size="lg" shape="circle" />
                <div>
                    <SkeletonText lines={1} className="w-48 h-8" />
                    <SkeletonText lines={1} className="w-32 h-4" />
                </div>
            </div>

            <div className="bg-glass-surface p-6 rounded-xl border border-glass-border">
                <SkeletonText lines={6} />
                <div className="mt-6 flex gap-4">
                    <SkeletonButton />
                    <SkeletonButton className="bg-transparent border border-white/10" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
            </div>

            <div>
                <Typography variant="h3" className="mb-4">User List</Typography>
                <SkeletonTable rows={6} columns={3} className="space-y-3"/>
            </div>
        </div>
    );
};
