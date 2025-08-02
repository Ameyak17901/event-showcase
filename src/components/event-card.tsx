import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const EventCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Event card</CardTitle>
        <CardDescription>Arijit Singh concert</CardDescription>
      </CardHeader>
      <CardContent>
        <p>event time</p>
        <p><span>Tier</span></p>
        <span>image url</span>
      </CardContent>
    </Card>
  );
};
