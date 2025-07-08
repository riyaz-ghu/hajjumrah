import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Blog() {
  const posts = [
    {
      title: "Preparing for Your First Umrah",
      date: "March 15, 2024",
      excerpt: "Essential tips and spiritual preparation for first-time pilgrims.",
    },
    {
      title: "Understanding Hajj Packages",
      date: "March 10, 2024",
      excerpt: "A comprehensive guide to choosing the right Hajj package for your needs.",
    },
    {
      title: "Best Time to Visit Makkah",
      date: "March 5, 2024",
      excerpt: "Learn about the different seasons and when to plan your pilgrimage.",
    },
  ];

  return (
    <main className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Latest Articles</h1>

        <div className="grid gap-6 mb-12">
          {posts.map((post, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{post.date}</p>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{post.excerpt}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link href="/">
            <Button>Return to Homepage</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}