// Importar estilos (Vite maneja esto automáticamente)
import './style.css';

// Verificar que todo se cargue correctamente
console.log('KAIROS: Módulos cargados correctamente');

// Estado de la aplicación
const appState = {
    heightUnit: 'ft', // Sistema americano por defecto
    weightUnit: 'lbs', // Sistema americano por defecto
    selectedAge: '10-49',
    selectedLevel: '1',
    currentLang: 'en'
};

// Traducciones
const translations = {
    es: {
        subtitle: 'Precision Ski Fitting',
        height: 'Altura',
        weight: 'Peso',
        soleLength: 'Largo de Suela (Boot Sole)',
        heightPlaceholder: 'Ingresa tu altura',
        weightPlaceholder: 'Ingresa tu peso',
        soleLengthPlaceholder: 'Ingresa el largo en mm',
        advancedOptions: 'Ajustar perfil de esquiador',
        age: 'Edad',
        skillLevel: 'Nivel de Esquí',
        beginner: 'Principiante',
        intermediate: 'Intermedio',
        expert: 'Experto',
        calculateBtn: 'CALCULATE DIN',
        aboutUs: 'Quiénes somos',
        aboutTitle: 'Sobre KAIROS',
        aboutText1: 'KAIROS es una plataforma premium de optimización de configuración de equipos de esquí, diseñada para esquiadores exigentes que buscan la precisión perfecta en su equipo.',
        aboutText2: 'Utilizamos algoritmos avanzados y tecnología de última generación para calcular el ajuste DIN óptimo y recomendar el equipo de esquí ideal para cada usuario.',
        developers: 'Desarrolladores',
        validationError: 'Por favor, completa todos los campos obligatorios.',
        calculationResult: '¡Cálculo realizado!',
        resultsTitle: 'Resultado del Cálculo DIN',
        resultHeight: 'Altura:',
        resultWeight: 'Peso:',
        resultSoleLength: 'Largo de Suela:',
        resultAge: 'Edad:',
        resultLevel: 'Nivel:',
        dinValue: 'Valor DIN Recomendado',
        calculateAnother: 'Calcular otro DIN',
        viewMeasures: 'Ver Medidas',
        measuresTitle: 'Tabla de Medidas de Longitud de Suela'
    },
    en: {
        subtitle: 'Precision Ski Fitting',
        height: 'Height',
        weight: 'Weight',
        soleLength: 'Boot Sole Length',
        heightPlaceholder: 'Enter your height',
        weightPlaceholder: 'Enter your weight',
        soleLengthPlaceholder: 'Enter length in mm',
        advancedOptions: 'Adjust skier profile',
        age: 'Age',
        skillLevel: 'Ski Level',
        beginner: 'Beginner',
        intermediate: 'Intermediate',
        expert: 'Expert',
        calculateBtn: 'CALCULATE DIN',
        aboutUs: 'About Us',
        aboutTitle: 'About KAIROS',
        aboutText1: 'KAIROS is a premium ski equipment configuration optimization platform, designed for demanding skiers seeking perfect precision in their equipment.',
        aboutText2: 'We use advanced algorithms and cutting-edge technology to calculate the optimal DIN setting and recommend the ideal ski equipment for each user.',
        developers: 'Developers',
        validationError: 'Please complete all required fields.',
        calculationResult: 'Calculation completed!',
        resultsTitle: 'DIN Calculation Result',
        resultHeight: 'Height:',
        resultWeight: 'Weight:',
        resultSoleLength: 'Boot Sole Length:',
        resultAge: 'Age:',
        resultLevel: 'Level:',
        dinValue: 'Recommended DIN Value',
        calculateAnother: 'Calculate Another DIN',
        viewMeasures: 'View Measures',
        measuresTitle: 'Boot Sole Length Measures'
    },
    pt: {
        subtitle: 'Precision Ski Fitting',
        height: 'Altura',
        weight: 'Peso',
        soleLength: 'Comprimento da Sola (Boot Sole)',
        heightPlaceholder: 'Digite sua altura',
        weightPlaceholder: 'Digite seu peso',
        soleLengthPlaceholder: 'Digite o comprimento em mm',
        advancedOptions: 'Ajustar perfil do esquiador',
        age: 'Idade',
        skillLevel: 'Nível de Esqui',
        beginner: 'Iniciante',
        intermediate: 'Intermediário',
        expert: 'Avançado',
        calculateBtn: 'CALCULAR DIN',
        aboutUs: 'Quem somos',
        aboutTitle: 'Sobre KAIROS',
        aboutText1: 'KAIROS é uma plataforma premium de otimização de configuração de equipamentos de esqui, projetada para esquiadores exigentes que buscam precisão perfeita em seu equipamento.',
        aboutText2: 'Utilizamos algoritmos avançados e tecnologia de ponta para calcular o ajuste DIN ideal e recomendar o equipamento de esqui perfeito para cada usuário.',
        developers: 'Desenvolvedores',
        validationError: 'Por favor, preencha todos os campos obrigatórios.',
        calculationResult: 'Cálculo realizado!',
        resultsTitle: 'Resultado do Cálculo DIN',
        resultHeight: 'Altura:',
        resultWeight: 'Peso:',
        resultSoleLength: 'Comprimento da Sola:',
        resultAge: 'Idade:',
        resultLevel: 'Nível:',
        dinValue: 'Valor DIN Recomendado',
        calculateAnother: 'Calcular outro DIN',
        viewMeasures: 'Ver Medidas',
        measuresTitle: 'Tabela de Medidas de Comprimento da Sola'
    }
};

