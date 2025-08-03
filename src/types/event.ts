type tier = "free" | "silver" | "gold" | "platinum";

export interface Event {
  id: string;
  title: string;
  description: string;
  event_date: Date;
  image_url: string;
  tier: tier;
}
