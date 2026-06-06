import * as XLSX from 'xlsx';
import { Section, Product } from '../types';

export interface ExcelRow {
  ID: string;
  'Título do Produto': string;
  'ID da Categoria (canecas-foto ou caneca-spotify)': string;
  'Preço (R$)': number;
  'Subtítulo': string;
  'Slogan (Tagline)': string;
  'Selo Destaque (ex: Novidade)': string;
  'Descrição': string;
  'Imagens (URLs separadas por vírgula ou quebra de linha)': string;
  'Características (Uma por linha)': string;
  'Pedir Nomes do Casal? (SIM / NÃO)': 'SIM' | 'NÃO';
  'Pedir Envio de Foto? (SIM / NÃO)': 'SIM' | 'NÃO';
  'Pedir Trilha Spotify? (SIM / NÃO)': 'SIM' | 'NÃO';
  'Pedir Data do Casal? (SIM / NÃO)': 'SIM' | 'NÃO';
  'Oferecer Opções de Caixa? (SIM / NÃO)': 'SIM' | 'NÃO';
  'Revelação Caneca Mágica? (SIM / NÃO)': 'SIM' | 'NÃO';
  'Destacar no Banner Inicial? (SIM / NÃO)': 'SIM' | 'NÃO';
}

/**
 * Exports current products from all sections to a styled .xlsx file
 */
