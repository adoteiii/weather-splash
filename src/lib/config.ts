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
    city: "New York",
    country: "United States",
    coord: {
      lat: "40.7127753",
      lon: "-74.0059728"
    }
  },
  {
    city: "Shanghai",
    country: "China",
    coord: {
      lat: "31.2222226",
      lon: "121.458069"
    }
  },
  {
    city: "Tokyo",
    country: "Japan",
    coord: {
      lat: "35.6764225",
      lon: "139.650027"
    }
  },
  {
    city: "Sydney",
    country: "Australia",
    coord: {
      lat: "-33.8688197",
      lon: "151.2092955"
    }
  },
  {
    city: "São Paulo",
    country: "Brazil",
    coord: {
      lat: "-23.5475493",
      lon: "-46.6358888"
    }
  }
];
