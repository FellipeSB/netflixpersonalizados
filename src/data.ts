import { Section, Testimonial, Product, PackagingOption } from './types';

// Let's import our beautifully generated images
import VALENTINE_HERO_IMG from "./assets/images/valentine_hero_1780444199683.png";
import G_BOX_PREMIUM_IMG from "./assets/images/gift_box_premium_1780444215879.png";
import PHOTO_TILE_SPOTIFY_IMG from "./assets/images/photo_tile_spotify_1780444228833.png";
import MAGIC_MUG_SPOTIFY_IMG from "./assets/images/magic_mug_spotify_1780444242696.png";

// Brand-new Love Collection generated images
import MUG_SONHO_IMG from "./assets/images/mug_sonho_1780613470552.png";
import MUG_AMOR_VIDA_IMG from "./assets/images/mug_amor_vida_1780613481591.png";
import MUG_ME_FAZ_BEM_IMG from "./assets/images/mug_me_faz_bem_1780613492771.png";
import MUG_EU_TE_AMO_IMG from "./assets/images/mug_eu_te_amo_1780613504504.png";
import MUG_MUNDO_LEVE_IMG from "./assets/images/mug_mundo_leve_1780613516930.png";

export const HERO_DATA = {
  title: "❤️ Dia dos Namorados 2026",
  subtitle: "Presentes personalizados criados para surpreender quem você ama.",
  heroImage: VALENTINE_HERO_IMG,
  ctaText: "🟢 VER PRESENTES"
};

