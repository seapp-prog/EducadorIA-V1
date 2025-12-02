import React, { useState, useEffect, useRef } from 'react';
import { PromptTemplate } from '../types';
import { X, Sparkles, Copy, Check, RefreshCw, Image as ImageIcon, Download, ExternalLink } from 'lucide-react';
import { generateContentStream, generateImage } from '../services/geminiService';
import { CONTEXT_OPTIONS } from '../constants';

interface ModalProps {
  template: PromptTemplate | null;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ template, onClose }) => {
  const [promptText, setPromptText] = useState('');
  const [result, setResult] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [selectedContextId, setSelectedContextId] = useState('default');
  
  // Image Generation States
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);

  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (template) {
      setPromptText(template.defaultPrompt);
      setResult('');
      setGeneratedImage(null);
      setIsGenerating(false);
      setIsGeneratingImage(false);
      setSelectedContextId('default');
    }
  }, [template]);

  const handleGenerate = async () => {
    if (!promptText.trim()) return;
    
    setIsGenerating(true);
    setResult('');
    setGeneratedImage(null); // Clear previous image on new text generation
    
    // Append context instruction if selected
    let finalPrompt = promptText;
    const contextOption = CONTEXT_OPTIONS.find(opt => opt.id === selectedContextId);
    
    if (contextOption && contextOption.promptSuffix) {
      finalPrompt += contextOption.promptSuffix;
    }

    try {
      await generateContentStream(finalPrompt, (chunk) => {
        setResult(chunk);
        // Auto-scroll to bottom as content generates
        if (resultRef.current) {
             resultRef.current.scrollTop = resultRef.current.scrollHeight;
        }
      });
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
      // Optional: show error toast or message
    } finally {
      setIsGeneratingImage(false);
    }
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

  // Helper to get current context option
  const currentContext = CONTEXT_OPTIONS.find(opt => opt.id === selectedContextId);

  if (!template) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
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

        {/* Body */}
        <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
          
          {/* Left: Input */}
          <div className="w-full md:w-1/3 p-6 border-r border-slate-100 bg-white flex flex-col">
            
            {/* Context Selector */}
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

          {/* Right: Output */}
          <div className="w-full md:w-2/3 bg-slate-50 flex flex-col relative">
            <div className="flex items-center justify-between px-6 py-3 border-b border-slate-100 bg-white/50">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Resultado</span>
              
              <div className="flex items-center gap-2">
                <button
                    onClick={handleGenerateImage}
                    disabled={isGeneratingImage || !promptText.trim()}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-yellow-600 bg-yellow-50 hover:bg-yellow-100 rounded-md transition-colors disabled:opacity-50 border border-yellow-200"
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

            <div 
              ref={resultRef}
              className="flex-1 p-6 overflow-y-auto"
            >
              {/* Generated Image Section */}
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
            
            {/* Disclaimer */}
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