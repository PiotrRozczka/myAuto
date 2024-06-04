import {InferGetStaticPropsType, NextPage} from "next";
import {getStaticProps} from "next/dist/build/templates/pages";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

import {db} from "@/lib/db";
import {auth} from "@/auth";
import {ChatButton} from "@/components/ChatButton";

const Page = async ({params} : {params:{id:string}})=>{

    const session = await auth();

    const car = await db.car.findFirst({
        where:{
            id:params.id
        },
        include:{
            model:{
                include:{
                    make:true
                }
            },
            images:true,
            owner:true,
            origin:true
        }

    })
    if(!car) return <div>Car not found</div>

    return (
        <main className="flex flex-col w-screen p-8 bg-gray-100 h-screen">
            <div className="flex flex-col gap-5 max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-4xl font-bold text-slate-900">{car.model.make.name} {car.model.name}</h1>
                <div className="flex gap-10">
                    <div className="flex flex-col gap-5 w-1/2">
                        <div className="relative">
                            <Carousel className="w-full">
                                <CarouselContent className="relative">
                                    {car.images.map((image, index) => (
                                        <CarouselItem key={index} className="w-full h-72">
                                            <img className="w-full h-full object-cover rounded-sm" src={image.url}
                                                 alt={car.model.name}/>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselPrevious className="absolute left-0 top-1/2 transform -translate-y-1/2"/>
                                <CarouselNext className="absolute right-0 top-1/2 transform -translate-y-1/2"/>
                            </Carousel>
                        </div>
                        <div className="flex gap-10">
                            <h3 className="text-lg text-slate-700">Owner: {car.owner.name}</h3>
                            <h3 className="text-lg text-slate-700">Origin: {car.origin.name}</h3>
                        </div>
                    </div>
                    <div className="flex flex-col gap-5 w-1/2">
                        <h3 className="text-xl text-primary font-bold">Price: {car.price.toLocaleString()}</h3>
                        <h3 className="text-lg text-slate-700">Year: {car.year}</h3>
                        <h3 className="text-lg text-slate-700">Milage: {car.milage.toLocaleString()} miles</h3>
                        <h3 className="text-lg text-slate-700">Fuel Type: {car.fuel_type}</h3>
                        <h3 className="text-lg text-slate-700">Gear Box Type: {car.transmission_type}</h3>
                        <h3 className="text-lg text-slate-700">City: {car.city}</h3>
                    </div>
                    <ChatButton ownerEmail={car.owner.email}/>
                </div>
            </div>
        </main>

    );
};
export default Page;
