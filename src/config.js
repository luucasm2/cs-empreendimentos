/**
 * Dados comerciais da CS Empreendimentos — CONFERIR ANTES DA PUBLICAÇÃO.
 * O telefone foi localizado em cadastros públicos da empresa em Santarém/PA;
 * não foi possível validá-lo diretamente pelo Instagram.
 * Use apenas dígitos com DDI e DDD: 55 + 93 + número.
 */
export const business = {
  name: 'CS Empreendimentos',
  city: 'Santarém',
  state: 'PA',
  whatsapp: '559391415334',
  instagram: 'https://www.instagram.com/csempreendimentosstm/',
  cityLabel: 'Santarém · Pará',
};

export const whatsappUrl = (text = 'Olá! Gostaria de conversar sobre um projeto com a CS Empreendimentos.') =>
  `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(text)}`;
