import type { StaticImageData } from "next/image";

import arrayClouds from "@/assets/images/array-clouds.jpg";
import arrayTrees from "@/assets/images/array-trees.jpg";
import commercialRooftop from "@/assets/images/commercial-rooftop.jpg";
import electricianPanel from "@/assets/images/electrician-panel.jpg";
import groundArrayGrass from "@/assets/images/ground-array-grass.jpg";
import groundArraySky from "@/assets/images/ground-array-sky.jpg";
import heroArraySky from "@/assets/images/hero-array-sky.jpg";
import heroRooftopInstall from "@/assets/images/hero-rooftop-install.jpg";
import hybridDusk from "@/assets/images/hybrid-dusk.jpg";
import modernHome from "@/assets/images/modern-home.jpg";
import panelTexture from "@/assets/images/panel-texture.jpg";
import residentialRoof from "@/assets/images/residential-roof.jpg";
import rooftopSurveyTeam from "@/assets/images/rooftop-survey-team.jpg";
import ruralHillsideArray from "@/assets/images/rural-hillside-array.jpg";
import waterHeaterRoof from "@/assets/images/water-heater-roof.jpg";
import wiringHands from "@/assets/images/wiring-hands.jpg";

export type SiteImage = {
  src: StaticImageData;
  alt: string;
  /** Focal point used as CSS object-position when the image is cropped. Defaults to centre. */
  position?: string;
  /** Overrides for wide, full-bleed backgrounds where text covers the left side. */
  background?: { position?: string; flip?: boolean };
  credit: { author: string; source: string; license: string; url: string };
};

const unsplash = (id: string) => ({
  author: "Unsplash photographer (see original)",
  source: "Unsplash",
  license: "Unsplash License",
  url: `https://unsplash.com/photos/${id}`,
});

/**
 * All photography is stock imagery used for illustration. None of it shows
 * work carried out by Sunpeak, which is a fictional company.
 */
const imageData = {
  heroArraySky: {
    src: heroArraySky,
    alt: "Rows of tilted solar panels beneath a wide blue sky with wispy clouds",
    credit: unsplash("1508514177221-188b1cf16e9d"),
  },
  heroRooftopInstall: {
    src: heroRooftopInstall,
    alt: "Installer lifting a solar panel into place on a pitched roof under a clear blue sky",
    background: { position: "50% 30%", flip: true },
    credit: unsplash("1624397640148-949b1732bb0a"),
  },
  residentialRoof: {
    src: residentialRoof,
    alt: "Solar panels covering one side of a pitched house roof, framed by trees",
    position: "50% 60%",
    background: { position: "50% 45%" },
    credit: unsplash("1655300256620-680cb0f1cec3"),
  },
  commercialRooftop: {
    src: commercialRooftop,
    alt: "Rows of solar panels on a large flat commercial rooftop at sunset",
    position: "50% 60%",
    credit: unsplash("1613665813446-82a78c468a1d"),
  },
  hybridDusk: {
    src: hybridDusk,
    alt: "Ground-mounted solar panels in front of a low office building at dusk",
    position: "50% 75%",
    credit: unsplash("1611365892117-00ac5ef43c90"),
  },
  electricianPanel: {
    src: electricianPanel,
    alt: "Technician in a hard hat and gloves working on a wall-mounted electrical panel",
    position: "30% 35%",
    background: { position: "50% 22%", flip: true },
    credit: unsplash("1621905251189-08b45d6a269e"),
  },
  wiringHands: {
    src: wiringHands,
    alt: "Gloved hands connecting cables beneath a solar panel frame",
    position: "35% 40%",
    credit: unsplash("1559302504-64aae6ca6b6d"),
  },
  rooftopSurveyTeam: {
    src: rooftopSurveyTeam,
    alt: "Team in safety vests surveying a large rooftop under construction",
    credit: unsplash("1541888946425-d81bb19240f5"),
  },
  panelTexture: {
    src: panelTexture,
    alt: "Close-up of dark blue solar panel cells and aluminium frames",
    credit: unsplash("1625301840055-7c1b7198cfc0"),
  },
  groundArrayGrass: {
    src: groundArrayGrass,
    alt: "Two angled solar panels mounted on open grassland",
    credit: unsplash("1497440001374-f26997328c1b"),
  },
  ruralHillsideArray: {
    src: ruralHillsideArray,
    alt: "Small solar panels arranged on a green hillside below a line of trees",
    credit: unsplash("1592833159155-c62df1b65634"),
  },
  groundArraySky: {
    src: groundArraySky,
    alt: "Ground-mounted solar array on a grassy field beneath a bright blue sky",
    credit: unsplash("1558449028-b53a39d100fc"),
  },
  arrayTrees: {
    src: arrayTrees,
    alt: "Solar panels on a raised frame with leafy trees behind",
    credit: unsplash("1566093097221-ac2335b09e70"),
  },
  arrayClouds: {
    src: arrayClouds,
    alt: "Long row of solar panels in a field under scattered clouds",
    credit: unsplash("1509391366360-2e959784a276"),
  },
  modernHome: {
    src: modernHome,
    alt: "Modern two-storey home with large windows, lit at dusk beneath a mature tree",
    credit: unsplash("1600585154340-be6161a56a0c"),
  },
  waterHeaterRoof: {
    src: waterHeaterRoof,
    alt: "Evacuated-tube solar water heater with a storage tank mounted on a tiled roof",
    position: "50% 60%",
    background: { position: "50% 40%", flip: true },
    credit: {
      author: "Martinvl",
      source: "Wikimedia Commons",
      license: "CC BY-SA 4.0",
      url: "https://commons.wikimedia.org/wiki/File:DomesticSolarHeater_SouthAfrica.jpg",
    },
  },
} satisfies Record<string, SiteImage>;

export type ImageKey = keyof typeof imageData;

export const images: Record<ImageKey, SiteImage> = imageData;
