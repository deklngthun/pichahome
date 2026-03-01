import React, { createContext, useContext, useState } from 'react';

interface BookingContextType {
  isOpen: boolean;
  openBooking: () => void;
  closeBooking: () => void;
  bookedSlots: Record<string, string[]>; // { "YYYY-MM-DD": ["10:00 AM", "10:30 AM"] }
  addBookedSlot: (dateStr: string, timeStr: string) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [bookedSlots, setBookedSlots] = useState<Record<string, string[]>>({});

  const addBookedSlot = (dateStr: string, timeStr: string) => {
    setBookedSlots(prev => {
      const existing = prev[dateStr] || [];
      if (existing.includes(timeStr)) return prev;
      return {
        ...prev,
        [dateStr]: [...existing, timeStr]
      };
    });
  };

  return (
    <BookingContext.Provider value={{ 
      isOpen, 
      openBooking: () => setIsOpen(true), 
      closeBooking: () => setIsOpen(false),
      bookedSlots,
      addBookedSlot
    }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