export const SECTIONS_DATA: Section[] = [
  {
    id: "canecas-foto",
    title: "☕ Canecas Love",
    subtitle: "Os modelos mais vendidos para surpreender no Dia dos Namorados.",
    products: [
      {
        id: "caneca-love-foto-1",
        title: "Caneca Foto Eterno Amor",
        sectionId: "canecas-foto",
        subtitle: "Guarde seu melhor abraço",
        tagline: "A caneca perfeita para começar o dia bem acompanhado(a).",
        images: ["https://i.ibb.co/QFZSPWW2/F-1.webp"],
        description: "Crie um amanhecer mais terno para quem você ama. Estampamos a sua fotografia predileta junto ao lindo monograma de amor de vocês.",
        features: ["Lindo design moderno e romântico", "Personalizado com nome e foto", "Cerâmica importada extra-brilho", "Perfeita para micro-ondas e lava-louças"],
        badge: "Com Foto",
        price: 38.90,
        hasNames: true,
        hasPhotoUpload: true,
        hasPackaging: true
      },
      {
        id: "caneca-inicial-nome-1",
        title: "Caneca Inicial Rosas Clássicas",
        sectionId: "canecas-foto",
        subtitle: "A sua inicial em destaque",
        tagline: "Lindo floral vintage com a inicial e nome do seu amor.",
        images: ["https://i.ibb.co/Mz1xYFs/N-1.webp"],
        description: "Um design extremamente elegante and atemporal. Decorada com fontes caprichadas, as iniciais de vocês e elementos clássicos.",
        features: ["Design com iniciais exclusivas", "Personalizada com o nome", "Cerâmica importada esmaltada AAA", "Opção de embalagem incrível no checkout"],
        badge: "Personalizado",
        price: 38.90,
        hasNames: true,
        hasPhotoUpload: false,
        hasPackaging: true
      },
      {
        id: "caneca-love-foto-2",
        title: "Caneca Foto Meu Destino",
        sectionId: "canecas-foto",
        subtitle: "Mais calor e carinho no café",
        tagline: "Estampa sofisticada com a melhor recordação de vocês.",
        images: ["https://i.ibb.co/9HP2436f/F-2.webp"],
        description: "Uma caneca charmosa com a sua foto favorita e o nome do casal unindo a fofura e o estilo em perfeita harmonia.",
        features: ["Lindo design moderno e romântico", "Personalizado com nome e foto", "Cerâmica importada extra-brilho", "Perfeita para micro-ondas e lava-louças"],
        badge: "Com Foto",
        price: 38.90,
        hasNames: true,
        hasPhotoUpload: true,
        hasPackaging: true
      },
      {
        id: "caneca-inicial-nome-2",
        title: "Caneca Inicial Monograma Moderno",
        sectionId: "canecas-foto",
        subtitle: "Minimalista e chic",
        tagline: "Sua inicial em destaque com un toque contemporâneo.",
        images: ["https://i.ibb.co/mVKKd8R6/N-2.webp"],
        description: "Combinação estilosa de monograma com grafismos charmosos. Minimalista, elegante e ideal para presentear.",
        features: ["Design com iniciais exclusivas", "Personalizada com o nome", "Cerâmica importada esmaltada AAA", "Opção de embalagem incrível no checkout"],
        badge: "Personalizado",
        price: 38.90,
        hasNames: true,
        hasPhotoUpload: false,
        hasPackaging: true
      },
      {
        id: "caneca-love-foto-3",
        title: "Caneca Foto Doce Abraço",
        sectionId: "canecas-foto",
        subtitle: "Sua presença na minha rotina",
        tagline: "Um presente repleto de ternura e afeto.",
        images: ["https://i.ibb.co/mrMFW1nS/F-3.webp"],
        description: "Personalize a caneca com o nome do seu amor e a foto do momento mais especial que viveram juntos!",
        features: ["Lindo design moderno e romântico", "Personalizado com nome e foto", "Cerâmica importada extra-brilho", "Perfeita para micro-ondas e lava-louças"],
        badge: "Com Foto",
        price: 38.90,
        hasNames: true,
        hasPhotoUpload: true,
        hasPackaging: true
      },
      {
        id: "caneca-inicial-nome-3",
        title: "Caneca Inicial Ramos de Afeto",
        sectionId: "canecas-foto",
        subtitle: "Elegância clássica",
        tagline: "A sutileza das flores com a sobriedade do monograma.",
        images: ["https://i.ibb.co/KcR3DttP/N-3.webp"],
        description: "Mais um modelo encantador para presentear. Leva o nome do parceiro ou parceira com acabamento premium impecável.",
        features: ["Design com iniciais exclusivas", "Personalizada com o nome", "Cerâmica importada esmaltada AAA", "Opção de embalagem incrível no checkout"],
        badge: "Personalizado",
        price: 38.90,
        hasNames: true,
        hasPhotoUpload: false,
        hasPackaging: true
      },
      {
        id: "caneca-love-foto-4",
        title: "Caneca Foto Coração Xadrez",
        sectionId: "canecas-foto",
        subtitle: "Amor a cada gole",
        tagline: "Umas das nossas criações preferidas para o Dia dos Namorados.",
        images: ["https://i.ibb.co/GQDZ5JZq/F-4.webp"],
        description: "Exibe de um lado a frase poética, de outro a linda foto do casal e seus nomes entrelaçados para surpreender quem você ama.",
        features: ["Lindo design moderno e romântico", "Personalizado com nome e foto", "Cerâmica importada extra-brilho", "Perfeita para micro-ondas e lava-louças"],
        badge: "Com Foto",
        price: 38.90,
        hasNames: true,
        hasPhotoUpload: true,
        hasPackaging: true
      },
      {
        id: "caneca-inicial-nome-4",
        title: "Caneca Inicial Traços Delicados",
        sectionId: "canecas-foto",
        subtitle: "O charme das letras",
        tagline: "Traços modernos para homenagear a sua pessoa favorita.",
        images: ["https://i.ibb.co/vxqdVHPc/N-4.webp"],
        description: "Uma linda caneca com a inicial e os nomes de vocês em composição limpa e moderna.",
        features: ["Design com iniciais exclusivas", "Personalizada com o nome", "Cerâmica importada esmaltada AAA", "Opção de embalagem incrível no checkout"],
        badge: "Personalizado",
        price: 38.90,
        hasNames: true,
        hasPhotoUpload: false,
        hasPackaging: true
      },
      {
        id: "caneca-love-foto-5",
        title: "Caneca Foto Perto do Coração",
        sectionId: "canecas-foto",
        subtitle: "Perto do coração",
        tagline: "Suas melhores memórias estampadas com brilho fantástico.",
        images: ["https://i.ibb.co/BMgywC6/F.webp"],
        description: "Uma composição poética com a foto de vocês em destaque máximo, transmitindo todo o sentimento em uma peça luxuosa.",
        features: ["Lindo design moderno e romântico", "Personalizado com nome e foto", "Cerâmica importada extra-brilho", "Perfeita para micro-ondas e lava-louças"],
        badge: "Com Foto",
        price: 38.90,
        hasNames: true,
        hasPhotoUpload: true,
        hasPackaging: true
      },
      {
        id: "caneca-inicial-nome-5",
        title: "Caneca Inicial Doce Homenagem",
        sectionId: "canecas-foto",
        subtitle: "Letras e Afeto",
        tagline: "Monograma floral delicado e sofisticado.",
        images: ["https://i.ibb.co/G3TD8Fhm/N.webp"],
        description: "Especialmente desenhada para encantar. Uma estampa de inicial de extremo bom gosto e qualidade de impressão insuperável.",
        features: ["Design com iniciais exclusivas", "Personalizada com o nome", "Cerâmica importada esmaltada AAA", "Opção de embalagem incrível no checkout"],
        badge: "Personalizado",
        price: 38.90,
        hasNames: true,
        hasPhotoUpload: false,
        hasPackaging: true
      }
    ]
  },
  {
    id: "caneca-spotify",
    title: "🎵 Canecas Doce Amor",
    subtitle: "A música ou data que marcou a história de vocês.",
    products: [
      {
        id: "caneca-spotify-1",
        title: "Caneca Spotify",
        sectionId: "caneca-spotify",
        subtitle: "A música que marcou a história de vocês",
        tagline: "Aponte a câmera do celular no app Spotify para tocar sua música.",
        images: ["https://i.ibb.co/0yKG8SwM/S1.webp"],
        description: "Inovação e afeto juntos! Colocamos a sua melhor foto com o código tocável do Spotify da música de vocês. Abra o aplicativo, aponte a câmera e ouça a música na hora!",
        features: ["Código Spotify ativo e testado antes do envio", "Personalizada com nomes e foto de casal", "Resistente a micro-ondas com brilho estendido", "Escolha a embalagem ideal no fechamento do pedido"],
        badge: "Com Foto",
        price: 38.90,
        hasNames: true,
        hasPhotoUpload: true,
        hasMusicSpotify: true,
        hasPackaging: true
      },
      {
        id: "caneca-calendario",
        title: "Caneca Calendário",
        sectionId: "caneca-spotify",
        subtitle: "Reviva todos os dias aquela data especial",
        tagline: "Marque a data mais importante da história de vocês.",
        images: ["https://i.ibb.co/gMjVGRJj/C.webp"],
        description: "Uma caneca de valor sentimental inestimável. Um lindo calendário para fixar aquela data memorável com um coraçãozinho de carinho e estampar a foto mais fofa de vocês.",
        features: ["Personalizada com foto e nomes", "Vem com o calendário da sua data especial", "Altíssima definição e brilho esmaltado", "Selecione uma embalagem incrível no checkout"],
        badge: "Com Foto",
        price: 38.90,
        hasNames: true,
        hasPhotoUpload: true,
        hasCustomDate: true,
        hasPackaging: true
      },
      {
        id: "caneca-spotify-2",
        title: "Caneca Spotify Play",
        sectionId: "caneca-spotify",
        subtitle: "A batida perfeita do amor de vocês",
        tagline: "Um design moderno e interativo com a trilha de vocês.",
        images: ["https://i.ibb.co/v4nXMwYW/S2.webp"],
        description: "Sua foto emoldurada como capa de single no Spotify, completa with o player de mestre and seu código escaneável correspondente.",
        features: ["Código Spotify ativo e testado antes do envio", "Personalizada com nomes e foto de casal", "Resistente a micro-ondas com brilho estendido", "Escolha a embalagem ideal no fechamento do pedido"],
        badge: "Com Foto",
        price: 38.90,
        hasNames: true,
        hasPhotoUpload: true,
        hasMusicSpotify: true,
        hasPackaging: true
      }
    ]
  },

  {
    id: "azulejos",
    title: "🖼️ Azulejos Personalizados",
    subtitle: "Transforme uma linda memória afetiva em objeto de decoração elegante.",
    products: [
      {
        id: "azulejo-foto-1",
        title: "Azulejo com Foto",
        sectionId: "azulejos",
        subtitle: "Transforme uma lembrança em decoração",
        tagline: "Lindo azulejo personalizado com a sua foto favorita.",
        images: ["https://i.ibb.co/zh8X9rR2/a1.webp"],
        description: "Um lindo azulejo personalizado com a foto do casal. Perfeito para registrar aquele momento inesquecível e decorar o ambiente com carinho.",
        features: ["Cerâmica legítima de alto brilho no tamanho 15x15cm", "Personalizado com a sua foto favorita", "Impressão de altíssima definição que dura para sempre", "Acompanha suporte decorativo elegante"],
        badge: "Com Foto",
        price: 35.90,
        hasNames: false,
        hasPhotoUpload: true,
        hasPackaging: false
      },
      {
        id: "azulejo-foto-2",
        title: "Azulejo Minha Pessoa Favorita",
        sectionId: "azulejos",
        subtitle: "O momento marcante de vocês",
        tagline: "Cerâmica esmaltada de alto brilho com o seu momento favorito.",
        images: ["https://i.ibb.co/FL7sk27W/a2.webp"],
        description: "Brilho esmaltado único sobre cerâmica pura. Estampamos sua lembrança com o maior cuidado e definição para presentear a pessoa amada.",
        features: ["Cerâmica legítima de alto brilho no tamanho 15x15cm", "Personalizado com a sua foto favorita", "Impressão de altíssima definição que dura para sempre", "Acompanha suporte decorativo elegante"],
        badge: "Com Foto",
        price: 35.90,
        hasNames: false,
        hasPhotoUpload: true,
        hasPackaging: false
      },
      {
        id: "azulejo-foto-3",
        title: "Azulejo Eu Te Amo Meu Amor",
        sectionId: "azulejos",
        subtitle: "Mais amor no seu cantinho",
        tagline: "Um presente sofisticado e afetivo para decorar o lar.",
        images: ["https://i.ibb.co/r23LsCMY/a3.webp"],
        description: "Transforme sua foto mais apaixonada em uma verdadeira obra de arte sobre cerâmica vitrificada. Não desbota e traz um charme super especial.",
        features: ["Cerâmica legítima de alto brilho no tamanho 15x15cm", "Personalizado com a sua foto favorita", "Impressão de altíssima definição que dura para sempre", "Acompanha suporte decorativo elegante"],
        badge: "Com Foto",
        price: 35.90,
        hasNames: false,
        hasPhotoUpload: true,
        hasPackaging: false
      }
    ]
  },

  {
    id: "cestas",
    title: "💝 Cestas de Presentes",
    subtitle: "As mais completas para quem quer impressionar e fazer um banquete.",
    products: [
      {
        id: "cesta-amor",
        title: "Cesta Amor",
        sectionId: "cestas",
        subtitle: "Com Tábua and Pelúcia",
        tagline: "A cesta perfeita para arrancar suspiros com doçura e afeto.",
        images: ["https://i.ibb.co/RprFp5hZ/Cesta-Amor.webp"],
        description: "Surpreenda seu amor com uma cesta inesquecível e luxuosa. Acompanha uma caneca personalizada com sua foto e frase especial, tábua de madeira coração gravada a laser, coração gigante de pelúcia com escrita romântica e decorações.",
        features: [
          "Caneca com Frase e Foto",
          "Tábua de Madeira Coração Personalizada a laser",
          "Coração Grande de Pelúcia escrito com Amor",
          "Balão coração metalizado",
          "Cesta Cartonada de alta qualidade",
          "Decorações românticas e palha decorativa"
        ],
        badge: "Destaque Amor",
        price: 179.90,
        hasNames: false,
        hasPhotoUpload: true,
        hasPackaging: false
      },
      {
        id: "cesta-duo",
        title: "Cesta Duo",
        sectionId: "cestas",
        subtitle: "Duas canecas e Chocolates finos",
        tagline: "Perfeita para compartilhar as manhãs mais apaixonadas juntinhos.",
        images: ["https://i.ibb.co/NggPSdyf/Cesta-Duo-Plus.webp"],
        description: "Para brindar o amor em dose dupla. Acompanha duas canecas de porcelana personalizadas com foto e frase de vocês, uma caixa requintada com 12 bombons Ferrero Rocher, coração gigante de pelúcia, balão metalizado e cesta de MDF.",
        features: [
          "02 Canecas com Frase e Foto",
          "Kit 12 chocolates Ferrero Rocher",
          "Coração Grande de Pelúcia escrito com Eu te Amo",
          "Balão dourado de coração",
          "Cesta em MDF premium com Visor",
          "Decorações exclusivas"
        ],
        badge: "Desejado",
        price: 249.90,
        hasNames: false,
        hasPhotoUpload: true,
        hasPackaging: false
      },
      {
        id: "cesta-love",
        title: "Cesta Love",
        sectionId: "cestas",
        subtitle: "Copo Stanley e Flores",
        tagline: "Estilo, sofisticação e carinho em uma única cesta de coração.",
        images: ["https://i.ibb.co/YF0J90WC/Cesta-Love.webp"],
        description: "Um presente sofisticado e diferenciado. Inclui copo térmico estilo Stanley personalizado a laser, 4 bombons finos Ferrero Rocher, balão de coração dourado, flores nobres, embalagens e decorações artesanais na cesta cartonada de coração.",
        features: [
          "Copo estilo Stanley Personalizado a Laser",
          "Kit 4 Ferrero Rocher",
          "Balão dourado metalizado de coração",
          "Flores e folhagens decorativas",
          "Cesta de formato coração cartonada de luxo",
          "Personalização direta via WhatsApp"
        ],
        badge: "Luxo",
        price: 179.90,
        hasNames: false,
        hasPhotoUpload: false,
        hasPackaging: false
      },
      {
        id: "cesta-sonho",
        title: "Cesta Sonho",
        sectionId: "cestas",
        subtitle: "Completa Premium",
        tagline: "O amanhecer romântico que vocês sempre sonharam.",
        images: ["https://i.ibb.co/5XqNzDM3/Cesta-Sonho.webp"],
        description: "Uma experiência maravilhosa de café da manhã e carinho. Caneca premium esmaltada com foto, tábua de madeira retangular personalizada a laser, colher coração dourada de luxo, 3 bombons Ferrero Rocher e mimos na caixa de MDF.",
        features: [
          "Caneca com Frase e Foto",
          "Tábua de Madeira retangular Personalizada a laser",
          "Balão dourado metalizado de Coração",
          "Caixa de MDF decorativa de luxo",
          "Colher com ponta coração dourada",
          "Kit 3 Ferrero Rocher",
          "Decorações românticas e laço"
        ],
        badge: "Mais Vendida",
        price: 149.90,
        hasNames: false,
        hasPhotoUpload: true,
        hasPackaging: false
      },
      {
        id: "cesta-carinho",
        title: "Cesta Carinho",
        sectionId: "cestas",
        subtitle: "Presente Completo de Afeto",
        tagline: "Sua pessoa favorita merece a caneca e o azulejo mais lindos juntos.",
        images: ["https://i.ibb.co/FL4TYkYN/Cestas-Caneca-Azulejo.webp"],
        description: "O presente final para marcar o Dia dos Namorados. Reúne uma linda caneca esmaltada personalizada com frase + foto e um azulejo de cerâmica legítimo com foto especial, acompanhado de coração gigante de pelúcia, chocolates KitKat e fita na caixa vazada decorada.",
        features: [
          "Caneca com Frase e Foto",
          "Azulejo com Foto legítimo",
          "Coração grande de pelúcia fofinho",
          "Chocolates KitKat inclusos",
          "Caixa vazada de madeira decorada premium",
          "Laço de cetim romântico"
        ],
        badge: "Super Combo",
        price: 149.90,
        hasNames: false,
        hasPhotoUpload: true,
        hasPackaging: false
      }
    ]
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: "t1",
    author: "Juliana Santos",
    date: "Aprovado há 2 dias",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    messages: [
      { sender: 'customer', text: "Gente, eu tô simplesmente APAIXONADA pela caneca mágica! Meu namorado ficou sem reação quando colocamos o café quente, ele até chorou kkkkk ❤️❤️", time: "14:32" },
      { sender: 'store', text: "Aaaaa Juliana, que maravilhoso saber disso! A caneca mágica realmente entrega uma emoção muito legal, ficamos muito felizes de participar desse momento de vocês! 💕", time: "14:35" },
      { sender: 'customer', text: "O código do Spotify funcionou perfeitamente também. Podem comprar sem medo pessoal, a definição da foto é impecável!", time: "14:36" }
    ]
  },
  {
    id: "t2",
    author: "Matheus Oliveira",
    date: "Aprovado hoje",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    messages: [
      { sender: 'customer', text: "Chegou o Box Premium aqui no RS! Muito bem embalado, a tábua com as nossas iniciais gravadas a laser tem um acabamento impecável, cheiro de madeira nobre mesmo.", time: "10:15" },
      { sender: 'store', text: "Ótimo, Matheus! A madeira é selecionada e recebe tratamento com óleo mineral para ser usada na cozinha com toda segurança. Sua namorada vai amar!", time: "10:20" },
      { sender: 'customer', text: "Com certeza vai! Obrigado pelo atendimento fantástico de vocês, respondem super rápido no WhatsApp.", time: "10:21" }
    ]
  },
  {
    id: "t3",
    author: "Amanda Costa",
    date: "Aprovado há 1 semana",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    messages: [
      { sender: 'customer', text: "Olá! Vim só agradecer pela entrega super rápida do azulejo Spotify! Achei que não ia dar tempo por conta da foto, mas foi enviado no outro dia.", time: "17:40" },
      { sender: 'store', text: "Amanda! Nós corremos bastante para que todos os casais recebam antes do dia especial. Ficou linda demais a foto de vocês dois na cerâmica!", time: "17:42" },
      { sender: 'customer', text: "Ficou perfeita! O azulejo tem um brilho espelhado que fica lindo no criado-mudo. Vale cada centavo, parabéns pelo capricho!", time: "17:45" }
    ]
  },
  {
    id: "t4",
    author: "Rodrigo Almeida",
    date: "Aprovado ontem",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
    messages: [
      { sender: 'customer', text: "Boa tarde! Acabou de chegar a Cesta Corações. O laço gigante de cetim vermelho deu um charme absurdo nela.", time: "15:04" },
      { sender: 'store', text: "Boa tarde, Rodrigo! Colocamos muito capricho nesse laço e na montagem das delícias. Os chocolates estão bem frescos também!", time: "15:08" },
      { sender: 'customer', text: "Estou vendo aqui, tudo de primeira linha mesmo. A caneca ficou 100% igual ao modelo que escolhi pelo site. Muito obrigado pelo capricho 👏", time: "15:10" }
    ]
  }
];

