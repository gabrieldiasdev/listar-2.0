import { site } from '@/config/site'
import type { Locale } from '@/i18n/locales'
import type { LegalDocument } from './model'

const ptPT: LegalDocument = {
  title: 'Termos de Utilização',
  updated: '21 de outubro de 2026',
  intro: 'Estes termos explicam as regras para usar o Listar. Ao entrar com a sua conta Google, aceita-os.',
  sections: [
    {
      heading: 'O serviço',
      paragraphs: ['O Listar é uma aplicação gratuita para criar listas de compras e partilhá-las com quem vive consigo.'],
    },
    {
      heading: 'A sua conta',
      paragraphs: [
        'É responsável pela atividade na sua conta e pelo que coloca nas listas.',
        'Quem tiver o link de convite de uma lista pode entrar nela, por isso envie-o apenas a pessoas de confiança. Pode criar um novo link a qualquer momento em Definições, o que anula o anterior.',
      ],
    },
    {
      heading: 'Utilização aceitável',
      bullets: [
        'Não use o Listar para fins ilegais.',
        'Não guarde conteúdo ofensivo nem dados de terceiros sem autorização.',
        'Não tente aceder a listas que não são suas nem sobrecarregar o serviço.',
      ],
    },
    {
      heading: 'Disponibilidade',
      paragraphs: [
        'O Listar é oferecido tal como está, sem garantia de funcionamento contínuo. Podemos alterar, suspender ou terminar o serviço; se o terminarmos, avisamos com antecedência razoável para que possa guardar as suas listas.',
      ],
    },
    {
      heading: 'Responsabilidade',
      paragraphs: [
        'Na medida permitida por lei, não somos responsáveis por perdas resultantes do uso do serviço ou da sua indisponibilidade.',
      ],
    },
    {
      heading: 'Terminar a utilização',
      paragraphs: [
        'Pode eliminar a sua conta a qualquer momento em Definições → Eliminar conta. Podemos suspender contas que violem estes termos.',
      ],
    },
    {
      heading: 'Alterações',
      paragraphs: [
        'Se alterarmos estes termos de forma relevante, avisamos na aplicação. Continuar a usar o Listar depois disso significa que aceita a nova versão.',
      ],
    },
    {
      heading: 'Lei aplicável',
      paragraphs: [
        'Estes termos regem-se pela lei portuguesa, sem prejuízo dos direitos que a lei do seu país de residência lhe garanta enquanto consumidor.',
      ],
    },
    {
      heading: 'Contacto',
      paragraphs: [`Dúvidas ou pedidos: ${site.contactEmail}.`],
    },
  ],
}

const ptBR: LegalDocument = {
  title: 'Termos de Uso',
  updated: '21 de outubro de 2026',
  intro: 'Estes termos explicam as regras para usar o Listar. Ao entrar com sua conta Google, você concorda com eles.',
  sections: [
    {
      heading: 'O serviço',
      paragraphs: ['O Listar é um aplicativo gratuito para criar listas de compras e compartilhá-las com quem mora com você.'],
    },
    {
      heading: 'Sua conta',
      paragraphs: [
        'Você é responsável pela atividade na sua conta e pelo que coloca nas listas.',
        'Quem tiver o link de convite de uma lista pode entrar nela, então envie-o só para pessoas de confiança. Você pode gerar um link novo a qualquer momento em Ajustes, o que invalida o anterior.',
      ],
    },
    {
      heading: 'Uso aceitável',
      bullets: [
        'Não use o Listar para fins ilegais.',
        'Não guarde conteúdo ofensivo nem dados de terceiros sem autorização.',
        'Não tente acessar listas que não são suas nem sobrecarregar o serviço.',
      ],
    },
    {
      heading: 'Disponibilidade',
      paragraphs: [
        'O Listar é oferecido como está, sem garantia de funcionamento contínuo. Podemos alterar, suspender ou encerrar o serviço; se o encerrarmos, avisaremos com antecedência razoável para que você possa guardar suas listas.',
      ],
    },
    {
      heading: 'Responsabilidade',
      paragraphs: [
        'Na medida permitida pela lei, não nos responsabilizamos por perdas decorrentes do uso do serviço ou da sua indisponibilidade.',
      ],
    },
    {
      heading: 'Encerrar o uso',
      paragraphs: [
        'Você pode excluir sua conta a qualquer momento em Ajustes → Excluir conta. Podemos suspender contas que violem estes termos.',
      ],
    },
    {
      heading: 'Mudanças',
      paragraphs: [
        'Se alterarmos estes termos de forma relevante, avisaremos no aplicativo. Continuar usando o Listar depois disso significa que você aceita a nova versão.',
      ],
    },
    {
      heading: 'Lei aplicável',
      paragraphs: [
        'Estes termos são regidos pela lei portuguesa, sem prejuízo dos direitos que a lei do seu país de residência garante a você como consumidor.',
      ],
    },
    {
      heading: 'Contato',
      paragraphs: [`Dúvidas ou pedidos: ${site.contactEmail}.`],
    },
  ],
}

export const termsOfUse: Record<Locale, LegalDocument> = { 'pt-PT': ptPT, 'pt-BR': ptBR }
