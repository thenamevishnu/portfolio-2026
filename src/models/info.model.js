import { model, models, Schema } from "mongoose";

const ButtonSchema = new Schema({
    label: { type: String, required: true },
    link: { type: String, required: true }
}, { _id: false });

const ExperienceItemSchema = new Schema({
    id: { type: String, required: true },
    role: { type: String, required: true },
    company: { type: String, required: true },
    period: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: [String], required: true }
}, { _id: false });

const linkSchema = new Schema({
    type: { type: String, required: true },
    link: { type: String, required: true },
}, { _id: false });

const PortfolioItemSchema = new Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    tech: { type: [String], required: true },
    link: [linkSchema]
}, { _id: false });

const ExpertiseItemSchema = new Schema({
    category: { type: String, required: true },
    subtitle: { type: String, required: true },
    skills: { type: [String], required: true }
}, { _id: false });

const ReviewItemSchema = new Schema({
    name: { type: String, required: true },
    role: { type: String, required: true },
    image: { type: String, required: true },
    rating: { type: Number, required: true },
    description: { type: String, required: true }
}, { _id: false });

const SocialItemSchema = new Schema({
    name: { type: String, required: true },
    url: { type: String, required: true }
}, { _id: false });

const StatItemSchema = new Schema({
    label: { type: String, required: true },
    value: { type: String, required: true }
}, { _id: false });

const infoSchema = new Schema({
    profile: {
        name: { type: String, required: true }
    },
    stat: [StatItemSchema],
    projects: {
        completed: { type: String, required: true },
        satisfied_clients: { type: String, required: true }
    },
    nav_links: { type: [String], required: true },
    hero: {
        label: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
        buttons: [ButtonSchema]
    },
    about: {
        label: { type: String, required: true },
        title: { type: String, required: true },
        description1: { type: String, required: true },
        description2: { type: String, required: true },
        button: ButtonSchema
    },
    experience: {
        label: { type: String, required: true },
        title: { type: String, required: true },
        list: [ExperienceItemSchema]
    },
    portfolio: {
        label: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
        list: [PortfolioItemSchema]
    },
    expertise: {
        label: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
        list: [ExpertiseItemSchema]
    },
    reviews: {
        label: { type: String, required: true },
        title: { type: String, required: true },
        list: [ReviewItemSchema]
    },
    contact: {
        label: { type: String, required: true },
        title: { type: String, required: true },
        info: {
            email: { type: String, required: true },
            phone: { type: String, required: true }
        }
    },
    social: {
        list: [SocialItemSchema]
    }
}, { timestamps: true });

export const Me = models.MyInfos || model("MyInfos", infoSchema);