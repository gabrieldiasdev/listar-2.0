import { site } from '@/config/site'
import type { Locale } from '@/i18n/locales'
import type { LegalDocument } from './model'

const email = site.contactEmail

const ptPT: LegalDocument = {
  title: 'Política de Privacidade',
  updated: '21 de outubro de 2026',
  intro:
    'Esta política explica que dados pessoais o Listar recolhe, para que os usa e que direitos tem sobre eles. Tentámos escrevê-la de forma simples, tal como a aplicação.',
  sections: [
    {
      heading: 'Quem é o responsável',
      paragraphs: [
        `O Listar é um projeto pessoal desenvolvido e mantido por ${site.ownerName}, responsável pelo tratamento dos seus dados. Para qualquer questão sobre privacidade, escreva para ${email}.`,
      ],
    },
    {
      heading: 'Que dados recolhemos',
      bullets: [
        'Dados da conta Google, fornecidos quando entra: nome, endereço de e-mail, fotografia de perfil e um identificador interno.',
        'O conteúdo que cria: o nome da lista, os produtos, quantidades, notas, secções e quem marcou cada produto.',
        'As listas de que faz parte e quem as criou.',
        'No seu dispositivo, e apenas lá: o idioma escolhido e uma cópia da lista para funcionar sem rede.',
        'Sinais técnicos do navegador e do dispositivo, analisados pelo reCAPTCHA da Google para confirmar que os pedidos vêm da aplicação verdadeira e não de programas automáticos.',
      ],
      paragraphs: ['Não recolhemos a sua localização, contactos, dados de pagamento nem dados para publicidade.'],
    },
    {
      heading: 'Para que usamos os dados',
      paragraphs: [
        'Apenas para prestar o serviço e protegê-lo: identificar a sua conta, guardar e sincronizar a lista entre os membros da casa, mostrar quem pediu cada produto e impedir abusos automáticos. Não vendemos dados, não os partilhamos para publicidade e o Listar não tem anúncios.',
      ],
    },
    {
      heading: 'Fundamento legal',
      paragraphs: [
        'O tratamento é necessário para executar o serviço que pediu ao criar a conta (artigo 6.º, n.º 1, alínea b), do Regulamento Geral sobre a Proteção de Dados).',
        'A proteção contra abusos com o reCAPTCHA assenta no nosso interesse legítimo em manter o serviço seguro e disponível para todos (alínea f) do mesmo artigo).',
      ],
    },
    {
      heading: 'Quem tem acesso aos dados',
      bullets: [
        'Os membros da mesma lista veem o seu primeiro nome, a sua fotografia e o conteúdo da lista.',
        'A Google, através do Firebase, aloja o serviço por nossa conta. A base de dados fica na União Europeia (Madrid, Espanha). A autenticação usa o Firebase Authentication e a proteção contra abusos usa o reCAPTCHA, que podem tratar dados fora da UE; nesse caso a Google aplica as garantias previstas no RGPD, como o Quadro de Privacidade de Dados UE-EUA e cláusulas contratuais-tipo. O reCAPTCHA está sujeito à Política de Privacidade e aos Termos de Utilização da Google.',
      ],
    },
    {
      heading: 'Durante quanto tempo',
      paragraphs: [
        'Guardamos os dados enquanto tiver conta. Quando a elimina, apagamos de imediato o seu perfil e retiramo-lo das listas; uma lista em que seja o único membro é apagada com todos os produtos. Cópias técnicas podem permanecer por um período limitado nos sistemas da Google antes de serem eliminadas.',
      ],
    },
    {
      heading: 'Os seus direitos',
      paragraphs: [
        'Pode aceder aos seus dados, corrigi-los, apagá-los, pedir uma cópia num formato portátil e opor-se ao tratamento ou pedir a sua limitação.',
        `Pode eliminar a conta a qualquer momento em Definições → Eliminar conta. Para os restantes pedidos, escreva para ${email}; respondemos no prazo de um mês.`,
        'Tem também o direito de apresentar reclamação à Comissão Nacional de Proteção de Dados (CNPD), em www.cnpd.pt.',
      ],
    },
    {
      heading: 'Cookies e armazenamento local',
      paragraphs: [
        'O Listar não usa cookies de publicidade nem de análise. Guarda no dispositivo apenas o que é necessário para funcionar: a sessão iniciada, a cópia da lista para uso sem rede e a preferência de idioma. O reCAPTCHA pode guardar um cookie técnico de segurança. Como todos são estritamente necessários, não mostramos um aviso de cookies.',
      ],
    },
    {
      heading: 'Crianças',
      paragraphs: ['O Listar não se destina a menores de 13 anos.'],
    },
    {
      heading: 'Alterações a esta política',
      paragraphs: [
        'Se esta política mudar de forma relevante, avisamos na aplicação. A data no topo indica a última atualização.',
      ],
    },
  ],
}

