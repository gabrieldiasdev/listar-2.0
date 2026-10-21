import type { Locale } from '@/i18n/locales'

export interface MockItem {
  name: string
  detail?: string
  checked?: boolean
}

export interface MockScreen {
  title: string
  subtitle: string
  sections: { title: string; items: MockItem[]; cart?: boolean }[]
}

interface TitledText {
  title: string
  description: string
}

export interface LandingContent {
  header: { homeLabel: string; signIn: string }
  cta: string
  hero: {
    badge: string
    titleStart: string
    titleHighlight: string
    description: string
    secondaryCta: string
    highlights: string[]
  }
  mockup: { tabs: { home: string; shopping: string }; home: MockScreen; shopping: MockScreen }
  howItWorks: { title: string; description: string; steps: [TitledText, TitledText, TitledText] }
  features: { title: string; description: string; items: TitledText[] }
  story: { quote: string; author: string }
  faq: { title: string; items: { question: string; answer: string }[] }
  closing: { title: string; description: string; footer: string; contact: string; language: string }
}

const ptPT: LandingContent = {
  header: { homeLabel: 'Listar, página inicial', signIn: 'Entrar' },
  cta: 'Começar gratuitamente',
  hero: {
    badge: 'Lista de compras partilhada',
    titleStart: 'A lista de compras da casa, ',
    titleHighlight: 'sempre à mão.',
    description:
      'Marque o que falta na cozinha e encontre tudo no supermercado, organizado por secções. Toda a família vê a mesma lista, ao mesmo tempo.',
    secondaryCta: 'Ver como funciona',
    highlights: ['Gratuito e sem anúncios', 'Android, iPhone e computador', 'Entra com a conta Google'],
  },
  mockup: {
    tabs: { home: 'Casa', shopping: 'Supermercado' },
    home: {
      title: 'A nossa casa',
      subtitle: '4 produtos para comprar',
      sections: [
        { title: 'Frutas e legumes', items: [{ name: 'Bananas', checked: true }, { name: 'Cebolas' }] },
        {
          title: 'Lacticínios',
          items: [{ name: 'Leite', detail: '6 pacotes · pedido pela Ana', checked: true }, { name: 'Iogurtes' }],
        },
        { title: 'Mercearia', items: [{ name: 'Arroz', checked: true }, { name: 'Azeite' }, { name: 'Café', checked: true }] },
      ],
    },
    shopping: {
      title: 'Supermercado',
      subtitle: '2 de 4 no carrinho',
      sections: [
        { title: 'Frutas e legumes', items: [{ name: 'Bananas' }] },
        { title: 'Mercearia', items: [{ name: 'Café' }] },
        {
          title: 'No carrinho',
          cart: true,
          items: [
            { name: 'Leite', detail: '6 pacotes', checked: true },
            { name: 'Arroz', checked: true },
          ],
        },
      ],
    },
  },
  howItWorks: {
    title: 'Três passos, zero complicações',
    description: 'Tal como a lista em papel na porta do frigorífico, mas sempre consigo e partilhada com a família.',
    steps: [
      {
        title: 'Marque o que falta',
        description:
          'A lista já tem os produtos que costuma comprar. Na cozinha, basta tocar no que está a acabar e, se quiser, indicar a quantidade.',
      },
      {
        title: 'Vá às compras',
        description:
          'No supermercado só aparece o que é preciso, arrumado por secções. Toque em cada produto à medida que o põe no carrinho.',
      },
      {
        title: 'Partilhe com quem vive consigo',
        description: 'Envie um convite pelo WhatsApp. Quem for às compras, seja quem for, vê sempre a lista atualizada.',
      },
    ],
  },
  features: {
    title: 'Pensado para o dia a dia',
    description: 'Sem funcionalidades a mais. Só o que faz falta para nunca mais voltar do supermercado sem o café.',
    items: [
      {
        title: 'Letra grande, botões grandes',
        description: 'Fácil de ler e de usar, sem menus escondidos. Feito para toda a família, dos filhos aos avós.',
      },
      {
        title: 'Funciona sem rede',
        description: 'Rede fraca no supermercado? A lista abre na mesma e sincroniza quando a ligação voltar.',
      },
      {
        title: 'Tudo em tempo real',
        description: 'Se alguém acrescentar leite em casa, aparece logo no telemóvel de quem está no supermercado.',
      },
      {
        title: 'Traga a lista que já tem',
        description: 'Tem uma lista nas notas do telemóvel? Cole-a no Listar e cada produto vai para a secção certa.',
      },
      {
        title: 'Sem passar pela loja de aplicações',
        description: 'Abre no navegador e fica no ecrã principal como uma aplicação, sem ocupar espaço.',
      },
      { title: 'A sua lista é sua', description: 'Só quem convidar vê a lista. Sem anúncios e sem venda de dados.' },
    ],
  },
  story: {
    quote:
      'O Listar nasceu para ajudar o meu pai, que fazia as compras do mês com uma lista no bloco de notas. Hoje a família inteira usa a mesma lista, e já ninguém se esquece do café.',
    author: 'Gabriel, criador do Listar',
  },
  faq: {
    title: 'Perguntas frequentes',
    items: [
      { question: 'É mesmo gratuito?', answer: 'Sim. O Listar é gratuito e não tem anúncios.' },
      {
        question: 'Preciso de instalar alguma coisa?',
        answer:
          'Não. Basta abrir o Listar no navegador do telemóvel e entrar com a sua conta Google. Se quiser, pode adicioná-lo ao ecrã principal para o abrir como uma aplicação.',
      },
      { question: 'Funciona no iPhone?', answer: 'Sim. Funciona no Android, no iPhone e também no computador.' },
      {
        question: 'Quem consegue ver a minha lista?',
        answer: 'Apenas as pessoas que convidar. Cada casa tem a sua própria lista, separada de todas as outras.',
      },
      {
        question: 'E se não tiver rede no supermercado?',
        answer:
          'A lista continua a funcionar. As alterações ficam guardadas no telemóvel e são enviadas assim que houver ligação.',
      },
      {
        question: 'Porque é preciso uma conta Google?',
        answer: 'É a forma mais simples e segura de entrar: não precisa de criar nem de decorar mais uma palavra-passe.',
      },
    ],
  },
  closing: {
    title: 'Experimente já nas próximas compras',
    description: 'Leva menos de um minuto a começar. Depois é só convidar quem vive consigo.',
    footer: 'Feito com carinho, em família.',
    contact: 'Contacto',
    language: 'Idioma',
  },
}

