import React, { useState, useEffect, useRef, useMemo } from 'react';
import { PromptTemplate } from '../types';
import { X, Sparkles, Copy, Check, RefreshCw, Image as ImageIcon, Download, ExternalLink, History, RotateCcw, Save, Trash2, Search } from 'lucide-react';
import { generateContentStream, generateImage } from '../services/geminiService';
import { CONTEXT_OPTIONS, REFERENCE_LINKS } from '../constants';

interface ModalProps {
  template: PromptTemplate | null;
  onClose: () => void;
}

interface HistoryItem {
  id: string;
  templateTitle: string;
  prompt: string;
  result: string;
  timestamp: Date;
}

const Modal: React.FC<ModalProps> = ({ template, onClose }) => {
  const [promptText, setPromptText] = useState('');
  const [result, setResult] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [selectedContextId, setSelectedContextId] = useState('default');
  
  // History State
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [historySearch, setHistorySearch] = useState('');
  
  // Image Generation States
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);

  const resultRef = useRef<HTMLDivElement>(null);

  // Load history from localStorage on initial mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('educador-ia-history');
    if (savedHistory) {
      try {
        const parsed = JSON.parse(savedHistory);
        const hydrated = parsed.map((item: any) => ({
          ...item,
          timestamp: new Date(item.timestamp)
        }));
        setHistory(hydrated);
      } catch (e) {
        console.error("Error loading history from localStorage", e);
      }
    }
  }, []);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('educador-ia-history', JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    if (template) {
      setPromptText(template.defaultPrompt);
      setResult('');
      setGeneratedImage(null);
      setIsGenerating(false);
      setIsGeneratingImage(false);
      setSelectedContextId('default');
      setShowHistory(false);
      setHistorySearch('');
    }
  }, [template]);

  const filteredHistory = useMemo(() => {
    if (!historySearch.trim()) {
      return history;
    }
    const lowercasedQuery = historySearch.toLowerCase();
    return history.filter(item => 
      item.prompt.toLowerCase().includes(lowercasedQuery) || 
      item.result.toLowerCase().includes(lowercasedQuery) ||
      item.templateTitle.toLowerCase().includes(lowercasedQuery)
    );
  }, [history, historySearch]);

  const handleGenerate = async () => {
    if (!promptText.trim()) return;
    
    setIsGenerating(true);
    setResult('');
    setGeneratedImage(null);
    setShowHistory(false);
    
    let finalPrompt = promptText;
    const contextOption = CONTEXT_OPTIONS.find(opt => opt.id === selectedContextId);
    
    if (contextOption && contextOption.promptSuffix) {
      finalPrompt += contextOption.promptSuffix;
    }

    try {
      const finalText = await generateContentStream(finalPrompt, (chunk) => {
        setResult(chunk);
        if (resultRef.current) {
             resultRef.current.scrollTop = resultRef.current.scrollHeight;
        }
      });

      if (finalText && template) {
        setHistory(prev => [
          {
            id: Date.now().toString(),
            templateTitle: template.title,
            prompt: promptText,
            result: finalText,
            timestamp: new Date()
          },
          ...prev
        ]);
      }

    } catch (error) {
      setResult("Erro ao gerar conteúdo. Verifique sua conexão ou a chave de API.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateImage = async () => {
    if (!promptText.trim()) return;
    setIsGeneratingImage(true);
    try {
      const base64Image = await generateImage(promptText);
      setGeneratedImage(base64Image);
    } catch (error) {
      console.error(error);
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const handleRestoreHistory = (item: HistoryItem) => {
    setPromptText(item.prompt);
    setResult(item.result);
    setGeneratedImage(null);
    setShowHistory(false);
  };

  const handleClearHistory = () => {
    if (window.confirm("Tem certeza que deseja apagar todo o histórico? Esta ação não pode ser desfeita.")) {
      setHistory([]);
    }
  };

  const handleExportHistory = () => {
    const historyToExport = filteredHistory.length > 0 && historySearch ? filteredHistory : history;
    
    if (historyToExport.length === 0) {
      alert("Não há histórico (ou resultados de busca) para exportar.");
      return;
    }

    const historyText = historyToExport.map(h => 
      `DATA: ${h.timestamp.toLocaleString('pt-BR')}\nTEMPLATE: ${h.templateTitle}\nPROMPT: ${h.prompt}\n\nRESULTADO:\n${h.result}\n\n===================================\n`
    ).join('\n');

    const blob = new Blob([historyText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Historico_EducadorIA_${new Date().toISOString().slice(0,10)}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    alert("Histórico baixado como um arquivo .txt!\n\nPara salvar no Drive, acesse sua pasta do Acervo Digital e faça o upload deste arquivo.");
  };

  const handleDownloadText = () => {
    if (!result || !template) return;
    const blob = new Blob([result], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `educador-ia-${template.title.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentContext = CONTEXT_OPTIONS.find(opt => opt.id === selectedContextId);

  if (!template) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 text-blue-700 rounded-lg">
              <template.icon size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-800 leading-tight">{template.title}</h2>
              <p className="text-xs text-slate-500">Assistente Educacional IA</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
          <div className="w-full md:w-1/3 p-6 border-r border-slate-100 bg-white flex flex-col">
            <div className="mb-4">
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Contexto Curricular (Base de Consulta)
              </label>
              <select 
                value={selectedContextId}
                onChange={(e) => setSelectedContextId(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-slate-200 bg-slate-50 text-sm text-slate-700 focus:ring-2 focus:ring-green-500 outline-none"
              >
                {CONTEXT_OPTIONS.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
              
              <div className="min-h-[20px] mt-1">
                {currentContext?.link && (
                  <a 
                    href={currentContext.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-blue-600 hover:underline hover:text-green-600"
                  >
                    <ExternalLink size={12} /> Acessar Documentação de Referência
                  </a>
                )}
                <p className="text-[10px] text-slate-400 mt-1">
                  {currentContext?.description}
                </p>
              </div>
            </div>

            <label className="block text-sm font-medium text-slate-700 mb-2">
              Personalize seu Prompt
            </label>
            <p className="text-xs text-slate-500 mb-4">
              Edite os campos entre colchetes [ ] para adaptar à sua realidade.
            </p>
            <textarea 
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              className="w-full flex-1 p-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none resize-none text-sm leading-relaxed"
              placeholder="Digite seu comando aqui..."
            />
            
            <button
              onClick={handleGenerate}
              disabled={isGenerating || !promptText.trim()}
              className="mt-4 w-full py-3 px-4 bg-green-600 hover:bg-green-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white rounded-xl font-semibold transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-200"
            >
              {isGenerating ? (
                <>
                  <RefreshCw size={18} className="animate-spin" /> Gerando...
                </>
              ) : (
                <>
                  <Sparkles size={18} /> Gerar Conteúdo
                </>
              )}
            </button>
          </div>

          <div className="w-full md:w-2/3 bg-slate-50 flex flex-col relative overflow-hidden">
            <div className="flex items-center justify-between px-6 py-3 border-b border-slate-100 bg-white/50">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Resultado</span>
              
              <div className="flex items-center gap-2">
                 <button
                    onClick={() => setShowHistory(!showHistory)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors border ${showHistory ? 'bg-blue-100 text-blue-700 border-blue-200' : 'text-slate-600 hover:bg-slate-100 border-transparent'}`}
                    title="Histórico de Gerações"
                  >
                    <History size={14} />
                    Histórico
                </button>

                <div className="h-4 w-px bg-slate-200 mx-1"></div>

                <button
                    onClick={handleGenerateImage}
                    disabled={isGeneratingImage || !promptText.trim()}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-black hover:bg-gray-800 rounded-md transition-colors disabled:opacity-50 border border-transparent shadow-sm"
                    title="Criar uma imagem baseada no seu prompt"
                  >
                    {isGeneratingImage ? <RefreshCw size={14} className="animate-spin" /> : <ImageIcon size={14} />}
                    {isGeneratingImage ? 'Criando...' : 'Gerar Ilustração'}
                </button>

                {result && (
                  <>
                    <button 
                      onClick={copyToClipboard}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-md transition-colors"
                    >
                      {copied ? <Check size={14} /> : <Copy size={14} />}
                      {copied ? 'Copiado' : 'Copiar Texto'}
                    </button>
                    <button 
                      onClick={handleDownloadText}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-md transition-colors"
                      title="Baixar conteúdo em texto"
                    >
                      <Download size={14} />
                      Baixar Texto
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="relative flex-1 overflow-hidden flex">
              <div 
                ref={resultRef}
                className="flex-1 p-6 overflow-y-auto"
              >
                {generatedImage && (
                  <div className="mb-6 p-2 bg-white rounded-xl border border-slate-200 shadow-sm inline-block">
                    <div className="relative group">
                      <img 
                        src={generatedImage} 
                        alt="Ilustração gerada por IA" 
                        className="rounded-lg max-h-64 object-contain" 
                      />
                      <a 
                        href={generatedImage} 
                        download="ilustracao-educador-ia.png"
                        className="absolute top-2 right-2 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Baixar Imagem"
                      >
                        <Download size={16} />
                      </a>
                    </div>
                    <p className="text-[10px] text-center text-slate-400 mt-2">Imagem gerada por IA (Gemini)</p>
                  </div>
                )}

                {result ? (
                  <div className="prose prose-sm prose-slate max-w-none whitespace-pre-wrap leading-relaxed">
                    {result}
                  </div>
                ) : (
                  !generatedImage && (
                    <div className="h-full flex flex-col items-center justify-center text-slate-400 opacity-60">
                      <Sparkles size={48} className="mb-4 text-slate-300" />
                      <p className="text-sm">O conteúdo gerado aparecerá aqui.</p>
                    </div>
                  )
                )}
              </div>

              {showHistory && (
                <div className="w-80 border-l border-slate-200 bg-slate-50 flex flex-col absolute right-0 top-0 bottom-0 z-10 shadow-lg animate-in slide-in-from-right duration-200">
                  <div className="p-4 border-b border-slate-200 bg-white sticky top-0 flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                      <History size={16} /> Histórico
                    </h3>
                    <div className="flex gap-1">
                      <button 
                        onClick={handleExportHistory}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                        title="Baixar Histórico Completo para Salvar no Drive"
                      >
                        <Save size={16} />
                      </button>
                      <button 
                        onClick={handleClearHistory}
                        className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                        title="Limpar Histórico"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="p-2 border-b border-slate-200">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search size={14} className="text-slate-400" />
                        </div>
                        <input
                            type="text"
                            value={historySearch}
                            onChange={(e) => setHistorySearch(e.target.value)}
                            placeholder="Buscar no histórico..."
                            className="w-full pl-8 pr-2 py-1.5 text-xs rounded-md border border-slate-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto p-2 space-y-2 bg-slate-50">
                    {filteredHistory.length === 0 ? (
                      <div className="text-center py-8 text-slate-400 text-xs px-4">
                        {history.length === 0 
                            ? "Nenhuma geração salva no histórico."
                            : `Nenhum resultado para "${historySearch}".`
                        }
                      </div>
                    ) : (
                      filteredHistory.map((item) => (
                        <div 
                          key={item.id}
                          className="bg-white p-3 rounded-lg border border-slate-200 hover:border-blue-300 hover:shadow-sm cursor-pointer transition-all group"
                          onClick={() => handleRestoreHistory(item)}
                        >
                          <div className="flex justify-between items-start mb-1">
                            <span className="text-[10px] text-slate-400 font-medium">
                              {item.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                            <span className="text-[10px] text-blue-600 font-semibold opacity-0 group-hover:opacity-100 flex items-center gap-1">
                              <RotateCcw size={10} /> Restaurar
                            </span>
                          </div>
                          <p className="text-[10px] font-bold text-slate-800 mb-1 truncate">{item.templateTitle}</p>
                          <p className="text-xs text-slate-600 line-clamp-2 font-medium mb-1">
                            Prompt: {item.prompt}
                          </p>
                          <p className="text-[10px] text-slate-400 line-clamp-2">
                            {item.result}
                          </p>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="p-3 bg-blue-50 border-t border-blue-100">
                    <a 
                      href={REFERENCE_LINKS[0].url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full px-3 py-2 bg-white border border-blue-200 rounded-lg text-xs font-semibold text-blue-700 hover:bg-blue-100 transition-colors shadow-sm"
                    >
                      <ExternalLink size={14} /> Consultar Acervo (Drive)
                    </a>
                  </div>
                </div>
              )}
            </div>
            
            <div className="px-6 py-2 bg-slate-100 border-t border-slate-200">
               <p className="text-[10px] text-slate-400 text-center">
                 A IA pode cometer erros. Revise sempre o conteúdo pedagógico antes de usar.
               </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Modal;