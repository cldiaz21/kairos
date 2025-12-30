// Importar estilos (Vite maneja esto automáticamente)
import './style.css';

// Verificar que todo se cargue correctamente
console.log('KAIROS: Módulos cargados correctamente');

// Estado de la aplicación
const appState = {
    heightUnit: 'cm',
    weightUnit: 'kg',
    selectedAge: '18-50',
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
        calculateAnother: 'Calcular otro DIN'
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
        calculateAnother: 'Calculate Another DIN'
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
        calculateAnother: 'Calcular outro DIN'
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
    setupWeightToggle();
    setupAdvancedToggle();
    setupAgeOptions();
    setupSkillLevels();
    setupFormSubmit();
    setupLanguageSelector();
    setupModal();
    setupResultsModal();
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

// Función para calcular DIN (simulación)
function calculateDIN(heightInCm, weightInKg, soleLength, age, level) {
    // Esta es una simulación básica del cálculo DIN
    // En producción, aquí iría la lógica real del cálculo
    
    let baseDIN = 0;
    
    // Factor de peso (simplificado)
    if (weightInKg < 50) baseDIN = 0.75;
    else if (weightInKg < 60) baseDIN = 1.0;
    else if (weightInKg < 70) baseDIN = 1.5;
    else if (weightInKg < 80) baseDIN = 2.0;
    else if (weightInKg < 90) baseDIN = 2.5;
    else baseDIN = 3.0;
    
    // Factor de nivel
    const levelFactor = parseFloat(level);
    baseDIN += (levelFactor - 1) * 0.5;
    
    // Factor de edad
    if (age === 'under18') baseDIN -= 0.5;
    else if (age === 'over50') baseDIN -= 0.5;
    
    // Ajuste por altura
    if (heightInCm > 180) baseDIN += 0.5;
    else if (heightInCm < 160) baseDIN -= 0.5;
    
    // Redondear a 0.5
    const dinValue = Math.round(baseDIN * 2) / 2;
    
    // Limitar entre 0.75 y 12
    return Math.max(0.75, Math.min(12, dinValue));
}

// Mostrar resultados en el modal
function showResults(data) {
    const resultsModal = document.getElementById('resultsModal');
    
    // Actualizar valores en el modal
    document.getElementById('resultHeight').textContent = `${data.height.toFixed(1)} cm`;
    document.getElementById('resultWeight').textContent = `${data.weight.toFixed(1)} kg`;
    document.getElementById('resultSoleLength').textContent = `${data.soleLength} mm`;
    
    // Traducir edad
    let ageText = '';
    if (data.age === 'under18') ageText = '< 18';
    else if (data.age === '18-50') ageText = '18 - 50';
    else ageText = '50 +';
    document.getElementById('resultAge').textContent = ageText;
    
    document.getElementById('resultLevel').textContent = `TYPE ${data.level}`;
    document.getElementById('dinValue').textContent = data.din.toFixed(1);
    
    // Mostrar modal
    resultsModal.classList.add('show');
    
    // Actualizar traducciones en el modal
    updateTranslations();
}

// Toggle de unidades de altura
function setupHeightToggle() {
    const toggle = document.getElementById('heightToggle');
    if (!toggle) return;
    
    toggle.addEventListener('click', () => {
        const heightInput = document.getElementById('height');
        const heightUnitSpan = document.getElementById('heightUnit');
        const inactiveSpan = toggle.querySelector('.inactive');
        const currentValue = parseFloat(heightInput.value);
        
        if (appState.heightUnit === 'cm') {
            appState.heightUnit = 'ft';
            heightUnitSpan.textContent = 'FT';
            inactiveSpan.textContent = 'CM';
            if (!isNaN(currentValue) && currentValue > 0) {
                heightInput.value = converters.cmToFt(currentValue);
            }
        } else {
            appState.heightUnit = 'cm';
            heightUnitSpan.textContent = 'CM';
            inactiveSpan.textContent = 'FT';
            if (!isNaN(currentValue) && currentValue > 0) {
                heightInput.value = converters.ftToCm(currentValue);
            }
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
        
        const height = parseFloat(document.getElementById('height').value);
        const weight = parseFloat(document.getElementById('weight').value);
        const soleLength = parseFloat(document.getElementById('soleLength').value);
        
        // Validación
        if (!height || !weight || !soleLength) {
            alert(translate('validationError'));
            return;
        }
        
        // Convertir a unidades estándar
        const heightInCm = appState.heightUnit === 'ft' 
            ? converters.ftToCm(height) 
            : height;
        
        const weightInKg = appState.weightUnit === 'lbs' 
            ? converters.lbsToKg(weight) 
            : weight;
        
        // Calcular DIN
        const dinValue = calculateDIN(heightInCm, weightInKg, soleLength, appState.selectedAge, appState.selectedLevel);
        
        // Mostrar resultados en el modal
        showResults({
            height: heightInCm,
            weight: weightInKg,
            soleLength: soleLength,
            age: appState.selectedAge,
            level: appState.selectedLevel,
            din: dinValue
        });
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
