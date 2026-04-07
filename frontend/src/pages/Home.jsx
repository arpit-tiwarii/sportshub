import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FiAward, FiTarget, FiActivity, FiUsers, FiHeart, 
  FiClock, FiStar, FiChevronDown, FiCalendar, FiPlay
} from 'react-icons/fi';
// We also use react-icons/fi for feather icons

// Temporary placeholder images (we'll replace with real images in a structured way later or stick with good placeholders like Unsplash)
const IMG_HERO = "https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80";
const IMG_FOOTBALL = "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
const IMG_CRICKET = "https://images.unsplash.com/photo-1531415074968-036ba1b575da?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
const IMG_FITNESS = "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";

const fadeUpVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const Home = () => {
  return (
    <div className="overflow-hidden">
      {/* 1. Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-dark-900/70 z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent z-10"></div>
          <img src={IMG_HERO} alt="Athletes training" className="w-full h-full object-cover" />
        </div>
        
        <div className="container mx-auto px-6 md:px-12 relative z-20">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-3xl"
          >
            <motion.div variants={fadeUpVariant} className="flex items-center gap-2 mb-4">
              <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-semibold uppercase tracking-wider">
                Elite Sports Academy
              </span>
            </motion.div>
            <motion.h1 variants={fadeUpVariant} className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
              Train Like a <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">Champion</span>
            </motion.h1>
            <motion.p variants={fadeUpVariant} className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl leading-relaxed">
              Unlock your ultimate potential. Join our premium training programs led by certified coaches and start your journey towards greatness today.
            </motion.p>
            <motion.div variants={fadeUpVariant} className="flex flex-wrap gap-4">
              <Link to="/register" className="btn-primary flex items-center gap-2">
                Start Your Training Today <span className="text-xl">🚀</span>
              </Link>
              <a href="#programs" className="btn-secondary">
                Explore Programs
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. Statistics Section (Animated Counters) */}
      <section className="py-16 bg-dark-800 border-y border-dark-700 relative z-30 -mt-10">
        <div className="container mx-auto px-6 md:px-12 relative -top-10 md:-top-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "Active Trainees", value: "500+", icon: "👥" },
              { label: "Matches Played", value: "1,200+", icon: "🏆" },
              { label: "Winners Produced", value: "150+", icon: "🥇" },
              { label: "Expert Coaches", value: "25+", icon: "👨‍🏫" }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-dark-900 border border-dark-700 p-8 rounded-2xl flex flex-col items-center justify-center text-center shadow-xl shadow-primary/5"
              >
                <div className="text-4xl mb-3">{stat.icon}</div>
                <h3 className="text-3xl font-display font-bold text-white mb-1">{stat.value}</h3>
                <p className="text-gray-400 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Achievements Section */}
      <section className="py-24 bg-dark-900">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <motion.h2 variants={fadeUpVariant} className="text-3xl md:text-5xl font-bold mb-4">Our <span className="text-primary">Achievements</span></motion.h2>
            <motion.p variants={fadeUpVariant} className="text-gray-400">
              We take pride in our track record of excellence. Our trainees consistently perform at the highest levels across multiple disciplines.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "National Champions", desc: "U-19 Football League 2024", delay: 0 },
              { title: "Gold Medalists", desc: "State Athletics Meet 2023", delay: 0.2 },
              { title: "A+ Certification", desc: "Premier Sports Council", delay: 0.4 },
            ].map((achieve, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: achieve.delay }}
                className="card text-center"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-primary text-3xl">
                  🏆
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{achieve.title}</h3>
                <p className="text-gray-400">{achieve.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Training Programs */}
      <section id="programs" className="py-24 bg-dark-800">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 max-w-7xl mx-auto">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Elite Training <span className="text-primary">Programs</span></h2>
              <p className="text-gray-400 text-lg">
                Choose your discipline and start training with our professional curriculum designed for rapid improvement.
              </p>
            </div>
            <Link to="/register" className="btn-secondary hidden md:inline-flex mt-6 md:mt-0">
              View All Programs
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { sport: "Cricket Academy", image: IMG_CRICKET, desc: "Master your batting, bowling, and fielding skills with former pro players." },
              { sport: "Football Academy", image: IMG_FOOTBALL, desc: "Develop tactical awareness, agility, and teamwork on premium turfs." },
              { sport: "Fitness & Conditioning", image: IMG_FITNESS, desc: "Build strength, endurance, and flexibility. Crucial for any athlete." }
            ].map((prog, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="group rounded-2xl overflow-hidden bg-dark-900 border border-dark-700 hover:border-primary/50 transition-all"
              >
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute inset-0 bg-dark-900/20 group-hover:bg-transparent transition-all z-10"></div>
                  <img src={prog.image} alt={prog.sport} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors">{prog.sport}</h3>
                  <p className="text-gray-400 font-medium leading-relaxed mb-6">
                    {prog.desc}
                  </p>
                  <Link to="/register" className="text-primary font-bold hover:text-white flex items-center gap-2 transition-colors">
                    Join Program <span className="text-xl">→</span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Why Choose Us */}
      <section className="py-24 bg-dark-900">
        <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:w-1/2"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Why <span className="text-primary">Choose Us?</span></h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              We don't just train athletes; we build champions. Our holistic approach to sports education ensures that every student receives the attention they need to succeed.
            </p>
            
            <div className="space-y-6">
              {[
                { title: "Certified Expert Coaches", desc: "Learn straight from industry veterans and former professionals." },
                { title: "Personalized Training Plans", desc: "No generic routines. Your training is tailored to your specific goals and biology." },
                { title: "State-of-the-Art Facilities", desc: "Train using the latest technology and premium sports equipment." },
                { title: "Proven Results", desc: "Over 50+ students drafted to national-level teams in the last 3 years." }
              ].map((feature, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary text-xl">✓</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-1">{feature.title}</h4>
                    <p className="text-gray-400">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:w-1/2 relative"
          >
            <div className="rounded-3xl overflow-hidden border-2 border-dark-700 relative z-10">
              <img src={IMG_HERO} alt="Training Facility" className="w-full h-auto object-cover" />
            </div>
            <div className="absolute -inset-4 border border-primary/30 rounded-3xl z-0 transform translate-x-4 translate-y-4"></div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden bg-primary">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Ready to Take Your Game to the Next Level?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/80 text-xl max-w-2xl mx-auto mb-10"
          >
            Join hundreds of athletes who have already transformed their skills with Sports Hub Academy.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link to="/register" className="bg-dark-900 hover:bg-dark-800 text-white font-bold py-4 px-10 rounded-full text-lg shadow-2xl transition-transform hover:scale-105 inline-block">
              Register Now
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
