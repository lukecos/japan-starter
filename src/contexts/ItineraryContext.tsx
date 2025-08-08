'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ItineraryItem {
  id: string;
  name: string;
  city: string;
  category: string[];
  rating: number;
  description: string;
}

interface ItineraryContextType {
  itineraryItems: ItineraryItem[];
  addToItinerary: (item: ItineraryItem) => void;
  removeFromItinerary: (itemId: string) => void;
  isInItinerary: (itemId: string) => boolean;
  clearItinerary: () => void;
}

const ItineraryContext = createContext<ItineraryContextType | undefined>(undefined);

export const ItineraryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [itineraryItems, setItineraryItems] = useState<ItineraryItem[]>([]);

  const addToItinerary = (item: ItineraryItem) => {
    setItineraryItems(prev => {
      // Don't add if already exists
      if (prev.some(existingItem => existingItem.id === item.id)) {
        return prev;
      }
      return [...prev, item];
    });
  };

  const removeFromItinerary = (itemId: string) => {
    setItineraryItems(prev => prev.filter(item => item.id !== itemId));
  };

  const isInItinerary = (itemId: string) => {
    return itineraryItems.some(item => item.id === itemId);
  };

  const clearItinerary = () => {
    setItineraryItems([]);
  };

  return (
    <ItineraryContext.Provider value={{
      itineraryItems,
      addToItinerary,
      removeFromItinerary,
      isInItinerary,
      clearItinerary
    }}>
      {children}
    </ItineraryContext.Provider>
  );
};

export const useItinerary = () => {
  const context = useContext(ItineraryContext);
  if (context === undefined) {
    throw new Error('useItinerary must be used within an ItineraryProvider');
  }
  return context;
};
