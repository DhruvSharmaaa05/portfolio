// File: src/App.js

import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './App.css';

// Koenigsegg-inspired ghost component
function KoenigseggGhost() {
  const group = useRef();

  // Floating & swaying animation for the ghost group
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    group.current.position.y = Math.sin(t * 1.6) * 0.09;
    group.current.rotation.z = Math.sin(t * 0.7) * 0.07;
  });

  return (
    <group ref={group} position={[0, 0, 0]}>

      {/* Body */}
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshPhysicalMaterial
          color="#b4f4fc"
          transparent
          opacity={0.8}
          transmission={0.85}
          roughness={0.2}
        />
      </mesh>
      
      {/* Left Arm */}
      <mesh position={[-0.9, 0.3, 0]}>
        <cylinderGeometry args={[0.13, 0.1, 0.7, 16]} />
        <meshPhysicalMaterial color="#b4f4fc" transparent opacity={0.7} transmission={0.85} />
      </mesh>
      {/* Right Arm */}
      <mesh position={[0.9, 0.3, 0]}>
        <cylinderGeometry args={[0.13, 0.1, 0.7, 16]} />
        <meshPhysicalMaterial color="#b4f4fc" transparent opacity={0.7} transmission={0.85} />
      </mesh>

      {/* Face (Eyes & Mouth) */}
      <mesh position={[-0.35, 0.3, 0.97]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color="#111" />
      </mesh>
      <mesh position={[0.35, 0.3, 0.97]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color="#111" />
      </mesh>
      <mesh position={[0, 0, 1]}>
        <sphereGeometry args={[0.13, 16, 16]} />
        <meshStandardMaterial color="#222" />
      </mesh>
    </group>
  );
}

function App() {
  const { ref: canvasRef, inView } = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  return (
    <main className="bg-black text-white min-h-screen overflow-x-hidden font-sans">
      {/* Hero Section with animated ghost */}
      <section
        ref={canvasRef}
        className="relative w-full h-[80vh] sm:h-screen flex items-center justify-center overflow-hidden"
      >
        <AnimatePresence>
          {inView && (
            <motion.div
              key="hero-koenigsegg-ghost"
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0, transition: { duration: 1.4, ease: "easeOut" } }}
              exit={{ opacity: 0, scale: 0.92, y: 30, transition: { duration: 0.7, ease: "easeIn" } }}
              className="absolute top-0 left-0 w-full h-full z-0"
            >
              <Canvas>
                <ambientLight intensity={0.3} />
                <directionalLight position={[5, 7, 5]} intensity={1.1} />
                <Suspense fallback={null}>
                  <KoenigseggGhost />
                </Suspense>
                <OrbitControls enableZoom={false} enableRotate={true} />
              </Canvas>
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          className="relative z-10 text-center px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
            Hi, I'm Dhruv Sharma
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl max-w-xl mx-auto text-gray-300">
            Computer Science Engineer | Full Stack & 3D Web Developer | Creative Technologist
          </p>
        </motion.div>
      </section>

      {/* About Section */}
      <section className="px-4 sm:px-6 md:px-12 py-16 md:py-24 bg-gradient-to-b from-black to-gray-900">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-5xl mx-auto text-center"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8">About Me</h2>
          <p className="text-gray-400 text-base sm:text-lg md:text-xl leading-relaxed">
            I'm a Computer Science and Engineering student at MIT ADT Pune, graduating in 2026. I’m passionate about
            full-stack development, interactive web design, and emerging technologies like face recognition and IoT.
            I’ve built both hardware-based and software-based systems including smart city tools, collision avoidance,
            and real-time tracking apps. My goal is to blend design and engineering to build beautiful, useful tech.
          </p>
        </motion.div>
      </section>

      {/* Skills Section */}
      <section className="px-4 sm:px-6 md:px-12 py-16 md:py-24 bg-black">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-5xl mx-auto text-center"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-12">Skills</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-gray-300">
            <div>
              <h3 className="text-xl font-semibold mb-2">Languages</h3>
              <p>Python, C++, Java, HTML, CSS, JavaScript, SQL</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Tools & Frameworks</h3>
              <p>React, Three.js, Tailwind CSS, Git, REST APIs</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Concepts</h3>
              <p>Data Structures, Algorithms, Software Engineering, DBMS, Networking</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Projects Section */}
      <section className="px-4 sm:px-6 md:px-12 py-16 md:py-24 bg-gray-900">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-5xl mx-auto text-center"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-12">Projects</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            <div className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform">
              <h3 className="text-2xl font-semibold mb-2">Collision Avoidance System</h3>
              <p className="text-gray-400">Hardware project using Raspberry Pi, ultrasonic sensors, encoder, LCD and buzzer to prevent accidents.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform">
              <h3 className="text-2xl font-semibold mb-2">Ambulance Tracking System</h3>
              <p className="text-gray-400">Real-time GPS-based tracker to help dispatch ambulances faster to emergencies with a live user dashboard.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform">
              <h3 className="text-2xl font-semibold mb-2">Smart Voting System</h3>
              <p className="text-gray-400">Web app using face recognition for secure, fraud-proof voting with camera-based user authentication.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform">
              <h3 className="text-2xl font-semibold mb-2">College Buddy</h3>
              <p className="text-gray-400">Campus utility platform with teacher availability, transport info, and interactive maps for students.</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Certificates Section (interactive with cursor) */}
      <section className="px-4 sm:px-6 md:px-12 py-16 md:py-24 bg-black">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-12">Certificates & Achievements</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-300 text-lg">
            {[
              "AI for Everyone – DeepLearning.AI",
              "Crash Course on Python – Google",
              "Intro to HTML/CSS/JavaScript – IBM",
              "Networking Basics – Cisco Networking Academy",
              "AWS Academy Cloud Foundations",
            ].map((cert, index) => (
              <motion.li
                key={index}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="transition-transform bg-gray-800 p-6 rounded-xl shadow-md cursor-default"
              >
                {cert}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="text-center px-4 py-10 text-gray-500 bg-black border-t border-gray-800">
        <p>© 2025 Dhruv Sharma. All rights reserved.</p>
        <div className="mt-4 space-x-4">
          <a href="mailto:dhruvsharmaaa05@gmail.com" className="hover:text-white" aria-label="Email">
            Email
          </a>
          <a href="https://www.linkedin.com/in/dhruvsharma-profile" className="hover:text-white" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href="https://github.com/dhruvsharma-profile" className="hover:text-white" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href="/DhruvSharma_Resume.pdf" className="hover:text-white" download>
            Resume
          </a>
        </div>
      </footer>
    </main>
  );
}

export default App;
