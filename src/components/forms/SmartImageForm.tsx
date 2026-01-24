import { SmartImage } from "../media/SmartImage";
import { Card, CardHeader, CardContent } from "../data-display/Card";
import { SkeletonText } from "../feedback/Skeleton";


export default function SmartImageForm() {
    return (
        <div className="min-h-screen bg-black/20 p-10 space-y-12 text-white rounded-lg">
            <section>
                <h2 className="text-lg font-bold mb-4">Basic</h2>
                <div className="w-64">
                    <SmartImage
                        src="https://picsum.photos/600/600"
                        ratio={1}
                    />
                </div>
            </section>

            <section>
                <h2 className="text-lg font-bold mb-4">Card usage</h2>
                <Card className="w-100 overflow-hidden">
                    <SmartImage
                        src="https://picsum.photos/800/450"
                        ratio={16 / 9}
                    />
                    <CardHeader>
                        <h3 className="font-semibold">Beautiful Image</h3>
                    </CardHeader>
                    <CardContent className="text-sm text-slate-400">
                        <SkeletonText show={false} />
                        No layout shift - smooth loading
                    </CardContent>
                </Card>
            </section>

            <section>
                <h2 className="text-lg font-bold mb-4">Error fallback</h2>
                <div className="w-64">
                    <SmartImage
                        src="https://broken-url.jpg"
                        ratio={4 / 3}
                        fallback={<span className="text-red-400">Failed</span>}
                    />
                </div>
            </section>

            <section>
                <h2 className="text-lg font-bold mb-4">Grid</h2>
                <div className="w-full grid grid-cols-3 gap-4">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <SmartImage
                            key={i}
                            src={`https://picsum.photos/800/450?random=${i}`}
                            ratio={16 / 9}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
}
