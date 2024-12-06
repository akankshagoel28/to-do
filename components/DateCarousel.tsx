import { format, addDays, parseISO, startOfDay } from "date-fns";

interface DateCarouselProps {
  selectedDate: string;
  onDateSelect: (date: Date) => void;
}

export function DateCarousel({
  selectedDate,
  onDateSelect,
}: DateCarouselProps) {
  const currentDate = parseISO(selectedDate);
  const dates = Array.from({ length: 7 }, (_, i) => {
    return startOfDay(addDays(currentDate, i - 3));
  });

  return (
    <div className="w-full flex justify-center">
      <div className="overflow-x-auto scrollbar-hide w-[300px] sm:w-auto flex justify-start sm:justify-center">
        <div className="min-w-[500px] sm:min-w-0 flex justify-center gap-2">
          {dates.map((date) => {
            const isSelected =
              format(date, "yyyy-MM-dd") === selectedDate;
            return (
              <button
                key={date.toISOString()}
                onClick={() => onDateSelect(date)}
                className={`flex flex-col items-center justify-center w-14 px-2 py-2 rounded-xl text-center transition-colors ${
                  isSelected
                    ? "bg-black text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                <div
                  className={`text-sm uppercase font-semibold ${
                    isSelected ? "text-white" : "text-gray-400"
                  }`}
                >
                  {format(date, "EEEEE")}
                </div>
                <div className="text-xl font-semibold">
                  {format(date, "d")}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
