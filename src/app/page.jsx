import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experiences";
import { Expertise } from "@/components/Expertise";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { Testimonials } from "@/components/Testimonials";
import { Fragment } from "react";

const RootPage = () => {
    return <Fragment>
        <Header />
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Expertise />
        <Testimonials />
        <Contact />
        <Footer />
    </Fragment>
}

export default RootPage;