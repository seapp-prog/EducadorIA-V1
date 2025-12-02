import React from 'react';
import { PromptTemplate } from '../types';
import { ArrowRight } from 'lucide-react';

interface PromptCardProps {
  template: PromptTemplate;
  onClick: (template: PromptTemplate) => void;
}

const PromptCard: React.FC<PromptCardProps> = ({ template, onClick }) => {
  const Icon = template.icon;

  const categoryColors = {
    'Planejamento': 'bg-blue-50 text-blue-600 border-blue-100',
    'Conteúdo': 'bg-emerald-50 text-emerald-600 border-emerald-100',
    'Avaliação': 'bg-amber-50 text-amber-600 border-amber-100',
    'Inovação': 'bg-purple-50 text-purple-600 border-purple-100',
    'EJA': 'bg-orange-50 text-orange-600 border-orange-100',
    'Educação Especial': 'bg-rose-50 text-rose-600 border-rose-100',
  };

  return (
    <div 
      onClick={() => onClick(template)}
      className="group relative bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg hover:border-green-300 transition-all duration-300 cursor-pointer flex flex-col h-full"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-lg ${categoryColors[template.category]}`}>
          <Icon size={24} />
        </div>
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          {template.category}
        </span>
      </div>
      
      <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-green-600 transition-colors">
        {template.title}
      </h3>
      
      <p className="text-sm text-slate-600 mb-6 flex-grow">
        {template.description}
      </p>

      <div className="flex items-center text-blue-600 text-sm font-medium opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 active:scale-[0.98]">
        Experimentar este prompt <ArrowRight size={16} className="ml-2" />
      </div>
    </div>
  );
};

export default PromptCard;