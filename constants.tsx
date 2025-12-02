import { 
  BookOpen, 
  Users, 
  BarChart3, 
  FileText, 
  CheckCircle, 
  Award, 
  Cpu, 
  Palette, 
  Activity, 
  Gamepad2, 
  Heart, 
  TrendingUp, 
  Repeat, 
  Layers, 
  Rocket, 
  ClipboardCheck, 
  Share2, 
  Wifi, 
  UserCheck, 
  Lightbulb,
  Mic,
  ListChecks,
  Key,
  FlaskConical,
  MessageCircle,
  Briefcase,
  Landmark,
  HeartHandshake,
  Accessibility,
  Smile,
  Ear,
  MessageSquare,
  Puzzle,
  CalendarClock,
  Library
} from 'lucide-react';
import { PromptTemplate } from './types';

export const REFERENCE_LINKS = [
  { 
    name: "Acervo Digital Completo", 
    url: "https://drive.google.com/drive/folders/1laF7yjqlghmeD9kQWznSFNPQY29M6Rcw?usp=drive_link",
    icon: Library
  },
  { 
    name: "Diretrizes Curriculares", 
    url: "https://drive.google.com/drive/folders/1laF7yjqlghmeD9kQWznSFNPQY29M6Rcw?usp=drive_link",
    icon: FileText
  },
  { 
    name: "Projetos Pedagógicos", 
    url: "https://drive.google.com/drive/folders/1laF7yjqlghmeD9kQWznSFNPQY29M6Rcw?usp=drive_link",
    icon: Rocket
  },
  { 
    name: "Materiais Inclusivos", 
    url: "https://drive.google.com/drive/folders/1laF7yjqlghmeD9kQWznSFNPQY29M6Rcw?usp=drive_link",
    icon: Heart
  }
];

export const CONTEXT_OPTIONS = [
  { 
    id: 'default', 
    label: 'Padrão (Geral)', 
    promptSuffix: '',
    description: 'Resposta padrão do assistente.'
  },
  { 
    id: 'municipal', 
    label: 'Acervo Digital Municipal (Drive)', 
    promptSuffix: '\n\n[IMPORTANTE: Considere as diretrizes da Proposta Pedagógica Municipal e o material do Acervo Digital da Secretaria de Educação de Itapecerica da Serra ao elaborar esta resposta.]',
    link: "https://drive.google.com/drive/folders/1laF7yjqlghmeD9kQWznSFNPQY29M6Rcw?usp=drive_link",
    description: 'Utiliza diretrizes e materiais do município.'
  }
];

