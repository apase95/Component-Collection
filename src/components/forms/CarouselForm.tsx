import { Card } from "../data-display/Card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../data-display/Carousel";

export const CarouselForm = () => {
    const items = [1, 2, 3, 4, 5];

    return (
        <div className="flex-center min-h-100 bg-transparent p-10">
            <div className="w-full max-w-4xl px-10">
                <Carousel>
                    <CarouselContent>
                        {items.map((item) => (
                            <CarouselItem key={item} className="basis-1/2 md:basis-1/3">
                                <div className="p-1">
                                <Card className="aspect-3/4 flex items-center justify-center bg-[#111] border-[#333]">
                                    <span className="text-4xl font-bold text-white">{item}</span>
                                </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                
                    <CarouselPrevious className="-left-16" />
                    <CarouselNext className="-right-16" />
                </Carousel>
            </div>
        </div>
  );
}
