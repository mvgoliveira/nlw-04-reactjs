import {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import { ChallengesContext } from './ChallengesContext';

interface CountdownProviderProps {
   children: ReactNode;
}

interface CountdownContextData {
   minutes: number ;
   seconds: number;
   initialTime: number;
   hasFinished: boolean;
   isActive: boolean;
   startCountdown: () => void;
   resetCountdown: () => void;
}

export const CountdownContext = createContext({} as CountdownContextData);

let contdownTimeout: NodeJS.Timeout;

export function CountdownProvider({ children } : CountdownProviderProps) {
   const { startNewChallenge } = useContext(ChallengesContext);

   const [time, setTime] = useState(60 * 0.05);
   const [isActive, setIsActive] = useState(false);
   const [hasFinished, setHasFinished] = useState(false)
   const [initialTime, setInitialTime] = useState(0)

   const minutes = Math.floor(time / 60);
   const seconds = time % 60;

   useEffect(() => {
      setInitialTime(time);
   }, [])

   function startCountdown() {
      setIsActive(true);
   }

   function resetCountdown() {
      clearTimeout(contdownTimeout)
      setIsActive(false);
      setHasFinished(false);
      setTime(initialTime);
   }

   useEffect(() => {
      if (isActive && time > 0) {
         contdownTimeout = setTimeout(() => {
            setTime(time - 1);
         }, 1000);
      } else if (isActive && time === 0) {
         setHasFinished(true);
         setIsActive(false);
         startNewChallenge();
      }
   }, [isActive, time]);

   return (
      <CountdownContext.Provider value={{
         minutes,
         seconds,
         initialTime,
         hasFinished,
         isActive,
         startCountdown,
         resetCountdown

      }}>
         {children}
      </CountdownContext.Provider>
   );
}