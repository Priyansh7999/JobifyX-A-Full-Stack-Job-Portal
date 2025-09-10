// landing page with hero section, companies carousel, features section, cards section, and FAQ section
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import companies from "../data/companies.json";
import faqs from "../data/faq.json";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "react-router-dom";
import { WobbleCard } from "@/components/ui/wobble-card";
export default function LandingPage() {
  return (
    <main className='flex flex-col gap-10 sm:gap-20 py-10 sm:py-20'>

      {/* HEADING */}
      <section className='text-center'>
        <h1 className='flex flex-col items-center justify-center gradient-title text-4xl font-extrabold sm:text-6xl lg:text-8xl tracking-tight py-4'>
          Find Your Dream Job
          <span className='flex items-center gap-2 sm:gap-6'>With
            <img
              src='/logo.png'
              alt='logo'
              className='h-20 sm:h-32 lg:h-40 pt-3' />
          </span>
        </h1>
        <p className='text-gray-300 sm:mt-4 text-xs sm:text-xl'>
          Explore 1000+ job opportunities with all the information you need. Its your future. Come find it.
        </p>
      </section>

      {/* BUTTONS */}
      <div className='flex items-center justify-center gap-4 sm:gap-10'>
        <Link to="/jobs">
          <Button variant="blue" size="xl">Find Jobs</Button>
        </Link>
        <Link to="/post-job">
          <Button variant="destructive" size="xl">
            Post a Job
          </Button>
        </Link>
      </div>

      {/* COMPANIES CAROUSEL */}
      <Carousel
        plugins={[
          Autoplay({
            delay: 1000,
          }),
        ]}
        className="w-full py-10"
      >
        <CarouselContent className="flex gap-5 sm:gap-20 items-center">
          {companies.map(({ name, id, path }) => (
            <CarouselItem key={id} className="basis-1/3 lg:basis-1/6 ">
              <img
                src={path}
                alt={name}
                className="h-9 sm:h-14 object-contain"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* FEATURES */}
      <section>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full">

          {/* Main Feature Card */}
          <WobbleCard
            containerClassName="col-span-1 lg:col-span-2 h-full bg-pink-800 min-h-[500px] lg:min-h-[300px]"
            className=""
          >
            <div className="max-w-xs">
              <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                Empowering Careers with JobifyX
              </h2>
              <p className="mt-4 text-left text-base/6 text-neutral-200">
                Explore job opportunities, upload your resume, and track applications in real-time — all in one intuitive platform for job seekers and recruiters.
              </p>
            </div>
            <img
              src="/logo.png"
              width={500}
              height={500}
              alt="JobifyX logo"
              className="absolute -right-4 lg:-right-[2%] grayscale filter -bottom-10 object-contain rounded-2xl"
            />
          </WobbleCard>

          {/* Quick Feature or CTA Card */}
          <WobbleCard containerClassName="col-span-1 min-h-[300px] bg-gray-900">
            <h2 className="max-w-80 text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
              For Recruiters and Candidates
            </h2>
            <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200">
              Whether you're hiring or job hunting, JobifyX makes the process fast, transparent, and hassle-free.
            </p>
          </WobbleCard>

          {/* Call to Action or Promo Card */}
          <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-blue-900 min-h-[500px] lg:min-h-[600px] xl:min-h-[300px]">
            <div className="max-w-sm">
              <h2 className="max-w-sm md:max-w-lg text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                Join JobifyX Today and Transform Your Career
              </h2>
              <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200">
                Sign up now to access powerful tools for job applications, real-time status tracking, resume uploads, and more.
              </p>
            </div>
            <img
              src="/banner.jpeg"
              width={500}
              height={500}
              alt="JobifyX banner"
              className="absolute -right-1 md:-right-[5%] lg:-right-[5%] -bottom-10 object-contain rounded-2xl"
            />
          </WobbleCard>

        </div>
      </section>


      {/* CARDS */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="font-bold">For Job Seekers</CardTitle>
          </CardHeader>
          <CardContent>
            Search and apply for jobs, track applications, and more.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="font-bold">For Employers</CardTitle>
          </CardHeader>
          <CardContent>
            Post jobs, manage applications, and find the best candidates.
          </CardContent>
        </Card>
      </section>

      {/* FAQ */}
      <section >
        <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-b">
              <AccordionTrigger className="py-4 text-left w-full">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="pb-4 text-left text-sm text-gray-300">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </main>
  )
}
