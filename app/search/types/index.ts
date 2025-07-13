export interface City {
  name: string;
  code: string;
  url: string;
}

export interface QuickSearchLink {
  title: string;
  city: string;
  popular?: boolean;
}

export type RoomType = "sharing" | "double" | "triple" | "quad";

export interface SearchFormData {
  city: City;
  roomType: RoomType;
  guestCount: number;
}