export const GUARANTEES_DATA = [
  { id: 'g1', title: 'Designers Profissionais', desc: 'Sua foto e iniciais passam por edição e correção profissional de brilho e nitidez para ficarem perfeitas nas fotos.', iconName: 'Compass' },
  { id: 'g2', title: 'Feito em Guaíba', desc: 'Produção local atenciosa com cerâmica importada de altíssimo brilho que resiste ao micro-ondas.', iconName: 'Camera' },
  { id: 'g3', title: 'Prontinho para Presente', desc: 'Todos os pedidos são cuidadosamente embalados de forma romântica e cheirosa, prontos para encantar.', iconName: 'Gift' },
  { id: 'g4', title: 'Entrega Guaíba & Região', desc: 'Opção de entrega expressa no mesmo dia ou retirada em horário agendado de forma super segura.', iconName: 'Truck' }
];

export const URGENCY_DATA = {
  text: "⚠️ Produção limitada para o Dia dos Namorados. Faça sua reserva antecipadamente."
};

export const INSTAGRAM_SKELETON_POSTS = [
  "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1513530534585-c7b1394c6d51?w=600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600&auto=format&fit=crop&q=80"
];

// Helper to generate custom WhatsApp links
export function generateWhatsAppUrl(phone: string, text: string) {
  const cleanPhone = phone.replace(/\D/g, '');
  let encoded = encodeURIComponent(text);
  
  // Replace encoded placeholders with 100% accurate, un-corruptible percent-encoded emoji bytes
  encoded = encoded
    .replace(/%5BHEART%5D/gi, "%E2%9D%A4%EF%B8%8F")
    .replace(/%5BPENCIL%5D/gi, "%E2%9C%8D%EF%B8%8F")
    .replace(/%5BCALENDAR%5D/gi, "%F0%9F%93%85")
    .replace(/%5BMUSIC%5D/gi, "%F0%9F%8E%B5")
    .replace(/%5BCAMERA%5D/gi, "%F0%9F%93%B8")
    .replace(/%5BGIFT%5D/gi, "%F0%9F%8E%81")
    .replace(/%5BBOX%5D/gi, "%F0%9F%93%A6");

  return `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encoded}`;
}

