import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { Property } from '../services/PropertiesService';
import propertiesData from "../../properties.json"

const properties: Property[] = propertiesData as Property[];

export interface PropertiesContextType {
  state: Property[];
  editProperty: (updatedProperty: Property) => void;
  addProperty: (propertyToAdd: Property) => void;
}

const PropertiesContext = createContext<PropertiesContextType | undefined>(undefined);

interface PropertiesContextProviderProps {
  children: ReactNode;
}

export const PropertiesContextProvider: React.FC<PropertiesContextProviderProps> = ({ children }) => {
  const storedState = localStorage.getItem('properties');
  const initialState = storedState ? JSON.parse(storedState) : properties.slice(0, 100);

  const [state, setState] = useState<Property[]>(initialState);

  useEffect(() => {
    localStorage.setItem('properties', JSON.stringify(state));
  }, [state]);

  const editProperty = (updatedProperty: Property): void => {
    const newState = state.map((item: Property) =>
      item.id === updatedProperty.id ? updatedProperty : item
    );

    setState(newState);
  };

  const addProperty = (propertyToAdd: Property) => {
    const newState = [propertyToAdd,...state];
    setState(newState);    
  }

  return (
    <PropertiesContext.Provider value={{ state, editProperty, addProperty}}>
      {children}
    </PropertiesContext.Provider>
  );
};

export default PropertiesContext;
