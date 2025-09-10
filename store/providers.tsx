// store/providers.tsx
"use client";

import { Provider } from "react-redux";
import { store, persistor } from "./index";
import { PersistGate } from "redux-persist/integration/react";
export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>{children}</PersistGate>
      
    </Provider>
  );
}
