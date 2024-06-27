"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useCurrentUser } from "@/hooks/use-current-user";

const testimonials = [
  {
    name: "Inventory management.",
    avatar: "I",
    title: "Agency, product, movement stock, billing",
    description:
      "Manage your stock, your agencies, your products, your customers and your suppliers",
    link: "/agency",
  },
  {
    name: "Human resources.",
    avatar: "H",
    title: "Designer",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi deleniti odio doloribus tempora, facilis aperiam, veritatis maxime fuga omnis eaque quia earum animi repudiandae quo, ipsa ut error minus iure!",
    link: "/ressource",
  },
  {
    name: "Accounting.",
    avatar: "M",
    title: "CEO",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum qui, accusantium facere, rerum omnis aut deserunt harum quae numquam ea amet nihil. Nobis possimus doloribus cum repellendus nemo eveniet quas?",
    link: "/accounting",
  },
  // {
  //   name: "Mary",
  //   avatar: "M",
  //   title: "CFO",
  //   description: "The best in class, definitely worth the premium subscription!",
  // },
];

export const LandingContent = () => {
  const currentUser = useCurrentUser();

  return (
    <div className="px-10 pb-20">
      <h2 className="text-center text-4xl text-white font-extrabold mb-10">
        Services
      </h2>
      <div className="flex  justify-center gap-4 flex-wrap mt-6">
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4"> */}

        {testimonials.map((item) => (
          // <Card key={item.description} className=" border-none shadow-lg ">
          //   <CardHeader>
          //     <CardTitle className="flex items-center gap-x-2">
          //       <div>
          //         <p className="text-lg">{item.name}</p>
          //         <p className="text-zinc-400 text-sm">{item.title}</p>
          //       </div>
          //     </CardTitle>
          //     <CardContent className="pt-4 px-0">
          //       {item.description}
          //     </CardContent>
          //     <CardFooter className=" self-stretch">
          //       <Link href={item.link}>
          //         <Button className="md:text-lg p-4 md:p-6 rounded-full font-semibold">
          //           Get started
          //         </Button>
          //       </Link>
          //     </CardFooter>
          //   </CardHeader>
          // </Card>

          <Card
            key={item.avatar}
            className={cn("w-[300px] flex flex-col justify-between", {
              "border-2 border-primary": item.name === "Inventory management.",
            })}
          >
            <CardHeader>
              <CardTitle
                className={cn("", {
                  "text-muted-foreground py-3":
                    item.name !== "Inventory management.",
                })}
              >
                {item.name}
              </CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <span className="text-4xl font-bold">5000</span>
              <span className="text-muted-foreground">
                <span>/ mo</span>
              </span>
            </CardContent>
            <CardFooter className="flex flex-col items-start gap-4">
              <Link
                href={item.link}
                className={cn(
                  "w-full text-center  text-white bg-primary p-2 rounded-md hover:bg-slate-300",
                  {
                    "!bg-muted-foreground":
                      item.name !== "Inventory management.",
                  }
                )}
              >
                Get Started
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};