const ptBR: LegalDocument = {
  title: 'Política de Privacidade',
  updated: '21 de outubro de 2026',
  intro:
    'Esta política explica quais dados pessoais o Listar coleta, para que são usados e quais são os seus direitos sobre eles. Tentamos escrever de forma simples, como o próprio aplicativo.',
  sections: [
    {
      heading: 'Quem é o responsável',
      paragraphs: [
        `O Listar é um projeto pessoal desenvolvido e mantido por ${site.ownerName}, controlador dos seus dados. Para qualquer dúvida sobre privacidade, escreva para ${email}.`,
      ],
    },
    {
      heading: 'Quais dados coletamos',
      bullets: [
        'Dados da conta Google, fornecidos quando você entra: nome, e-mail, foto de perfil e um identificador interno.',
        'O conteúdo que você cria: o nome da lista, os itens, quantidades, observações, seções e quem marcou cada item.',
        'As listas de que você faz parte e quem as criou.',
        'No seu aparelho, e apenas nele: o idioma escolhido e uma cópia da lista para funcionar sem internet.',
        'Sinais técnicos do navegador e do aparelho, analisados pelo reCAPTCHA do Google para confirmar que os pedidos vêm do aplicativo verdadeiro e não de programas automáticos.',
      ],
      paragraphs: ['Não coletamos sua localização, contatos, dados de pagamento nem dados para publicidade.'],
    },
    {
      heading: 'Para que usamos os dados',
      paragraphs: [
        'Somente para prestar o serviço e protegê-lo: identificar sua conta, guardar e sincronizar a lista entre os membros da casa, mostrar quem pediu cada item e impedir abusos automáticos. Não vendemos dados, não compartilhamos para publicidade e o Listar não tem anúncios.',
      ],
    },
    {
      heading: 'Base legal',
      paragraphs: [
        'O tratamento é necessário para executar o serviço que você pediu ao criar a conta (art. 7º, V, da Lei Geral de Proteção de Dados e art. 6º, 1, b, do Regulamento Geral sobre a Proteção de Dados europeu).',
        'A proteção contra abusos com o reCAPTCHA se baseia no nosso legítimo interesse em manter o serviço seguro e disponível para todos (art. 7º, IX, da LGPD).',
      ],
    },
    {
      heading: 'Quem tem acesso aos dados',
      bullets: [
        'Os membros da mesma lista veem seu primeiro nome, sua foto e o conteúdo da lista.',
        'O Google, por meio do Firebase, hospeda o serviço em nosso nome. O banco de dados fica na União Europeia (Madri, Espanha). O login usa o Firebase Authentication e a proteção contra abusos usa o reCAPTCHA, que podem tratar dados em outros países, com as garantias contratuais exigidas pela legislação de proteção de dados. O reCAPTCHA está sujeito à Política de Privacidade e aos Termos de Serviço do Google.',
      ],
    },
    {
      heading: 'Por quanto tempo',
      paragraphs: [
        'Guardamos os dados enquanto você tiver conta. Quando você a exclui, apagamos imediatamente seu perfil e retiramos você das listas; uma lista em que você é o único membro é apagada com todos os itens. Cópias técnicas podem permanecer por um período limitado nos sistemas do Google antes de serem eliminadas.',
      ],
    },
    {
      heading: 'Seus direitos',
      paragraphs: [
        'Você pode acessar seus dados, corrigi-los, apagá-los, pedir uma cópia em formato portável e se opor ao tratamento.',
        `Você pode excluir a conta a qualquer momento em Ajustes → Excluir conta. Para os demais pedidos, escreva para ${email}; respondemos em até 15 dias.`,
        'Você também pode apresentar reclamação à Autoridade Nacional de Proteção de Dados (ANPD), em www.gov.br/anpd.',
      ],
    },
    {
      heading: 'Cookies e armazenamento local',
      paragraphs: [
        'O Listar não usa cookies de publicidade nem de análise. Guarda no aparelho apenas o necessário para funcionar: a sessão iniciada, a cópia da lista para uso sem internet e a preferência de idioma. O reCAPTCHA pode guardar um cookie técnico de segurança. Como todos são estritamente necessários, não mostramos aviso de cookies.',
      ],
    },
    {
      heading: 'Crianças',
      paragraphs: ['O Listar não é destinado a menores de 13 anos.'],
    },
    {
      heading: 'Mudanças nesta política',
      paragraphs: [
        'Se esta política mudar de forma relevante, avisaremos no aplicativo. A data no topo indica a última atualização.',
      ],
    },
  ],
}

export const privacyPolicy: Record<Locale, LegalDocument> = { 'pt-PT': ptPT, 'pt-BR': ptBR }
