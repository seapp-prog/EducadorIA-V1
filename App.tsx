import React, { useState, useMemo } from 'react';
import { PROMPT_TEMPLATES, REFERENCE_LINKS } from './constants';
import { PromptTemplate } from './types';
import PromptCard from './components/PromptCard';
import Modal from './components/Modal';
import { GraduationCap, Search, Sparkles, Mic, Library, ChevronDown, ExternalLink } from 'lucide-react';

const App: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<PromptTemplate | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const categories = ['Todos', 'Planejamento', 'Conteúdo', 'Avaliação', 'Inovação', 'EJA', 'Educação Especial'];

  const filteredTemplates = useMemo(() => {
    return PROMPT_TEMPLATES.filter(template => {
      const matchesSearch = template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            template.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'Todos' || template.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      
      {/* Navbar */}
      <nav className="sticky top-0 z-30 bg-blue-900 text-white border-b-4 border-green-500 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-white">
            <div className="p-2 bg-green-600 text-white rounded-lg shadow-sm">
              <GraduationCap size={24} />
            </div>
            <span className="text-xl font-bold tracking-tight">Educador<span className="text-green-400">IA</span></span>
          </div>

          <div className="flex items-center gap-4">
            {/* Knowledge Base Menu */}
            <div className="relative">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                onBlur={() => setTimeout(() => setIsMenuOpen(false), 200)}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-blue-100 hover:text-white hover:bg-blue-800 rounded-lg transition-colors"
              >
                <Library size={18} />
                <span className="hidden sm:inline">Base de Consulta</span>
                <ChevronDown size={14} className={`transition-transform duration-200 ${isMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown */}
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden animate-in fade-in slide-in-from-top-2 text-slate-900">
                  <div className="p-2 bg-slate-50 border-b border-slate-100">
                     <span className="text-xs font-semibold text-slate-500 uppercase px-2">Acervo Digital SME</span>
                  </div>
                  <div className="py-1">
                    {REFERENCE_LINKS.map((link, idx) => (
                      <a 
                        key={idx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                      >
                        <link.icon size={16} className="text-green-500" />
                        {link.name}
                        <ExternalLink size={12} className="ml-auto opacity-50" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="hidden md:flex items-center text-sm font-medium text-blue-100 border-l border-blue-700 pl-4">
              <span className="leading-tight text-right">
                Prefeitura Municipal de<br/>Itapecerica da Serra
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-white border-b border-slate-200 mb-8">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100 text-xs font-bold uppercase tracking-wider mb-6">
            <Sparkles size={14} /> Potencialize suas aulas
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Seu Assistente Pedagógico <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-green-500">
              Impulsionado por Inteligência Artificial
            </span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Selecione uma das estratégias abaixo para gerar planos de aula, roteiros e materiais para Educação Infantil, Fundamental I, EJA e Educação Especial.
          </p>

          {/* Search & Filters */}
          <div className="flex flex-col gap-6 justify-center items-center max-w-4xl mx-auto">
            <div className="relative w-full max-w-md">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                <Search size={22} className="text-slate-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-12 pr-12 py-3 border border-slate-200 rounded-full leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm transition-shadow shadow-sm"
                placeholder="Buscar estratégia..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer text-slate-400 hover:text-green-500 transition-colors z-10">
                <Mic size={22} />
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 justify-center w-full px-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === cat
                      ? 'bg-blue-800 text-white shadow-md'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-green-50 hover:text-green-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Grid Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredTemplates.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTemplates.map((template) => (
              <PromptCard
                key={template.id}
                template={template}
                onClick={setSelectedTemplate}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="inline-block p-4 rounded-full bg-slate-100 text-slate-400 mb-4">
              <Search size={32} />
            </div>
            <h3 className="text-lg font-medium text-slate-900">Nenhum prompt encontrado</h3>
            <p className="text-slate-500">Tente ajustar seus termos de busca ou filtros.</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-20 py-8 border-t-4 border-green-500 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm text-blue-200">
            © {new Date().getFullYear()} Educador IA - Prefeitura Municipal de Itapecerica da Serra.
          </p>
        </div>
      </footer>

      {/* Modal */}
      {selectedTemplate && (
        <Modal 
          template={selectedTemplate} 
          onClose={() => setSelectedTemplate(null)} 
        />
      )}
    </div>
  );
};

export default App;