export const PROMPT_TEMPLATES: PromptTemplate[] = [
  {
    id: 1,
    title: "Planos de Aula Personalizados",
    description: "Analise o perfil dos alunos para criar planos sob medida.",
    category: "Planejamento",
    icon: Users,
    defaultPrompt: "Crie um plano de aula de 50 minutos sobre [Tópico: O Ciclo da Água] para uma turma de [Ano: 3º ano] que possui 3 alunos com dificuldade de atenção. O plano deve incluir atividades lúdicas, objetivos claros e estratégias de avaliação."
  },
  {
    id: 2,
    title: "Roteiros Interativos",
    description: "Desenvolva roteiros com multimídia e interação.",
    category: "Conteúdo",
    icon: Activity,
    defaultPrompt: "Elabore um roteiro para uma aula interativa sobre [Tópico: Animais da Fazenda]. Inclua momentos para contação de história, músicas infantis relacionadas e uma atividade de desenho no meio da aula."
  },
  {
    id: 3,
    title: "Análise de Dados Educacionais",
    description: "Interprete dados de desempenho para ajustes em tempo real.",
    category: "Avaliação",
    icon: BarChart3,
    defaultPrompt: "Atue como um analista pedagógico. Tenho os seguintes resultados da minha turma de 4º ano em matemática: 20% erraram continhas de subtração, 50% foram bem e 30% gabaritaram. Sugira 3 jogos ou atividades práticas para reforçar a subtração na próxima aula."
  },
  {
    id: 4,
    title: "Geração de Conteúdo Educacional",
    description: "Gere textos, exercícios e materiais automaticamente.",
    category: "Conteúdo",
    icon: FileText,
    defaultPrompt: "Gere um texto curto e divertido sobre [Tópico: A Vida das Borboletas] adequado para alunos do [Ano: 2º ano]. Em seguida, crie 3 perguntas de interpretação simples e uma atividade de colorir (descrição da imagem)."
  },
  {
    id: 5,
    title: "Avaliação Automatizada",
    description: "Feedback imediato e correção de trabalhos.",
    category: "Avaliação",
    icon: CheckCircle,
    defaultPrompt: "Avalie a resposta de um aluno do 5º ano sobre 'Por que as plantas precisam de sol?': '[Inserir Resposta do Aluno]'. Forneça um feedback encorajador e simples, explicando o conceito de fotossíntese de forma lúdica se necessário."
  },
  {
    id: 6,
    title: "Planejamento por Competências",
    description: "Foco no desenvolvimento de habilidades (BNCC).",
    category: "Planejamento",
    icon: Award,
    defaultPrompt: "Crie um plano de aula alinhado à BNCC para o Ensino Fundamental I focando na competência de [Competência: Empatia e Cooperação] utilizando o tema [Tema: Jogos Cooperativos]. Liste os códigos das habilidades da BNCC trabalhadas."
  },
  {
    id: 7,
    title: "Integração de Tecnologias",
    description: "Realidade Aumentada, sites educativos e novas techs.",
    category: "Inovação",
    icon: Cpu,
    defaultPrompt: "Sugira como usar a tecnologia de forma simples em uma aula sobre [Tópico: O Sistema Solar] para o 4º ano. Indique sites educativos, vídeos em 360 graus ou apps gratuitos fáceis de usar."
  },
  {
    id: 8,
    title: "Adaptação de Estilos de Aprendizagem",
    description: "Conteúdo visual, auditivo e cinestésico.",
    category: "Planejamento",
    icon: Palette,
    defaultPrompt: "Adapte o ensino de [Conceito: As Cores Primárias] para crianças pequenas usando três abordagens: Visual (cartazes/vídeos), Auditivo (música sobre cores) e Cinestésico (mistura de tintas com as mãos)."
  },
  {
    id: 9,
    title: "Simulações Educacionais",
    description: "Cenários lúdicos para entender conceitos.",
    category: "Inovação",
    icon: Layers,
    defaultPrompt: "Crie uma brincadeira de 'faz de conta' (Role-Play) para ensinar sobre [Tópico: Profissões e o Bairro]. Defina papéis (padeiro, médico, carteiro) e uma situação problema que eles devem resolver juntos na 'cidade' da sala de aula."
  },
  {
    id: 10,
    title: "Desenvolvimento de Jogos (Gamificação)",
    description: "Engajamento através de jogos personalizados.",
    category: "Conteúdo",
    icon: Gamepad2,
    defaultPrompt: "Desenvolva um jogo de tabuleiro simples ou caça ao tesouro para revisar [Matéria: Alfabetização/Vogais] com alunos do 1º ano. Descreva as regras, o objetivo e os materiais necessários (papel, lápis, dados)."
  },
  {
    id: 11,
    title: "Planejamento Inclusivo",
    description: "Acessibilidade para todos os alunos.",
    category: "Planejamento",
    icon: Heart,
    defaultPrompt: "Adapte uma atividade de [Tópico: Contação de Histórias] para garantir a participação de um aluno com autismo e um aluno com baixa visão na Educação Infantil. Sugira recursos sensoriais e visuais."
  },
  {
    id: 12,
    title: "Análise de Tendências",
    description: "Inovação na educação infantil e fundamental.",
    category: "Inovação",
    icon: TrendingUp,
    defaultPrompt: "Quais são 3 tendências pedagógicas modernas para o ensino de [Disciplina: Ciências] no Ensino Fundamental I? Sugira uma atividade prática para cada tendência."
  },
  {
    id: 13,
    title: "Materiais de Revisão Personalizados",
    description: "Reforço focado nas necessidades do aluno.",
    category: "Conteúdo",
    icon: Repeat,
    defaultPrompt: "Crie uma ficha de atividades de reforço para um aluno do 3º ano com dificuldade em [Tópico: Uso de R e RR]. Use rimas, caça-palavras e desenhos para tornar o estudo divertido."
  },
  {
    id: 14,
    title: "Projetos Interdisciplinares",
    description: "Conectando diferentes disciplinas.",
    category: "Planejamento",
    icon: Share2,
    defaultPrompt: "Crie um projeto que misture [Disciplina 1: Matemática] e [Disciplina 2: Artes] para o 5º ano, usando o tema [Tema: Formas Geométricas na Arte Brasileira]. O produto final deve ser uma exposição artística."
  },
  {
    id: 15,
    title: "Aprendizagem Baseada em Projetos (PBL)",
    description: "Foco na resolução de problemas reais.",
    category: "Planejamento",
    icon: Rocket,
    defaultPrompt: "Planeje um mini-projeto de 2 semanas para o 4º ano com a pergunta: 'Como podemos reduzir o lixo na nossa escola?'. As crianças devem criar cartazes e lixeiras recicláveis."
  },
  {
    id: 16,
    title: "Avaliações Formativas",
    description: "Monitoramento contínuo do progresso.",
    category: "Avaliação",
    icon: ClipboardCheck,
    defaultPrompt: "Crie 3 formas lúdicas de avaliar se os alunos entenderam a aula sobre [Tópico: Os Sentidos (Tato, Olfato, etc)]. Exemplo: 'Mímica', 'Desenho rápido' ou 'Sinal vermelho/verde'."
  },
  {
    id: 17,
    title: "Recursos Educacionais Abertos (REA)",
    description: "Criação de materiais compartilháveis.",
    category: "Conteúdo",
    icon: BookOpen,
    defaultPrompt: "Esboce um livrinho digital colaborativo sobre [Tópico: Folclore Brasileiro] feito pela turma. Descreva como dividir os temas (Saci, Curupira) entre os grupos e como montar o material final."
  },
  {
    id: 18,
    title: "Educação a Distância (EAD) / Híbrida",
    description: "Atividades para casa ou online.",
    category: "Planejamento",
    icon: Wifi,
    defaultPrompt: "Sugira 3 atividades que alunos do 2º ano possam fazer em casa com os pais sobre [Tópico: Alimentação Saudável]. As atividades devem envolver a cozinha ou o jardim, sem uso excessivo de telas."
  },
  {
    id: 19,
    title: "Experiências Personalizadas",
    description: "Jornadas únicas para cada aluno.",
    category: "Inovação",
    icon: UserCheck,
    defaultPrompt: "Crie uma 'Estação de Aprendizagem' rotativa para a sala de aula sobre [Tópico: Números Pares e Ímpares]. Descreva 3 estações diferentes (uma com jogos, uma com blocos de montar e uma com desenho)."
  },
  {
    id: 20,
    title: "Estratégias de Ensino Inovadoras",
    description: "Criatividade e inovação na sala de aula.",
    category: "Inovação",
    icon: Lightbulb,
    defaultPrompt: "Como usar 'Storytelling' (Contação de Histórias) para ensinar [Tópico: A Chegada dos Portugueses] para o 5º ano de forma envolvente? Crie o início da narrativa."
  },
  {
    id: 21,
    title: "Roteiro de Podcast Educativo",
    description: "Crie conteúdo em áudio para engajar os alunos.",
    category: "Conteúdo",
    icon: Mic,
    defaultPrompt: "Escreva um roteiro curto para um 'rádio-novela' escolar sobre [Tema: A Importância da Água]. Os personagens são gotinhas de água conversando. Público: alunos do 3º ano."
  },
  {
    id: 22,
    title: "Rubricas de Avaliação Detalhadas",
    description: "Critérios claros e objetivos para avaliações.",
    category: "Avaliação",
    icon: ListChecks,
    defaultPrompt: "Crie uma ficha de avaliação simples (com carinhas felizes, neutras, tristes) para autoavaliação de alunos do 2º ano após um trabalho em grupo sobre [Tema: Animais]."
  },
  {
    id: 23,
    title: "Escape Room Educacional",
    description: "Crie experiências imersivas onde os alunos desvendam mistérios usando conhecimentos curriculares.",
    category: "Inovação",
    icon: Key,
    defaultPrompt: "Planeje uma atividade de 'Escape Room' para o 3º ano com o tema 'Missão Espacial'. Os alunos são astronautas e precisam resolver 3 enigmas (envolvendo operações matemáticas simples e interpretação de texto) para 'consertar' a nave e voltar para a Terra. Descreva os materiais, pistas e a narrativa."
  },
  {
    id: 24,
    title: "Projeto STEAM Integrado",
    description: "Integre Ciência, Tecnologia, Engenharia, Artes e Matemática em projetos 'mão na massa'.",
    category: "Planejamento",
    icon: FlaskConical,
    defaultPrompt: "Elabore um projeto STEAM para o 2º ano: 'Construção de um Abrigo para Animais'. Os alunos devem usar papelão, cola e materiais recicláveis. O plano deve incluir: investigação sobre o animal, desenho do projeto (Engenharia/Artes), construção e teste de resistência (Ciências/Matemática)."
  },
  {
    id: 25,
    title: "Simulador de Debate",
    description: "Fortaleça a argumentação e o pensamento crítico.",
    category: "Inovação",
    icon: MessageCircle,
    defaultPrompt: "Crie tópicos para um debate simples e respeitoso para o 5º ano sobre [Tema: O uso de celular por crianças]. Sugira argumentos pró e contra para ajudar os alunos a estruturarem suas falas."
  },
  {
    id: 26,
    title: "Criação de Escape Room Educacional",
    description: "Transforme a sala de aula em um cenário de jogo com narrativas envolventes e desafios lógicos.",
    category: "Inovação",
    icon: Key,
    defaultPrompt: "Crie um Escape Room temático sobre 'Preservação da Natureza' para o 4º ano. A turma deve salvar uma floresta virtual. Inclua 4 pistas que exigem conhecimentos de reciclagem, ciclo da água e plantio. Detalhe a história introdutória e como cada grupo contribui para a solução final."
  },
  {
    id: 27,
    title: 'Criação de Plano de Aula Adaptativo com IA',
    description: 'Utilize IA para gerar planos de aula que se ajustam dinamicamente ao progresso e às necessidades individuais dos alunos.',
    category: 'Planejamento',
    icon: UserCheck,
    defaultPrompt: 'Gere um plano de aula sobre [Tópico: Alfabetização] para alunos do [Ano: 1º ano], com atividades diferentes para quem já sabe ler e para quem está começando.'
  },
  {
    id: 28,
    title: "Alfabetização Funcional (EJA)",
    description: "Promova a alfabetização de jovens e adultos utilizando textos do cotidiano (rótulos, placas) para desenvolver a autonomia e leitura de mundo.",
    category: "EJA",
    icon: BookOpen,
    defaultPrompt: "Crie uma atividade de alfabetização para EJA usando rótulos de supermercado. O objetivo é identificar letras, sílabas e preços em produtos do dia a dia. Inclua perguntas orais para estimular a discussão."
  },
  {
    id: 29,
    title: "Matemática no Trabalho (EJA)",
    description: "Desenvolva o raciocínio matemático de adultos através de situações práticas de trabalho e economia doméstica.",
    category: "EJA",
    icon: Briefcase,
    defaultPrompt: "Elabore 3 situações-problema de matemática para alunos da EJA envolvendo: 1) Conferência de troco, 2) Cálculo de horas extras simples, 3) Planejamento de lista de compras com orçamento limitado."
  },
  {
    id: 30,
    title: "Cidadania e Documentos (EJA)",
    description: "Fortaleça a cidadania de jovens e adultos ensinando a interpretar documentos oficiais e direitos básicos.",
    category: "EJA",
    icon: Landmark,
    defaultPrompt: "Desenvolva um roteiro de aula sobre como ler e entender uma conta de luz (fatura de energia). Explique os termos técnicos (KWh, bandeiras tarifárias) de forma simples e sugira uma discussão sobre consumo consciente."
  },
  {
    id: 31,
    title: "Adaptação de Atividade (Inclusão)",
    description: "Adapte o currículo para alunos com neurodivergência (TEA, TDAH), removendo barreiras e garantindo o acesso ao conteúdo.",
    category: "Educação Especial",
    icon: Accessibility,
    defaultPrompt: "Adapte uma atividade sobre [Tema: Sistema Solar] para um aluno do [Ano: 3º ano] com [Necessidade: Autismo não-verbal]. Sugira recursos visuais, sensoriais e formas de avaliação alternativas que não dependam da fala."
  },
  {
    id: 32,
    title: "Plano Educacional Individualizado (PEI)",
    description: "Estruture o Plano Educacional Individualizado para alunos com deficiência, definindo metas baseadas em suas potencialidades.",
    category: "Educação Especial",
    icon: HeartHandshake,
    defaultPrompt: "Crie um esboço de PEI (Plano Educacional Individualizado) para um aluno de 8 anos com [Necessidade: TDAH]. Foco nas habilidades de: [Habilidade 1: Concentração] e [Habilidade 2: Leitura]. Sugira 3 metas semestrais e estratégias de manejo em sala de aula."
  },
  {
    id: 33,
    title: "Criação de Atividades Lúdicas (EJA)",
    description: "Engaje alunos da EJA com jogos adaptados ao universo adulto que ensinam saúde e finanças de forma leve.",
    category: "EJA",
    icon: Gamepad2,
    defaultPrompt: "Crie uma atividade lúdica para alunos da EJA sobre [Tópico: Educação Financeira Básica]. O jogo deve envolver simulação de orçamento doméstico e tomada de decisões simples."
  },
  {
    id: 34,
    title: "Histórias Sociais (TEA)",
    description: "Auxilie alunos com TEA a compreender interações sociais e rotinas através de narrativas visuais personalizadas.",
    category: "Educação Especial",
    icon: Smile,
    defaultPrompt: "Crie uma história social para um aluno com autismo de 6 anos sobre o tema: [Situação: Esperar na fila da cantina]. Use linguagem positiva, frases curtas e descreva o comportamento esperado e os sentimentos envolvidos."
  },
  {
    id: 35,
    title: "Comunicação Aumentativa (CAA)",
    description: "Forneça autonomia comunicativa para alunos não-verbais através de recursos de Comunicação Aumentativa e Alternativa (CAA).",
    category: "Educação Especial",
    icon: MessageSquare,
    defaultPrompt: "Sugira uma lista de 10 símbolos/pictogramas essenciais para uma prancha de comunicação básica para um aluno não-verbal na hora do recreio. Descreva o que cada cartão deve representar (ex: 'Quero água', 'Banheiro', 'Brincar')."
  },
  {
    id: 36,
    title: "Integração Sensorial",
    description: "Apoie alunos com necessidades sensoriais através de atividades que promovem a regulação e o desenvolvimento motor.",
    category: "Educação Especial",
    icon: Ear,
    defaultPrompt: "Planeje um circuito sensorial para alunos da Educação Infantil com foco em [Sentido: Tato e Equilíbrio]. Descreva 3 estações de atividades usando materiais simples como caixas de ovo, tecidos e almofadas."
  },
  {
    id: 37,
    title: "Atividades Pedagógicas Adaptadas (TEA)",
    description: "Engaje alunos com TEA utilizando seus interesses específicos (hiperfoco) como porta de entrada para conteúdos curriculares.",
    category: "Educação Especial",
    icon: Puzzle,
    defaultPrompt: "Crie uma atividade de [Matéria: Matemática] para um aluno com TEA que tem hiperfoco em [Interesse: Dinossauros]. O objetivo é ensinar [Tópico: Soma Simples] usando o tema de interesse para explicar o conceito."
  },
  {
    id: 38,
    title: "Rotina Visual e Antecipação (TEA)",
    description: "Reduza a ansiedade de alunos com autismo oferecendo previsibilidade através de quadros de rotina e apoios visuais.",
    category: "Educação Especial",
    icon: CalendarClock,
    defaultPrompt: "Crie uma estrutura de rotina visual para o período da [Manhã/Tarde] para um aluno com autismo. Inclua momentos de chegada, atividade, lanche e saída. Descreva como explicar mudanças na rotina (antecipação) para evitar crises."
  }
];