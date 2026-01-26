// Importar estilos (Vite maneja esto automáticamente)
import './style.css';
// Importar Tesseract.js para OCR
import { createWorker } from 'tesseract.js';

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
        measuresTitle: 'Tabla de Medidas de Longitud de Suela',
        errorHeightInvalid: 'Error en ALTURA: Por favor ingresa una altura válida mayor a 0 cm.',
        errorWeightInvalid: 'Error en PESO: Por favor ingresa un peso válido mayor a 0 kg.',
        errorSoleLengthInvalid: 'Error en LONGITUD DE SUELA: Por favor ingresa una longitud de suela válida mayor a 0 mm.',
        errorWeightTooLow: 'Error en PESO: El peso ingresado ({kg} kg / {lbs} lbs) es demasiado bajo. El peso mínimo requerido es de 22 lbs (aproximadamente 10 kg). Por favor verifica el campo de PESO.',
        errorHeightTooLow: 'Error en ALTURA: La altura ingresada ({heightCm} cm / {heightIn} in) es demasiado baja. La altura mínima requerida es de aproximadamente 59 pulgadas (150 cm). Por favor verifica el campo de ALTURA.',
        errorSoleLengthTooLow: 'Error en LONGITUD DE SUELA: La longitud de suela ingresada ({soleLength} mm) es demasiado baja. La longitud mínima requerida es de 231 mm. Por favor verifica el campo de LONGITUD DE SUELA.',
        errorMetricsCombination: 'Error en la combinación de métricas: La combinación de altura ({height} cm), peso ({weight} kg) y edad no permite calcular un código de esquiador válido. Por favor verifica los campos de ALTURA, PESO y EDAD.',
        errorRowOutOfBounds: 'Error en el cálculo: El código de esquiador calculado (fila {row}) está fuera del rango válido. Esto puede deberse a una combinación extrema de ALTURA, PESO, EDAD o NIVEL. Por favor verifica todos los campos.',
        errorSoleLengthOutOfRange: 'Error en LONGITUD DE SUELA: La longitud de suela ingresada ({soleLength} mm) está fuera del rango válido. Por favor verifica el campo de LONGITUD DE SUELA. El rango válido es entre 231 mm y 350+ mm.',
        errorMatrixIndex: 'Error interno en el cálculo: Índice de matriz fuera de rango. Por favor verifica los campos de ALTURA, PESO, LONGITUD DE SUELA, EDAD y NIVEL.',
        errorNoDINValue: 'No se puede determinar el valor DIN: La combinación de métricas ingresadas no tiene un valor DIN válido en la tabla de referencia. Código de Esquiador: {skierCode}. Columna de Longitud de Suela: {col}. Por favor verifica {problemField}.',
        errorInvalidDINValue: 'Error en el cálculo del DIN: El valor obtenido de la tabla no es válido. Por favor verifica los campos de ALTURA, PESO, LONGITUD DE SUELA, EDAD y NIVEL.',
        equipmentRecommendations: 'Recomendaciones de Equipo',
        poleLength: 'Largo de Bastones:',
        skiLength: 'Largo de Ski:',
        importantNotices: 'Avisos Importantes',
        measureWithCamera: 'Medir con Cámara',
        cameraModalTitle: 'Medir con Cámara',
        cameraInstructions: 'Captura una foto de un documento que contenga información de la persona (edad, peso, altura, largo de bota, tipo/nivel). El sistema intentará reconocer los datos automáticamente.',
        cameraHowTo: '📸 Cómo capturar:',
        cameraStep1: '1. Posiciona el documento con información personal (edad, peso, altura, largo de bota, TYPE I/II/III) claramente visible',
        cameraStep2: '2. Asegúrate de tener buena iluminación y enfoque',
        cameraStep3: '3. Toca para capturar y analizar',
        ocrProcessing: 'Procesando imagen...',
        ocrRecognizing: 'Reconociendo texto...',
        ocrNoDataFound: 'No se pudieron reconocer los datos. Por favor ingrésalos manualmente.',
        ocrDataFound: 'Datos reconocidos:',
        enterManually: 'Ingresar Manualmente',
        startCamera: 'Iniciar Cámara',
        capturePhoto: 'Capturar',
        stopCamera: 'Detener',
        measuredLength: 'Longitud Medida:',
        useMeasurement: 'Usar Esta Medida',
        warningHeightLow: 'Altura muy baja: {value} cm. Por favor verifica que la altura sea correcta.',
        warningHeightHigh: 'Altura muy alta: {value} cm. Por favor verifica que la altura sea correcta.',
        warningWeightLow: 'Peso muy bajo: {kg} kg ({lbs} lbs). Por favor verifica que el peso sea correcto.',
        warningWeightHigh: 'Peso muy alto: {kg} kg ({lbs} lbs). Por favor verifica que el peso sea correcto.',
        warningCombination: 'La combinación de altura ({height} cm) y peso ({weight} kg) parece incongruente. Por favor verifica ambos valores.',
        warningAgeUnder10: 'Edad ≤9 años: Se recomienda supervisión profesional para el ajuste del equipo de esquí.',
        warningAgeOver50: 'Edad 50+: Se recomienda consultar con un técnico especializado para ajustes adicionales de seguridad.',
        alertAgeUnder10: '⚠️ Edad ≤9 años: Se recomienda supervisión profesional para el ajuste del equipo de esquí. El cálculo DIN puede requerir ajustes adicionales.',
        alertAgeOver50: '⚠️ Edad 50+: Se recomienda consultar con un técnico especializado para ajustes adicionales de seguridad y comodidad.',
        recommendationNoteKids: 'Para niños, se recomienda un ski ligeramente más corto para facilitar el control.',
        recommendationNoteAdults: 'Para esquiadores intermedios/avanzados, el largo puede extenderse hasta 10cm más que la altura.',
        recommendationNoteSeniors: 'Para esquiadores de 50+, se recomienda un ski más corto para mayor facilidad de giro.'
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
        measuresTitle: 'Boot Sole Length Measures',
        errorHeightInvalid: 'Error in HEIGHT: Please enter a valid height greater than 0 cm.',
        errorWeightInvalid: 'Error in WEIGHT: Please enter a valid weight greater than 0 kg.',
        errorSoleLengthInvalid: 'Error in BOOT SOLE LENGTH: Please enter a valid sole length greater than 0 mm.',
        errorWeightTooLow: 'Error in WEIGHT: The entered weight ({kg} kg / {lbs} lbs) is too low. The minimum required weight is 22 lbs (approximately 10 kg). Please verify the WEIGHT field.',
        errorHeightTooLow: 'Error in HEIGHT: The entered height ({heightCm} cm / {heightIn} in) is too low. The minimum required height is approximately 59 inches (150 cm). Please verify the HEIGHT field.',
        errorSoleLengthTooLow: 'Error in BOOT SOLE LENGTH: The entered sole length ({soleLength} mm) is too low. The minimum required length is 231 mm. Please verify the BOOT SOLE LENGTH field.',
        errorMetricsCombination: 'Error in metrics combination: The combination of height ({height} cm), weight ({weight} kg) and age does not allow calculating a valid skier code. Please verify the HEIGHT, WEIGHT and AGE fields.',
        errorRowOutOfBounds: 'Calculation error: The calculated skier code (row {row}) is out of valid range. This may be due to an extreme combination of HEIGHT, WEIGHT, AGE or LEVEL. Please verify all fields.',
        errorSoleLengthOutOfRange: 'Error in BOOT SOLE LENGTH: The entered sole length ({soleLength} mm) is out of valid range. Please verify the BOOT SOLE LENGTH field. The valid range is between 231 mm and 350+ mm.',
        errorMatrixIndex: 'Internal calculation error: Matrix index out of range. Please verify the HEIGHT, WEIGHT, BOOT SOLE LENGTH, AGE and LEVEL fields.',
        errorNoDINValue: 'Cannot determine DIN value: The entered metrics combination does not have a valid DIN value in the reference table. Skier Code: {skierCode}. Sole Length Column: {col}. Please verify {problemField}.',
        errorInvalidDINValue: 'Error in DIN calculation: The value obtained from the table is not valid. Please verify the HEIGHT, WEIGHT, BOOT SOLE LENGTH, AGE and LEVEL fields.',
        equipmentRecommendations: 'Equipment Recommendations',
        poleLength: 'Pole Length:',
        skiLength: 'Ski Length:',
        importantNotices: 'Important Notices',
        measureWithCamera: 'Measure with Camera',
        cameraModalTitle: 'Measure with Camera',
        cameraInstructions: 'Capture a photo of a document containing person information (age, weight, height, boot sole length, type/level). The system will try to recognize the data automatically.',
        cameraHowTo: '📸 How to capture:',
        cameraStep1: '1. Position the document with personal information (age, weight, height, boot sole length, TYPE I/II/III) clearly visible',
        cameraStep2: '2. Ensure good lighting and focus',
        cameraStep3: '3. Tap to capture and analyze',
        ocrProcessing: 'Processing image...',
        ocrRecognizing: 'Recognizing text...',
        ocrNoDataFound: 'Could not recognize the data. Please enter them manually.',
        ocrDataFound: 'Recognized data:',
        enterManually: 'Enter Manually',
        useRecognizedData: 'Use Recognized Data',
        startCamera: 'Start Camera',
        capturePhoto: 'Capture',
        stopCamera: 'Stop',
        measuredLength: 'Measured Length:',
        useMeasurement: 'Use This Measurement',
        warningHeightLow: 'Very low height: {value} cm. Please verify that the height is correct.',
        warningHeightHigh: 'Very high height: {value} cm. Please verify that the height is correct.',
        warningWeightLow: 'Very low weight: {kg} kg ({lbs} lbs). Please verify that the weight is correct.',
        warningWeightHigh: 'Very high weight: {kg} kg ({lbs} lbs). Please verify that the weight is correct.',
        warningCombination: 'The combination of height ({height} cm) and weight ({weight} kg) seems inconsistent. Please verify both values.',
        warningAgeUnder10: 'Age ≤9 years: Professional supervision is recommended for ski equipment adjustment.',
        warningAgeOver50: 'Age 50+: It is recommended to consult with a specialized technician for additional safety adjustments.',
        alertAgeUnder10: '⚠️ Age ≤9 years: Professional supervision is recommended for ski equipment adjustment. DIN calculation may require additional adjustments.',
        alertAgeOver50: '⚠️ Age 50+: It is recommended to consult with a specialized technician for additional safety and comfort adjustments.',
        recommendationNoteKids: 'For children, a slightly shorter ski is recommended to facilitate control.',
        recommendationNoteAdults: 'For intermediate/advanced skiers, the length can be extended up to 10cm more than height.',
        recommendationNoteSeniors: 'For skiers 50+, a shorter ski is recommended for greater ease of turning.'
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
        measuresTitle: 'Tabela de Medidas de Comprimento da Sola',
        errorHeightInvalid: 'Erro em ALTURA: Por favor digite uma altura válida maior que 0 cm.',
        errorWeightInvalid: 'Erro em PESO: Por favor digite um peso válido maior que 0 kg.',
        errorSoleLengthInvalid: 'Erro em COMPRIMENTO DA SOLA: Por favor digite um comprimento de sola válido maior que 0 mm.',
        errorWeightTooLow: 'Erro em PESO: O peso inserido ({kg} kg / {lbs} lbs) é muito baixo. O peso mínimo necessário é de 22 lbs (aproximadamente 10 kg). Por favor verifique o campo de PESO.',
        errorHeightTooLow: 'Erro em ALTURA: A altura inserida ({heightCm} cm / {heightIn} in) é muito baixa. A altura mínima necessária é de aproximadamente 59 polegadas (150 cm). Por favor verifique o campo de ALTURA.',
        errorSoleLengthTooLow: 'Erro em COMPRIMENTO DA SOLA: O comprimento de sola inserido ({soleLength} mm) é muito baixo. O comprimento mínimo necessário é de 231 mm. Por favor verifique o campo de COMPRIMENTO DA SOLA.',
        errorMetricsCombination: 'Erro na combinação de métricas: A combinação de altura ({height} cm), peso ({weight} kg) e idade não permite calcular um código de esquiador válido. Por favor verifique os campos de ALTURA, PESO e IDADE.',
        errorRowOutOfBounds: 'Erro no cálculo: O código de esquiador calculado (linha {row}) está fora do intervalo válido. Isso pode ser devido a uma combinação extrema de ALTURA, PESO, IDADE ou NÍVEL. Por favor verifique todos os campos.',
        errorSoleLengthOutOfRange: 'Erro em COMPRIMENTO DA SOLA: O comprimento de sola inserido ({soleLength} mm) está fora do intervalo válido. Por favor verifique o campo de COMPRIMENTO DA SOLA. O intervalo válido é entre 231 mm e 350+ mm.',
        errorMatrixIndex: 'Erro interno no cálculo: Índice da matriz fora do intervalo. Por favor verifique os campos de ALTURA, PESO, COMPRIMENTO DA SOLA, IDADE e NÍVEL.',
        errorNoDINValue: 'Não é possível determinar o valor DIN: A combinação de métricas inseridas não tem um valor DIN válido na tabela de referência. Código de Esquiador: {skierCode}. Coluna de Comprimento da Sola: {col}. Por favor verifique {problemField}.',
        errorInvalidDINValue: 'Erro no cálculo do DIN: O valor obtido da tabela não é válido. Por favor verifique os campos de ALTURA, PESO, COMPRIMENTO DA SOLA, IDADE e NÍVEL.',
        equipmentRecommendations: 'Recomendações de Equipamento',
        poleLength: 'Comprimento de Bastões:',
        skiLength: 'Comprimento de Esqui:',
        importantNotices: 'Avisos Importantes',
        measureWithCamera: 'Medir com Câmera',
        cameraModalTitle: 'Medir com Câmera',
        cameraInstructions: 'Capture uma foto de um documento contendo informações da pessoa (idade, peso, altura, comprimento da bota, tipo/nível). O sistema tentará reconhecer os dados automaticamente.',
        cameraHowTo: '📸 Como capturar:',
        cameraStep1: '1. Posicione o documento com informações pessoais (idade, peso, altura, comprimento da bota, TYPE I/II/III) claramente visíveis',
        cameraStep2: '2. Certifique-se de ter boa iluminação e foco',
        cameraStep3: '3. Toque para capturar e analisar',
        ocrProcessing: 'Processando imagem...',
        ocrRecognizing: 'Reconhecendo texto...',
        ocrNoDataFound: 'Não foi possível reconhecer os dados. Por favor, insira-os manualmente.',
        ocrDataFound: 'Dados reconhecidos:',
        enterManually: 'Inserir Manualmente',
        useRecognizedData: 'Usar Dados Reconhecidos',
        startCamera: 'Iniciar Câmera',
        capturePhoto: 'Capturar',
        stopCamera: 'Parar',
        measuredLength: 'Comprimento Medido:',
        useMeasurement: 'Usar Esta Medida',
        warningHeightLow: 'Altura muito baixa: {value} cm. Por favor verifique se a altura está correta.',
        warningHeightHigh: 'Altura muito alta: {value} cm. Por favor verifique se a altura está correta.',
        warningWeightLow: 'Peso muito baixo: {kg} kg ({lbs} lbs). Por favor verifique se o peso está correto.',
        warningWeightHigh: 'Peso muito alto: {kg} kg ({lbs} lbs). Por favor verifique se o peso está correto.',
        warningCombination: 'A combinação de altura ({height} cm) e peso ({weight} kg) parece inconsistente. Por favor verifique ambos os valores.',
        warningAgeUnder10: 'Idade ≤9 anos: Supervisão profissional é recomendada para ajuste do equipamento de esqui.',
        warningAgeOver50: 'Idade 50+: É recomendado consultar com um técnico especializado para ajustes adicionais de segurança.',
        alertAgeUnder10: '⚠️ Idade ≤9 anos: Supervisão profissional é recomendada para ajuste do equipamento de esqui. O cálculo DIN pode requerer ajustes adicionais.',
        alertAgeOver50: '⚠️ Idade 50+: É recomendado consultar com um técnico especializado para ajustes adicionais de segurança e conforto.',
        recommendationNoteKids: 'Para crianças, um esqui ligeiramente mais curto é recomendado para facilitar o controle.',
        recommendationNoteAdults: 'Para esquiadores intermediários/avançados, o comprimento pode ser estendido até 10cm mais que a altura.',
        recommendationNoteSeniors: 'Para esquiadores de 50+, um esqui mais curto é recomendado para maior facilidade de giro.'
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
    
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
        const key = el.getAttribute('data-i18n-title');
        el.title = translate(key);
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
    setupCameraMeasurement();
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

