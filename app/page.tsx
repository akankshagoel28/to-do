"use client";

import { useState, useEffect } from "react";
import { TodoList } from "../components/TodoList";
import { AddTodo } from "../components/AddTodo";
import { DateCarousel } from "../components/DateCarousel";
import { format, isToday, isTomorrow, isYesterday } from "date-fns";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>("");

  useEffect(() => {
    setSelectedDate(format(new Date(), "yyyy-MM-dd"));
    setMounted(true);
  }, []);

  const getDateDescription = (dateString: string) => {
    const date = new Date(dateString);
    if (isToday(date)) {
      return "Today";
    }
    if (isTomorrow(date)) {
      return "Tomorrow";
    }
    if (isYesterday(date)) {
      return "Yesterday";
    }
    return format(date, "MMMM d, yyyy");
  };

  if (!mounted) {
    return null;
  }

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="container mx-auto max-w-xl">
        <div className="h-screen flex flex-col gap-5">
          <div className="bg-white px-4 py-6 rounded-b-3xl drop-shadow-2xl">
            <div className="mt-6 w-fit mx-auto flex flex-col gap-2">
              <h1 className="text-3xl font-bold text-gray-900">
                onday
              </h1>
              <DateCarousel
                selectedDate={selectedDate}
                onDateSelect={(date) =>
                  setSelectedDate(format(date, "yyyy-MM-dd"))
                }
              />
            </div>
          </div>
          <p className="text-left text-xl font-bold px-4">
            {mounted && selectedDate
              ? getDateDescription(selectedDate)
              : ""}
          </p>
          <div className="flex-1 overflow-auto px-3">
            <div className="space-y-6">
              {selectedDate && (
                <>
                  <TodoList selectedDate={selectedDate} />
                  <AddTodo selectedDate={selectedDate} />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