export function exportCatalogToExcel(sections: Section[], storeName: string) {
  const rows: ExcelRow[] = [];

  sections.forEach(section => {
    section.products.forEach(p => {
      rows.push({
        ID: p.id,
        'Título do Produto': p.title,
        'ID da Categoria (canecas-foto ou caneca-spotify)': p.sectionId || section.id,
        'Preço (R$)': p.price || 49.90,
        'Subtítulo': p.subtitle || '',
        'Slogan (Tagline)': p.tagline || '',
        'Selo Destaque (ex: Novidade)': p.badge || '',
        'Descrição': p.description || '',
        'Imagens (URLs separadas por vírgula ou quebra de linha)': (p.images || []).join('\n'),
        'Características (Uma por linha)': (p.features || []).join('\n'),
        'Pedir Nomes do Casal? (SIM / NÃO)': p.hasNames !== false ? 'SIM' : 'NÃO',
        'Pedir Envio de Foto? (SIM / NÃO)': p.hasPhotoUpload !== false ? 'SIM' : 'NÃO',
        'Pedir Trilha Spotify? (SIM / NÃO)': p.hasMusicSpotify ? 'SIM' : 'NÃO',
        'Pedir Data do Casal? (SIM / NÃO)': p.hasCustomDate ? 'SIM' : 'NÃO',
        'Oferecer Opções de Caixa? (SIM / NÃO)': p.hasPackaging !== false ? 'SIM' : 'NÃO',
        'Revelação Caneca Mágica? (SIM / NÃO)': p.hasMagicReveal ? 'SIM' : 'NÃO',
        'Destacar no Banner Inicial? (SIM / NÃO)': p.isFeatured ? 'SIM' : 'NÃO'
      });
    });
  });

  // Also include a dummy sample row to guide them if catalog is empty
  if (rows.length === 0) {
    rows.push({
      ID: 'caneca-floral-nova',
      'Título do Produto': 'Caneca Floral Romântica Premium',
      'ID da Categoria (canecas-foto ou caneca-spotify)': 'canecas-foto',
      'Preço (R$)': 49.90,
      'Subtítulo': 'A caneca perfeita para o seu café',
      'Slogan (Tagline)': 'Iniciais gravadas com delicadeza botânica.',
      'Selo Destaque (ex: Novidade)': 'Mais Vendida',
      'Descrição': 'Feita sob medida com porcelana premium branca...',
      'Imagens (URLs separadas por vírgula ou quebra de linha)': 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80',
      'Características (Uma por linha)': 'Porcelana importada AAA\nEstampa em alta fusão\nLava-louças seguro',
      'Pedir Nomes do Casal? (SIM / NÃO)': 'SIM',
      'Pedir Envio de Foto? (SIM / NÃO)': 'SIM',
      'Pedir Trilha Spotify? (SIM / NÃO)': 'NÃO',
      'Pedir Data do Casal? (SIM / NÃO)': 'NÃO',
      'Oferecer Opções de Caixa? (SIM / NÃO)': 'SIM',
      'Revelação Caneca Mágica? (SIM / NÃO)': 'NÃO',
      'Destacar no Banner Inicial? (SIM / NÃO)': 'SIM'
    });
  }

  const worksheet = XLSX.utils.json_to_sheet(rows);

  // Set nice column widths for spreadsheets to look pristine
  worksheet['!cols'] = [
    { wch: 18 }, // ID
    { wch: 30 }, // Título
    { wch: 32 }, // ID Categoria
    { wch: 12 }, // Preço
    { wch: 25 }, // Subtítulo
    { wch: 25 }, // Slogan
    { wch: 18 }, // Selo
    { wch: 40 }, // Descrição
    { wch: 50 }, // Imagens
    { wch: 35 }, // Características
    { wch: 25 }, // Nomes
    { wch: 25 }, // Foto
    { wch: 25 }, // Spotify
    { wch: 25 }, // Data
    { wch: 25 }, // Opções Caixa
    { wch: 25 }, // Mágica
    { wch: 25 }, // Carrossel
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Catálogo de Produtos');

  // Generate file name dynamically
  const safeStoreName = storeName.toLowerCase().replace(/[^a-z0-9]/g, '-');
  const filename = `catalogo-produtos-${safeStoreName}.xlsx`;

  XLSX.writeFile(workbook, filename);
}

/**
 * Parses user-uploaded .xlsx file and converts it back into Product list grouping by category.
 * If category/section does not exist, it either skips or appends intelligently.
 */
export function importCatalogFromExcel(file: File, currentSections: Section[]): Promise<Section[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        
        const importedRows = XLSX.utils.sheet_to_json<any>(worksheet);
        if (importedRows.length === 0) {
          throw new Error('Planilha vazia ou sem linhas legíveis.');
        }

        // We make a clone of our sections to host the imported products
        // Ensure standard sections always exist
        let updatedSections: Section[] = currentSections.map(sect => ({
          ...sect,
          products: [] // Clear them out because this replaces or merges completely based on intent. We will replace to make clean imports!
        }));

        // If 'canecas-foto' and 'caneca-spotify' are not in currentSections, we add them defaults
        if (!updatedSections.some(s => s.id === 'canecas-foto')) {
          updatedSections.push({ id: 'canecas-foto', title: '☕ Canecas Love', subtitle: 'Os modelos mais vendidos para surpreender no Dia dos Namorados.', products: [] });
        }
        if (!updatedSections.some(s => s.id === 'caneca-spotify')) {
          updatedSections.push({ id: 'caneca-spotify', title: '🎵 Canecas Doce Amor', subtitle: 'A música ou data que marcou a história de vocês.', products: [] });
        }

        importedRows.forEach((row, index) => {
          // Parse values safely
          const id = String(row['ID'] || `prod-import-${index}-${Math.random().toString(36).substring(2, 6)}`).trim();
          const title = String(row['Título do Produto'] || row['nome'] || row['Nome'] || '').trim();
          
          if (!title) return; // Skip rows without name

          const targetSectionId = String(row['ID da Categoria (canecas-foto ou caneca-spotify)'] || row['Categoria'] || row['categoria'] || 'canecas-foto').trim().toLowerCase();
          
          // Match standard category ids correctly
          let finalSectionId = 'canecas-foto';
          if (targetSectionId.includes('spotify') || targetSectionId.includes('doce') || targetSectionId === 'caneca-spotify') {
            finalSectionId = 'caneca-spotify';
          }

          const rawPrice = row['Preço (R$)'] || row['valor'] || row['Valor'] || row['preco'] || row['Preço'];
          const price = parseFloat(String(rawPrice).replace('R$', '').replace(',', '.').trim()) || 49.90;

          const subtitle = row['Subtítulo'] || row['subtitulo'] || undefined;
          const tagline = row['Slogan (Tagline)'] || row['slogan'] || row['tagline'] || undefined;
          const badge = row['Selo Destaque (ex: Novidade)'] || row['selo'] || row['badge'] || undefined;
          const description = row['Descrição'] || row['descricao'] || `Lindo produto personalizado ${title} ideal para presente de Dia dos Namorados.`;

          // Handle list splits
          const rawImgs = row['Imagens (URLs separadas por vírgula ou quebra de linha)'] || row['imagem'] || row['Imagem'] || row['imagens'] || '';
          const images = String(rawImgs)
            .split(/[,\n]/)
            .map(url => url.trim())
            .filter(url => url.startsWith('http') || url.startsWith('/'));

          if (images.length === 0) {
            images.push('https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&auto=format&fit=crop&q=80');
          }

          const rawFeatures = row['Características (Uma por linha)'] || row['caracteristicas'] || '';
          const features = String(rawFeatures)
            .split(/[,\n]/)
            .map(f => f.trim())
            .filter(Boolean);

          // Boolean helpers
          const parseBool = (val: any, defaultVal: boolean): boolean => {
            if (val === undefined || val === null) return defaultVal;
            const str = String(val).toUpperCase().trim();
            if (str === 'SIM' || str === 'S' || str === 'YES' || str === 'TRUE' || str === '1') return true;
            if (str === 'NÃO' || str === 'NAO' || str === 'N' || str === 'NO' || str === 'FALSE' || str === '0') return false;
            return defaultVal;
          };

          const hasNames = parseBool(row['Pedir Nomes do Casal? (SIM / NÃO)'], true);
          const hasPhotoUpload = parseBool(row['Pedir Envio de Foto? (SIM / NÃO)'], true);
          const hasMusicSpotify = parseBool(row['Pedir Trilha Spotify? (SIM / NÃO)'], false);
          const hasCustomDate = parseBool(row['Pedir Data do Casal? (SIM / NÃO)'], false);
          const hasPackaging = parseBool(row['Oferecer Opções de Caixa? (SIM / NÃO)'], true);
          const hasMagicReveal = parseBool(row['Revelação Caneca Mágica? (SIM / NÃO)'], false);
          const isFeatured = parseBool(row['Destacar no Banner Inicial? (SIM / NÃO)'], false);

          const product: Product = {
            id,
            title,
            sectionId: finalSectionId,
            subtitle,
            tagline,
            price,
            badge,
            images,
            description,
            features: features.length > 0 ? features : undefined,
            hasNames,
            hasPhotoUpload,
            hasMusicSpotify,
            hasCustomDate,
            hasPackaging,
            hasMagicReveal,
            isFeatured
          };

          // Find section or append, then insert product
          let section = updatedSections.find(s => s.id === finalSectionId);
          if (section) {
            section.products.push(product);
          } else {
            // Safe fallback
            updatedSections[0].products.push(product);
          }
        });

        // Filter out sections that ended up with 0 products to keep view pristine, or keep standard ones
        updatedSections = updatedSections.filter(s => s.products.length > 0 || s.id === 'canecas-foto' || s.id === 'caneca-spotify');

        resolve(updatedSections);
      } catch (err) {
        console.error('Error importing from excel:', err);
        reject(err);
      }
    };

    reader.onerror = (err) => reject(err);
    reader.readAsArrayBuffer(file);
  });
}
