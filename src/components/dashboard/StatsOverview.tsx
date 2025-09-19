import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Calendar, MessageCircle, TrendingUp } from "lucide-react";

export const StatsOverview = () => {
  const stats = [
    {
      title: "Total Alumni",
      value: "2,847",
      change: "+12%",
      icon: Users,
      variant: "professional" as const,
    },
    {
      title: "Active Events",
      value: "23",
      change: "+5%",
      icon: Calendar,
      variant: "highlight" as const,
    },
    {
      title: "Pending Matches",
      value: "8",
      change: "New",
      icon: MessageCircle,
      variant: "elevated" as const,
    },
    {
      title: "Success Rate",
      value: "94%",
      change: "+3%",
      icon: TrendingUp,
      variant: "professional" as const,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title} variant={stat.variant}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="success" className="text-xs">
                  {stat.change}
                </Badge>
                <p className="text-xs text-muted-foreground">from last month</p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};