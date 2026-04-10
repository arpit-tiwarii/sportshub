import { motion } from 'framer-motion';
import { FiMapPin, FiClock, FiUsers } from 'react-icons/fi';

export default function TrainingLocationCard({ 
  name, 
  description, 
  timing, 
  capacity,
  icon: Icon = FiMapPin,
  index = 0 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ x: 10 }}
      className="group relative"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="bg-gradient-to-br from-dark-800/80 to-dark-900/80 border border-dark-700 group-hover:border-primary/40 rounded-2xl p-8 shadow-xl group-hover:shadow-2xl group-hover:shadow-primary/20 transition-all duration-300 relative z-10 backdrop-blur-sm">
        
        {/* Header */}
        <div className="flex items-start gap-4 mb-6">
          <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
            <Icon className="text-2xl text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">{name}</h3>
            <p className="text-sm text-primary font-semibold uppercase tracking-wider">Training Center</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-400 mb-6 text-sm leading-relaxed">
          {description}
        </p>

        {/* Details */}
        <div className="space-y-3 pt-4 border-t border-dark-700">
          {timing && (
            <div className="flex items-center gap-3 text-gray-400 text-sm">
              <FiClock className="text-primary flex-shrink-0" size={18} />
              <span>{timing}</span>
            </div>
          )}
          {capacity && (
            <div className="flex items-center gap-3 text-gray-400 text-sm">
              <FiUsers className="text-primary flex-shrink-0" size={18} />
              <span>{capacity}</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
