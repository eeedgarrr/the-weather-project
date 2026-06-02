// reference: https://data.weather.gov.hk/weatherAPI/doc/HKO_Open_Data_API_Documentation.pdf
// Current Weather Report (rhrread) Response Schema

export interface HkoPlaceValue {
  place: string;
  value: number;
  unit: string;
}

export interface HkoRainfallRecord {
  unit: string;
  place: string;
  max: number;
  main: string;
}

export interface HkoRainfall {
  data: HkoRainfallRecord[];
  startTime: string;
  endTime: string;
}

export interface HkoTemperature {
  data: HkoPlaceValue[];
  recordTime: string;
}

export interface HkoHumidity {
  data: HkoPlaceValue[];
  recordTime: string;
}

export interface HkoLightningRecord {
  place: string;
  occur: string;
}

export interface HkoLightning {
  data: HkoLightningRecord[];
  startTime: string;
  endTime: string;
}

export interface HkoCurrentWeatherReport {
  rainfall: HkoRainfall;
  icon: number[];
  iconUpdateTime: string;
  uvindex: string | Record<string, unknown>;
  updateTime: string;
  temperature: HkoTemperature;
  warningMessage: string | string[];
  mintempFrom00To09: string;
  rainfallFrom00To12: string;
  rainfallLastMonth: string;
  rainfallJanuaryToLastMonth: string;
  tcmessage: string | string[];
  humidity: HkoHumidity;
  lightning?: HkoLightning;
}