// Utilidades de conversión
const converters = {
    cmToFt: (cm) => {
        const feet = Math.floor(cm * 0.0328084);
        const inches = Math.round((cm * 0.0328084 - feet) * 12);
        return parseFloat((feet + inches / 12).toFixed(2));
    },
    ftToCm: (ft) => parseFloat((ft * 30.48).toFixed(1)),
    ftInToCm: (ft, inches) => parseFloat((ft * 30.48 + inches * 2.54).toFixed(1)),
    cmToFtIn: (cm) => {
        const totalInches = cm / 2.54;
        const feet = Math.floor(totalInches / 12);
        const inches = Math.round(totalInches % 12);
        return { feet, inches };
    },
    kgToLbs: (kg) => parseFloat((kg * 2.20462).toFixed(1)),
    lbsToKg: (lbs) => parseFloat((lbs * 0.453592).toFixed(1))
};

// Función de traducción
function translate(key) {
    return translations[appState.currentLang][key] || key;
}

// Actualizar textos en la página
function updateTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.textContent = translate(key);
    });
    
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        el.placeholder = translate(key);
    });
}

// Inicializar cuando el DOM esté listo
function init() {
    console.log('KAIROS: Inicializando aplicación...');
    setupHeightToggle();
    setupHeightInputs();
    setupWeightToggle();
    setupAdvancedToggle();
    setupAgeOptions();
    setupSkillLevels();
    setupFormSubmit();
    setupLanguageSelector();
    setupModal();
    setupResultsModal();
    setupMeasuresModal();
    // Actualizar traducciones al inicializar
    updateTranslations();
    console.log('KAIROS: Aplicación inicializada');
}

// Selector de idioma (Acordeón)
function setupLanguageSelector() {
    const langToggle = document.getElementById('langToggle');
    const langDropdown = document.getElementById('langDropdown');
    const langSelector = document.querySelector('.language-selector');
    const currentLangSpan = document.getElementById('currentLang');
    const langOptions = document.querySelectorAll('.lang-option');
    
    if (!langToggle || !langDropdown) return;
    
    // Inicializar el idioma predeterminado
    currentLangSpan.textContent = appState.currentLang.toUpperCase();
    langOptions.forEach(opt => {
        if (opt.getAttribute('data-lang') === appState.currentLang) {
            opt.classList.add('active');
        } else {
            opt.classList.remove('active');
        }
    });
    
    // Toggle del acordeón
    langToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        langSelector.classList.toggle('active');
    });
    
    // Cerrar al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (!langSelector.contains(e.target)) {
            langSelector.classList.remove('active');
        }
    });
    
    // Selección de idioma
    langOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            e.stopPropagation();
            const lang = option.getAttribute('data-lang');
            appState.currentLang = lang;
            
            // Actualizar botones activos
            langOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
            
            // Actualizar texto del toggle
            currentLangSpan.textContent = lang.toUpperCase();
            
            // Cerrar dropdown
            langSelector.classList.remove('active');
            
            // Actualizar traducciones
            updateTranslations();
        });
    });
}

