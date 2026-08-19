"use client"

import Image from "next/image";
import Banner from "./components/homeComponent/Banner";
import FeaturedProperties from "./components/homeComponent/FeaturedProperties";
import ContactUs from "./components/homeComponent/ContactUs";
import Accordian from "./components/homeComponent/Accordian";
import Hello from "./components/homeComponent/Hello";
import BrowseCategory from "./components/homeComponent/BrowseCategory";
import SeamLess from "./components/homeComponent/SeamLess";

export default function websiteHomePage() {





  return (
    <section suppressHydrationWarning >
      

      <Banner />
      <FeaturedProperties />
      <BrowseCategory/>
      <SeamLess/>
      <ContactUs />
      <Accordian />
    </section>
  );
}
