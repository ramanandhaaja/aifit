// app/page.tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, Check, ChefHat, Brain, Heart, Salad } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 md:px-6 bg-cover bg-center" style={{ backgroundImage: 'url("/image/hero.jpg")' }}>
        <div className="container mx-auto text-center relative z-10">
          <div className="bg-background/80 backdrop-blur-sm p-8 rounded-lg inline-block">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              AI-Powered Meal Planning
              <br />
              Made <span className="text-primary">Simple</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Get personalized meal recommendations, nutrition insights, and cooking inspiration powered by advanced AI.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/chat">
                <Button size="lg">
                  Try Now <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 md:px-6">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose AIFit?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6">
                <ChefHat className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  Personalized Recommendations
                </h3>
                <p className="text-muted-foreground">
                  Get meal suggestions tailored to your preferences, dietary restrictions, and nutritional goals.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <Brain className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  AI-Powered Intelligence
                </h3>
                <p className="text-muted-foreground">
                  Advanced AI algorithms ensure balanced, healthy, and diverse meal options.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <Heart className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  Health-Focused
                </h3>
                <p className="text-muted-foreground">
                  Every meal is designed with your health and wellness in mind.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 md:px-6 bg-muted/50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Simple, Transparent Pricing
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-2">Basic</h3>
                <p className="text-3xl font-bold mb-4">Free</p>
                <Separator className="my-4" />
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-primary" />
                    Basic meal recommendations
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-primary" />
                    Limited chat interactions
                  </li>
                </ul>
                <Button className="w-full mt-6">Get Started</Button>
              </CardContent>
            </Card>
            <Card className="border-primary">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-2">Pro</h3>
                <p className="text-3xl font-bold mb-4">$9.99/mo</p>
                <Separator className="my-4" />
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-primary" />
                    Advanced meal planning
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-primary" />
                    Unlimited chat
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-primary" />
                    Nutrition tracking
                  </li>
                </ul>
                <Button className="w-full mt-6" variant="default">
                  Choose Pro
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-2">Enterprise</h3>
                <p className="text-3xl font-bold mb-4">Custom</p>
                <Separator className="my-4" />
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-primary" />
                    All Pro features
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-primary" />
                    Custom integration
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-primary" />
                    Priority support
                  </li>
                </ul>
                <Button className="w-full mt-6" variant="outline">
                  Contact Sales
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 md:px-6">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            What Our Users Say
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="ml-4">
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.title}
                      </p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">{testimonial.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-6 bg-primary text-primary-foreground">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Start Your Health Journey Today
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of users who have transformed their meal planning with AI.
          </p>
          <Button size="lg" variant="secondary">
            Get Started Now
          </Button>
        </div>
      </section>
    </div>
  );
}

const testimonials = [
  {
    name: "Sarah Johnson",
    title: "Fitness Enthusiast",
    content: "AIFit has completely transformed how I plan my meals. The AI suggestions are spot-on and save me so much time!"
  },
  {
    name: "Mike Chen",
    title: "Busy Professional",
    content: "As someone with a hectic schedule, having AI-powered meal recommendations has been a game-changer."
  },
  {
    name: "Emma Davis",
    title: "Nutrition Coach",
    content: "I recommend AIFit to all my clients. The personalized recommendations and nutrition insights are invaluable."
  }
];