// Modal Quiénes Somos
function setupModal() {
    const aboutBtn = document.getElementById('aboutBtn');
    const aboutModal = document.getElementById('aboutModal');
    const closeAboutBtn = document.getElementById('closeAboutModal');
    
    if (aboutBtn && aboutModal) {
        aboutBtn.addEventListener('click', () => {
            aboutModal.classList.add('show');
        });
    }
    
    if (closeAboutBtn && aboutModal) {
        closeAboutBtn.addEventListener('click', () => {
            aboutModal.classList.remove('show');
        });
    }
    
    // Cerrar al hacer clic fuera del modal
    if (aboutModal) {
        aboutModal.addEventListener('click', (e) => {
            if (e.target === aboutModal) {
                aboutModal.classList.remove('show');
            }
        });
    }
}

// Modal de Resultados
function setupMeasuresModal() {
    const viewMeasuresBtn = document.getElementById('viewMeasuresBtn');
    const measuresModal = document.getElementById('measuresModal');
    const closeMeasuresBtn = document.getElementById('closeMeasuresModal');
    
    if (viewMeasuresBtn && measuresModal) {
        viewMeasuresBtn.addEventListener('click', () => {
            measuresModal.classList.add('show');
        });
    }
    
    if (closeMeasuresBtn && measuresModal) {
        closeMeasuresBtn.addEventListener('click', () => {
            measuresModal.classList.remove('show');
        });
    }
    
    // Cerrar al hacer clic fuera del modal
    if (measuresModal) {
        measuresModal.addEventListener('click', (e) => {
            if (e.target === measuresModal) {
                measuresModal.classList.remove('show');
            }
        });
    }
}

