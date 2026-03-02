import React, { useState } from 'react';
import { useBooking } from '../BookingContext';
import { useLanguage } from '../LanguageContext';
import { X, ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function BookingModal() {
  const { isOpen, closeBooking, bookedSlots, addBookedSlot } = useBooking();
  const { t } = useLanguage();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: ''
  });

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  const daysCount = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  
  const days = Array.from({ length: daysCount }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDay }, (_, i) => i);

  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const isFirstSunday = (date: Date) => {
    if (date.getDay() !== 0) return false;
    // It's a Sunday. Is it the first one?
    return date.getDate() <= 7;
  };

  const isClosedDay = (date: Date) => {
    // Thursday is 4
    if (date.getDay() === 4) return true;
    if (isFirstSunday(date)) return true;
    return false;
  };

  const generateTimeSlots = (date: Date) => {
    const day = date.getDay();
    const isWeekend = day === 0 || day === 6;
    
    // Mon-Fri (except Thu): 9am - 12am (midnight)
    // Sat-Sun: 9am - 6pm
    const startHour = 9;
    const endHour = isWeekend ? 18 : 24; // 18 is 6pm, 24 is midnight

    const slots = [];
    for (let i = startHour; i < endHour; i++) {
      const ampm = i >= 12 && i < 24 ? 'PM' : 'AM';
      const displayHour = i > 12 ? i - 12 : i;
      const hourStr = displayHour === 0 ? 12 : displayHour;
      slots.push(`${hourStr}:00 ${ampm}`);
      slots.push(`${hourStr}:30 ${ampm}`);
    }
    return slots;
  };

  const isSlotBooked = (date: Date, time: string) => {
    const dateStr = date.toISOString().split('T')[0];
    return bookedSlots[dateStr]?.includes(time) || false;
  };

  const handleContinue = () => {
    if (selectedDate && selectedTime) {
      setStep(2);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedDate && selectedTime) {
      const dateStr = selectedDate.toISOString().split('T')[0];
      addBookedSlot(dateStr, selectedTime);
      
      const bookingData = {
        date: dateStr,
        time: selectedTime,
        ...formData
      };

      // Show success screen immediately for a faster user experience
      setStep(3);

      // Send data to n8n webhook in the background
      const N8N_WEBHOOK_URL = 'https://punnawich.app.n8n.cloud/webhook/form-submission';
      
      fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      }).catch((error) => {
        console.error("Error sending booking data to n8n:", error);
      });
    }
  };

  const handleClose = () => {
    closeBooking();
    setTimeout(() => {
      setStep(1);
      setSelectedDate(null);
      setSelectedTime(null);
      setFormData({ name: '', email: '', phone: '', service: '' });
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100">
              <h2 className="text-xl font-serif font-semibold text-stone-900">
                {t.bookingModal.title}
              </h2>
              <button 
                onClick={handleClose}
                className="p-2 text-stone-400 hover:text-stone-600 hover:bg-stone-100 rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {step === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Calendar */}
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-medium text-stone-900 flex items-center gap-2">
                        <CalendarIcon className="w-5 h-5 text-stone-500" />
                        {t.bookingModal.selectDate}
                      </h3>
                      <div className="flex items-center gap-4">
                        <button onClick={prevMonth} className="p-1 hover:bg-stone-100 rounded-full cursor-pointer">
                          <ChevronLeft className="w-5 h-5 text-stone-600" />
                        </button>
                        <span className="font-medium text-stone-900 w-32 text-center">
                          {monthNames[month]} {year}
                        </span>
                        <button onClick={nextMonth} className="p-1 hover:bg-stone-100 rounded-full cursor-pointer">
                          <ChevronRight className="w-5 h-5 text-stone-600" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-7 gap-1 mb-2">
                      {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                        <div key={day} className="text-center text-xs font-medium text-stone-400 py-2">
                          {day}
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-7 gap-1">
                      {blanks.map(b => <div key={`blank-${b}`} className="p-2" />)}
                      {days.map(day => {
                        const date = new Date(year, month, day);
                        const isPast = date < new Date(new Date().setHours(0,0,0,0));
                        const closed = isClosedDay(date);
                        const isDisabled = isPast || closed;
                        const isSelected = selectedDate?.toDateString() === date.toDateString();
                        
                        return (
                          <button
                            key={day}
                            disabled={isDisabled}
                            onClick={() => {
                              setSelectedDate(date);
                              setSelectedTime(null);
                            }}
                            className={`
                              aspect-square rounded-full flex items-center justify-center text-sm transition-all cursor-pointer
                              ${isDisabled ? 'text-stone-300 cursor-not-allowed' : 'hover:bg-stone-100 text-stone-700'}
                              ${isSelected ? 'bg-stone-900 text-white hover:bg-stone-800 font-medium shadow-md' : ''}
                            `}
                          >
                            {day}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Time Slots */}
                  <div>
                    <h3 className="text-lg font-medium text-stone-900 flex items-center gap-2 mb-6">
                      <Clock className="w-5 h-5 text-stone-500" />
                      {t.bookingModal.selectTime}
                    </h3>
                    
                    {selectedDate ? (
                      <div className="space-y-6">
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {generateTimeSlots(selectedDate).map(time => {
                            const booked = isSlotBooked(selectedDate, time);
                            const isSelected = selectedTime === time;
                            
                            return (
                              <button
                                key={time}
                                disabled={booked}
                                onClick={() => setSelectedTime(time)}
                                className={`
                                  py-2 px-3 rounded-lg text-sm font-medium border transition-all cursor-pointer
                                  ${booked 
                                    ? 'bg-stone-50 border-stone-100 text-stone-400 cursor-not-allowed' 
                                    : isSelected
                                      ? 'bg-stone-900 border-stone-900 text-white shadow-md'
                                      : 'bg-white border-stone-200 text-stone-700 hover:border-stone-400'
                                  }
                                `}
                              >
                                {time}
                              </button>
                            );
                          })}
                        </div>
                        
                        <div className="flex items-center gap-6 pt-4 border-t border-stone-100 text-sm">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-white border border-stone-300"></div>
                            <span className="text-stone-600">{t.bookingModal.available}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-stone-100 border border-stone-200"></div>
                            <span className="text-stone-400">{t.bookingModal.booked}</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="h-full flex items-center justify-center text-stone-400 bg-stone-50 rounded-2xl border border-dashed border-stone-200 p-8 text-center min-h-[200px]">
                        Please select a date first to see available times.
                      </div>
                    )}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="max-w-md mx-auto py-4">
                  <div className="mb-6">
                    <button 
                      onClick={() => setStep(1)}
                      className="text-stone-500 hover:text-stone-900 flex items-center gap-2 text-sm font-medium transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Back
                    </button>
                  </div>
                  <h3 className="text-2xl font-serif text-stone-900 mb-6">
                    {t.bookingModal.formTitle}
                  </h3>
                  <form id="booking-form" onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-1">
                        {t.bookingModal.name} *
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2 border border-stone-300 rounded-xl focus:ring-2 focus:ring-stone-900 focus:border-stone-900 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-1">
                        {t.bookingModal.email} *
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2 border border-stone-300 rounded-xl focus:ring-2 focus:ring-stone-900 focus:border-stone-900 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-stone-700 mb-1">
                        {t.bookingModal.phone} *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-2 border border-stone-300 rounded-xl focus:ring-2 focus:ring-stone-900 focus:border-stone-900 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="service" className="block text-sm font-medium text-stone-700 mb-1">
                        {t.bookingModal.service} *
                      </label>
                      <input
                        type="text"
                        id="service"
                        required
                        placeholder={t.bookingModal.servicePlaceholder}
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-2 border border-stone-300 rounded-xl focus:ring-2 focus:ring-stone-900 focus:border-stone-900 outline-none transition-all"
                      />
                    </div>
                  </form>
                </div>
              )}

              {step === 3 && (
                <div className="py-12 flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-serif text-stone-900 mb-2">
                    {t.bookingModal.success}
                  </h3>
                  <p className="text-stone-600 max-w-md mx-auto mb-8">
                    {t.bookingModal.successMsg}
                  </p>
                  <div className="bg-stone-50 rounded-xl p-6 text-left w-full max-w-sm mb-8">
                    <p className="text-sm text-stone-500 mb-1">Date & Time</p>
                    <p className="font-medium text-stone-900 mb-4">
                      {selectedDate?.toLocaleDateString()} at {selectedTime}
                    </p>
                    <p className="text-sm text-stone-500 mb-1">Location</p>
                    <p className="font-medium text-stone-900">
                      Pitcha Home Nails & Spa<br/>
                      Green Valley, NSW 2168
                    </p>
                  </div>
                  <div className="flex flex-col gap-3 w-full max-w-sm mx-auto">
                    <button
                      onClick={() => {
                        handleClose();
                        window.location.hash = '#policies';
                      }}
                      className="bg-stone-900 text-white px-8 py-3 rounded-full font-medium hover:bg-stone-800 transition-colors cursor-pointer w-full"
                    >
                      {t.bookingModal.viewPolicies}
                    </button>
                    <button
                      onClick={handleClose}
                      className="bg-stone-100 text-stone-700 px-8 py-3 rounded-full font-medium hover:bg-stone-200 transition-colors cursor-pointer w-full"
                    >
                      {t.bookingModal.close}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            {step === 1 && (
              <div className="p-6 border-t border-stone-100 bg-stone-50 flex justify-end">
                <button
                  disabled={!selectedDate || !selectedTime}
                  onClick={handleContinue}
                  className={`
                    px-8 py-3 rounded-full font-medium transition-all shadow-sm cursor-pointer
                    ${selectedDate && selectedTime 
                      ? 'bg-stone-900 text-white hover:bg-stone-800' 
                      : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                    }
                  `}
                >
                  {t.bookingModal.continue}
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="p-6 border-t border-stone-100 bg-stone-50 flex justify-end">
                <button
                  type="submit"
                  form="booking-form"
                  className="bg-stone-900 text-white px-8 py-3 rounded-full font-medium hover:bg-stone-800 transition-all shadow-sm cursor-pointer"
                >
                  {t.bookingModal.confirm}
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
