// app/dashboard/page.tsx

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dumbbell, Utensils, HeartPulse, Flame } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  // Dummy data
  const bodyStats = {
    weight: 75,
    bodyFat: 18,
    bmr: 1800,
    dailyCalories: 2200,
    age: 30,
    sex: "Male",
  };

  const currentIntake = {
    calories: 1200,
    protein: 90,
    carbs: 120,
    fat: 40,
  };

  const foodHistory = [
    { id: 1, name: "Grilled Chicken Salad", calories: 350, time: "08:00 AM", protein: 30, carbs: 12, fat: 15 },
    { id: 2, name: "Quinoa Bowl", calories: 450, time: "12:30 PM", protein: 20, carbs: 50, fat: 18 },
    { id: 3, name: "Protein Shake", calories: 200, time: "03:00 PM", protein: 25, carbs: 10, fat: 5 },
  ];

  const exerciseHistory = [
    { id: 1, name: "Morning Run", duration: 45, caloriesBurned: 300, date: "2024-03-20" },
    { id: 2, name: "Weight Training", duration: 60, caloriesBurned: 450, date: "2024-03-19" },
    { id: 3, name: "Yoga Session", duration: 30, caloriesBurned: 150, date: "2024-03-18" },
  ];

  return (
    <div className="min-h-screen bg-indigo-50 p-8">
      <header className="mb-8 flex items-center gap-4">
        <h1 className="text-4xl font-bold text-indigo-600 drop-shadow-sm">FitFuel</h1>
        <Flame className="h-8 w-8 text-orange-400" />
        <Link href="/dashboard/chat">
          <Button variant="outline" className="ml-auto">
            Open Chat
          </Button>
        </Link>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="bg-white rounded-2xl border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-100 rounded-full">
                <HeartPulse className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Weight</p>
                <p className="text-2xl font-bold">{bodyStats.weight}kg</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white rounded-2xl border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-pink-100 rounded-full">
                <Dumbbell className="h-6 w-6 text-pink-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Daily Calories</p>
                <p className="text-2xl font-bold">{bodyStats.dailyCalories}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white rounded-2xl border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-100 rounded-full">
                <Utensils className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Remaining</p>
                <p className="text-2xl font-bold text-emerald-600">
                  {bodyStats.dailyCalories - currentIntake.calories}kcal
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white rounded-2xl border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-100 rounded-full">
                <Dumbbell className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Active Days</p>
                <p className="text-2xl font-bold">5/7</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Nutrition Section */}
        <Card className="rounded-2xl border-0 shadow-lg">
          <CardHeader className="bg-indigo-600 text-white rounded-t-2xl">
            <CardTitle className="flex items-center gap-2">
              <Utensils className="h-6 w-6" /> Today's Nutrition
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">Calories</span>
                <span className="text-indigo-600 font-bold">
                  {currentIntake.calories}/{bodyStats.dailyCalories}
                </span>
              </div>
              <Progress 
                value={(currentIntake.calories / bodyStats.dailyCalories) * 100} 
                className="h-3 bg-indigo-100 [&>div]:bg-indigo-400 rounded-full"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-pink-50 rounded-xl">
                <p className="text-sm text-pink-600 mb-1">Protein</p>
                <p className="text-xl font-bold">{currentIntake.protein}g</p>
                <Progress 
                  value={(currentIntake.protein / 150) * 100} 
                  className="h-1 mt-2 bg-pink-100 [&>div]:bg-pink-400"
                />
              </div>
              <div className="text-center p-4 bg-emerald-50 rounded-xl">
                <p className="text-sm text-emerald-600 mb-1">Carbs</p>
                <p className="text-xl font-bold">{currentIntake.carbs}g</p>
                <Progress 
                  value={(currentIntake.carbs / 250) * 100} 
                  className="h-1 mt-2 bg-emerald-100 [&>div]:bg-emerald-400"
                />
              </div>
              <div className="text-center p-4 bg-amber-50 rounded-xl">
                <p className="text-sm text-amber-600 mb-1">Fat</p>
                <p className="text-xl font-bold">{currentIntake.fat}g</p>
                <Progress 
                  value={(currentIntake.fat / 60) * 100} 
                  className="h-1 mt-2 bg-amber-100 [&>div]:bg-amber-400"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Exercise Section */}
        <Card className="rounded-2xl border-0 shadow-lg">
          <CardHeader className="bg-emerald-600 text-white rounded-t-2xl">
            <CardTitle className="flex items-center gap-2">
              <Dumbbell className="h-6 w-6" /> Recent Activities
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {exerciseHistory.map((exercise) => (
                <div key={exercise.id} className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm">
                  <div>
                    <p className="font-medium">{exercise.name}</p>
                    <p className="text-sm text-gray-500">{exercise.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-emerald-600 font-bold">{exercise.caloriesBurned}kcal</p>
                    <p className="text-sm text-gray-500">{exercise.duration} mins</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Meal History */}
        <Card className="rounded-2xl border-0 shadow-lg lg:col-span-2">
          <CardHeader className="bg-pink-600 text-white rounded-t-2xl">
            <CardTitle className="flex items-center gap-2">
              <Utensils className="h-6 w-6" /> Meal History
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-pink-600">Time</TableHead>
                  <TableHead className="text-pink-600">Meal</TableHead>
                  <TableHead className="text-pink-600">Calories</TableHead>
                  <TableHead className="text-pink-600">Protein</TableHead>
                  <TableHead className="text-pink-600">Carbs</TableHead>
                  <TableHead className="text-pink-600">Fat</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {foodHistory.map((food) => (
                  <TableRow key={food.id} className="hover:bg-pink-50/50">
                    <TableCell className="font-medium">{food.time}</TableCell>
                    <TableCell>{food.name}</TableCell>
                    <TableCell>{food.calories}kcal</TableCell>
                    <TableCell>{food.protein}g</TableCell>
                    <TableCell>{food.carbs}g</TableCell>
                    <TableCell>{food.fat}g</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}