// Packaging options defaults & loader helpers
export const DEFAULT_PACKAGING_OPTIONS: PackagingOption[] = [
  {
    id: 'nenhuma',
    name: 'Não quero embalagem',
    description: 'Vou utilizar minha própria sacola ou caixinha de presentes.',
    price: 0,
    image: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'visor-palha-pelucia',
    name: 'Embalagem Kraft Coracao',
    description: 'Caixinha decorada com visor transparente, palha fina e um lindo coração de pelúcia fofinho.',
    price: 19.90,
    image: 'https://i.ibb.co/mFM6zYMx/Emb-Cora-o-Pel-cia.webp'
  },
  {
    id: 'visor-palha-tabua',
    name: 'Embalagem Kraft Tábua',
    description: 'Caixinha premium decorativa com palha e tábua de madeira artesanal rústica.',
    price: 24.90,
    image: 'https://i.ibb.co/W43VFdw1/Emb-T-bua.webp'
  },
  {
    id: 'mdf-coracao-kitkat',
    name: 'Embalagem Coração MDF',
    description: 'Belíssima embalagem temática em formato de coração MDF especial para namorados.',
    price: 49.90,
    image: 'https://i.ibb.co/r8rcnyz/Emb-Cora-o-MDF.webp'
  }
];

export const getPackagingOptions = (): PackagingOption[] => {
  const saved = localStorage.getItem('catalog_packaging_options_v3');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading custom packagings:', e);
    }
  }
  return DEFAULT_PACKAGING_OPTIONS;
};
