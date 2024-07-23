import { Location } from "./types";

export const DEFAULT_LOCATION: Location = {
  city: "Kumasi",
  coord: {
    lat: "6.6884",
    lon: "-1.6244"
  },
  lon: 0,
  lat: 0
};

export const DEFAULT_SUGGESTIONS = [
  {
    description: "Accra, Ghana",
    coord: {
      lat: "5.6037",
      lon: "-0.1870"
    }
  },
  {
    description: "Tamale, Ghana",
    coord: {
      lat: "9.4008",
      lon: "-0.8393"
    }
  },
  {
    description: "Takoradi, Ghana",
    coord: {
      lat: "4.8845",
      lon: "-1.7554"
    }
  },
  {
    description: "Cape Coast, Ghana",
    coord: {
      lat: "5.1054",
      lon: "-1.2466"
    }
  },
  {
    description: "Ho, Ghana",
    coord: {
      lat: "6.6000",
      lon: "0.4700"
    }
  },
];

export const OTHER_LARGE_CITIES = [
  {
    city: "Accra",
    country: "Ghana",
    coord: {
      lat: "5.603716",
      lon: "-0.203224"
    }
  },
  {
    city: "Kumasi",
    country: "Ghana",
    coord: {
      lat: "6.688980",
      lon: "-1.624489"
    }
  },
  {
    city: "Tamale",
    country: "Ghana",
    coord: {
      lat: "9.402790",
      lon: "-0.825580"
    }
  },
  {
    city: "Takoradi",
    country: "Ghana",
    coord: {
      lat: "4.894441",
      lon: "-1.768199"
    }
  },
  {
    city: "Cape Coast",
    country: "Ghana",
    coord: {
      lat: "5.105614",
      lon: "-1.246179"
    }
  }
];