// Función para validar valores extremos e incongruentes
function validateExtremeValues(heightInCm, weightInKg, age) {
    const warnings = [];
    const heightInInches = heightInCm / 2.54;
    const weightInLbs = converters.kgToLbs(weightInKg);
    
    // Validar altura muy baja
    if (heightInCm < 100) {
        warnings.push({
            type: 'warning',
            field: 'height',
            message: '⚠️ ' + translate('warningHeightLow').replace('{value}', heightInCm.toFixed(1))
        });
    }
    
    // Validar altura extremadamente alta
    if (heightInCm > 220) {
        warnings.push({
            type: 'warning',
            field: 'height',
            message: '⚠️ ' + translate('warningHeightHigh').replace('{value}', heightInCm.toFixed(1))
        });
    }
    
    // Validar peso muy bajo
    if (weightInLbs < 30) {
        warnings.push({
            type: 'warning',
            field: 'weight',
            message: '⚠️ ' + translate('warningWeightLow').replace('{kg}', weightInKg.toFixed(1)).replace('{lbs}', weightInLbs.toFixed(1))
        });
    }
    
    // Validar peso extremadamente alto
    if (weightInLbs > 300) {
        warnings.push({
            type: 'warning',
            field: 'weight',
            message: '⚠️ ' + translate('warningWeightHigh').replace('{kg}', weightInKg.toFixed(1)).replace('{lbs}', weightInLbs.toFixed(1))
        });
    }
    
    // Validar proporción altura/peso incongruente
    const bmi = weightInKg / ((heightInCm / 100) ** 2);
    if (bmi < 12 || bmi > 50) {
        warnings.push({
            type: 'warning',
            field: 'combination',
            message: '⚠️ ' + translate('warningCombination').replace('{height}', heightInCm.toFixed(1)).replace('{weight}', weightInKg.toFixed(1))
        });
    }
    
    // Validar edad extrema
    let ageValue;
    if (age === 'under10') {
        ageValue = 5;
        warnings.push({
            type: 'age',
            field: 'age',
            message: translate('warningAgeUnder10')
        });
    } else if (age === 'over50') {
        ageValue = 50;
        warnings.push({
            type: 'age',
            field: 'age',
            message: translate('warningAgeOver50')
        });
    }
    
    return warnings;
}

