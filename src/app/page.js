"use client"
import Header from '@/sections/Home/Header/Header';

const { Sported, Services, DemandJob, ResumeCarousel, JobPost, Seekper, FindPostJob, LatestNews, } = require("@/sections");

export default function Home() {

  return (
    <>
      <Header />
      <Sported />
      <Services />
      <DemandJob />
      <ResumeCarousel />
      <JobPost />
      <Seekper />
      <FindPostJob />
      <LatestNews />
    </>
  )
}