function setupResultsModal() {
    const resultsModal = document.getElementById('resultsModal');
    const closeResultsBtn = document.getElementById('closeResultsModal');
    const calculateAnotherBtn = document.getElementById('calculateAnotherBtn');
    
    if (closeResultsBtn && resultsModal) {
        closeResultsBtn.addEventListener('click', () => {
            resultsModal.classList.remove('show');
        });
    }
    
    if (calculateAnotherBtn && resultsModal) {
        calculateAnotherBtn.addEventListener('click', () => {
            resultsModal.classList.remove('show');
            // Scroll al inicio del formulario
            document.getElementById('skiRentalForm').scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }
    
    // Cerrar al hacer clic fuera del modal
    if (resultsModal) {
        resultsModal.addEventListener('click', (e) => {
            if (e.target === resultsModal) {
                resultsModal.classList.remove('show');
            }
        });
    }
}

// Función auxiliar para determinar fila/columna basada en rangos
function _getRowFromRanges(value, ranges) {
    for (let i = 0; i < ranges.length; i++) {
        const [threshold, rowNum] = ranges[i];
        if (value < threshold) {
            return rowNum;
        }
    }
    return ranges[ranges.length - 1][1]; // Default al último valor si no se cumple ningún threshold
}

// Calcular fila basada en altura (en pulgadas totales)
function calculateHeightRow(heightInInches) {
    const heightRanges = [
        [59, 8],
        [62, 9],
        [66, 10],
        [71, 11],
        [77, 12],
        [Infinity, 13]
    ];
    return _getRowFromRanges(heightInInches, heightRanges);
}

// Calcular fila basada en peso (en libras)
function calculateWeightRow(weightInLbs) {
    if (weightInLbs < 22) {
        return -1; // Error
    }
    const weightRanges = [
        [30, 1],
        [39, 2],
        [48, 3],
        [57, 4],
        [67, 5],
        [79, 6],
        [92, 7],
        [108, 8],
        [126, 9],
        [148, 10],
        [175, 11],
        [210, 12],
        [Infinity, 13]
    ];
    return _getRowFromRanges(weightInLbs, weightRanges);
}

// Calcular modificador de edad
function calculateAgeModifier(ageValue) {
    if (ageValue < 10) {
        return -1;
    } else if (ageValue < 50) {
        return 0;
    } else {
        return -1;
    }
}

// Calcular modificador de nivel
function calculateLevelModifier(level, weightInLbs) {
    const lev = parseInt(level);
    if (lev === 1) {
        return 0;
    } else if (lev === 2) {
        return 1;
    } else if (lev === 3) {
        return weightInLbs < 48 ? 1 : 2;
    }
    return 0;
}

// Calcular columna basada en longitud de suela (en mm)
function calculateSoleLengthColumn(soleLength) {
    if (soleLength < 0) {
        return -1; // Error
    }
    const slenRanges = [
        [231, 1],
        [251, 2],
        [271, 3],
        [291, 4],
        [311, 5],
        [331, 6],
        [351, 7],
        [Infinity, 8]
    ];
    return _getRowFromRanges(soleLength, slenRanges);
}

// Matriz de indicadores DIN
function getIndicatorMatrix() {
    return [
        [0.75, 0.75, 0.75, '', '', '', '', ''],
        [1, 0.75, 0.75, 0.75, '', '', '', ''],
        [1.5, 1.25, 1.25, 1, '', '', '', ''],
        [2, 1.75, 1.5, 1.5, 1.25, '', '', ''],
        [2.5, 2.25, 2, 1.75, 1.5, 1.5, '', ''],
        [3, 2.75, 2.5, 2.25, 2, 1.75, 1.75, ''],
        ['', 3.5, 3, 2.75, 2.5, 2.25, 2, ''],
        ['', '', 3.5, 3, 3, 2.75, 2.5, ''],
        ['', '', 4.5, 4, 3.5, 3.5, 3, ''],
        ['', '', 5.5, 5, 4.5, 4, 3.5, 3],
        ['', '', 6.5, 6, 5.5, 5, 4.5, 4],
        ['', '', 7.5, 7, 6.5, 6, 5.5, 5],
        ['', '', '', 8.5, 8, 7, 6.5, 6],
        ['', '', '', 10, 9.5, 8.5, 8, 7.5],
        ['', '', '', 11.5, 11, 10, 9.5, 9],
        ['', '', '', '', '', 12, 11, 10.5]
    ];
}

// Función para calcular DIN (lógica real)
function calculateDIN(heightInCm, weightInKg, soleLength, age, level) {
    // Validaciones iniciales
    if (!heightInCm || heightInCm <= 0) {
        return { error: '❌ Error en ALTURA: Por favor ingresa una altura válida mayor a 0 cm.' };
    }
    
    if (!weightInKg || weightInKg <= 0) {
        return { error: '❌ Error en PESO: Por favor ingresa un peso válido mayor a 0 kg.' };
    }
    
    if (!soleLength || soleLength <= 0) {
        return { error: '❌ Error en LONGITUD DE SUELA: Por favor ingresa una longitud de suela válida mayor a 0 mm.' };
    }
    
    // Convertir altura a pulgadas totales
    const heightInInches = heightInCm / 2.54;
    const heightFeet = Math.floor(heightInInches / 12);
    const heightInchesRemainder = Math.round(heightInInches % 12);
    const totalHeightInches = heightFeet * 12 + heightInchesRemainder;
    
    // Convertir peso a libras
    const weightInLbs = converters.kgToLbs(weightInKg);
    
    // Validar peso mínimo
    if (weightInLbs < 22) {
        return { 
            error: `❌ Error en PESO: El peso ingresado (${weightInKg.toFixed(1)} kg / ${weightInLbs.toFixed(1)} lbs) es demasiado bajo. El peso mínimo requerido es de 22 lbs (aproximadamente 10 kg). Por favor verifica el campo de PESO.` 
        };
    }
    
    // Convertir edad a número (aproximado para el cálculo)
    let ageValue;
    if (age === 'under10') {
        ageValue = 5; // Valor medio para rango 0-9
    } else if (age === '10-49') {
        ageValue = 25; // Valor medio para rango 10-49
    } else if (age === 'over50') {
        ageValue = 50;
    } else {
        ageValue = 25; // Default
    }
    
    // Calcular filas y columnas
    const rowH = calculateHeightRow(totalHeightInches);
    const rowW = calculateWeightRow(weightInLbs);
    
    // Validar altura (debe estar en rango válido)
    if (totalHeightInches < 59) {
        return { 
            error: `❌ Error en ALTURA: La altura ingresada (${heightInCm.toFixed(1)} cm / ${totalHeightInches.toFixed(0)} in) es demasiado baja. La altura mínima requerida es de aproximadamente 59 pulgadas (150 cm). Por favor verifica el campo de ALTURA.` 
        };
    }
    
    const agemod = calculateAgeModifier(ageValue);
    const levmod = calculateLevelModifier(level, weightInLbs);
    
    // Calcular fila final (usar la menor entre rowW y rowH)
    let row;
    if (rowW <= rowH) {
        row = rowW + agemod + levmod;
    } else {
        row = rowH + agemod + levmod;
    }
    
    const col = calculateSoleLengthColumn(soleLength);
    
    // Validar longitud de suela
    if (soleLength < 231) {
        return { 
            error: `❌ Error en LONGITUD DE SUELA: La longitud de suela ingresada (${soleLength} mm) es demasiado baja. La longitud mínima requerida es de 231 mm. Por favor verifica el campo de LONGITUD DE SUELA (Boot Sole Length).` 
        };
    }
    
    if (row < 1) {
        return { 
            error: `❌ Error en la combinación de métricas: La combinación de altura (${heightInCm.toFixed(1)} cm), peso (${weightInKg.toFixed(1)} kg) y edad no permite calcular un código de esquiador válido. Por favor verifica los campos de ALTURA, PESO y EDAD.` 
        };
    }
    
    // Calcular código de esquiador
    const abc = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P'];
    let skierCode = 'N/A';
    if (row - 1 < abc.length) {
        skierCode = abc[row - 1];
    }
    
    // Obtener indicador de la matriz
    const indMat = getIndicatorMatrix();
    let indicator = 'N/A';
    
    // Validar que row y col estén dentro de los límites válidos
    if (row < 1 || row > 16) {
        return { 
            error: `❌ Error en el cálculo: El código de esquiador calculado (fila ${row}) está fuera del rango válido. Esto puede deberse a una combinación extrema de ALTURA, PESO, EDAD o NIVEL. Por favor verifica todos los campos.` 
        };
    }
    
    if (col < 1 || col > 8) {
        return { 
            error: `❌ Error en LONGITUD DE SUELA: La longitud de suela ingresada (${soleLength} mm) está fuera del rango válido. Por favor verifica el campo de LONGITUD DE SUELA (Boot Sole Length). El rango válido es entre 231 mm y 350+ mm.` 
        };
    }
    
    if (skierCode !== 'N/A' && col !== -1) {
        const rowIndex = row - 1; // Convertir a índice 0-based
        const colIndex = col - 1; // Convertir a índice 0-based
        
        if (rowIndex >= 0 && rowIndex < indMat.length && colIndex >= 0 && colIndex < indMat[rowIndex].length) {
            indicator = indMat[rowIndex][colIndex];
        } else {
            return { 
                error: `❌ Error interno en el cálculo: Índice de matriz fuera de rango. Por favor verifica los campos de ALTURA, PESO, LONGITUD DE SUELA, EDAD y NIVEL.` 
            };
        }
    }
    
    // Si el indicador es una cadena vacía, significa que esa combinación no tiene un valor DIN válido
    // Esto puede ocurrir cuando la combinación de skier code y sole length no está en la tabla
    if (indicator === '' || indicator === 'N/A' || indicator === null || indicator === undefined) {
        console.error('DIN Calculation Debug:', {
            heightInCm,
            weightInKg,
            soleLength,
            age,
            level,
            totalHeightInches,
            weightInLbs,
            rowH,
            rowW,
            agemod,
            levmod,
            row,
            col,
            skierCode,
            indicator
        });
        
        // Determinar qué campo puede estar causando el problema
        let problemField = '';
        if (rowH > 13 || rowW > 13) {
            problemField = 'ALTURA o PESO';
        } else if (col > 8) {
            problemField = 'LONGITUD DE SUELA';
        } else {
            problemField = 'la combinación de ALTURA, PESO y LONGITUD DE SUELA';
        }
        
        return { 
            error: `❌ No se puede determinar el valor DIN: La combinación de métricas ingresadas no tiene un valor DIN válido en la tabla de referencia.\n\n` +
                   `Código de Esquiador: ${skierCode}\n` +
                   `Columna de Longitud de Suela: ${col}\n\n` +
                   `Por favor verifica ${problemField}. Es posible que necesites ajustar alguno de estos valores para obtener un resultado válido.` 
        };
    }
    
    // Validar que el indicador sea un número válido
    const dinValue = parseFloat(indicator);
    if (isNaN(dinValue)) {
        console.error('DIN Calculation Error - Invalid indicator:', {
            row,
            col,
            skierCode,
            indicator,
            indicatorType: typeof indicator
        });
        return { 
            error: `❌ Error en el cálculo del DIN: El valor obtenido de la tabla no es válido. Por favor verifica los campos de ALTURA, PESO, LONGITUD DE SUELA, EDAD y NIVEL.` 
        };
    }
    
    return {
        din: dinValue,
        skierCode: skierCode,
        column: col,
        row: row,
        rowH: rowH,
        rowW: rowW,
        heightInInches: totalHeightInches,
        weightInLbs: weightInLbs
    };
}

// Mostrar resultados en el modal
function showResults(data) {
    const resultsModal = document.getElementById('resultsModal');
    
    // Mostrar altura en ft e inch
    if (data.heightFeet !== undefined && data.heightInches !== undefined) {
        document.getElementById('resultHeight').textContent = `${data.heightFeet}'${data.heightInches}" (${data.height.toFixed(1)} cm)`;
    } else {
        document.getElementById('resultHeight').textContent = `${data.height.toFixed(1)} cm`;
    }
    
    document.getElementById('resultWeight').textContent = `${data.weight.toFixed(1)} kg`;
    document.getElementById('resultSoleLength').textContent = `${data.soleLength} mm`;
    
    // Traducir edad
    let ageText = '';
    if (data.age === 'under10') ageText = '≤9';
    else if (data.age === '10-49') ageText = '10 - 49';
    else if (data.age === 'over50') ageText = '50 +';
    else ageText = data.age;
    document.getElementById('resultAge').textContent = ageText;
    
    document.getElementById('resultLevel').textContent = `TYPE ${data.level}`;
    
    // Mostrar valor DIN y skier code si está disponible
    if (data.skierCode) {
        document.getElementById('dinValue').textContent = `${data.din.toFixed(1)} (${data.skierCode}${data.column})`;
    } else {
        document.getElementById('dinValue').textContent = data.din.toFixed(1);
    }
    
    // Mostrar modal
    resultsModal.classList.add('show');
    
    // Actualizar traducciones en el modal
    updateTranslations();
}

// Formatear altura imperial (ft'in") con restricciones
function formatHeightFtIn(value) {
    let digits = value.replace(/\D/g, '');
    if (digits.length === 0) return '';

    /* ----- First block (2–8) ----- */
    const rawFirst = parseInt(digits[0], 10);
    const first = clamp(Number.isNaN(rawFirst) ? 2 : rawFirst, 2, 8);

    const restRaw = digits.substring(1); // second block digits

    // If second block hasn't started yet
    if (restRaw.length === 0) {
        return first + "'";
    }

    /* ----- Second block (0–11) ----- */
    const num = parseInt(restRaw, 10);
    const second = clamp(Number.isNaN(num) ? 0 : num, 0, 11);

    return first + "'" + second + '"';
}

// Función auxiliar para limitar un número entre min y max
function clamp(n, min, max) {
    return Math.min(max, Math.max(min, n));
}

// Parsear altura imperial (ft'in") a pies y pulgadas
function parseHeightFtIn(value) {
    if (!value) return { feet: 0, inches: 0 };
    
    const cleaned = value.replace(/[^\d'"]/g, '');
    
    if (cleaned.includes("'")) {
        const parts = cleaned.split("'");
        const feet = parseInt(parts[0]) || 0;
        const inchesStr = (parts[1] || '').replace(/"/g, '');
        const inches = parseInt(inchesStr) || 0;
        return { feet, inches };
    }
    
    // Si no tiene apóstrofe, intentar interpretar como número
    const num = parseInt(cleaned);
    if (!isNaN(num)) {
        if (num < 10) {
            // Un solo dígito: pies
            return { feet: num, inches: 0 };
        } else if (num < 100) {
            // Dos dígitos: pies y pulgadas (ej: 510 = 5'10")
            return { feet: Math.floor(num / 10), inches: num % 10 };
        } else {
            // Tres o más dígitos: últimos dos son pulgadas (ej: 510 = 5'10")
            const feet = Math.floor(num / 100);
            const inches = num % 100;
            return { feet, inches };
        }
    }
    
    return { feet: 0, inches: 0 };
}

// Toggle de unidades de altura (ft/in <-> cm)
function setupHeightToggle() {
    const toggleFtIn = document.getElementById('heightToggle');
    const toggleCm = document.getElementById('heightToggleCm');
    const heightInputGroupFtIn = document.getElementById('heightInputGroupFtIn');
    const heightInputGroupCm = document.getElementById('heightInputGroupCm');
    
    if (!toggleFtIn || !toggleCm) return;
    
    // Toggle desde ft/in a cm
    toggleFtIn.addEventListener('click', () => {
        const heightFtInInput = document.getElementById('heightFtIn');
        const heightCmInput = document.getElementById('heightCm');
        
        // Convertir valor actual si existe
        if (heightFtInInput && heightFtInInput.value) {
            const { feet, inches } = parseHeightFtIn(heightFtInInput.value);
            if (feet > 0 || inches > 0) {
                const heightInCm = converters.ftInToCm(feet, inches);
                if (heightCmInput) {
                    heightCmInput.value = heightInCm.toFixed(1);
                }
            }
        }
        
        // Cambiar estado
        appState.heightUnit = 'cm';
        if (heightInputGroupFtIn) heightInputGroupFtIn.style.display = 'none';
        if (heightInputGroupCm) heightInputGroupCm.style.display = 'flex';
        
        // Limpiar input de ft/in
        if (heightFtInInput) {
            heightFtInInput.value = '';
            heightFtInInput.removeAttribute('required');
        }
        if (heightCmInput) heightCmInput.setAttribute('required', 'required');
    });
    
    // Toggle desde cm a ft/in
    toggleCm.addEventListener('click', () => {
        const heightFtInInput = document.getElementById('heightFtIn');
        const heightCmInput = document.getElementById('heightCm');
        
        // Convertir valor actual si existe
        if (heightCmInput && heightCmInput.value) {
            const cm = parseFloat(heightCmInput.value);
            if (!isNaN(cm) && cm > 0) {
                const { feet, inches } = converters.cmToFtIn(cm);
                if (heightFtInInput) {
                    heightFtInInput.value = `${feet}'${inches}"`;
                }
            }
        }
        
        // Cambiar estado
        appState.heightUnit = 'ft';
        if (heightInputGroupFtIn) heightInputGroupFtIn.style.display = 'flex';
        if (heightInputGroupCm) heightInputGroupCm.style.display = 'none';
        
        // Limpiar input de cm
        if (heightCmInput) {
            heightCmInput.value = '';
            heightCmInput.removeAttribute('required');
        }
        if (heightFtInInput) heightFtInInput.setAttribute('required', 'required');
    });
}

// Configurar input de altura unificado (ft/in)
function setupHeightInputs() {
    const heightFtInInput = document.getElementById('heightFtIn');
    
    if (!heightFtInInput) return;
    
    // Backspace handling para evitar que separadores se queden atascados
    heightFtInInput.addEventListener('keydown', function (e) {
        if (e.key !== 'Backspace') return;

        const v = heightFtInInput.value;
        const atEnd =
            heightFtInInput.selectionStart === heightFtInInput.selectionEnd &&
            heightFtInInput.selectionEnd === v.length;

        if (atEnd && (v.endsWith("'") || v.endsWith('"'))) {
            e.preventDefault();

            let digits = v.replace(/\D/g, '');
            digits = digits.slice(0, -1);

            heightFtInInput.value = formatHeightFtIn(digits);
            heightFtInInput.setSelectionRange(heightFtInInput.value.length, heightFtInInput.value.length);
        }
    });
    
    // Reformatear en cada cambio de input
    heightFtInInput.addEventListener('input', function () {
        heightFtInInput.value = formatHeightFtIn(heightFtInInput.value);
    });
    
    // Permitir solo números en el teclado
    heightFtInInput.addEventListener('keypress', (e) => {
        const char = String.fromCharCode(e.which || e.keyCode);
        // Permitir solo números
        if (!/[0-9]/.test(char) && !e.ctrlKey && !e.metaKey) {
            e.preventDefault();
        }
    });
}

// Toggle de unidades de peso
function setupWeightToggle() {
    const toggle = document.getElementById('weightToggle');
    if (!toggle) return;
    
    toggle.addEventListener('click', () => {
        const weightInput = document.getElementById('weight');
        const weightUnitSpan = document.getElementById('weightUnit');
        const inactiveSpan = toggle.querySelector('.inactive');
        const currentValue = parseFloat(weightInput.value);
        
        if (appState.weightUnit === 'kg') {
            appState.weightUnit = 'lbs';
            weightUnitSpan.textContent = 'LBS';
            inactiveSpan.textContent = 'KG';
            if (!isNaN(currentValue) && currentValue > 0) {
                weightInput.value = converters.kgToLbs(currentValue);
            }
        } else {
            appState.weightUnit = 'kg';
            weightUnitSpan.textContent = 'KG';
            inactiveSpan.textContent = 'LBS';
            if (!isNaN(currentValue) && currentValue > 0) {
                weightInput.value = converters.lbsToKg(currentValue);
            }
        }
    });
}

// Toggle de sección avanzada
function setupAdvancedToggle() {
    const toggle = document.getElementById('toggleAdvanced');
    const content = document.getElementById('advancedContent');
    
    if (!toggle || !content) return;
    
    toggle.addEventListener('click', () => {
        content.classList.toggle('show');
        toggle.classList.toggle('active');
    });
}

// Selección de edad
function setupAgeOptions() {
    const options = document.querySelectorAll('.age-option');
    
    options.forEach(option => {
        option.addEventListener('click', function() {
            options.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            appState.selectedAge = this.getAttribute('data-age');
        });
    });
}

// Selección de nivel de esquí
function setupSkillLevels() {
    const cards = document.querySelectorAll('.skill-level-card');
    
    cards.forEach(card => {
        card.addEventListener('click', function() {
            cards.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            appState.selectedLevel = this.getAttribute('data-level');
        });
    });
}

// Manejo del formulario
function setupFormSubmit() {
    const form = document.getElementById('skiRentalForm');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let heightInCm = 0;
        let heightFeet = 0;
        let heightInches = 0;
        const weight = parseFloat(document.getElementById('weight').value);
        const soleLength = parseFloat(document.getElementById('soleLength').value);
        
        // Obtener altura según el sistema actual
        if (appState.heightUnit === 'ft') {
            const heightFtInInput = document.getElementById('heightFtIn');
            const ftInValue = heightFtInInput ? heightFtInInput.value : '';
            const parsed = parseHeightFtIn(ftInValue);
            heightFeet = parsed.feet;
            heightInches = parsed.inches;
            
            // Validación para ft/in
            if (!heightFeet && !heightInches) {
                alert(translate('validationError'));
                return;
            }
            
            // Convertir altura ft+inch a cm
            heightInCm = converters.ftInToCm(heightFeet, heightInches);
        } else {
            // Sistema métrico (cm)
            const heightCm = parseFloat(document.getElementById('heightCm').value);
            
            // Validación para cm
            if (!heightCm || heightCm <= 0) {
                alert(translate('validationError'));
                return;
            }
            
            heightInCm = heightCm;
        }
        
        // Validación de peso y sole length
        if (!weight || !soleLength) {
            alert(translate('validationError'));
            return;
        }
        
        // Convertir peso a kg
        const weightInKg = appState.weightUnit === 'lbs' 
            ? converters.lbsToKg(weight) 
            : weight;
        
        // Calcular DIN
        const dinResult = calculateDIN(heightInCm, weightInKg, soleLength, appState.selectedAge, appState.selectedLevel);
        
        // Verificar si hay error
        if (dinResult.error) {
            alert(dinResult.error);
            return;
        }
        
        // Mostrar resultados en el modal
        const resultsData = {
            height: heightInCm,
            weight: weightInKg,
            soleLength: soleLength,
            age: appState.selectedAge,
            level: appState.selectedLevel,
            din: dinResult.din,
            skierCode: dinResult.skierCode,
            column: dinResult.column,
            row: dinResult.row
        };
        
        // Agregar datos de altura según el sistema usado
        if (appState.heightUnit === 'ft') {
            resultsData.heightFeet = heightFeet;
            resultsData.heightInches = heightInches;
        } else {
            resultsData.heightCm = heightInCm;
        }
        
        showResults(resultsData);
    });
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    // Usar requestAnimationFrame para asegurar que el DOM esté listo
    requestAnimationFrame(() => {
        init();
    });
}
