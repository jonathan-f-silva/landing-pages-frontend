import localforage from "localforage";
import dentistImage from "../assets/dentist-sample.png";
import { baseTheme } from "@chakra-ui/react";

export type LinkInfo = {
  href: string;
  description: string;
};

export type ThemeColor = keyof typeof baseTheme.colors;
export const availableColors: ThemeColor[] = [
  "pink",
  "red",
  "orange",
  "yellow",
  "green",
  "teal",
  "cyan",
  "blue",
  "purple",
  "gray",
];

export type Config = {
  footer: {
    text: string;
  };
  header: {
    title: string;
    links: LinkInfo[];
  };
  location: LinkInfo;
  mainLanding: {
    bannerImageURL: string;
    introText: string;
    addSectionButtons: boolean;
  };
  theme: {
    brandColor: ThemeColor;
  };
};

// source: https://dev.to/mpriour/generating-strongly-typed-reducer-actions-for-react-j77
type Setters<T> = {
  [K in keyof T as `set${Capitalize<string & K>}`]: T[K];
};

type ConfigSetters = Setters<Config>;

type ActionsMap = {
  [S in keyof ConfigSetters]: {
    type: S;
    payload: Partial<ConfigSetters[S]>;
  };
};

export type ConfigAction =
  | ActionsMap[keyof ActionsMap]
  | { type: "setConfig"; payload: Partial<Config> }
  | { type: "other" };

export function configReducer(config: Config, action: ConfigAction): Config {
  switch (action.type) {
    case "setFooter": {
      return { ...config, footer: { ...config.footer, ...action.payload } };
    }
    case "setLocation": {
      return { ...config, location: { ...config.location, ...action.payload } };
    }
    case "setMainLanding": {
      return {
        ...config,
        mainLanding: { ...config.mainLanding, ...action.payload },
      };
    }
    case "setHeader": {
      return { ...config, header: { ...config.header, ...action.payload } };
    }
    case "setConfig": {
      return { ...config, ...action.payload };
    }
    case "setTheme": {
      return { ...config, theme: { ...config.theme, ...action.payload } };
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

export async function getConfig() {
  let config = await localforage.getItem<Config>("config");
  console.log("getConfig", config);
  if (!config) config = sampleConfig;
  return config;
}

export async function saveConfig(config: Config) {
  return localforage.setItem("config", config);
}

export const emptyConfig: Config = {
  footer: {
    text: "",
  },
  header: {
    title: "",
    links: [],
  },
  location: {
    href: "",
    description: "",
  },
  mainLanding: {
    bannerImageURL: "",
    introText: "",
    addSectionButtons: false,
  },
  theme: {
    brandColor: "blue",
  },
};

const sampleConfig: Config = {
  footer: {
    text: "© 2023 Vai De Digital! Todos os direitos reservados.",
  },
  header: {
    title: "Clínica Odontológica",
    links: [
      {
        href: "#contact",
        description: "Contato",
      },
      {
        href: "#location",
        description: "Localização",
      },
      {
        href: "/dashboard",
        description: "Dashboard",
      },
      {
        href: "/",
        description: "Home",
      },
    ],
  },
  location: {
    href: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29616.581628772714!2d-49.04017319972907!3d-21.893275947826538!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94bf2202ab90eea3%3A0xb2c6adaca91d8c19!2sIacanga%2C%20SP%2C%2017180-000!5e0!3m2!1spt-BR!2sbr!4v1693317059093!5m2!1spt-BR!2sbr",
    description: "Rua 15 de Novembro, 1234 - Centro - Iacanga/SP",
  },
  mainLanding: {
    bannerImageURL: dentistImage,
    introText:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore..",
    addSectionButtons: true,
  },
  theme: {
    brandColor: "teal",
  },
};
