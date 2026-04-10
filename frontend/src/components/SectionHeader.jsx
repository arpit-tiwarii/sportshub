import { motion } from 'framer-motion';

export default function SectionHeader({ 
  badge, 
  title, 
  description, 
  centered = true,
  highlightWords = []
}) {
  const words = title.split(' ');
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`${centered ? 'text-center' : ''} mb-12`}
    >
      {badge && (
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex justify-center mb-4"
        >
          <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider border border-primary/20">
            {badge}
          </span>
        </motion.div>
      )}
      
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
        {words.map((word, i) => (
          <span key={i} className={highlightWords.includes(word) ? 'text-primary' : ''}>
            {word}{' '}
          </span>
        ))}
      </h2>

      {description && (
        <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  );
}
