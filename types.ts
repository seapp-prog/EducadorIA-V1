import { LucideIcon } from "lucide-react";

export interface PromptTemplate {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
  defaultPrompt: string;
  category: 'Planejamento' | 'Conteúdo' | 'Avaliação' | 'Inovação' | 'EJA' | 'Educação Especial';
}

export interface GeneratedResult {
  content: string;
  timestamp: Date;
}