// Función para calcular recomendaciones de bastones y ski
function calculateEquipmentRecommendations(heightInCm, age) {
    const recommendations = {
        poleLength: null,
        skiLength: null,
        notes: []
    };
    
    // Conversión de altura
    const heightInInches = heightInCm / 2.54;
    
    // Recomendación de bastones: aproximadamente 65-70% de la altura
    // Fórmula estándar: altura en cm * 0.65 - 5cm (ajuste para empuñadura)
    const poleLengthCm = (heightInCm * 0.65) - 5;
    recommendations.poleLength = Math.round(poleLengthCm / 5) * 5; // Redondear a múltiplos de 5cm
    
    // Recomendación de largo de ski basado en altura y edad
    let skiMultiplier;
    if (age === 'under10') {
        // Niños: ski más corto (hasta la altura o ligeramente más corto)
        skiMultiplier = 0.95;
        recommendations.notes.push(translate('recommendationNoteKids'));
    } else if (age === 'over50') {
        // Personas mayores: ski más corto para mayor control
        skiMultiplier = 0.92;
        recommendations.notes.push(translate('recommendationNoteSeniors'));
    } else {
        // Adultos: ski entre altura y altura + 10cm
        skiMultiplier = 1.02;
        recommendations.notes.push(translate('recommendationNoteAdults'));
    }
    
    const skiLengthCm = heightInCm * skiMultiplier;
    recommendations.skiLength = Math.round(skiLengthCm / 5) * 5; // Redondear a múltiplos de 5cm
    
    // Validar rangos razonables
    if (recommendations.poleLength < 80) recommendations.poleLength = 80;
    if (recommendations.poleLength > 160) recommendations.poleLength = 160;
    if (recommendations.skiLength < 100) recommendations.skiLength = 100;
    if (recommendations.skiLength > 200) recommendations.skiLength = 200;
    
    return recommendations;
}