const ptBR: LandingContent = {
  header: { homeLabel: 'Listar, página inicial', signIn: 'Entrar' },
  cta: 'Começar grátis',
  hero: {
    badge: 'Lista de compras compartilhada',
    titleStart: 'A lista de compras da casa, ',
    titleHighlight: 'sempre à mão.',
    description:
      'Marque o que falta na cozinha e encontre tudo no mercado, organizado por seções. Toda a família vê a mesma lista, ao mesmo tempo.',
    secondaryCta: 'Ver como funciona',
    highlights: ['Grátis e sem anúncios', 'Android, iPhone e computador', 'Entra com a conta Google'],
  },
  mockup: {
    tabs: { home: 'Casa', shopping: 'Mercado' },
    home: {
      title: 'Nossa casa',
      subtitle: '4 itens para comprar',
      sections: [
        { title: 'Hortifruti', items: [{ name: 'Banana', checked: true }, { name: 'Cebola' }] },
        {
          title: 'Frios e laticínios',
          items: [{ name: 'Leite', detail: '6 caixas · pedido por Ana', checked: true }, { name: 'Iogurte' }],
        },
        { title: 'Mercearia', items: [{ name: 'Arroz', checked: true }, { name: 'Feijão' }, { name: 'Café', checked: true }] },
      ],
    },
    shopping: {
      title: 'Mercado',
      subtitle: '2 de 4 no carrinho',
      sections: [
        { title: 'Hortifruti', items: [{ name: 'Banana' }] },
        { title: 'Mercearia', items: [{ name: 'Café' }] },
        {
          title: 'No carrinho',
          cart: true,
          items: [
            { name: 'Leite', detail: '6 caixas', checked: true },
            { name: 'Arroz', checked: true },
          ],
        },
      ],
    },
  },
  howItWorks: {
    title: 'Três passos, zero complicação',
    description: 'Igual à lista de papel na porta da geladeira, mas sempre com você e compartilhada com a família.',
    steps: [
      {
        title: 'Marque o que falta',
        description:
          'A lista já tem os produtos que você costuma comprar. Na cozinha, é só tocar no que está acabando e, se quiser, informar a quantidade.',
      },
      {
        title: 'Vá às compras',
        description:
          'No mercado aparece só o que precisa, organizado por seções. Toque em cada produto conforme coloca no carrinho.',
      },
      {
        title: 'Compartilhe com quem mora com você',
        description: 'Mande um convite pelo WhatsApp. Quem for ao mercado, seja quem for, vê sempre a lista atualizada.',
      },
    ],
  },
  features: {
    title: 'Pensado para o dia a dia',
    description: 'Sem funções sobrando. Só o necessário para nunca mais voltar do mercado sem o café.',
    items: [
      {
        title: 'Letra grande, botões grandes',
        description: 'Fácil de ler e de usar, sem menus escondidos. Feito para toda a família, dos filhos aos avós.',
      },
      {
        title: 'Funciona sem internet',
        description: 'Sinal fraco no mercado? A lista abre do mesmo jeito e sincroniza quando a conexão voltar.',
      },
      {
        title: 'Tudo em tempo real',
        description: 'Se alguém colocar leite na lista em casa, aparece na hora no celular de quem está no mercado.',
      },
      {
        title: 'Traga a lista que você já tem',
        description: 'Tem uma lista no bloco de notas do celular? Cole no Listar e cada produto vai para a seção certa.',
      },
      {
        title: 'Sem passar pela loja de aplicativos',
        description: 'Abre no navegador e fica na tela inicial como um aplicativo, sem ocupar espaço.',
      },
      { title: 'Sua lista é sua', description: 'Só quem você convidar vê a lista. Sem anúncios e sem venda de dados.' },
    ],
  },
  story: {
    quote:
      'O Listar nasceu para ajudar o meu pai, que fazia as compras do mês com uma lista no bloco de notas. Hoje a família inteira usa a mesma lista, e ninguém mais esquece o café.',
    author: 'Gabriel, criador do Listar',
  },
  faq: {
    title: 'Perguntas frequentes',
    items: [
      { question: 'É grátis mesmo?', answer: 'Sim. O Listar é grátis e não tem anúncios.' },
      {
        question: 'Preciso instalar alguma coisa?',
        answer:
          'Não. É só abrir o Listar no navegador do celular e entrar com sua conta Google. Se quiser, adicione à tela inicial para abrir como um aplicativo.',
      },
      { question: 'Funciona no iPhone?', answer: 'Sim. Funciona no Android, no iPhone e também no computador.' },
      {
        question: 'Quem consegue ver a minha lista?',
        answer: 'Só as pessoas que você convidar. Cada casa tem a própria lista, separada de todas as outras.',
      },
      {
        question: 'E se não tiver internet no mercado?',
        answer: 'A lista continua funcionando. As mudanças ficam salvas no celular e são enviadas assim que a conexão voltar.',
      },
      {
        question: 'Por que precisa de conta Google?',
        answer: 'É o jeito mais simples e seguro de entrar: você não precisa criar nem decorar mais uma senha.',
      },
    ],
  },
  closing: {
    title: 'Experimente já na próxima compra',
    description: 'Leva menos de um minuto para começar. Depois é só convidar quem mora com você.',
    footer: 'Feito com carinho, em família.',
    contact: 'Contato',
    language: 'Idioma',
  },
}

export const landingContent: Record<Locale, LandingContent> = { 'pt-PT': ptPT, 'pt-BR': ptBR }
