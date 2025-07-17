import React, { Suspense, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Scene, { HTMLLoader } from './Scene';


const Page = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <section ref={ref} className="h-screen w-screen bg-black ">
      <AnimatePresence>
        {inView && (
          <div className="w-full h-full">
            <Suspense fallback={<HTMLLoader />}>
              <Scene />
            </Suspense>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Page;