// Función para calcular DIN (lógica real)
function calculateDIN(heightInCm, weightInKg, soleLength, age, level) {
    // Validaciones iniciales
    if (!heightInCm || heightInCm <= 0) {
        return { error: '❌ ' + translate('errorHeightInvalid') };
    }
    
    if (!weightInKg || weightInKg <= 0) {
        return { error: '❌ ' + translate('errorWeightInvalid') };
    }
    
    if (!soleLength || soleLength <= 0) {
        return { error: '❌ ' + translate('errorSoleLengthInvalid') };
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
            error: '❌ ' + translate('errorWeightTooLow').replace('{kg}', weightInKg.toFixed(1)).replace('{lbs}', weightInLbs.toFixed(1))
        };
    }
    
    // Validar valores extremos
    const warnings = validateExtremeValues(heightInCm, weightInKg, age);
    
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
            error: '❌ ' + translate('errorHeightTooLow').replace('{heightCm}', heightInCm.toFixed(1)).replace('{heightIn}', totalHeightInches.toFixed(0))
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
            error: '❌ ' + translate('errorSoleLengthTooLow').replace('{soleLength}', soleLength)
        };
    }
    
    if (row < 1) {
        return { 
            error: '❌ ' + translate('errorMetricsCombination').replace('{height}', heightInCm.toFixed(1)).replace('{weight}', weightInKg.toFixed(1))
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
            error: '❌ ' + translate('errorRowOutOfBounds').replace('{row}', row)
        };
    }
    
    if (col < 1 || col > 8) {
        return { 
            error: '❌ ' + translate('errorSoleLengthOutOfRange').replace('{soleLength}', soleLength)
        };
    }
    
    if (skierCode !== 'N/A' && col !== -1) {
        const rowIndex = row - 1; // Convertir a índice 0-based
        const colIndex = col - 1; // Convertir a índice 0-based
        
        if (rowIndex >= 0 && rowIndex < indMat.length && colIndex >= 0 && colIndex < indMat[rowIndex].length) {
            indicator = indMat[rowIndex][colIndex];
        } else {
            return { 
                error: '❌ ' + translate('errorMatrixIndex')
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
            if (appState.currentLang === 'es') {
                problemField = 'ALTURA o PESO';
            } else if (appState.currentLang === 'pt') {
                problemField = 'ALTURA ou PESO';
            } else {
                problemField = 'HEIGHT or WEIGHT';
            }
        } else if (col > 8) {
            if (appState.currentLang === 'es') {
                problemField = 'LONGITUD DE SUELA';
            } else if (appState.currentLang === 'pt') {
                problemField = 'COMPRIMENTO DA SOLA';
            } else {
                problemField = 'BOOT SOLE LENGTH';
            }
        } else {
            if (appState.currentLang === 'es') {
                problemField = 'la combinación de ALTURA, PESO y LONGITUD DE SUELA';
            } else if (appState.currentLang === 'pt') {
                problemField = 'a combinação de ALTURA, PESO e COMPRIMENTO DA SOLA';
            } else {
                problemField = 'the combination of HEIGHT, WEIGHT and BOOT SOLE LENGTH';
            }
        }
        
        return { 
            error: '❌ ' + translate('errorNoDINValue').replace('{skierCode}', skierCode).replace('{col}', col).replace('{problemField}', problemField)
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
            error: '❌ ' + translate('errorInvalidDINValue')
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
    else ageText = data.age || '10 - 49';
    document.getElementById('resultAge').textContent = ageText;
    
    document.getElementById('resultLevel').textContent = `TYPE ${data.level}`;
    
    // Mostrar valor DIN y skier code si está disponible
    if (data.skierCode) {
        document.getElementById('dinValue').textContent = `${data.din.toFixed(1)} (${data.skierCode}${data.column})`;
    } else {
        document.getElementById('dinValue').textContent = data.din.toFixed(1);
    }
    
    // Mostrar recomendaciones de equipo
    if (data.recommendations) {
        const recSection = document.getElementById('recommendationsSection');
        if (recSection && data.recommendations.poleLength && data.recommendations.skiLength) {
            document.getElementById('resultPoleLength').textContent = `${data.recommendations.poleLength} cm`;
            document.getElementById('resultSkiLength').textContent = `${data.recommendations.skiLength} cm`;
            
            const notesDiv = document.getElementById('recommendationNotes');
            if (notesDiv && data.recommendations.notes && data.recommendations.notes.length > 0) {
                notesDiv.innerHTML = data.recommendations.notes.map(note => `• ${note}`).join('<br>');
            }
            
            recSection.style.display = 'block';
        }
    }
    
    // Actualizar traducciones en las secciones de recomendaciones y warnings
    updateTranslations();
    
    // Mostrar alertas y advertencias
    if (data.warnings && data.warnings.length > 0) {
        const warningsSection = document.getElementById('warningsSection');
        const warningsList = document.getElementById('warningsList');
        
        if (warningsSection && warningsList) {
            warningsList.innerHTML = data.warnings.map(w => `• ${w.message}`).join('<br>');
            warningsSection.style.display = 'block';
        }
    } else {
        const warningsSection = document.getElementById('warningsSection');
        if (warningsSection) warningsSection.style.display = 'none';
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
            const selectedAge = this.getAttribute('data-age');
            appState.selectedAge = selectedAge;
            
            // Mostrar alerta para edades extremas
            if (selectedAge === 'under10') {
                alert('⚠️ Edad ≤9 años: Se recomienda supervisión profesional para el ajuste del equipo de esquí. El cálculo DIN puede requerir ajustes adicionales.');
            } else if (selectedAge === 'over50') {
                alert('⚠️ Edad 50+: Se recomienda consultar con un técnico especializado para ajustes adicionales de seguridad y comodidad.');
            }
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

// Función para extraer datos del texto reconocido por OCR
function extractDataFromText(text) {
    const extracted = {
        age: null,
        weight: null,
        height: null,
        soleLength: null,
        type: null
    };
    
    // Normalizar texto: convertir a minúsculas y limpiar
    // Reemplazar caracteres comúnmente confundidos en escritura manual
    let normalizedText = text.toLowerCase()
        .replace(/[0o]/g, '0') // Normalizar ceros y oes
        .replace(/[1il]/g, '1') // Normalizar unos, ies y eles
        .replace(/[5s]/g, '5') // Normalizar cincos y eses
        .replace(/[6g]/g, '6') // Normalizar seises y ges
        .replace(/\s+/g, ' ');
    
    // Extraer edad: buscar patrones más flexibles para escritura manual
    // Tolerancia a variaciones: "edad", "edod", "edad:", "edad=", "25 años", "25 anos", etc.
    const agePatterns = [
        /(?:edad|edod|age|a[ñn]os?|years?|anos?)[\s:=]+(\d{1,3})/i,
        /(\d{1,3})[\s]*(?:a[ñn]os?|years?|anos?)/i,
        /(?:nacido|born|nacio|nacimiento)[\s:=]+(\d{4})/i, // Para calcular edad desde año de nacimiento
        /(?:a[ñn]o|year|ano)[\s:=]+(\d{4})/i, // Año de nacimiento alternativo
        /\b(\d{1,2})\s*(?:a[ñn]os?|years?|anos?)\b/i, // Patrón más simple: "25 años"
        /\b(?:edad|age)[\s:]*(\d{1,3})\b/i // "edad: 25" o "age 25"
    ];
    
    // Buscar en texto original y normalizado
    const searchTexts = [text, normalizedText];
    
    for (const searchText of searchTexts) {
        for (const pattern of agePatterns) {
            const match = searchText.match(pattern);
            if (match) {
                let ageStr = match[1].replace(/[^0-9]/g, ''); // Limpiar caracteres no numéricos
                let age = parseInt(ageStr);
                
                // Si es un año de nacimiento (4 dígitos y > 1900)
                if (age > 1900 && age < 2100) {
                    const currentYear = new Date().getFullYear();
                    age = currentYear - age;
                }
                
                if (age >= 0 && age <= 120) {
                    extracted.age = age;
                    console.log('Edad encontrada:', age, 'con patrón:', pattern);
                    break;
                }
            }
        }
        if (extracted.age !== null) break;
    }
    
    // Extraer peso: buscar patrones más flexibles para escritura manual
    // Tolerancia: "peso", "pesa", "weight", "70 kg", "70kg", "155 lbs", etc.
    const weightPatterns = [
        /(?:peso|pesa|weight|masa|w[ei]ight)[\s:=]+(\d{2,3}(?:[.,]\d+)?)[\s]*(?:kg|k[il]los?|kilograms?|lbs?|pounds?|lb)?/i,
        /(\d{2,3}(?:[.,]\d+)?)[\s]*(?:kg|k[il]los?|kilograms?|lbs?|pounds?|lb)/i,
        /(?:w|peso|weight)[\s:=]+(\d{2,3}(?:[.,]\d+)?)/i // Solo número después de w/peso/weight
    ];
    
    for (const pattern of weightPatterns) {
        const match = normalizedText.match(pattern) || text.match(pattern);
        if (match) {
            let weightStr = match[1].replace(/,/g, '.'); // Convertir coma a punto decimal
            let weight = parseFloat(weightStr.replace(/[^0-9.]/g, ''));
            // Verificar si está en libras
            const context = normalizedText.substring(Math.max(0, match.index - 10), match.index + match[0].length + 10);
            const unitMatch = context.match(/(lbs?|pounds?|lb\b)/i);
            if (unitMatch && weight > 50) { // Si el número es grande y tiene lbs, probablemente son libras
                weight = converters.lbsToKg(weight);
            }
            if (weight >= 10 && weight <= 300) {
                extracted.weight = weight;
                break;
            }
        }
    }
    
    // Extraer altura: buscar patrones más flexibles para escritura manual
    // Tolerancia: "altura", "alturo", "height", "175 cm", "5'10"", etc.
    const heightPatterns = [
        /(?:altura|alturo|height|estatura|h[ei]ight)[\s:=]+(\d{2,3}(?:[.,]\d+)?)[\s]*(?:cm|centimeters?|metros?|m\b|ft|feet|in|inches?)?/i,
        /(\d{2,3}(?:[.,]\d+)?)[\s]*(?:cm|centimeters?|metros?|m\b)/i,
        /(\d{1})[''`´]?\s*(\d{1,2})?[""`´]?/i, // Para pies y pulgadas como 5'10"
        /(\d{1})[\s]*(?:ft|feet|pie)[\s]*(\d{1,2})?[\s]*(?:in|inches?|pulgadas?)?/i,
        /(?:h|altura|height)[\s:=]+(\d{2,3}(?:[.,]\d+)?)/i // Solo número después de h/altura/height
    ];
    
    for (const pattern of heightPatterns) {
        const match = normalizedText.match(pattern) || text.match(pattern);
        if (match) {
            if (match[2] !== undefined && match[2] !== '') {
                // Formato pies y pulgadas (5'10")
                const feet = parseInt(match[1].replace(/[^0-9]/g, '')) || 0;
                const inches = parseInt(match[2].replace(/[^0-9]/g, '')) || 0;
                if (feet >= 2 && feet <= 8 && inches >= 0 && inches <= 11) {
                    extracted.height = converters.ftInToCm(feet, inches);
                    break;
                }
            } else {
                // Formato métrico (cm o m)
                let heightStr = match[1].replace(/,/g, '.');
                let height = parseFloat(heightStr.replace(/[^0-9.]/g, ''));
                // Verificar si está en metros
                const context = normalizedText.substring(Math.max(0, match.index - 10), match.index + match[0].length + 10);
                const unitMatch = context.match(/(metros?|m\b)/i);
                if (unitMatch && height < 3) {
                    height = height * 100; // Convertir metros a cm
                }
                // Verificar si está en pies (sin pulgadas)
                const feetMatch = context.match(/(ft|feet|pie)/i);
                if (feetMatch && height >= 2 && height <= 8) {
                    height = height * 30.48; // Convertir pies a cm
                }
                if (height >= 50 && height <= 250) {
                    extracted.height = height;
                    break;
                }
            }
        }
    }
    
    // Extraer largo de bota (sole length): buscar patrones flexibles
    // Tolerancia: "largo bota", "largo de bota", "sole length", "boot sole", "suela", etc.
    const soleLengthPatterns = [
        /(?:largo|length|longitud)[\s]*(?:de|of)?[\s]*(?:bota|boot|suela|sole|sola)[\s:=]+(\d{3})/i,
        /(?:bota|boot|suela|sole|sola)[\s]*(?:largo|length|longitud)[\s:=]+(\d{3})/i,
        /(?:sole|suela|sola|bota)[\s:=]+(\d{3})/i,
        /(?:sl|sole)[\s:=]+(\d{3})/i, // Abreviaciones
        /(?:mm|milimetros?)[\s:]+(\d{3})/i // Número seguido de mm (si está cerca de palabras relacionadas)
    ];
    
    for (const pattern of soleLengthPatterns) {
        const match = normalizedText.match(pattern) || text.match(pattern);
        if (match) {
            let soleLength = parseInt(match[1].replace(/[^0-9]/g, ''));
            if (soleLength >= 200 && soleLength <= 400) { // Rango razonable para boot sole length
                extracted.soleLength = soleLength;
                break;
            }
        }
    }
    
    // Si no se encontró con palabras clave, buscar números de 3 dígitos en rango 231-350
    // que estén cerca de contexto relevante
    if (!extracted.soleLength) {
        const threeDigitMatches = text.match(/\b(\d{3})\b/g);
        if (threeDigitMatches) {
            for (const match of threeDigitMatches) {
                const num = parseInt(match);
                if (num >= 231 && num <= 350) {
                    // Verificar contexto cercano
                    const contextIndex = text.indexOf(match);
                    const context = text.substring(Math.max(0, contextIndex - 30), Math.min(text.length, contextIndex + match.length + 30)).toLowerCase();
                    if (context.match(/(suela|sole|bota|boot|mm|longitud|length|sola)/i)) {
                        extracted.soleLength = num;
                        break;
                    }
                }
            }
        }
    }
    
    // Extraer TYPE/Nivel: buscar patrones flexibles para escritura manual
    // Tolerancia: "TYPE I", "TYPE 1", "TIPO I", "TIPO 1", "Type I", "tipo i", "tipo1", etc.
    const typePatterns = [
        /(?:type|tipo|tip[o0]|nivel|level|t)[\s:=]+([1-3i]{1})/i,
        /(?:type|tipo|tip[o0]|nivel|level)[\s]+([1-3i]{1})/i,
        /(?:t|type|tipo)[\s]*([1-3i]{1})/i,
        /\b([1-3i]{1})\b/i // Número solo (1, 2, 3 o I)
    ];
    
    for (const pattern of typePatterns) {
        const match = normalizedText.match(pattern) || text.match(pattern);
        if (match) {
            let typeStr = match[1].toUpperCase();
            // Convertir romano a número si es necesario
            let typeNum = null;
            if (typeStr === 'I' || typeStr === '1' || typeStr === 'i') {
                typeNum = 1;
            } else if (typeStr === 'II' || typeStr === '2') {
                typeNum = 2;
            } else if (typeStr === 'III' || typeStr === '3') {
                typeNum = 3;
            } else {
                typeNum = parseInt(typeStr);
            }
            
            // Verificar contexto para asegurar que es un TYPE
            const contextIndex = normalizedText.indexOf(match[0]);
            const context = normalizedText.substring(Math.max(0, contextIndex - 20), Math.min(normalizedText.length, contextIndex + match[0].length + 20));
            
            if ((typeNum >= 1 && typeNum <= 3) && 
                (context.match(/(type|tipo|tip[o0]|nivel|level)/i) || match[0].match(/(type|tipo|nivel|level)/i))) {
                extracted.type = typeNum.toString();
                break;
            }
        }
    }
    
    // Si no se encontró con palabras clave, buscar I, II, III o 1, 2, 3 solos
    // pero solo si hay indicadores de que es un formulario de esquí
    if (!extracted.type) {
        const skiContext = normalizedText.match(/(esqui|ski|din|esquiador|skier)/i);
        if (skiContext) {
            const typeOnlyMatch = normalizedText.match(/\b([1-3i]{1,3})\b/i);
            if (typeOnlyMatch) {
                let typeStr = typeOnlyMatch[1].toUpperCase();
                if (typeStr === 'I' || typeStr === '1') {
                    extracted.type = '1';
                } else if (typeStr === 'II' || typeStr === '2') {
                    extracted.type = '2';
                } else if (typeStr === 'III' || typeStr === '3') {
                    extracted.type = '3';
                }
            }
        }
    }
    
    return extracted;
}

// Función para preprocesar imagen y mejorar reconocimiento OCR
function preprocessImageForOCR(imageData) {
    const data = imageData.data;
    const width = imageData.width;
    const height = imageData.height;
    
    // Crear nueva imagen procesada
    const processedData = new ImageData(width, height);
    const processed = processedData.data;
    
    // Aplicar mejoras: contraste, brillo y binarización
    for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const a = data[i + 3];
        
        // Convertir a escala de grises
        const gray = Math.round(0.299 * r + 0.587 * g + 0.114 * b);
        
        // Aumentar contraste (ajustar según necesidad)
        let contrast = ((gray - 128) * 1.5) + 128;
        contrast = Math.max(0, Math.min(255, contrast));
        
        // Ajustar brillo
        let brightness = contrast + 20;
        brightness = Math.max(0, Math.min(255, brightness));
        
        // Binarización adaptativa (umbral)
        const threshold = 128;
        const binary = brightness > threshold ? 255 : 0;
        
        processed[i] = binary;     // R
        processed[i + 1] = binary; // G
        processed[i + 2] = binary; // B
        processed[i + 3] = a;     // Alpha
    }
    
    return processedData;
}

// Configurar cámara para medición con OCR
async function setupCameraMeasurement() {
    const cameraBtn = document.getElementById('cameraMeasureBtn');
    const cameraModal = document.getElementById('cameraModal');
    const closeCameraBtn = document.getElementById('closeCameraModal');
    const startCameraBtn = document.getElementById('startCameraBtn');
    const captureBtn = document.getElementById('capturePhotoBtn');
    const cameraVideo = document.getElementById('cameraVideo');
    const cameraCanvas = document.getElementById('cameraCanvas');
    const ocrProcessing = document.getElementById('ocrProcessing');
    const ocrStatus = document.getElementById('ocrStatus');
    const cameraResult = document.getElementById('cameraResult');
    const cameraInstructionsOverlay = document.getElementById('cameraInstructionsOverlay');
    const cameraControls = document.getElementById('cameraControls');
    const toggleFlashBtn = document.getElementById('toggleFlashBtn');
    const switchCameraBtn = document.getElementById('switchCameraBtn');
    
    let stream = null;
    let ocrWorker = null;
    let flashActive = false;
    let currentFacingMode = 'environment'; // 'environment' o 'user'
    
    // Verificar si la cámara está disponible
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        if (cameraBtn) cameraBtn.style.display = 'inline-block';
    }
    
    // Inicializar worker de Tesseract
    async function initOCR() {
        if (!ocrWorker) {
            try {
                if (ocrStatus) {
                    ocrStatus.textContent = 'Initializing OCR...';
                }
                
                ocrWorker = await createWorker('eng+spa+por', 1, {
                    logger: m => {
                        console.log('OCR Status:', m.status, m.progress);
                        if (ocrStatus) {
                            if (m.status === 'recognizing text') {
                                ocrStatus.textContent = translate('ocrRecognizing') + ` (${Math.round(m.progress * 100)}%)`;
                            } else if (m.status === 'loading tesseract core') {
                                ocrStatus.textContent = 'Loading OCR engine...';
                            } else if (m.status === 'initializing tesseract') {
                                ocrStatus.textContent = 'Initializing OCR...';
                            } else if (m.status === 'loading language traineddata') {
                                ocrStatus.textContent = 'Loading language data...';
                            }
                        }
                    }
                });
                
                console.log('OCR Worker inicializado correctamente');
                return true;
            } catch (error) {
                console.error('Error initializing OCR:', error);
                if (ocrStatus) {
                    ocrStatus.textContent = 'Error initializing OCR. Please refresh the page.';
                }
                return false;
            }
        }
        return true;
    }
    
    // Abrir modal de cámara
    if (cameraBtn && cameraModal) {
        cameraBtn.addEventListener('click', async () => {
            cameraModal.style.display = 'flex';
            cameraModal.classList.add('show');
            // Resetear estado
            if (cameraInstructionsOverlay) cameraInstructionsOverlay.style.display = 'flex';
            if (cameraControls) cameraControls.style.display = 'none';
            if (cameraResult) {
                cameraResult.style.display = 'none';
                cameraResult.innerHTML = '';
            }
            if (ocrProcessing) ocrProcessing.style.display = 'none';
            if (cameraVideo) cameraVideo.hidden = true;
            // Inicializar OCR cuando se abre el modal
            await initOCR();
        });
    }
    
    // Cerrar modal
    if (closeCameraBtn && cameraModal) {
        closeCameraBtn.addEventListener('click', () => {
            stopCamera();
            cameraModal.style.display = 'none';
            cameraModal.classList.remove('show');
        });
    }
    
    // Iniciar cámara
    if (startCameraBtn) {
        startCameraBtn.addEventListener('click', async () => {
            try {
                stream = await navigator.mediaDevices.getUserMedia({ 
                    video: { 
                        facingMode: currentFacingMode,
                        width: { ideal: 1920 },
                        height: { ideal: 1080 }
                    } 
                });
                if (cameraVideo) {
                    cameraVideo.srcObject = stream;
                    cameraVideo.hidden = false;
                }
                // Ocultar overlay de instrucciones y mostrar controles
                if (cameraInstructionsOverlay) cameraInstructionsOverlay.style.display = 'none';
                if (cameraControls) cameraControls.style.display = 'flex';
            } catch (error) {
                alert('Error accessing camera: ' + error.message);
            }
        });
    }
    
    // Toggle flash (simulado con brillo del video)
    if (toggleFlashBtn) {
        toggleFlashBtn.addEventListener('click', () => {
            flashActive = !flashActive;
            const flashOnIcon = document.getElementById('flashOnIcon');
            const flashOffIcon = document.getElementById('flashOffIcon');
            
            if (flashActive) {
                toggleFlashBtn.classList.add('active');
                if (flashOnIcon) flashOnIcon.style.display = 'block';
                if (flashOffIcon) flashOffIcon.style.display = 'none';
                // Aplicar filtro de brillo al video (simulación de flash)
                if (cameraVideo) {
                    cameraVideo.style.filter = 'brightness(1.5)';
                }
            } else {
                toggleFlashBtn.classList.remove('active');
                if (flashOnIcon) flashOnIcon.style.display = 'none';
                if (flashOffIcon) flashOffIcon.style.display = 'block';
                if (cameraVideo) {
                    cameraVideo.style.filter = 'brightness(1)';
                }
            }
        });
    }
    
    // Cambiar entre cámara frontal y trasera
    if (switchCameraBtn) {
        switchCameraBtn.addEventListener('click', async () => {
            // Detener stream actual
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
            
            // Cambiar modo
            currentFacingMode = currentFacingMode === 'environment' ? 'user' : 'environment';
            
            try {
                stream = await navigator.mediaDevices.getUserMedia({ 
                    video: { 
                        facingMode: currentFacingMode,
                        width: { ideal: 1920 },
                        height: { ideal: 1080 }
                    } 
                });
                if (cameraVideo) {
                    cameraVideo.srcObject = stream;
                }
            } catch (error) {
                alert('Error switching camera: ' + error.message);
            }
        });
    }
    
    // Capturar foto y procesar con OCR
    if (captureBtn && cameraVideo && cameraCanvas) {
        captureBtn.addEventListener('click', async () => {
            if (!ocrWorker) {
                const initialized = await initOCR();
                if (!initialized) {
                    alert('Error initializing OCR. Please try again.');
                    return;
                }
            }
            
            // Capturar imagen del video con mejor calidad
            const videoWidth = cameraVideo.videoWidth;
            const videoHeight = cameraVideo.videoHeight;
            
            // Crear canvas con tamaño optimizado (máximo 1920px de ancho para mejor rendimiento)
            const maxWidth = 1920;
            const scale = videoWidth > maxWidth ? maxWidth / videoWidth : 1;
            cameraCanvas.width = videoWidth * scale;
            cameraCanvas.height = videoHeight * scale;
            
            const ctx = cameraCanvas.getContext('2d');
            
            // Aplicar mejoras de imagen antes de capturar
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
            
            // Dibujar video en canvas
            ctx.drawImage(cameraVideo, 0, 0, cameraCanvas.width, cameraCanvas.height);
            
            // Preprocesar imagen para mejorar OCR
            const imageData = ctx.getImageData(0, 0, cameraCanvas.width, cameraCanvas.height);
            const processedData = preprocessImageForOCR(imageData);
            ctx.putImageData(processedData, 0, 0);
            
            // Mostrar estado de procesamiento
            if (ocrProcessing) {
                ocrProcessing.style.display = 'flex';
            }
            if (ocrStatus) {
                ocrStatus.textContent = translate('ocrProcessing');
            }
            // Ocultar controles mientras procesa
            if (cameraControls) {
                cameraControls.style.display = 'none';
            }
            
            try {
                // Configurar OCR con mejor precisión
                await ocrWorker.setParameters({
                    tessedit_char_whitelist: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzÁÉÍÓÚáéíóúÑñ.,:;/-=()[]{}°\'"',
                    tessedit_pageseg_mode: '6', // Asume un bloque uniforme de texto
                });
                
                // Procesar imagen con OCR
                const { data: { text, confidence } } = await ocrWorker.recognize(cameraCanvas);
                
                console.log('OCR Text reconocido:', text);
                console.log('Confianza promedio:', confidence);
                
                // Si no hay texto o confianza muy baja, mostrar advertencia
                if (!text || text.trim().length === 0) {
                    throw new Error('No se pudo reconocer texto en la imagen. Por favor, asegúrate de que el documento esté bien iluminado y enfocado.');
                }
                
                // Extraer datos del texto
                const extracted = extractDataFromText(text);
                
                console.log('Datos extraídos:', extracted);
                
                // Ocultar estado de procesamiento
                if (ocrProcessing) {
                    ocrProcessing.style.display = 'none';
                }
                
                // Mostrar resultados
                let resultHTML = '<div style="margin-bottom: 16px;"><strong>' + translate('ocrDataFound') + '</strong><br>';
                let hasData = false;
                const missingFields = [];
                
                const ageLabel = appState.currentLang === 'es' ? 'Edad' : appState.currentLang === 'pt' ? 'Idade' : 'Age';
                const weightLabel = appState.currentLang === 'es' ? 'Peso' : appState.currentLang === 'pt' ? 'Peso' : 'Weight';
                const heightLabel = appState.currentLang === 'es' ? 'Altura' : appState.currentLang === 'pt' ? 'Altura' : 'Height';
                const ageUnit = appState.currentLang === 'es' ? 'años' : appState.currentLang === 'pt' ? 'anos' : 'years';
                
                if (extracted.age !== null) {
                    resultHTML += `• ${ageLabel}: ${extracted.age} ${ageUnit}<br>`;
                    hasData = true;
                } else {
                    missingFields.push('age');
                }
                
                if (extracted.weight !== null) {
                    resultHTML += `• ${weightLabel}: ${extracted.weight.toFixed(1)} kg<br>`;
                    hasData = true;
                } else {
                    missingFields.push('weight');
                }
                
                if (extracted.height !== null) {
                    resultHTML += `• ${heightLabel}: ${extracted.height.toFixed(1)} cm<br>`;
                    hasData = true;
                } else {
                    missingFields.push('height');
                }
                
                const soleLengthLabel = appState.currentLang === 'es' ? 'Largo de Bota' : appState.currentLang === 'pt' ? 'Comprimento da Bota' : 'Boot Sole Length';
                if (extracted.soleLength !== null) {
                    resultHTML += `• ${soleLengthLabel}: ${extracted.soleLength} mm<br>`;
                    hasData = true;
                } else {
                    missingFields.push('soleLength');
                }
                
                const typeLabel = appState.currentLang === 'es' ? 'Nivel (Type)' : appState.currentLang === 'pt' ? 'Nível (Type)' : 'Level (Type)';
                if (extracted.type !== null) {
                    resultHTML += `• ${typeLabel}: TYPE ${extracted.type}<br>`;
                    hasData = true;
                } else {
                    missingFields.push('type');
                }
                
                resultHTML += '</div>';
                
                if (!hasData) {
                    // No se encontró ningún dato
                    resultHTML = '<p style="color: #ffa500; margin-bottom: 16px;">' + translate('ocrNoDataFound') + '</p>';
                    resultHTML += '<button type="button" class="btn btn-secondary-custom" id="enterManuallyBtn" style="width: 100%;">' + translate('enterManually') + '</button>';
                } else {
                    // Hay algunos datos, mostrar botón para usar y otro para ingresar manualmente lo que falta
                    resultHTML += '<div style="display: flex; gap: 8px; flex-wrap: wrap;">';
                    resultHTML += '<button type="button" class="btn btn-primary-custom" id="useOCRDataBtn" style="flex: 1;">' + translate('useRecognizedData') + '</button>';
                    if (missingFields.length > 0) {
                        resultHTML += '<button type="button" class="btn btn-secondary-custom" id="enterManuallyBtn" style="flex: 1;">' + translate('enterManually') + '</button>';
                    }
                    resultHTML += '</div>';
                }
                
                if (cameraResult) {
                    cameraResult.innerHTML = resultHTML;
                    cameraResult.style.display = 'block';
                }
                
                // Manejar botón de usar datos OCR
                const useOCRBtn = document.getElementById('useOCRDataBtn');
                if (useOCRBtn) {
                    useOCRBtn.addEventListener('click', () => {
                        // Llenar formulario con datos reconocidos
                        if (extracted.height !== null) {
                            if (appState.heightUnit === 'ft') {
                                const { feet, inches } = converters.cmToFtIn(extracted.height);
                                const heightFtInInput = document.getElementById('heightFtIn');
                                if (heightFtInInput) {
                                    heightFtInInput.value = `${feet}'${inches}"`;
                                }
                            } else {
                                const heightCmInput = document.getElementById('heightCm');
                                if (heightCmInput) {
                                    heightCmInput.value = extracted.height.toFixed(1);
                                }
                            }
                        }
                        
                        if (extracted.weight !== null) {
                            const weightInput = document.getElementById('weight');
                            if (weightInput) {
                                // Convertir a la unidad actual
                                if (appState.weightUnit === 'lbs') {
                                    weightInput.value = converters.kgToLbs(extracted.weight).toFixed(1);
                                } else {
                                    weightInput.value = extracted.weight.toFixed(1);
                                }
                            }
                        }
                        
                        if (extracted.age !== null) {
                            // Seleccionar rango de edad apropiado
                            const ageOptions = document.querySelectorAll('.age-option');
                            if (extracted.age <= 9) {
                                appState.selectedAge = 'under10';
                            } else if (extracted.age >= 50) {
                                appState.selectedAge = 'over50';
                            } else {
                                appState.selectedAge = '10-49';
                            }
                            
                            ageOptions.forEach(opt => {
                                opt.classList.remove('active');
                                if (opt.getAttribute('data-age') === appState.selectedAge) {
                                    opt.classList.add('active');
                                }
                            });
                        }
                        
                        if (extracted.soleLength !== null) {
                            // Llenar campo de largo de bota
                            const soleLengthInput = document.getElementById('soleLength');
                            if (soleLengthInput) {
                                soleLengthInput.value = extracted.soleLength;
                            }
                        }
                        
                        if (extracted.type !== null) {
                            // Seleccionar nivel de esquí
                            const skillLevelCards = document.querySelectorAll('.skill-level-card');
                            skillLevelCards.forEach(card => {
                                card.classList.remove('active');
                                if (card.getAttribute('data-level') === extracted.type) {
                                    card.classList.add('active');
                                    appState.selectedLevel = extracted.type;
                                }
                            });
                        }
                        
                        stopCamera();
                        cameraModal.style.display = 'none';
                        cameraModal.classList.remove('show');
                    });
                }
                
                // Manejar botón de ingresar manualmente
                const enterManuallyBtn = document.getElementById('enterManuallyBtn');
                if (enterManuallyBtn) {
                    enterManuallyBtn.addEventListener('click', () => {
                        // Si hay datos parciales, llenar los que se reconocieron
                        if (extracted.height !== null) {
                            if (appState.heightUnit === 'ft') {
                                const { feet, inches } = converters.cmToFtIn(extracted.height);
                                const heightFtInInput = document.getElementById('heightFtIn');
                                if (heightFtInInput) heightFtInInput.value = `${feet}'${inches}"`;
                            } else {
                                const heightCmInput = document.getElementById('heightCm');
                                if (heightCmInput) heightCmInput.value = extracted.height.toFixed(1);
                            }
                        }
                        
                        if (extracted.weight !== null) {
                            const weightInput = document.getElementById('weight');
                            if (weightInput) {
                                if (appState.weightUnit === 'lbs') {
                                    weightInput.value = converters.kgToLbs(extracted.weight).toFixed(1);
                                } else {
                                    weightInput.value = extracted.weight.toFixed(1);
                                }
                            }
                        }
                        
                        if (extracted.age !== null) {
                            const ageOptions = document.querySelectorAll('.age-option');
                            if (extracted.age <= 9) {
                                appState.selectedAge = 'under10';
                            } else if (extracted.age >= 50) {
                                appState.selectedAge = 'over50';
                            } else {
                                appState.selectedAge = '10-49';
                            }
                            ageOptions.forEach(opt => {
                                opt.classList.remove('active');
                                if (opt.getAttribute('data-age') === appState.selectedAge) {
                                    opt.classList.add('active');
                                }
                            });
                        }
                        
                        if (extracted.soleLength !== null) {
                            const soleLengthInput = document.getElementById('soleLength');
                            if (soleLengthInput) soleLengthInput.value = extracted.soleLength;
                        }
                        
                        if (extracted.type !== null) {
                            const skillLevelCards = document.querySelectorAll('.skill-level-card');
                            skillLevelCards.forEach(card => {
                                card.classList.remove('active');
                                if (card.getAttribute('data-level') === extracted.type) {
                                    card.classList.add('active');
                                    appState.selectedLevel = extracted.type;
                                }
                            });
                        }
                        
                        stopCamera();
                        cameraModal.style.display = 'none';
                        cameraModal.classList.remove('show');
                        
                        // Focus en el primer campo que falta
                        if (missingFields.includes('height')) {
                            setTimeout(() => {
                                const heightInput = appState.heightUnit === 'ft' 
                                    ? document.getElementById('heightFtIn') 
                                    : document.getElementById('heightCm');
                                heightInput?.focus();
                            }, 300);
                        } else if (missingFields.includes('weight')) {
                            setTimeout(() => document.getElementById('weight')?.focus(), 300);
                        } else if (missingFields.includes('soleLength')) {
                            setTimeout(() => document.getElementById('soleLength')?.focus(), 300);
                        } else if (missingFields.includes('type')) {
                            // Abrir sección avanzada si está cerrada
                            const advancedToggle = document.getElementById('toggleAdvanced');
                            const advancedContent = document.getElementById('advancedContent');
                            if (advancedToggle && advancedContent && !advancedContent.classList.contains('show')) {
                                advancedToggle.click();
                            }
                        }
                    });
                }
                
            } catch (error) {
                console.error('OCR Error:', error);
                if (ocrProcessing) ocrProcessing.style.display = 'none';
                if (ocrStatus) {
                    ocrStatus.textContent = 'Error: ' + error.message;
                }
                
                // Mostrar mensaje de error al usuario
                if (cameraResult) {
                    let errorHTML = '<div style="padding: 20px; text-align: center;">';
                    errorHTML += '<p style="color: #ff6b6b; margin-bottom: 16px; font-size: 1.1rem;">' + error.message + '</p>';
                    errorHTML += '<p style="color: var(--text-secondary); margin-bottom: 20px; font-size: 0.9rem;">';
                    errorHTML += 'Tips para mejor reconocimiento:<br>';
                    errorHTML += '• Asegúrate de tener buena iluminación<br>';
                    errorHTML += '• Mantén el documento plano y enfocado<br>';
                    errorHTML += '• Evita sombras y reflejos<br>';
                    errorHTML += '• El texto debe estar claro y legible';
                    errorHTML += '</p>';
                    errorHTML += '<button type="button" class="btn btn-secondary-custom" id="tryAgainBtn" style="width: 100%;">Try Again</button>';
                    errorHTML += '<button type="button" class="btn btn-primary-custom" id="enterManuallyBtn" style="width: 100%; margin-top: 12px;">' + translate('enterManually') + '</button>';
                    errorHTML += '</div>';
                    
                    cameraResult.innerHTML = errorHTML;
                    cameraResult.style.display = 'block';
                    
                    // Manejar botón de reintentar
                    const tryAgainBtn = document.getElementById('tryAgainBtn');
                    if (tryAgainBtn) {
                        tryAgainBtn.addEventListener('click', () => {
                            cameraResult.style.display = 'none';
                            if (cameraControls) cameraControls.style.display = 'flex';
                        });
                    }
                    
                    // Manejar botón de ingresar manualmente
                    const enterManuallyBtn = document.getElementById('enterManuallyBtn');
                    if (enterManuallyBtn) {
                        enterManuallyBtn.addEventListener('click', () => {
                            stopCamera();
                            cameraModal.style.display = 'none';
                            cameraModal.classList.remove('show');
                        });
                    }
                }
            }
        });
    }
    
    // Detener cámara
    function stopCamera() {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            stream = null;
        }
        if (cameraVideo) {
            cameraVideo.srcObject = null;
            cameraVideo.hidden = true;
        }
        if (startCameraBtn) startCameraBtn.style.display = 'inline-block';
        if (captureBtn) captureBtn.style.display = 'none';
        if (stopCameraBtn) stopCameraBtn.style.display = 'none';
        if (cameraResult) {
            cameraResult.style.display = 'none';
            cameraResult.innerHTML = '';
        }
        if (ocrProcessing) ocrProcessing.style.display = 'none';
    }
    
    if (stopCameraBtn) {
        stopCameraBtn.addEventListener('click', stopCamera);
    }
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
