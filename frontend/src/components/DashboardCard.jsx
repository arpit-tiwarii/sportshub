import { motion } from 'framer-motion';

export default function DashboardCard({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  gradient = 'from-primary to-accent-green',
  trends = null,
  index = 0 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="group relative"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>
      
      <div className="bg-gradient-to-br from-dark-800 to-dark-900 border border-dark-700 group-hover:border-primary/50 rounded-2xl p-6 shadow-xl group-hover:shadow-2xl transition-all duration-300 relative z-10">
        
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-gray-400 text-sm font-medium">{title}</p>
            <p className="text-2xl md:text-3xl font-bold text-white mt-1">{value}</p>
          </div>
          {Icon && (
            <div className={`w-12 h-12 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-primary/30`}>
              <Icon size={24} />
            </div>
          )}
        </div>

        {/* Subtitle/Trend */}
        {subtitle && (
          <p className="text-gray-500 text-sm">{subtitle}</p>
        )}

        {trends && (
          <div className="mt-4 pt-4 border-t border-dark-700 flex items-center gap-2">
            <span className={`text-sm font-semibold ${trends.positive ? 'text-green-400' : 'text-red-400'}`}>
              {trends.positive ? '↑' : '↓'} {trends.value}
            </span>
            <span className="text-gray-500 text-xs">{trends.label}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
